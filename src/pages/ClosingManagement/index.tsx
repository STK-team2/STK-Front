import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ActionMenu } from '../../shared/ui/ActionMenu';
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
  SortOptionList, SortOption,
  DateFilterWrap, DateFilterLabel, DateRangeRow, DateRangeInput, DateRangeSep,
  TableWrap, Table, HeaderRow, Th, DataRow, Td,
  StatusText, CloseBtn, CancelBtn,
  ToolbarRight, ToolbarCancelBtn, ToolbarSaveBtn,
  ModalOverlay, ModalCard, ModalTitle, ModalFieldLabel, ModalMonthInput,
  ModalActions, ModalCancelBtn, ModalConfirmBtn,
  ModalSearchInput, ModalItemList, ModalItemRow, ModalItemCode, ModalItemName, ModalEmptyText,
} from './style';
import { useSearchItems } from '../../features/item/api/queries';

type FilterType = 'date' | 'status' | null;
type ClosingFilterStatus = 'ALL' | 'CLOSED' | 'CANCELLED';

const CLOSING_ACTIONS = ['마감 추가', '마감 수정'];

const ClosingManagementPage = () => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClosingFilterStatus>('ALL');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<Record<string, 'CLOSED' | 'CANCELLED'>>({});
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addMonth, setAddMonth] = useState('');
  const [addSearch, setAddSearch] = useState('');
  const [addSelectedItems, setAddSelectedItems] = useState<Set<string>>(new Set());

  const { data: allItems = [] } = useSearchItems(addSearch);

  const { data: closingRows = [] } = useGetClosingStock({
    status: statusFilter === 'ALL' ? undefined : statusFilter,
  });
  const closeMonthMutation = useCloseMonth();
  const cancelClosingMutation = useCancelClosing();

  const filteredRows = closingRows.filter((row) => {
    if (dateFrom && row.closingYm < dateFrom.substring(0, 7)) return false;
    if (dateTo && row.closingYm > dateTo.substring(0, 7)) return false;

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

  const toggleStatus = async (id: string, closingYmValue: string, itemId: string, isClosed: boolean) => {
    try {
      if (isClosed) {
        await cancelClosingMutation.mutateAsync(id);
      } else {
        await closeMonthMutation.mutateAsync({ closingYm: closingYmValue, itemId });
      }
    } catch (error) {
      showApiErrorToast(error, isClosed ? '마감 취소에 실패했습니다.' : '마감 처리에 실패했습니다.');
    }
  };

  const enterEditMode = () => {
    const initial: Record<string, 'CLOSED' | 'CANCELLED'> = {};
    closingRows.forEach((row) => {
      initial[row.closingId] = row.status as 'CLOSED' | 'CANCELLED';
    });
    setPendingStatus(initial);
    setEditMode(true);
    setSelectedDetailId(null);
    setActionOpen(false);
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setPendingStatus({});
  };

  const togglePendingStatus = (id: string) => {
    setPendingStatus((prev) => ({
      ...prev,
      [id]: prev[id] === 'CLOSED' ? 'CANCELLED' : 'CLOSED',
    }));
  };

  const confirmAllEdits = async () => {
    const changes = closingRows.filter((row) => pendingStatus[row.closingId] !== row.status);

    if (changes.length === 0) {
      setEditMode(false);
      setPendingStatus({});
      return;
    }

    try {
      const itemsToClose: { closingYm: string; itemId: string }[] = [];
      const itemsToCancel: string[] = [];

      for (const row of changes) {
        if (pendingStatus[row.closingId] === 'CLOSED') {
          itemsToClose.push({ closingYm: row.closingYm, itemId: row.itemId });
        } else {
          itemsToCancel.push(row.closingId);
        }
      }

      await Promise.all([
        ...itemsToClose.map(({ closingYm, itemId }) => closeMonthMutation.mutateAsync({ closingYm, itemId })),
        ...itemsToCancel.map((id) => cancelClosingMutation.mutateAsync(id)),
      ]);

      setEditMode(false);
      setPendingStatus({});
    } catch (error) {
      showApiErrorToast(error, '마감 수정에 실패했습니다.');
    }
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
    setAddMonth('');
    setAddSearch('');
    setAddSelectedItems(new Set());
  };

  const toggleAddItem = (itemId: string) => {
    setAddSelectedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  const handleAddClosing = async () => {
    if (!addMonth || addSelectedItems.size === 0) return;
    try {
      await Promise.all(
        Array.from(addSelectedItems).map((itemId) =>
          closeMonthMutation.mutateAsync({ closingYm: addMonth, itemId }),
        ),
      );
      closeAddModal();
    } catch (error) {
      showApiErrorToast(error, '마감 추가에 실패했습니다.');
    }
  };

  const handleActionItem = (item: string) => {
    if (item === '마감 추가') {
      setAddModalOpen(true);
      setActionOpen(false);
    } else if (item === '마감 수정') {
      enterEditMode();
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

  const closeAll = () => {
    setOpenFilter(null);
    setActionOpen(false);
  };

  return (
    <Layout>
      {addModalOpen && (
        <ModalOverlay onClick={closeAddModal}>
          <ModalCard onClick={(e) => e.stopPropagation()}>
            <ModalTitle>마감 추가</ModalTitle>
            <div>
              <ModalFieldLabel>마감 연월</ModalFieldLabel>
              <ModalMonthInput
                type="month"
                value={addMonth}
                onChange={(e) => setAddMonth(e.target.value)}
              />
            </div>
            <div>
              <ModalFieldLabel>자재 선택</ModalFieldLabel>
              <ModalSearchInput
                placeholder="자재코드·자재명 검색"
                value={addSearch}
                onChange={(e) => setAddSearch(e.target.value)}
              />
              <ModalItemList>
                {allItems.length === 0 ? (
                  <ModalEmptyText>자재가 없습니다.</ModalEmptyText>
                ) : (
                  allItems.map((item) => (
                    <ModalItemRow key={item.itemId} onClick={() => toggleAddItem(item.itemId)}>
                      <Checkbox checked={addSelectedItems.has(item.itemId)} onChange={() => toggleAddItem(item.itemId)} />
                      <ModalItemCode>{item.itemCode}</ModalItemCode>
                      <ModalItemName>{item.itemName}</ModalItemName>
                    </ModalItemRow>
                  ))
                )}
              </ModalItemList>
            </div>
            <ModalActions>
              <ModalCancelBtn type="button" onClick={closeAddModal}>취소</ModalCancelBtn>
              <ModalConfirmBtn
                type="button"
                disabled={!addMonth || addSelectedItems.size === 0}
                onClick={() => void handleAddClosing()}
              >
                추가{addSelectedItems.size > 0 ? ` (${addSelectedItems.size})` : ''}
              </ModalConfirmBtn>
            </ModalActions>
          </ModalCard>
        </ModalOverlay>
      )}
      {(openFilter || actionOpen) && <Backdrop onClick={closeAll} />}

      <PageInner>
        <PageTitle>마감 관리</PageTitle>

        <Toolbar>
          <Filters>
            <FilterButton
              label="날짜"
              isOpen={openFilter === 'date'}
              onToggle={() => setOpenFilter(openFilter === 'date' ? null : 'date')}
            >
              <DateFilterWrap>
                <DateFilterLabel>날짜</DateFilterLabel>
                <DateRangeRow>
                  <DateRangeInput type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                  <DateRangeSep>~</DateRangeSep>
                  <DateRangeInput type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                </DateRangeRow>
              </DateFilterWrap>
            </FilterButton>
            <FilterButton
              label="마감 상태"
              isOpen={openFilter === 'status'}
              onToggle={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
            >
              <SortOptionList>
                <SortOption active={statusFilter === 'ALL'} type="button" onClick={() => { setStatusFilter('ALL'); setOpenFilter(null); }}>전체</SortOption>
                <SortOption active={statusFilter === 'CLOSED'} type="button" onClick={() => { setStatusFilter('CLOSED'); setOpenFilter(null); }}>마감</SortOption>
                <SortOption active={statusFilter === 'CANCELLED'} type="button" onClick={() => { setStatusFilter('CANCELLED'); setOpenFilter(null); }}>취소</SortOption>
              </SortOptionList>
            </FilterButton>
          </Filters>

          <ToolbarRight>
            <SearchInput value={search} onChange={setSearch} />
            {editMode ? (
              <>
                <ToolbarCancelBtn type="button" onClick={cancelEditMode}>취소</ToolbarCancelBtn>
                <ToolbarSaveBtn type="button" onClick={() => void confirmAllEdits()}>수정</ToolbarSaveBtn>
              </>
            ) : (
              <ActionMenu
                label="마감 관리"
                isOpen={actionOpen}
                onToggle={() => setActionOpen((value) => !value)}
                items={CLOSING_ACTIONS}
                onItemClick={handleActionItem}
              />
            )}
          </ToolbarRight>
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
                    const isClosed = editMode
                      ? pendingStatus[row.closingId] === 'CLOSED'
                      : row.status === 'CLOSED';

                    return (
                      <DataRow
                        key={row.closingId}
                        active={selectedDetailId === row.closingId}
                        onClick={() => !editMode && openDetail(row.closingId)}
                      >
                        <Td data-label="선택" onClick={(e) => e.stopPropagation()}><Checkbox checked={selectedRows.has(row.closingId)} onChange={() => toggleRow(row.closingId)} /></Td>
                        <Td data-label="자재코드">{row.itemCode}</Td>
                        <Td data-label="자재명">{row.itemName}</Td>
                        <Td data-label="자재 위치">{row.location}</Td>
                        <Td data-label="기간">{row.closingYm}</Td>
                        <Td data-label="상태">
                          <StatusText closed={isClosed}>{isClosed ? '마감' : '취소'}</StatusText>
                        </Td>
                        <Td data-label="마감" onClick={(e) => e.stopPropagation()}>
                          {editMode ? (
                            isClosed ? (
                              <CancelBtn type="button" onClick={() => togglePendingStatus(row.closingId)}>취소</CancelBtn>
                            ) : (
                              <CloseBtn type="button" onClick={() => togglePendingStatus(row.closingId)}>마감</CloseBtn>
                            )
                          ) : (
                            isClosed ? (
                              <CancelBtn type="button" onClick={() => void toggleStatus(row.closingId, row.closingYm, row.itemId, true)}>취소</CancelBtn>
                            ) : (
                              <CloseBtn type="button" onClick={() => void toggleStatus(row.closingId, row.closingYm, row.itemId, false)}>마감</CloseBtn>
                            )
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
