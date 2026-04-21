import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { Checkbox } from '../../shared/ui/Checkbox';
import { RecordDetailPanel } from '../../shared/ui/RecordDetailPanel';
import { showApiErrorToast } from '../../shared/lib/toast';
import {
  useCancelClosing,
  useCloseMonth,
  useGetClosingStock,
} from '../../features/closing/api/queries';
import {
  Backdrop, PageInner, PageTitle, Toolbar, Filters,
  TableWrap, Table, HeaderRow, Th, DataRow, Td,
  StatusText, CloseBtn, CancelBtn,
} from './style';

type FilterType = 'period' | 'status' | null;
type ClosingFilterStatus = 'ALL' | 'CLOSED' | 'CANCELLED';

const ClosingManagementPage = () => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [search, setSearch] = useState('');
  const [closingYm, setClosingYm] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClosingFilterStatus>('ALL');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);

  const { data: closingRows = [] } = useGetClosingStock({
    closingYm: closingYm || undefined,
    status: statusFilter === 'ALL' ? undefined : statusFilter,
  });
  const closeMonthMutation = useCloseMonth();
  const cancelClosingMutation = useCancelClosing();

  const filteredRows = closingRows.filter((row) => {
    const normalizedSearch = search.trim().toLowerCase();
    if (!normalizedSearch) return true;

    return [
      row.itemCode,
      row.itemName,
      row.boxNumber,
      row.location,
      row.userName,
      row.closingYm,
    ]
      .join(' ')
      .toLowerCase()
      .includes(normalizedSearch);
  });

  const allSelected = filteredRows.length > 0 && selectedRows.size === filteredRows.length;
  const selectedDetailRow = selectedDetailId
    ? filteredRows.find((row) => row.closingId === selectedDetailId) ?? null
    : null;

  const openDetail = (id: string) => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    setSelectedDetailId(id);
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows(new Set());
      return;
    }

    setSelectedRows(new Set(filteredRows.map((row) => row.closingId)));
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleStatus = async (id: string, closingYmValue: string, isClosed: boolean) => {
    try {
      if (isClosed) {
        await cancelClosingMutation.mutateAsync(id);
      } else {
        await closeMonthMutation.mutateAsync({ closingYm: closingYmValue });
      }
    } catch (error) {
      showApiErrorToast(error, isClosed ? '마감 취소에 실패했습니다.' : '마감 처리에 실패했습니다.');
    }
  };

  const cancelDetailClosing = async (id: string) => {
    try {
      await cancelClosingMutation.mutateAsync(id);
      setSelectedDetailId(null);
    } catch (error) {
      showApiErrorToast(error, '마감 취소에 실패했습니다.');
    }
  };

  const closeFilter = () => setOpenFilter(null);

  return (
    <Layout>
      {openFilter && <Backdrop onClick={closeFilter} />}

      <PageInner>
        <PageTitle>마감 관리</PageTitle>

        <Toolbar>
          <Filters>
            <FilterButton
              label="기간"
              isOpen={openFilter === 'period'}
              onToggle={() => setOpenFilter(openFilter === 'period' ? null : 'period')}
            >
              <input
                type="month"
                value={closingYm}
                onChange={(e) => setClosingYm(e.target.value)}
              />
            </FilterButton>
            <FilterButton
              label="마감 상태"
              isOpen={openFilter === 'status'}
              onToggle={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
            >
              <div>
                <button type="button" onClick={() => setStatusFilter('ALL')}>전체</button>
                <button type="button" onClick={() => setStatusFilter('CLOSED')}>마감</button>
                <button type="button" onClick={() => setStatusFilter('CANCELLED')}>취소</button>
              </div>
            </FilterButton>
          </Filters>

          <SearchInput value={search} onChange={setSearch} />
        </Toolbar>

        <TableWrap>
              <Table>
                <colgroup>
                  <col style={{ width: '48px' }} />
                  <col style={{ width: '140px' }} />
                  <col />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '120px' }} />
                </colgroup>
                <thead>
                  <HeaderRow>
                    <Th onClick={(e) => e.stopPropagation()}><Checkbox checked={allSelected} onChange={toggleSelectAll} /></Th>
                    <Th>자재코드</Th>
                    <Th>자재명</Th>
                    <Th>자재 위치</Th>
                    <Th>기간</Th>
                    <Th>상태</Th>
                    <Th>마감</Th>
                  </HeaderRow>
                </thead>
                <tbody>
                  {filteredRows.map((row) => {
                    const isClosed = row.status === 'CLOSED';

                    return (
                      <DataRow
                        key={row.closingId}
                        active={selectedDetailId === row.closingId}
                        onClick={() => openDetail(row.closingId)}
                      >
                        <Td onClick={(e) => e.stopPropagation()}><Checkbox checked={selectedRows.has(row.closingId)} onChange={() => toggleRow(row.closingId)} /></Td>
                        <Td>{row.itemCode}</Td>
                        <Td>{row.itemName}</Td>
                        <Td>{row.location}</Td>
                        <Td>{row.closingYm}</Td>
                        <Td>
                          <StatusText closed={isClosed}>{isClosed ? '마감' : '취소'}</StatusText>
                        </Td>
                        <Td onClick={(e) => e.stopPropagation()}>
                          {isClosed ? (
                            <CancelBtn type="button" onClick={() => void toggleStatus(row.closingId, row.closingYm, true)}>취소</CancelBtn>
                          ) : (
                            <CloseBtn type="button" onClick={() => void toggleStatus(row.closingId, row.closingYm, false)}>마감</CloseBtn>
                          )}
                        </Td>
                      </DataRow>
                    );
                  })}
                </tbody>
              </Table>
        </TableWrap>

          {selectedDetailRow && (
            <RecordDetailPanel
              title={selectedDetailRow.itemName}
              subtitle={`${selectedDetailRow.itemCode} · ${selectedDetailRow.closingYm}`}
              onClose={() => setSelectedDetailId(null)}
              deleteLabel="마감 취소"
              onDelete={() => cancelDetailClosing(selectedDetailRow.closingId)}
              sections={[
                {
                  title: '마감 정보',
                  fields: [
                    { label: '기간', value: selectedDetailRow.closingYm },
                    { label: '상태', value: selectedDetailRow.status === 'CLOSED' ? '마감' : '취소' },
                    { label: '담당자', value: selectedDetailRow.userName || '-', muted: !selectedDetailRow.userName },
                    { label: '마감 일시', value: selectedDetailRow.closedAt || '-', muted: !selectedDetailRow.closedAt },
                  ],
                },
                {
                  title: '재고 흐름',
                  fields: [
                    { label: '기초 재고', value: selectedDetailRow.openingStock.toLocaleString() },
                    { label: '입고 수량', value: selectedDetailRow.inboundQty.toLocaleString() },
                    { label: '출고 수량', value: selectedDetailRow.outboundQty.toLocaleString() },
                    { label: '마감 재고', value: selectedDetailRow.closingStock.toLocaleString() },
                    { label: '자재 위치', value: selectedDetailRow.location },
                    { label: 'BOX 번호', value: selectedDetailRow.boxNumber || '-', muted: !selectedDetailRow.boxNumber },
                  ],
                },
              ]}
            />
          )}
      </PageInner>
    </Layout>
  );
};

export default ClosingManagementPage;
