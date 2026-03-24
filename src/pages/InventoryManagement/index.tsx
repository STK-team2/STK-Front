/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { Checkbox } from '../../shared/ui/Checkbox';
import * as s from './style';

type FilterType = 'date' | 'sort' | 'qty' | null;

interface Row {
  id: string;
  date: string;
  code: string;
  reference: string;
  name: string;
  qty: number;
  dateQty: number;
  incomingQty: number;
  totalQty: number;
  note: string;
}

const mockData: Row[] = [
  { id: '1', date: '1', code: 'BGE2301031231293', reference: '참고글자', name: '자재명', qty: 1, dateQty: 3, incomingQty: 12, totalQty: 15, note: '비고' },
];

const INVENTORY_ACTIONS = ['재고 없는 품목', '다운로드'];

const InventoryManagementPage = () => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [qtyMin, setQtyMin] = useState('');
  const [qtyMax, setQtyMax] = useState('');
  const [rows] = useState<Row[]>(mockData);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

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
        <h1 css={s.pageTitle}>재고 조회</h1>

        <div css={s.toolbar}>
          <div css={s.filters}>
            <FilterButton
              label="날짜"
              isOpen={openFilter === 'date'}
              onToggle={() => setOpenFilter(openFilter === 'date' ? null : 'date')}
            />
            <FilterButton
              label="정렬"
              isOpen={openFilter === 'sort'}
              onToggle={() => setOpenFilter(openFilter === 'sort' ? null : 'sort')}
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
          </div>

          <div css={s.toolbarRight}>
            <SearchInput value={search} onChange={setSearch} />
            <ActionMenu
              label="재고 관리"
              isOpen={actionOpen}
              onToggle={() => setActionOpen(v => !v)}
              items={INVENTORY_ACTIONS}
            />
          </div>
        </div>

        <div css={s.tableWrap}>
          <table css={s.table}>
            <colgroup>
              <col style={{ width: '48px' }} />
              <col style={{ width: '130px' }} />
              <col style={{ width: '180px' }} />
              <col style={{ width: '120px' }} />
              <col />
              <col style={{ width: '80px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '100px' }} />
            </colgroup>
            <thead>
              <tr css={s.headerRow}>
                <th css={s.th}>
                  <Checkbox checked={allSelected} onChange={toggleSelectAll} />
                </th>
                <th css={s.th}>입고 날짜</th>
                <th css={s.th}>자재 코드</th>
                <th css={s.th}>참고</th>
                <th css={s.th}>자재명</th>
                <th css={s.th}>수량</th>
                <th css={s.th}>12월 12일</th>
                <th css={s.th}>입고 수량</th>
                <th css={s.th}>총 수량</th>
                <th css={s.th}>비고</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} css={s.dataRow}>
                  <td css={s.td}>
                    <Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} />
                  </td>
                  <td css={s.td}>{row.date}</td>
                  <td css={s.td}>{row.code}</td>
                  <td css={s.td}>{row.reference}</td>
                  <td css={s.td}>{row.name}</td>
                  <td css={s.td}>{row.qty}</td>
                  <td css={s.td}>{row.dateQty}</td>
                  <td css={s.td}>{row.incomingQty}</td>
                  <td css={s.td}>{row.totalQty}</td>
                  <td css={s.td}>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </Layout>
  );
};

export default InventoryManagementPage;
