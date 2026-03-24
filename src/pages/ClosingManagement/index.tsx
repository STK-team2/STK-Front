/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { Checkbox } from '../../shared/ui/Checkbox';
import * as s from './style';

type FilterType = 'period' | 'status' | null;
type ClosingStatus = '마감' | '미마감';

interface Row {
  id: string;
  site: string;
  period: string;
  status: ClosingStatus;
}

const mockData: Row[] = [
  { id: '1', site: 'ABCD/WW', period: '2025.01', status: '마감' },
  { id: '2', site: 'ABCD/WW', period: '2025.01', status: '미마감' },
  { id: '3', site: 'ABCD/WW', period: '2025.01', status: '마감' },
];

const ClosingManagementPage = () => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [search, setSearch] = useState('');
  const [rows, setRows] = useState<Row[]>(mockData);
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

  const toggleStatus = (id: string) => {
    setRows(prev => prev.map(r =>
      r.id === id ? { ...r, status: r.status === '마감' ? '미마감' : '마감' } : r
    ));
  };

  const closeFilter = () => setOpenFilter(null);

  return (
    <Layout>
      {openFilter && <div css={s.backdrop} onClick={closeFilter} />}

      <div css={s.pageInner}>
        <h1 css={s.pageTitle}>마감 관리</h1>

        <div css={s.toolbar}>
          <div css={s.filters}>
            <FilterButton
              label="기간"
              isOpen={openFilter === 'period'}
              onToggle={() => setOpenFilter(openFilter === 'period' ? null : 'period')}
            />
            <FilterButton
              label="마감 상태"
              isOpen={openFilter === 'status'}
              onToggle={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
            />
          </div>

          <SearchInput value={search} onChange={setSearch} />
        </div>

        <div css={s.tableWrap}>
          <table css={s.table}>
            <colgroup>
              <col style={{ width: '48px' }} />
              <col style={{ width: '200px' }} />
              <col />
              <col style={{ width: '160px' }} />
              <col style={{ width: '120px' }} />
            </colgroup>
            <thead>
              <tr css={s.headerRow}>
                <th css={s.th}>
                  <Checkbox checked={allSelected} onChange={toggleSelectAll} />
                </th>
                <th css={s.th}>사업장</th>
                <th css={s.th}>기간</th>
                <th css={s.th}>상태</th>
                <th css={s.th}>마감</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} css={s.dataRow}>
                  <td css={s.td}>
                    <Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} />
                  </td>
                  <td css={s.td}>{row.site}</td>
                  <td css={s.td}>{row.period}</td>
                  <td css={s.td}>
                    <span css={row.status === '마감' ? s.statusClosed : s.statusOpen}>
                      {row.status}
                    </span>
                  </td>
                  <td css={s.td}>
                    {row.status === '마감' ? (
                      <button css={s.cancelBtn} type="button" onClick={() => toggleStatus(row.id)}>
                        취소
                      </button>
                    ) : (
                      <button css={s.closeBtn} type="button" onClick={() => toggleStatus(row.id)}>
                        마감
                      </button>
                    )}
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

export default ClosingManagementPage;
