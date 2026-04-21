import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { Checkbox } from '../../shared/ui/Checkbox';
import { RecordDetailPanel } from '../../shared/ui/RecordDetailPanel';
import {
  useDownloadCurrentStock,
  useGetCurrentStock,
} from '../../features/stock/api/queries';
import { useDeleteItem, useUpdateItem } from '../../features/item/api/queries';
import { showApiErrorToast } from '../../shared/lib/toast';
import {
  Backdrop, PageInner, PageTitle, Toolbar, Filters, ToolbarRight,
  QtyLabel, QtyInputRow, QtyInput, QtySep, SortOptionList, SortOption,
  TableWrap, Table, HeaderRow, Th, DataRow, Td,
  NewRow, NewRowInput, CancelBtn, SaveBtn,
} from './style';

type FilterType = 'qty' | 'status' | null;
type StockStatus = null | 'all' | 'empty' | 'available';

interface Row {
  id: string;
  boxNumber: string;
  location: string;
  code: string;
  name: string;
  currentStock: number;
}

const INVENTORY_ACTIONS = ['자재 수정', '재고 없는 품목', '다운로드'];

const InventoryManagementPage = () => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [qtyMin, setQtyMin] = useState('');
  const [qtyMax, setQtyMax] = useState('');
  const [stockStatus, setStockStatus] = useState<StockStatus>('all');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, Row>>({});

  const { data: currentStock = [] } = useGetCurrentStock();
  const downloadCurrentStockMutation = useDownloadCurrentStock();
  const updateItemMutation = useUpdateItem();
  const deleteItemMutation = useDeleteItem();

  const rows: Row[] = currentStock.map((item) => ({
    id: item.itemId,
    boxNumber: item.boxNumber || '-',
    location: item.location,
    code: item.itemCode,
    name: item.itemName,
    currentStock: item.currentStock,
  }));

  const filteredRows = rows.filter((row) => {
    const normalizedSearch = search.trim().toLowerCase();
    if (
      normalizedSearch &&
      ![row.boxNumber, row.location, row.code, row.name]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch)
    ) {
      return false;
    }

    if (qtyMin && row.currentStock < Number(qtyMin)) return false;
    if (qtyMax && row.currentStock > Number(qtyMax)) return false;
    if (stockStatus === 'empty' && row.currentStock !== 0) return false;
    if (stockStatus === 'available' && row.currentStock <= 0) return false;
    return true;
  });

  const allSelected = filteredRows.length > 0 && selectedRows.size === filteredRows.length;
  const selectedDetailRow = selectedDetailId
    ? filteredRows.find((row) => row.id === selectedDetailId) ?? null
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

    setSelectedRows(new Set(filteredRows.map((row) => row.id)));
  };

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const closeAll = () => {
    setOpenFilter(null);
    setActionOpen(false);
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditValues({});
  };

  const updateEditValue = (id: string, field: keyof Omit<Row, 'id' | 'currentStock'>, value: string) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const confirmAllEdits = async () => {
    try {
      await Promise.all(
        filteredRows.map((row) => {
          const edit = editValues[row.id];
          if (!edit) return Promise.resolve();
          return updateItemMutation.mutateAsync({
            id: row.id,
            body: {
              itemCode: edit.code,
              itemName: edit.name,
              boxNumber: edit.boxNumber === '-' ? '' : edit.boxNumber,
              location: edit.location,
            },
          });
        }),
      );
      setEditMode(false);
      setEditValues({});
    } catch (error) {
      showApiErrorToast(error, '자재 수정에 실패했습니다.');
    }
  };

  const handleActionItem = async (item: string) => {
    if (item === '자재 수정') {
      const nextValues: Record<string, Row> = {};
      filteredRows.forEach((row) => {
        nextValues[row.id] = { ...row };
      });
      setEditValues(nextValues);
      setEditMode(true);
      setSelectedDetailId(null);
      setActionOpen(false);
      return;
    }

    if (item === '재고 없는 품목') {
      setStockStatus('empty');
      setActionOpen(false);
      return;
    }

    if (item === '다운로드') {
      try {
        await downloadCurrentStockMutation.mutateAsync();
      } catch {
        window.alert('다운로드에 실패했습니다.');
      }
      setActionOpen(false);
    }
  };

  const saveDetailField = async (
    row: Row,
    field: 'boxNumber' | 'location' | 'code' | 'name',
    value: string,
  ) => {
    const nextRow = { ...row, [field]: value };

    try {
      await updateItemMutation.mutateAsync({
        id: row.id,
        body: {
          itemCode: nextRow.code,
          itemName: nextRow.name,
          boxNumber: nextRow.boxNumber === '-' ? '' : nextRow.boxNumber,
          location: nextRow.location,
        },
      });
    } catch (error) {
      showApiErrorToast(error, '자재 수정에 실패했습니다.');
    }
  };

  const deleteDetailRow = async (id: string) => {
    try {
      await deleteItemMutation.mutateAsync(id);
      setSelectedDetailId(null);
      setSelectedRows((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (error) {
      showApiErrorToast(error, '자재 삭제에 실패했습니다.');
    }
  };

  return (
    <Layout>
      {(openFilter || actionOpen) && <Backdrop onClick={closeAll} />}

      <PageInner>
        <PageTitle>재고 조회</PageTitle>

        <Toolbar>
          <Filters>
            <FilterButton
              label="수량"
              isOpen={openFilter === 'qty'}
              onToggle={() => setOpenFilter(openFilter === 'qty' ? null : 'qty')}
            >
              <QtyLabel>현재 재고</QtyLabel>
              <QtyInputRow>
                <QtyInput type="number" value={qtyMin} onChange={(e) => setQtyMin(e.target.value)} />
                <QtySep>~</QtySep>
                <QtyInput type="number" value={qtyMax} onChange={(e) => setQtyMax(e.target.value)} />
              </QtyInputRow>
            </FilterButton>
            <FilterButton
              label="재고 상태"
              isOpen={openFilter === 'status'}
              onToggle={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
            >
              <SortOptionList>
                <SortOption active={stockStatus === 'all'} type="button" onClick={() => setStockStatus('all')}>전체</SortOption>
                <SortOption active={stockStatus === 'available'} type="button" onClick={() => setStockStatus('available')}>재고 있음</SortOption>
                <SortOption active={stockStatus === 'empty'} type="button" onClick={() => setStockStatus('empty')}>재고 없음</SortOption>
              </SortOptionList>
            </FilterButton>
          </Filters>

          <ToolbarRight>
            <SearchInput value={search} onChange={setSearch} />
            {editMode ? (
              <>
                <CancelBtn type="button" onClick={cancelEditMode}>취소</CancelBtn>
                <SaveBtn type="button" onClick={() => void confirmAllEdits()}>수정</SaveBtn>
              </>
            ) : (
              <ActionMenu
                label="재고 관리"
                isOpen={actionOpen}
                onToggle={() => setActionOpen((value) => !value)}
                items={INVENTORY_ACTIONS}
                onItemClick={(item) => void handleActionItem(item)}
              />
            )}
          </ToolbarRight>
        </Toolbar>

        <TableWrap>
              <Table>
                <colgroup>
                  <col style={{ width: '48px' }} />
                  <col style={{ width: '130px' }} />
                  <col style={{ width: '140px' }} />
                  <col style={{ width: '140px' }} />
                  <col />
                  <col style={{ width: '110px' }} />
                </colgroup>
                <thead>
                  <HeaderRow>
                    <Th onClick={(e) => e.stopPropagation()}><Checkbox checked={allSelected} onChange={toggleSelectAll} /></Th>
                    <Th>BOX 번호</Th>
                    <Th>자재 위치</Th>
                    <Th>자재코드</Th>
                    <Th>자재명</Th>
                    <Th>현재 재고</Th>
                  </HeaderRow>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    editMode ? (
                      <NewRow key={row.id}>
                        <Td onClick={(e) => e.stopPropagation()}><Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} /></Td>
                        <Td><NewRowInput type="text" value={editValues[row.id]?.boxNumber ?? (row.boxNumber === '-' ? '' : row.boxNumber)} onChange={(e) => updateEditValue(row.id, 'boxNumber', e.target.value)} /></Td>
                        <Td><NewRowInput type="text" value={editValues[row.id]?.location ?? row.location} onChange={(e) => updateEditValue(row.id, 'location', e.target.value)} /></Td>
                        <Td><NewRowInput type="text" value={editValues[row.id]?.code ?? row.code} onChange={(e) => updateEditValue(row.id, 'code', e.target.value)} /></Td>
                        <Td><NewRowInput type="text" value={editValues[row.id]?.name ?? row.name} onChange={(e) => updateEditValue(row.id, 'name', e.target.value)} /></Td>
                        <Td>{row.currentStock}</Td>
                      </NewRow>
                    ) : (
                      <DataRow
                        key={row.id}
                        active={selectedDetailId === row.id}
                        onClick={() => openDetail(row.id)}
                      >
                        <Td onClick={(e) => e.stopPropagation()}><Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} /></Td>
                        <Td>{row.boxNumber}</Td>
                        <Td>{row.location}</Td>
                        <Td>{row.code}</Td>
                        <Td>{row.name}</Td>
                        <Td>{row.currentStock}</Td>
                      </DataRow>
                    )
                  ))}
                </tbody>
              </Table>
        </TableWrap>

          {selectedDetailRow && (
            <RecordDetailPanel
              title={selectedDetailRow.name}
              subtitle={`${selectedDetailRow.code} · 현재 재고 ${selectedDetailRow.currentStock.toLocaleString()}개`}
              onClose={() => setSelectedDetailId(null)}
              deleteLabel="자재 삭제"
              onDelete={() => deleteDetailRow(selectedDetailRow.id)}
              sections={[
                {
                  title: '재고 정보',
                  fields: [
                    { label: 'BOX 번호', value: selectedDetailRow.boxNumber === '-' ? '' : selectedDetailRow.boxNumber, editable: true, onSave: (value) => saveDetailField(selectedDetailRow, 'boxNumber', value) },
                    { label: '자재 위치', value: selectedDetailRow.location, editable: true, onSave: (value) => saveDetailField(selectedDetailRow, 'location', value) },
                    { label: '자재 코드', value: selectedDetailRow.code, editable: true, onSave: (value) => saveDetailField(selectedDetailRow, 'code', value) },
                    { label: '자재명', value: selectedDetailRow.name, editable: true, onSave: (value) => saveDetailField(selectedDetailRow, 'name', value) },
                    { label: '현재 재고', value: selectedDetailRow.currentStock.toLocaleString() },
                  ],
                },
              ]}
            />
          )}
      </PageInner>
    </Layout>
  );
};

export default InventoryManagementPage;
