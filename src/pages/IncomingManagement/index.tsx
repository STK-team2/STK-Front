/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { Checkbox } from '../../shared/ui/Checkbox';
import * as s from './style';

type FilterType = 'date' | 'qty' | 'sort' | null;
type SortOrder = null | 'asc' | 'desc';

interface Row {
  id: string;
  date: string;
  code: string;
  supplier: string;
  name: string;
  qty: number;
  note: string;
}

interface NewRow {
  id: string;
  date: string;
  code: string;
  supplier: string;
  name: string;
  qty: string;
  note: string;
}

const mockData: Row[] = [
  { id: '1', date: '1001', code: 'BGE2301031231293', supplier: 'teachmon.kro.kr', name: '서른마흔다섯해', qty: 342, note: '' },
  { id: '2', date: '1001', code: 'BGE2301031231293', supplier: 'teachmon.kro.kr', name: '서른마흔다섯해', qty: 3423, note: '' },
];

const INCOMING_ACTIONS = ['입고 등록', '입고 수정', '입고 삭제', '다운로드'];

let rowIdCounter = 0;
const createEmptyRow = (): NewRow => ({
  id: `new-${++rowIdCounter}`,
  date: '',
  code: '',
  supplier: '',
  name: '',
  qty: '',
  note: '',
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
  const [newRows, setNewRows] = useState<NewRow[]>([]);
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
    if (e.key === 'Enter') {
      e.preventDefault();
      saveEditRow(id);
    } else if (e.key === 'Escape') {
      revertEditRow(id);
    }
  };

  const updateNewRow = (id: string, field: keyof Omit<NewRow, 'id'>, value: string) => {
    setNewRows(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const submitRow = (id: string) => {
    setNewRows(prev => {
      const row = prev.find(r => r.id === id);
      if (row) {
        setRows(r => [...r, { ...row, qty: Number(row.qty) }]);
      }
      const remaining = prev.filter(r => r.id !== id);
      return remaining.length === 0 ? [createEmptyRow()] : remaining;
    });
  };

  const handleNewRowKeyDown = (id: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitRow(id);
    } else if (e.key === 'Escape') {
      setNewRows(prev => prev.filter(r => r.id !== id));
    }
  };

  const closeAll = () => {
    setOpenFilter(null);
    setActionOpen(false);
  };

  return (
    <Layout>
      {(openFilter || actionOpen) && (
        <div css={s.backdrop} onClick={closeAll} />
      )}

      <div css={s.pageInner}>
        <h1 css={s.pageTitle}>입고 관리</h1>

        <div css={s.toolbar}>
          <div css={s.filters}>
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
              <p css={s.qtyLabel}>수량</p>
              <div css={s.qtyInputRow}>
                <input css={s.qtyInput} type="number" value={qtyMin} onChange={e => setQtyMin(e.target.value)} />
                <span css={s.qtySep}>~</span>
                <input css={s.qtyInput} type="number" value={qtyMax} onChange={e => setQtyMax(e.target.value)} />
              </div>
            </FilterButton>
            <FilterButton
              label="수량 정렬"
              isOpen={openFilter === 'sort'}
              onToggle={() => setOpenFilter(openFilter === 'sort' ? null : 'sort')}
            >
              <div css={s.sortOptionList}>
                <button css={[s.sortOption, sortOrder === null && s.sortOptionActive]} type="button" onClick={() => setSortOrder(null)}>정렬 초기화</button>
                <button css={[s.sortOption, sortOrder === 'asc' && s.sortOptionActive]} type="button" onClick={() => setSortOrder('asc')}>오름차순</button>
                <button css={[s.sortOption, sortOrder === 'desc' && s.sortOptionActive]} type="button" onClick={() => setSortOrder('desc')}>내림차순</button>
              </div>
            </FilterButton>
          </div>

          <div css={s.toolbarRight}>
            <SearchInput value={search} onChange={setSearch} />
            {deleteMode ? (
              <>
                <button css={s.cancelBtn} type="button" onClick={cancelDeleteMode}>취소</button>
                <button css={s.deleteBtn} type="button" onClick={confirmDelete}>삭제</button>
              </>
            ) : editMode ? (
              <button css={s.cancelBtn} type="button" onClick={cancelEditMode}>취소</button>
            ) : (
              <ActionMenu
                label="입고 관리"
                isOpen={actionOpen}
                onToggle={() => setActionOpen(v => !v)}
                items={INCOMING_ACTIONS}
                onItemClick={handleActionItem}
              />
            )}
          </div>
        </div>

        <p css={s.totalLabel}>합계 (1,001)</p>

        <div css={s.tableWrap}>
          <table css={s.table}>
            <colgroup>
              <col style={{ width: '48px' }} />
              <col style={{ width: '160px' }} />
              <col style={{ width: '220px' }} />
              <col style={{ width: '220px' }} />
              <col />
              <col style={{ width: '120px' }} />
              <col style={{ width: '140px' }} />
            </colgroup>
            <thead>
              <tr css={s.headerRow}>
                <th css={s.th}>
                  <Checkbox checked={allSelected} onChange={toggleSelectAll} />
                </th>
                <th css={s.th}>입고 날짜</th>
                <th css={s.th}>자재 코드</th>
                <th css={s.th}>입고처</th>
                <th css={s.th}>자재명</th>
                <th css={s.th}>수량</th>
                <th css={s.th}>비고</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map(row => editMode ? (
                <tr key={row.id} css={s.newRow}>
                  <td css={s.td} />
                  <td css={s.td}>
                    <div css={s.newRowDateWrap}>
                      <input
                        css={s.newRowDateInput}
                        type="date"
                        value={editValues[row.id]?.date ?? row.date}
                        onChange={e => updateEditValue(row.id, 'date', e.target.value)}
                        onKeyDown={e => handleEditRowKeyDown(row.id, e)}
                      />
                    </div>
                  </td>
                  <td css={s.td}>
                    <input
                      css={s.newRowInput}
                      type="text"
                      value={editValues[row.id]?.code ?? row.code}
                      onChange={e => updateEditValue(row.id, 'code', e.target.value)}
                      onKeyDown={e => handleEditRowKeyDown(row.id, e)}
                    />
                  </td>
                  <td css={s.td}>
                    <input
                      css={s.newRowInput}
                      type="text"
                      value={editValues[row.id]?.supplier ?? row.supplier}
                      onChange={e => updateEditValue(row.id, 'supplier', e.target.value)}
                      onKeyDown={e => handleEditRowKeyDown(row.id, e)}
                    />
                  </td>
                  <td css={s.td}>
                    <input
                      css={s.newRowInput}
                      type="text"
                      value={editValues[row.id]?.name ?? row.name}
                      onChange={e => updateEditValue(row.id, 'name', e.target.value)}
                      onKeyDown={e => handleEditRowKeyDown(row.id, e)}
                    />
                  </td>
                  <td css={s.td}>
                    <input
                      css={s.newRowInput}
                      type="number"
                      value={editValues[row.id]?.qty ?? row.qty}
                      onChange={e => updateEditValue(row.id, 'qty', e.target.value)}
                      onKeyDown={e => handleEditRowKeyDown(row.id, e)}
                    />
                  </td>
                  <td css={s.td}>
                    <input
                      css={s.newRowInput}
                      type="text"
                      value={editValues[row.id]?.note ?? row.note}
                      onChange={e => updateEditValue(row.id, 'note', e.target.value)}
                      onKeyDown={e => handleEditRowKeyDown(row.id, e)}
                    />
                  </td>
                </tr>
              ) : (
                <tr key={row.id} css={s.dataRow}>
                  <td css={s.td}>
                    <Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} />
                  </td>
                  <td css={s.td}>{row.date}</td>
                  <td css={s.td}>{row.code}</td>
                  <td css={s.td}>{row.supplier}</td>
                  <td css={s.td}>{row.name}</td>
                  <td css={s.td}>{row.qty}</td>
                  <td css={s.td}>{row.note}</td>
                </tr>
              ))}
              {newRows.map(row => (
                <tr key={row.id} css={s.newRow}>
                  <td css={s.td} />
                  <td css={s.td}>
                    <div css={s.newRowDateWrap}>
                      <input
                        css={s.newRowDateInput}
                        type="date"
                        value={row.date}
                        onChange={e => updateNewRow(row.id, 'date', e.target.value)}
                        onKeyDown={e => handleNewRowKeyDown(row.id, e)}
                      />
                    </div>
                  </td>
                  <td css={s.td}>
                    <input
                      css={s.newRowInput}
                      type="text"
                      value={row.code}
                      onChange={e => updateNewRow(row.id, 'code', e.target.value)}
                      onKeyDown={e => handleNewRowKeyDown(row.id, e)}
                    />
                  </td>
                  <td css={s.td}>
                    <input
                      css={s.newRowInput}
                      type="text"
                      value={row.supplier}
                      onChange={e => updateNewRow(row.id, 'supplier', e.target.value)}
                      onKeyDown={e => handleNewRowKeyDown(row.id, e)}
                    />
                  </td>
                  <td css={s.td}>
                    <input
                      css={s.newRowInput}
                      type="text"
                      value={row.name}
                      onChange={e => updateNewRow(row.id, 'name', e.target.value)}
                      onKeyDown={e => handleNewRowKeyDown(row.id, e)}
                    />
                  </td>
                  <td css={s.td}>
                    <input
                      css={s.newRowInput}
                      type="number"
                      value={row.qty}
                      onChange={e => updateNewRow(row.id, 'qty', e.target.value)}
                      onKeyDown={e => handleNewRowKeyDown(row.id, e)}
                    />
                  </td>
                  <td css={s.td}>
                    <input
                      css={s.newRowInput}
                      type="text"
                      value={row.note}
                      onChange={e => updateNewRow(row.id, 'note', e.target.value)}
                      onKeyDown={e => handleNewRowKeyDown(row.id, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
};

export default IncomingManagementPage;
