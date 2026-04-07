import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { Checkbox } from '../../shared/ui/Checkbox';
import {
  Backdrop, PageInner, PageTitle, Toolbar, Filters, ToolbarRight,
  QtyLabel, QtyInputRow, QtyInput, QtySep, SortOptionList, SortOption,
  TableWrap, Table, HeaderRow, Th, DataRow, Td,
} from './style';

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

  const closeAll = () => { setOpenFilter(null); setActionOpen(false); };

  return (
    <Layout>
      {(openFilter || actionOpen) && <Backdrop onClick={closeAll} />}

      <PageInner>
        <PageTitle>재고 조회</PageTitle>

        <Toolbar>
          <Filters>
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
              <QtyLabel>수량</QtyLabel>
              <QtyInputRow>
                <QtyInput type="number" value={qtyMin} onChange={e => setQtyMin(e.target.value)} />
                <QtySep>~</QtySep>
                <QtyInput type="number" value={qtyMax} onChange={e => setQtyMax(e.target.value)} />
              </QtyInputRow>
            </FilterButton>
            <FilterButton
              label="재고 상태"
              isOpen={openFilter === 'status'}
              onToggle={() => setOpenFilter(openFilter === 'status' ? null : 'status')}
            >
              <SortOptionList>
                <SortOption active={stockStatus === 'current'} type="button" onClick={() => setStockStatus('current')}>현재 재고</SortOption>
                <SortOption active={stockStatus === 'inout'} type="button" onClick={() => setStockStatus('inout')}>재고 수불</SortOption>
                <SortOption active={stockStatus === 'changed'} type="button" onClick={() => setStockStatus('changed')}>변경 재고</SortOption>
              </SortOptionList>
            </FilterButton>
          </Filters>

          <ToolbarRight>
            <SearchInput value={search} onChange={setSearch} />
            <ActionMenu
              label="재고 관리"
              isOpen={actionOpen}
              onToggle={() => setActionOpen(v => !v)}
              items={INVENTORY_ACTIONS}
            />
          </ToolbarRight>
        </Toolbar>

        <TableWrap>
          <Table>
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
              <HeaderRow>
                <Th><Checkbox checked={allSelected} onChange={toggleSelectAll} /></Th>
                <Th>변경일시</Th>
                <Th>입/출고번호</Th>
                <Th>작업화면</Th>
                <Th>자재위치</Th>
                <Th>자재코드</Th>
                <Th>자재명</Th>
                <Th>변경수량</Th>
                <Th>변경자</Th>
              </HeaderRow>
            </thead>
            <tbody>
              {rows.map(row => (
                <DataRow key={row.id}>
                  <Td><Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} /></Td>
                  <Td>{row.changedAt}</Td>
                  <Td>{row.ioNumber}</Td>
                  <Td>{row.workScreen}</Td>
                  <Td>{row.location}</Td>
                  <Td>{row.code}</Td>
                  <Td>{row.name}</Td>
                  <Td>{row.changedQty}</Td>
                  <Td>{row.manager}</Td>
                </DataRow>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </PageInner>
    </Layout>
  );
};

export default InventoryManagementPage;
