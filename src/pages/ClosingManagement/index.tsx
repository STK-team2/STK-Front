import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { Checkbox } from '../../shared/ui/Checkbox';
import {
  Backdrop, PageInner, PageTitle, Toolbar, Filters,
  TableWrap, Table, HeaderRow, Th, DataRow, Td,
  StatusText, CloseBtn, CancelBtn,
} from './style';

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
      {openFilter && <Backdrop onClick={closeFilter} />}

      <PageInner>
        <PageTitle>마감 관리</PageTitle>

        <Toolbar>
          <Filters>
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
          </Filters>

          <SearchInput value={search} onChange={setSearch} />
        </Toolbar>

        <TableWrap>
          <Table>
            <colgroup>
              <col style={{ width: '48px' }} />
              <col style={{ width: '200px' }} />
              <col />
              <col style={{ width: '160px' }} />
              <col style={{ width: '120px' }} />
            </colgroup>
            <thead>
              <HeaderRow>
                <Th><Checkbox checked={allSelected} onChange={toggleSelectAll} /></Th>
                <Th>사업장</Th>
                <Th>기간</Th>
                <Th>상태</Th>
                <Th>마감</Th>
              </HeaderRow>
            </thead>
            <tbody>
              {rows.map(row => (
                <DataRow key={row.id}>
                  <Td><Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} /></Td>
                  <Td>{row.site}</Td>
                  <Td>{row.period}</Td>
                  <Td>
                    <StatusText closed={row.status === '마감'}>{row.status}</StatusText>
                  </Td>
                  <Td>
                    {row.status === '마감' ? (
                      <CancelBtn type="button" onClick={() => toggleStatus(row.id)}>취소</CancelBtn>
                    ) : (
                      <CloseBtn type="button" onClick={() => toggleStatus(row.id)}>마감</CloseBtn>
                    )}
                  </Td>
                </DataRow>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </PageInner>
    </Layout>
  );
};

export default ClosingManagementPage;
