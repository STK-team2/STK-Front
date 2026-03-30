/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { Checkbox } from '../../shared/ui/Checkbox';
import * as s from './style';

type FilterType = 'date' | 'sort' | 'qty' | 'status' | null;
type StockStatus = null | 'current' | 'inout' | 'changed';

interface Row {
  id: string;
  changedAt: string;
  ioNumber: string;
  workScreen: string;
  location: string;
  name: string;
  code: string;
  changedQty: number;
  manager: string;
}

const mockData: Row[] = [
  { id: '1', changedAt: '2025/01/02', ioNumber: '001/002', workScreen: '001/002', location: 'P1', name: '콘센트', code: 'BGE2301031231293', changedQty: 2, manager: '김미냥' },
];

const INVENTORY_ACTIONS = ['재고 없는 품목', '다운로드'];

const InventoryManagementPage = () => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [qtyMin, setQtyMin] = useState('');
  const [qtyMax, setQtyMax] = useState('');
  const [stockStatus, setStockStatus] = useState<StockStatus>(null);
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
            <FilterButton
              label="재고 상태"
              isOpen={openFilter === 'status'}
              onToggle={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
            >
              <div css={s.sortOptionList}>
                <button css={[s.sortOption, stockStatus === 'current' && s.sortOptionActive]} type="button" onClick={() => setStockStatus('current')}>현재 재고</button>
                <button css={[s.sortOption, stockStatus === 'inout' && s.sortOptionActive]} type="button" onClick={() => setStockStatus('inout')}>재고 수불</button>
                <button css={[s.sortOption, stockStatus === 'changed' && s.sortOptionActive]} type="button" onClick={() => setStockStatus('changed')}>변경 재고</button>
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
              <col style={{ width: '120px' }} />
              <col style={{ width: '120px' }} />
              <col style={{ width: '90px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '180px' }} />
              <col style={{ width: '100px' }} />
              <col style={{ width: '100px' }} />
            </colgroup>
            <thead>
              <tr css={s.headerRow}>
                <th css={s.th}>
                  <Checkbox checked={allSelected} onChange={toggleSelectAll} />
                </th>
                <th css={s.th}>변경일시</th>
                <th css={s.th}>입/출고번호</th>
                <th css={s.th}>작업화면</th>
                <th css={s.th}>자재위치</th>
                <th css={s.th}>자재코드</th>
                <th css={s.th}>자재명</th>
                <th css={s.th}>변경수량</th>
                <th css={s.th}>변경자</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} css={s.dataRow}>
                  <td css={s.td}>
                    <Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} />
                  </td>
                  <td css={s.td}>{row.changedAt}</td>
                  <td css={s.td}>{row.ioNumber}</td>
                  <td css={s.td}>{row.workScreen}</td>
                  <td css={s.td}>{row.location}</td>
                  <td css={s.td}>{row.code}</td>
                  <td css={s.td}>{row.name}</td>
                  <td css={s.td}>{row.changedQty}</td>
                  <td css={s.td}>{row.manager}</td>
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
