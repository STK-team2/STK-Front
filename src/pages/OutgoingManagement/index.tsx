import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { Checkbox } from '../../shared/ui/Checkbox';
import { RecordDetailPanel } from '../../shared/ui/RecordDetailPanel';
import { itemApi } from '../../entities/item/api/itemApi';
import type { ItemResponse } from '../../entities/item/types';
import type { MovementResponse } from '../../entities/movement/types';
import { showApiErrorToast, showErrorToast } from '../../shared/lib/toast';
import { useSubmitOnOutsideClick } from '../../shared/lib/useSubmitOnOutsideClick';
import {
  useDeleteMovement,
  useDownloadMovements,
  useGetMovements,
  useRegisterOutbound,
  useUpdateMovement,
} from '../../features/movement/api/queries';
import {
  Backdrop, PageInner, PageTitle, Toolbar, Filters, ToolbarRight,
  QtyLabel, QtyInputRow, QtyInput, QtySep, TotalLabel,
  TableWrap, Table, HeaderRow, Th, DataRow, Td,
  NewRow, NewRowInput, NewRowDateWrap, NewRowDateInput,
  CancelBtn, DeleteBtn, SaveBtn,
} from './style';

type FilterType = 'date' | 'qty' | null;

interface Row {
  id: string;
  site: string;
  date: string;
  code: string;
  name: string;
  qty: number;
  location: string;
  manager: string;
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
  manager: string;
  note: string;
  reference: string;
}

const OUTGOING_ACTIONS = ['출고 등록', '출고 수정', '출고 삭제', '다운로드'];

let rowIdCounter = 0;
const createEmptyRow = (): NewRowData => ({
  id: `new-${++rowIdCounter}`,
  site: '',
  date: '',
  code: '',
  name: '',
  qty: '',
  location: '',
  manager: '',
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
  location: '-',
  manager: movement.userName ?? '-',
  note: movement.note ?? '',
  reference: movement.reference ?? '',
});

const isSameItem = (item: ItemResponse, row: NewRowData) =>
  item.itemCode === row.code.trim() || item.itemName === row.name.trim();

const OutgoingManagementPage = () => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [qtyMin, setQtyMin] = useState('');
  const [qtyMax, setQtyMax] = useState('');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [newRows, setNewRows] = useState<NewRowData[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, Row>>({});
  const [newRowElement, setNewRowElement] = useState<HTMLTableRowElement | null>(null);
  const [selectedDetailId, setSelectedDetailId] = useState<string | null>(null);

  const { data: movements = [] } = useGetMovements({
    type: 'OUTBOUND',
    query: search.trim() || undefined,
  });
  const registerOutboundMutation = useRegisterOutbound();
  const updateMovementMutation = useUpdateMovement();
  const deleteMovementMutation = useDeleteMovement();
  const downloadMovementsMutation = useDownloadMovements();

  const rows = movements.map(mapMovementToRow);
  const filteredRows = rows.filter((row) => {
    if (qtyMin && row.qty < Number(qtyMin)) return false;
    if (qtyMax && row.qty > Number(qtyMax)) return false;
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

  const handleActionItem = async (item: string) => {
    if (item === '출고 등록') {
      setNewRows([createEmptyRow()]);
      setDeleteMode(false);
      setEditMode(false);
      setSelectedDetailId(null);
      setActionOpen(false);
      return;
    }

    if (item === '출고 삭제') {
      setDeleteMode(true);
      setEditMode(false);
      setSelectedDetailId(null);
      setActionOpen(false);
      return;
    }

    if (item === '출고 수정') {
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
          type: 'OUTBOUND',
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
      showApiErrorToast(error, '출고 삭제에 실패했습니다.');
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
      showApiErrorToast(error, '출고 수정에 실패했습니다.');
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
          movementDate: row.date,
          quantity: row.qty,
          note: row.note,
          reference: row.reference,
        },
      });
    } catch (error) {
      showApiErrorToast(error, '출고 수정에 실패했습니다.');
    }
  };

  const saveDetailField = async (
    row: Row,
    field: 'site' | 'date' | 'qty' | 'note' | 'reference',
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
          movementDate: nextRow.date,
          quantity: nextRow.qty,
          note: nextRow.note,
          reference: nextRow.reference,
        },
      });
    } catch (error) {
      showApiErrorToast(error, '출고 수정에 실패했습니다.');
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
      showApiErrorToast(error, '출고 삭제에 실패했습니다.');
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
      if (!resolvedItem) {
        showErrorToast('등록된 자재만 출고할 수 있습니다. 자재 코드 또는 자재명을 확인해주세요.');
        return;
      }

      await registerOutboundMutation.mutateAsync({
        site: row.site,
        movementDate: row.date,
        itemId: resolvedItem.id,
        quantity: Number(row.qty),
        note: row.note,
        reference: row.reference,
      });

      setNewRows((prev) => prev.filter((value) => value.id !== id));
    } catch (error) {
      showApiErrorToast(error, '출고 등록에 실패했습니다.');
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
        <PageTitle>출고 관리</PageTitle>

        <Toolbar>
          <Filters>
            <FilterButton
              label="날짜"
              isOpen={openFilter === 'date'}
              onToggle={() => setOpenFilter(openFilter === 'date' ? null : 'date')}
            />
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
                label="출고 관리"
                isOpen={actionOpen}
                onToggle={() => setActionOpen((value) => !value)}
                items={OUTGOING_ACTIONS}
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
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '170px' }} />
                  <col />
                  <col style={{ width: '70px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '110px' }} />
                  <col style={{ width: '90px' }} />
                  <col style={{ width: '90px' }} />
                </colgroup>
                <thead>
                  <HeaderRow>
                    <Th onClick={(e) => e.stopPropagation()}><Checkbox checked={allSelected} onChange={toggleSelectAll} /></Th>
                    <Th>사업장</Th>
                    <Th>출고 날짜</Th>
                    <Th>자재 코드</Th>
                    <Th>자재명</Th>
                    <Th>수량</Th>
                    <Th>자재 위치</Th>
                    <Th>출고 담당자</Th>
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
                        <Td><NewRowInput type="text" value={row.code} disabled /></Td>
                        <Td><NewRowInput type="text" value={row.name} disabled /></Td>
                        <Td><NewRowInput type="number" value={editValues[row.id]?.qty ?? row.qty} onChange={(e) => updateEditValue(row.id, 'qty', e.target.value)} onKeyDown={(e) => handleEditRowKeyDown(row.id, e)} /></Td>
                        <Td><NewRowInput type="text" value={row.location} disabled /></Td>
                        <Td><NewRowInput type="text" value={row.manager} disabled /></Td>
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
                        <Td>{row.manager}</Td>
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
                      <Td><NewRowInput type="text" value={row.manager} onChange={(e) => updateNewRow(row.id, 'manager', e.target.value)} onKeyDown={(e) => handleNewRowKeyDown(row.id, e)} /></Td>
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
              subtitle={`${selectedDetailRow.code} · 출고 ${selectedDetailRow.qty.toLocaleString()}개`}
              onClose={() => setSelectedDetailId(null)}
              deleteLabel="출고 내역 삭제"
              onDelete={() => deleteDetailRow(selectedDetailRow.id)}
              sections={[
                {
                  title: '출고 정보',
                  fields: [
                    { label: '사업장', value: selectedDetailRow.site, editable: true, onSave: (value) => saveDetailField(selectedDetailRow, 'site', value) },
                    { label: '출고 날짜', value: selectedDetailRow.date, editable: true, inputType: 'date', onSave: (value) => saveDetailField(selectedDetailRow, 'date', value) },
                    { label: '수량', value: selectedDetailRow.qty, editable: true, inputType: 'number', onSave: (value) => saveDetailField(selectedDetailRow, 'qty', value) },
                    { label: '자재 위치', value: selectedDetailRow.location },
                    { label: '담당자', value: selectedDetailRow.manager },
                  ],
                },
                {
                  title: '메모',
                  fields: [
                    { label: '비고', value: selectedDetailRow.note || '', muted: !selectedDetailRow.note, editable: true, onSave: (value) => saveDetailField(selectedDetailRow, 'note', value) },
                    { label: '참고', value: selectedDetailRow.reference || '', muted: !selectedDetailRow.reference, editable: true, onSave: (value) => saveDetailField(selectedDetailRow, 'reference', value) },
                  ],
                },
              ]}
            />
          )}
      </PageInner>
    </Layout>
  );
};

export default OutgoingManagementPage;
