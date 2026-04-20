import { useState } from 'react';
import Layout from '../../widgets/Layout';
import { FilterButton } from '../../shared/ui/FilterButton';
import { SearchInput } from '../../shared/ui/SearchInput';
import { ActionMenu } from '../../shared/ui/ActionMenu';
import { Checkbox } from '../../shared/ui/Checkbox';
import {
  useDownloadCurrentStock,
  useGetCurrentStock,
} from '../../features/stock/api/queries';
import {
  Backdrop, PageInner, PageTitle, Toolbar, Filters, ToolbarRight,
  QtyLabel, QtyInputRow, QtyInput, QtySep, SortOptionList, SortOption,
  TableWrap, Table, HeaderRow, Th, DataRow, Td,
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

const INVENTORY_ACTIONS = ['재고 없는 품목', '다운로드'];

const InventoryManagementPage = () => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [actionOpen, setActionOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [qtyMin, setQtyMin] = useState('');
  const [qtyMax, setQtyMax] = useState('');
  const [stockStatus, setStockStatus] = useState<StockStatus>('all');
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const { data: currentStock = [] } = useGetCurrentStock();
  const downloadCurrentStockMutation = useDownloadCurrentStock();

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

  const handleActionItem = async (item: string) => {
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
            <ActionMenu
              label="재고 관리"
              isOpen={actionOpen}
              onToggle={() => setActionOpen((value) => !value)}
              items={INVENTORY_ACTIONS}
              onItemClick={(item) => void handleActionItem(item)}
            />
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
                <Th><Checkbox checked={allSelected} onChange={toggleSelectAll} /></Th>
                <Th>BOX 번호</Th>
                <Th>자재 위치</Th>
                <Th>자재코드</Th>
                <Th>자재명</Th>
                <Th>현재 재고</Th>
              </HeaderRow>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <DataRow key={row.id}>
                  <Td><Checkbox checked={selectedRows.has(row.id)} onChange={() => toggleRow(row.id)} /></Td>
                  <Td>{row.boxNumber}</Td>
                  <Td>{row.location}</Td>
                  <Td>{row.code}</Td>
                  <Td>{row.name}</Td>
                  <Td>{row.currentStock}</Td>
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
