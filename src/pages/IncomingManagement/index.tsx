import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { Checkbox } from '../../shared/ui/Checkbox';
import {
  Backdrop, PageInner, PageTitle, Toolbar, Filters, ToolbarRight,
  QtyLabel, QtyInputRow, QtyInput, QtySep, SortOptionList, SortOption,
  TotalLabel, TableWrap, Table, HeaderRow, Th, DataRow, Td,
  NewRow, NewRowInput, NewRowDateWrap, NewRowDateInput,
  CancelBtn, DeleteBtn,
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

const mockData: Row[] = [
  { id: '1', site: 'ABCD/WW', date: '1001', code: 'BGE2301031231293', name: 'teachmon.kro.kr', qty: 3, location: 'ㄴㅇㄹㅁㅇ', note: 'ㄴㅇ', reference: 'ㄴㅇㄹ' },
];

const INCOMING_ACTIONS = ['입고 등록', '입고 수정', '입고 삭제', '다운로드'];

let rowIdCounter = 0;
const createEmptyRow = (): NewRowData => ({
  id: `new-${++rowIdCounter}`,
  site: '', date: '', code: '', name: '', qty: '', location: '', note: '', reference: '',
});

const IncomingManagementPage = () => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [qtyMin, setQtyMin] = useState('');
  const [qtyMax, setQtyMax] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);
  const [rows, setRows] = useState<Row[]>(mockData);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [newRows, setNewRows] = useState<NewRowData[]>([]);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, Row>>({});

  const sortedRows = sortOrder === null ? rows : [...rows].sort((a, b) =>
    sortOrder === 'asc' ? a.qty - b.qty : b.qty - a.qty
  );

  const allSelected = rows.length > 0 && selectedRows.size === rows.length;

  const toggleSelectAll = () => {
    if (allSelected) setSelectedRows(new Set());
    else setSelectedRows(new Set(rows.map(r => r.id)));
  };

  const toggleRow = (id: string) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleActionItem = (item: string) => {
    if (item === '입고 등록') {
      setNewRows([createEmptyRow()]);
      setActionOpen(false);
    } else if (item === '입고 삭제') {
      setDeleteMode(true);
      setActionOpen(false);
    } else if (item === '입고 수정') {
      const map: Record<string, Row> = {};
      rows.forEach(r => { map[r.id] = { ...r }; });
      setEditValues(map);
      setEditMode(true);
      setActionOpen(false);
    }
  };

  const cancelDeleteMode = () => {
    setDeleteMode(false);
    setSelectedRows(new Set());
  };

  const confirmDelete = () => {
    setRows(prev => prev.filter(r => !selectedRows.has(r.id)));
    setSelectedRows(new Set());
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditValues({});
    setNewRows([]);
  };

  const updateEditValue = (id: string, field: keyof Omit<Row, 'id'>, value: string) => {
    setEditValues(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: field === 'qty' ? Number(value) : value },
    }));
  };

  const saveEditRow = (id: string) => {
    setRows(prev => prev.map(r => r.id === id ? editValues[id] : r));
  };

  const revertEditRow = (id: string) => {
    const original = rows.find(r => r.id === id);
    if (original) setEditValues(prev => ({ ...prev, [id]: { ...original } }));
  };

  const handleEditRowKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); saveEditRow(id); }
    else if (e.key === 'Escape') { revertEditRow(id); }
  };

  const updateNewRow = (id: string, field: keyof Omit<NewRowData, 'id'>, value: string) => {
    setNewRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const submitRow = (id: string) => {
    setNewRows(prev => {
      const row = prev.find(r => r.id === id);
      if (row) setRows(r => [...r, { ...row, qty: Number(row.qty) }]);
      const remaining = prev.filter(r => r.id !== id);
      return remaining.length === 0 ? [createEmptyRow()] : remaining;
    });
  };

  const handleNewRowKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); submitRow(id); }
    else if (e.key === 'Escape') { setNewRows(prev => prev.filter(r => r.id !== id)); }
  };

  const closeAll = () => { setOpenFilter(null); setActionOpen(false); };

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
            />
            <FilterButton
              label="수량"
              isOpen={openFilter === 'qty'}
              onToggle={() => setOpenFilter(openFilter === 'qty' ? null : 'qty')}
            >
              <QtyLabel>수량</QtyLabel>
              <QtyInputRow>
                <QtyInput type="number" value={qtyMin} onChange={e => setQtyMin(e.target.value)} />
                <QtySep>~</QtySep>
                <QtyInput type="number" value={qtyMax} onChange={e => setQtyMax(e.target.value)} />
              </QtyInputRow>
            </FilterButton>
            <FilterButton
              label="수량 정렬"
              isOpen={openFilter === 'sort'}
              onToggle={() => setOpenFilter(openFilter === 'sort' ? null : 'sort')}
            >
              <SortOptionList>
                <SortOption active={sortOrder === null} type="button" onClick={() => setSortOrder(null)}>정렬 초기화</SortOption>
                <SortOption active={sortOrder === 'asc'} type="button" onClick={() => setSortOrder('asc')}>오름차순</SortOption>
                <SortOption active={sortOrder === 'desc'} type="button" onClick={() => setSortOrder('desc')}>내림차순</SortOption>
              </SortOptionList>
            </FilterButton>
          </Filters>

          <ToolbarRight>
            <SearchInput value={search} onChange={setSearch} />
            {deleteMode ? (
              <>
                <CancelBtn type="button" onClick={cancelDeleteMode}>취소</CancelBtn>
                <DeleteBtn type="button" onClick={confirmDelete}>삭제</DeleteBtn>
              </>
            ) : editMode ? (
              <CancelBtn type="button" onClick={cancelEditMode}>취소</CancelBtn>
            ) : (
              <ActionMenu
                label="입고 관리"
                isOpen={actionOpen}
                onToggle={() => setActionOpen(v => !v)}
                items={INCOMING_ACTIONS}
                onItemClick={handleActionItem}
              />
            )}
          </ToolbarRight>
        </Toolbar>

        <TotalLabel>합계 (1,001)</TotalLabel>

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
                <Th><Checkbox checked={allSelected} onChange={toggleSelectAll} /></Th>
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
              {sortedRows.map(row => editMode ? (
                <NewRow key={row.id}>
                  <Td />
                  <Td><NewRowInput type="text" value={editValues[row.id]?.site ?? row.site} onChange={e => updateEditValue(row.id, 'site', e.target.value)} onKeyDown={e => handleEditRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowDateWrap><NewRowDateInput type="date" value={editValues[row.id]?.date ?? row.date} onChange={e => updateEditValue(row.id, 'date', e.target.value)} onKeyDown={e => handleEditRowKeyDown(row.id, e)} /></NewRowDateWrap></Td>
                  <Td><NewRowInput type="text" value={editValues[row.id]?.code ?? row.code} onChange={e => updateEditValue(row.id, 'code', e.target.value)} onKeyDown={e => handleEditRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowInput type="text" value={editValues[row.id]?.name ?? row.name} onChange={e => updateEditValue(row.id, 'name', e.target.value)} onKeyDown={e => handleEditRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowInput type="number" value={editValues[row.id]?.qty ?? row.qty} onChange={e => updateEditValue(row.id, 'qty', e.target.value)} onKeyDown={e => handleEditRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowInput type="text" value={editValues[row.id]?.location ?? row.location} onChange={e => updateEditValue(row.id, 'location', e.target.value)} onKeyDown={e => handleEditRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowInput type="text" value={editValues[row.id]?.note ?? row.note} onChange={e => updateEditValue(row.id, 'note', e.target.value)} onKeyDown={e => handleEditRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowInput type="text" value={editValues[row.id]?.reference ?? row.reference} onChange={e => updateEditValue(row.id, 'reference', e.target.value)} onKeyDown={e => handleEditRowKeyDown(row.id, e)} /></Td>
                </NewRow>
              ) : (
                <DataRow key={row.id}>
                  <Td><Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} /></Td>
                  <Td>{row.site}</Td>
                  <Td>{row.date}</Td>
                  <Td>{row.code}</Td>
                  <Td>{row.name}</Td>
                  <Td>{row.qty}</Td>
                  <Td>{row.location}</Td>
                  <Td>{row.note}</Td>
                  <Td>{row.reference}</Td>
                </DataRow>
              ))}
              {newRows.map(row => (
                <NewRow key={row.id}>
                  <Td />
                  <Td><NewRowInput type="text" value={row.site} onChange={e => updateNewRow(row.id, 'site', e.target.value)} onKeyDown={e => handleNewRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowDateWrap><NewRowDateInput type="date" value={row.date} onChange={e => updateNewRow(row.id, 'date', e.target.value)} onKeyDown={e => handleNewRowKeyDown(row.id, e)} /></NewRowDateWrap></Td>
                  <Td><NewRowInput type="text" value={row.code} onChange={e => updateNewRow(row.id, 'code', e.target.value)} onKeyDown={e => handleNewRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowInput type="text" value={row.name} onChange={e => updateNewRow(row.id, 'name', e.target.value)} onKeyDown={e => handleNewRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowInput type="number" value={row.qty} onChange={e => updateNewRow(row.id, 'qty', e.target.value)} onKeyDown={e => handleNewRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowInput type="text" value={row.location} onChange={e => updateNewRow(row.id, 'location', e.target.value)} onKeyDown={e => handleNewRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowInput type="text" value={row.note} onChange={e => updateNewRow(row.id, 'note', e.target.value)} onKeyDown={e => handleNewRowKeyDown(row.id, e)} /></Td>
                  <Td><NewRowInput type="text" value={row.reference} onChange={e => updateNewRow(row.id, 'reference', e.target.value)} onKeyDown={e => handleNewRowKeyDown(row.id, e)} /></Td>
                </NewRow>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </PageInner>
    </Layout>
  );
};

export default IncomingManagementPage;
