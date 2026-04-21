import { useState } from 'react';
import axios from 'axios';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { Checkbox } from '../../shared/ui/Checkbox';
import { RecordDetailPanel } from '../../shared/ui/RecordDetailPanel';
import { itemApi } from '../../entities/item/api/itemApi';
import type { ItemResponse } from '../../entities/item/types';
import type { MovementResponse } from '../../entities/movement/types';
import { getApiErrorMessage, showApiErrorToast, showErrorToast } from '../../shared/lib/toast';
import { useSubmitOnOutsideClick } from '../../shared/lib/useSubmitOnOutsideClick';
import {
  useDeleteMovement,
  useDownloadMovements,
  useGetMovements,
  useRegisterInbound,
  useRegisterNewItemInbound,
  useUpdateMovement,
} from '../../features/movement/api/queries';
import {
  Backdrop, PageInner, PageTitle, Toolbar, Filters, ToolbarRight,
  QtyLabel, QtyInputRow, QtyInput, QtySep, SortOptionList, SortOption,
  DateFilterWrap, DateFilterLabel, DateRangeRow, DateRangeInput, DateRangeSep,
  TotalLabel, TableWrap, Table, HeaderRow, Th, DataRow, Td,
  NewRow, NewRowInput, NewRowDateWrap, NewRowDateInput,
  CancelBtn, DeleteBtn, SaveBtn,
} from './style';

type FilterType = 'date' | 'qty' | 'sort' | null;
type SortOrder = null | 'asc' | 'desc';

interface Row {
  id: string;
  site: string;
  date: string;
  code: string;
  name: string;
  qty: number;
  location: string;
  note: string;
  reference: string;
}

interface NewRowData {
  id: string;
  site: string;
  date: string;
  code: string;
  name: string;
  qty: string;
  location: string;
  note: string;
  reference: string;
}

const INCOMING_ACTIONS = ['입고 등록', '입고 수정', '입고 삭제', '다운로드'];

let rowIdCounter = 0;
const createEmptyRow = (): NewRowData => ({
  id: `new-${++rowIdCounter}`,
  site: '',
  date: '',
  code: '',
  name: '',
  qty: '',
  location: '',
  note: '',
  reference: '',
});

const mapMovementToRow = (movement: MovementResponse): Row => ({
  id: movement.id,
  site: movement.site,
  date: movement.movementDate,
  code: movement.itemCode,
  name: movement.itemName,
  qty: movement.quantity,
  location: movement.location ?? '',
  note: movement.note ?? '',
  reference: movement.reference ?? '',
});

const isSameItem = (item: ItemResponse, row: NewRowData) =>
  item.itemCode === row.code.trim() || item.itemName === row.name.trim();

const IncomingManagementPage = () => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [qtyMin, setQtyMin] = useState('');
  const [qtyMax, setQtyMax] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [newRows, setNewRows] = useState<NewRowData[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, Row>>({});
  const [newRowElement, setNewRowElement] = useState<HTMLTableRowElement | null>(null);
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);

  const { data: movements = [] } = useGetMovements({
    type: 'INBOUND',
    query: search.trim() || undefined,
  });
  const registerInboundMutation = useRegisterInbound();
  const registerNewItemInboundMutation = useRegisterNewItemInbound();
  const updateMovementMutation = useUpdateMovement();
  const deleteMovementMutation = useDeleteMovement();
  const downloadMovementsMutation = useDownloadMovements();

  const rows = movements.map(mapMovementToRow);
  const filteredRows = rows
    .filter((row) => {
      if (dateFrom && row.date < dateFrom) return false;
      if (dateTo && row.date > dateTo) return false;
      if (qtyMin && row.qty < Number(qtyMin)) return false;
      if (qtyMax && row.qty > Number(qtyMax)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.qty - b.qty;
      if (sortOrder === 'desc') return b.qty - a.qty;
      return 0;
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

  const handleActionItem = async (item: string) => {
    if (item === '입고 등록') {
      setNewRows([createEmptyRow()]);
      setDeleteMode(false);
      setEditMode(false);
      setSelectedDetailId(null);
      setActionOpen(false);
      return;
    }

    if (item === '입고 삭제') {
      setDeleteMode(true);
      setEditMode(false);
      setSelectedDetailId(null);
      setActionOpen(false);
      return;
    }

    if (item === '입고 수정') {
      const nextValues: Record<string, Row> = {};
      filteredRows.forEach((row) => {
        nextValues[row.id] = { ...row };
      });
      setEditValues(nextValues);
      setEditMode(true);
      setDeleteMode(false);
      setSelectedDetailId(null);
      setActionOpen(false);
      return;
    }

    if (item === '다운로드') {
      try {
        await downloadMovementsMutation.mutateAsync({
          type: 'INBOUND',
          query: search.trim() || undefined,
        });
      } catch (error) {
        window.alert(getApiErrorMessage(error, '다운로드에 실패했습니다.'));
      }
      setActionOpen(false);
    }
  };

  const cancelDeleteMode = () => {
    setDeleteMode(false);
    setSelectedRows(new Set());
  };

  const confirmDelete = async () => {
    if (selectedRows.size === 0) {
      return;
    }

    try {
      await Promise.all(Array.from(selectedRows).map((id) => deleteMovementMutation.mutateAsync(id)));
      setSelectedRows(new Set());
      setDeleteMode(false);
    } catch (error) {
      showApiErrorToast(error, '입고 삭제에 실패했습니다.');
    }
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditValues({});
    setNewRows([]);
  };

  const confirmAllEdits = async () => {
    try {
      await Promise.all(
        Object.keys(editValues).map((id) => {
          const row = editValues[id];
          return updateMovementMutation.mutateAsync({
            id,
            body: {
              site: row.site,
              itemCode: row.code,
              location: row.location || undefined,
              movementDate: row.date,
              quantity: row.qty,
              note: row.note,
              reference: row.reference,
            },
          });
        }),
      );
      setEditMode(false);
      setEditValues({});
    } catch (error) {
      showApiErrorToast(error, '입고 수정에 실패했습니다.');
    }
  };

  const updateEditValue = (id: string, field: keyof Omit<Row, 'id'>, value: string) => {
    setEditValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: field === 'qty' ? Number(value) : value },
    }));
  };

  const saveEditRow = async (id: string) => {
    const row = editValues[id];
    if (!row) return;

    try {
      await updateMovementMutation.mutateAsync({
        id,
        body: {
          site: row.site,
          itemCode: row.code,
          movementDate: row.date,
          quantity: row.qty,
          note: row.note,
          reference: row.reference,
        },
      });
    } catch (error) {
      showApiErrorToast(error, '입고 수정에 실패했습니다.');
    }
  };

  const saveDetailField = async (
    row: Row,
    field: 'site' | 'date' | 'qty' | 'location' | 'note' | 'reference',
    value: string,
  ) => {
    const nextRow = {
      ...row,
      [field]: field === 'qty' ? Number(value) : value,
    };

    try {
      await updateMovementMutation.mutateAsync({
        id: row.id,
        body: {
          site: nextRow.site,
          itemCode: nextRow.code,
          location: nextRow.location || undefined,
          movementDate: nextRow.date,
          quantity: nextRow.qty,
          note: nextRow.note,
          reference: nextRow.reference,
        },
      });
    } catch (error) {
      showApiErrorToast(error, '입고 수정에 실패했습니다.');
    }
  };

  const deleteDetailRow = async (id: string) => {
    try {
      await deleteMovementMutation.mutateAsync(id);
      setSelectedDetailId(null);
      setSelectedRows((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch (error) {
      showApiErrorToast(error, '입고 삭제에 실패했습니다.');
    }
  };

  const revertEditRow = (id: string) => {
    const original = filteredRows.find((row) => row.id === id);
    if (!original) return;

    setEditValues((prev) => ({ ...prev, [id]: { ...original } }));
  };

  const handleEditRowKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void saveEditRow(id);
    } else if (e.key === 'Escape') {
      revertEditRow(id);
    }
  };

  const updateNewRow = (id: string, field: keyof Omit<NewRowData, 'id'>, value: string) => {
    setNewRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const resolveItem = async (row: NewRowData) => {
    const items = await itemApi.search(row.code.trim() || row.name.trim());
    return items.data.find((item) => isSameItem(item, row)) ?? null;
  };

  const submitRow = async (id: string) => {
    const row = newRows.find((value) => value.id === id);
    if (!row) return;

    if (!row.site || !row.date || !row.code || !row.name || !row.qty) {
      showErrorToast('사업장, 날짜, 자재 코드, 자재명, 수량은 필수입니다.');
      return;
    }

    try {
      const resolvedItem = await resolveItem(row);

      if (resolvedItem) {
        await registerInboundMutation.mutateAsync({
          site: row.site,
          movementDate: row.date,
          itemId: resolvedItem.id,
          quantity: Number(row.qty),
          location: row.location || undefined,
          note: row.note,
          reference: row.reference,
        });
      } else {
        if (!row.location) {
          showErrorToast('신규 자재 입고는 자재 위치가 필요합니다.');
          return;
        }

        await registerNewItemInboundMutation.mutateAsync({
          itemCode: row.code,
          itemName: row.name,
          location: row.location,
          site: row.site,
          movementDate: row.date,
          quantity: Number(row.qty),
          note: row.note,
          reference: row.reference,
        });
      }

      setNewRows((prev) => prev.filter((value) => value.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorToast(getApiErrorMessage(error, '입고 등록에 실패했습니다.'));
        return;
      }
      showApiErrorToast(error, '입고 등록에 실패했습니다.');
    }
  };

  const handleNewRowKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      void submitRow(id);
    } else if (e.key === 'Escape') {
      setNewRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const submitPendingNewRow = () => {
    const pendingRowId = newRows[0]?.id;
    if (!pendingRowId) {
      return;
    }

    void submitRow(pendingRowId);
  };

  useSubmitOnOutsideClick({
    container: newRowElement,
    enabled: newRows.length > 0,
    onOutsideClick: submitPendingNewRow,
  });

  const closeAll = () => {
    setOpenFilter(null);
    setActionOpen(false);
  };

  return (
    <Layout>
      {(openFilter || actionOpen) && <Backdrop onClick={closeAll} />}

      <PageInner>
        <PageTitle>입고 관리</PageTitle>

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
              label="수량"
              isOpen={openFilter === 'qty'}
              onToggle={() => setOpenFilter(openFilter === 'qty' ? null : 'qty')}
            >
              <QtyLabel>수량</QtyLabel>
              <QtyInputRow>
                <QtyInput type="number" value={qtyMin} onChange={(e) => setQtyMin(e.target.value)} />
                <QtySep>~</QtySep>
                <QtyInput type="number" value={qtyMax} onChange={(e) => setQtyMax(e.target.value)} />
              </QtyInputRow>
            </FilterButton>
            <FilterButton
              label="수량 정렬"
              isOpen={openFilter === 'sort'}
              onToggle={() => setOpenFilter(openFilter === 'sort' ? null : 'sort')}
            >
              <SortOptionList>
                <SortOption active={sortOrder === null} type="button" onClick={() => { setSortOrder(null); setOpenFilter(null); }}>정렬 초기화</SortOption>
                <SortOption active={sortOrder === 'asc'} type="button" onClick={() => { setSortOrder('asc'); setOpenFilter(null); }}>오름차순</SortOption>
                <SortOption active={sortOrder === 'desc'} type="button" onClick={() => { setSortOrder('desc'); setOpenFilter(null); }}>내림차순</SortOption>
              </SortOptionList>
            </FilterButton>
          </Filters>

          <ToolbarRight>
            <SearchInput value={search} onChange={setSearch} />
            {deleteMode ? (
              <>
                <CancelBtn type="button" onClick={cancelDeleteMode}>취소</CancelBtn>
                <DeleteBtn type="button" onClick={() => void confirmDelete()}>삭제</DeleteBtn>
              </>
            ) : editMode ? (
              <>
                <CancelBtn type="button" onClick={cancelEditMode}>취소</CancelBtn>
                <SaveBtn type="button" onClick={() => void confirmAllEdits()}>수정</SaveBtn>
              </>
            ) : (
              <ActionMenu
                label="입고 관리"
                isOpen={actionOpen}
                onToggle={() => setActionOpen((value) => !value)}
                items={INCOMING_ACTIONS}
                onItemClick={(item) => void handleActionItem(item)}
              />
            )}
          </ToolbarRight>
        </Toolbar>

        <TotalLabel>합계 ({filteredRows.reduce((sum, row) => sum + row.qty, 0).toLocaleString()})</TotalLabel>

        <TableWrap>
              <Table>
                <colgroup>
                  <col style={{ width: '48px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '180px' }} />
                  <col />
                  <col style={{ width: '80px' }} />
                  <col style={{ width: '130px' }} />
                  <col style={{ width: '100px' }} />
                  <col style={{ width: '100px' }} />
                </colgroup>
                <thead>
                  <HeaderRow>
                    <Th onClick={(e) => e.stopPropagation()}><Checkbox checked={allSelected} onChange={toggleSelectAll} /></Th>
                    <Th>사업장</Th>
                    <Th>입고 날짜</Th>
                    <Th>자재 코드</Th>
                    <Th>자재명</Th>
                    <Th>수량</Th>
                    <Th>자재 위치</Th>
                    <Th>비고</Th>
                    <Th>참고</Th>
                  </HeaderRow>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    editMode ? (
                      <NewRow key={row.id}>
                        <Td />
                        <Td><NewRowInput type="text" value={editValues[row.id]?.site ?? row.site} onChange={(e) => updateEditValue(row.id, 'site', e.target.value)} onKeyDown={(e) => handleEditRowKeyDown(row.id, e)} /></Td>
                        <Td><NewRowDateWrap><NewRowDateInput type="date" value={editValues[row.id]?.date ?? row.date} onChange={(e) => updateEditValue(row.id, 'date', e.target.value)} onKeyDown={(e) => handleEditRowKeyDown(row.id, e)} /></NewRowDateWrap></Td>
                        <Td><NewRowInput type="text" value={editValues[row.id]?.code ?? row.code} onChange={(e) => updateEditValue(row.id, 'code', e.target.value)} onKeyDown={(e) => handleEditRowKeyDown(row.id, e)} /></Td>
                        <Td><NewRowInput type="text" value={row.name} disabled /></Td>
                        <Td><NewRowInput type="number" value={editValues[row.id]?.qty ?? row.qty} onChange={(e) => updateEditValue(row.id, 'qty', e.target.value)} onKeyDown={(e) => handleEditRowKeyDown(row.id, e)} /></Td>
                        <Td><NewRowInput type="text" value={editValues[row.id]?.location ?? row.location} onChange={(e) => updateEditValue(row.id, 'location', e.target.value)} onKeyDown={(e) => handleEditRowKeyDown(row.id, e)} /></Td>
                        <Td><NewRowInput type="text" value={editValues[row.id]?.note ?? row.note} onChange={(e) => updateEditValue(row.id, 'note', e.target.value)} onKeyDown={(e) => handleEditRowKeyDown(row.id, e)} /></Td>
                        <Td><NewRowInput type="text" value={editValues[row.id]?.reference ?? row.reference} onChange={(e) => updateEditValue(row.id, 'reference', e.target.value)} onKeyDown={(e) => handleEditRowKeyDown(row.id, e)} /></Td>
                      </NewRow>
                    ) : (
                      <DataRow
                        key={row.id}
                        active={selectedDetailId === row.id}
                        onClick={() => openDetail(row.id)}
                      >
                        <Td onClick={(e) => e.stopPropagation()}><Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} /></Td>
                        <Td>{row.site}</Td>
                        <Td>{row.date}</Td>
                        <Td>{row.code}</Td>
                        <Td>{row.name}</Td>
                        <Td>{row.qty}</Td>
                        <Td>{row.location}</Td>
                        <Td>{row.note || '-'}</Td>
                        <Td>{row.reference || '-'}</Td>
                      </DataRow>
                    )
                  ))}
                  {newRows.map((row) => (
                    <NewRow
                      key={row.id}
                      ref={row === newRows[0] ? setNewRowElement : undefined}
                    >
                      <Td />
                      <Td><NewRowInput type="text" value={row.site} onChange={(e) => updateNewRow(row.id, 'site', e.target.value)} onKeyDown={(e) => handleNewRowKeyDown(row.id, e)} /></Td>
                      <Td><NewRowDateWrap><NewRowDateInput type="date" value={row.date} onChange={(e) => updateNewRow(row.id, 'date', e.target.value)} onKeyDown={(e) => handleNewRowKeyDown(row.id, e)} /></NewRowDateWrap></Td>
                      <Td><NewRowInput type="text" value={row.code} onChange={(e) => updateNewRow(row.id, 'code', e.target.value)} onKeyDown={(e) => handleNewRowKeyDown(row.id, e)} /></Td>
                      <Td><NewRowInput type="text" value={row.name} onChange={(e) => updateNewRow(row.id, 'name', e.target.value)} onKeyDown={(e) => handleNewRowKeyDown(row.id, e)} /></Td>
                      <Td><NewRowInput type="number" value={row.qty} onChange={(e) => updateNewRow(row.id, 'qty', e.target.value)} onKeyDown={(e) => handleNewRowKeyDown(row.id, e)} /></Td>
                      <Td><NewRowInput type="text" value={row.location} onChange={(e) => updateNewRow(row.id, 'location', e.target.value)} onKeyDown={(e) => handleNewRowKeyDown(row.id, e)} /></Td>
                      <Td><NewRowInput type="text" value={row.note} onChange={(e) => updateNewRow(row.id, 'note', e.target.value)} onKeyDown={(e) => handleNewRowKeyDown(row.id, e)} /></Td>
                      <Td><NewRowInput type="text" value={row.reference} onChange={(e) => updateNewRow(row.id, 'reference', e.target.value)} onKeyDown={(e) => handleNewRowKeyDown(row.id, e)} /></Td>
                    </NewRow>
                  ))}
                </tbody>
              </Table>
        </TableWrap>

          {selectedDetailRow && (
            <RecordDetailPanel
              title={selectedDetailRow.name}
              subtitle={`${selectedDetailRow.code} · 입고 ${selectedDetailRow.qty.toLocaleString()}개`}
              onClose={() => setSelectedDetailId(null)}
              deleteLabel="입고 내역 삭제"
              onDelete={() => deleteDetailRow(selectedDetailRow.id)}
              sections={[
                {
                  title: '입고 정보',
                  fields: [
                    { label: '사업장', value: selectedDetailRow.site, editable: true, onSave: (value) => saveDetailField(selectedDetailRow, 'site', value) },
                    { label: '입고 날짜', value: selectedDetailRow.date, editable: true, inputType: 'date', onSave: (value) => saveDetailField(selectedDetailRow, 'date', value) },
                    { label: '수량', value: selectedDetailRow.qty, editable: true, inputType: 'number', onSave: (value) => saveDetailField(selectedDetailRow, 'qty', value) },
                    { label: '자재 위치', value: selectedDetailRow.location, editable: true, onSave: (value) => saveDetailField(selectedDetailRow, 'location', value) },
                    { label: '참고', value: selectedDetailRow.reference || '', muted: !selectedDetailRow.reference, editable: true, onSave: (value) => saveDetailField(selectedDetailRow, 'reference', value) },
                  ],
                },
              ]}
              memo={selectedDetailRow.note ?? ''}
              onMemoSave={(value) => saveDetailField(selectedDetailRow, 'note', value)}
            />
          )}
      </PageInner>
    </Layout>
  );
};

export default IncomingManagementPage;
