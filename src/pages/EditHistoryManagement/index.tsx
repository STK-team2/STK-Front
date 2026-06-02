import { useState } from 'react';
import Layout from '../../widgets/Layout';
import {
  PageWrap, Header, TitleBar, PageTitle, SearchField, SearchInput,
  ChipsBar, Chip, Separator, ContentArea, StatsCards, StatCard,
  StatLabel, StatRow, StatValue, StatUnit, TableCard, TableWrap,
  Table, TableHeaderRow, Th, DataRow, Td, ActionBadge, StatusBadge,
  Pagination, PagInfo, PagButtons, PagBtn,
} from './style';

type DateChip = 'today' | 'week' | 'month';
type ActionChip = 'inbound' | 'outbound' | 'edit' | 'delete' | null;
type ActionType = 'edit' | 'inbound' | 'outbound' | 'delete';
type StatusType = 'done' | 'review';

interface HistoryRow {
  id: string;
  time: string;
  employee: string;
  action: ActionType;
  materialName: string;
  materialCode: string;
  change: string;
  status: StatusType;
}

const ACTION_LABELS: Record<ActionType, string> = {
  edit: '수정',
  inbound: '입고',
  outbound: '출고',
  delete: '삭제',
};

const STATUS_LABELS: Record<StatusType, string> = {
  done: '완료',
  review: '검토중',
};

const MOCK_ROWS: HistoryRow[] = [
  { id: '1', time: '14:32', employee: '김민수', action: 'edit', materialName: '서른마흔다숯해', materialCode: 'BGE2301031231293', change: '수량 3,422 → 3,500', status: 'done' },
  { id: '2', time: '14:15', employee: '이서연', action: 'inbound', materialName: 'teachmon.kro.kr', materialCode: 'BGE2301031231294', change: '신규 입고 1,200개', status: 'done' },
  { id: '3', time: '13:48', employee: '박준혁', action: 'delete', materialName: '알루미늄 프레임 B', materialCode: 'ALU9920481230001', change: '재고 항목 삭제', status: 'review' },
  { id: '4', time: '11:40', employee: '최유진', action: 'outbound', materialName: '구리 배선 케이블 5m', materialCode: 'COP5500210000045', change: '출고 수량 500개', status: 'done' },
  { id: '5', time: '14:32', employee: '김민수', action: 'edit', materialName: '서른마흔다숯해', materialCode: 'BGE2301031231293', change: '수량 3,422 → 3,500', status: 'done' },
  { id: '6', time: '14:32', employee: '김민수', action: 'edit', materialName: '서른마흔다숯해', materialCode: 'BGE2301031231293', change: '수량 3,422 → 3,500', status: 'done' },
  { id: '7', time: '14:32', employee: '김민수', action: 'edit', materialName: '서른마흔다숯해', materialCode: 'BGE2301031231293', change: '수량 3,422 → 3,500', status: 'done' },
  { id: '8', time: '11:40', employee: '최유진', action: 'outbound', materialName: '구리 배선 케이블 5m', materialCode: 'COP5500210000045', change: '출고 수량 500개', status: 'done' },
];

const ACTION_CHIP_MAP: Record<NonNullable<ActionChip>, ActionType> = {
  inbound: 'inbound',
  outbound: 'outbound',
  edit: 'edit',
  delete: 'delete',
};

const EditHistoryManagementPage = () => {
  const [search, setSearch] = useState('');
  const [dateChip, setDateChip] = useState<DateChip>('today');
  const [actionChip, setActionChip] = useState<ActionChip>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredRows = MOCK_ROWS.filter((row) => {
    if (actionChip && row.action !== ACTION_CHIP_MAP[actionChip]) return false;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      return (
        row.employee.includes(q) ||
        row.materialName.toLowerCase().includes(q) ||
        row.materialCode.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalCount = filteredRows.length;

  return (
    <Layout>
      <PageWrap>
        <Header>
          <TitleBar>
            <PageTitle>수정 이력</PageTitle>
            <SearchField>
              <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none" stroke="#8b95a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <SearchInput
                placeholder="직원, 자재, 날짜 검색..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </SearchField>
          </TitleBar>
          <ChipsBar>
            <Chip active={dateChip === 'today'} type="button" onClick={() => setDateChip('today')}>오늘</Chip>
            <Chip active={dateChip === 'week'} type="button" onClick={() => setDateChip('week')}>이번 주</Chip>
            <Chip active={dateChip === 'month'} type="button" onClick={() => setDateChip('month')}>이번 달</Chip>
            <Separator />
            <Chip active={actionChip === 'inbound'} type="button" onClick={() => setActionChip(actionChip === 'inbound' ? null : 'inbound')}>입고</Chip>
            <Chip active={actionChip === 'outbound'} type="button" onClick={() => setActionChip(actionChip === 'outbound' ? null : 'outbound')}>출고</Chip>
            <Chip active={actionChip === 'edit'} type="button" onClick={() => setActionChip(actionChip === 'edit' ? null : 'edit')}>수정</Chip>
            <Chip active={actionChip === 'delete'} type="button" onClick={() => setActionChip(actionChip === 'delete' ? null : 'delete')}>삭제</Chip>
          </ChipsBar>
        </Header>

        <ContentArea>
          <StatsCards>
            <StatCard>
              <StatLabel>오늘 수정 건수</StatLabel>
              <StatRow>
                <StatValue>24</StatValue>
                <StatUnit>건</StatUnit>
              </StatRow>
            </StatCard>
            <StatCard>
              <StatLabel>수정 참여 직원</StatLabel>
              <StatRow>
                <StatValue color="blue">5</StatValue>
                <StatUnit>명</StatUnit>
              </StatRow>
            </StatCard>
            <StatCard>
              <StatLabel>수정된 자재</StatLabel>
              <StatRow>
                <StatValue>18</StatValue>
                <StatUnit>종</StatUnit>
              </StatRow>
            </StatCard>
            <StatCard>
              <StatLabel>검토 대기</StatLabel>
              <StatRow>
                <StatValue color="yellow">3</StatValue>
                <StatUnit>건</StatUnit>
              </StatRow>
            </StatCard>
          </StatsCards>

          <TableCard>
            <TableWrap>
              <Table>
                <colgroup>
                  <col style={{ width: '96px' }} />
                  <col style={{ width: '132px' }} />
                  <col style={{ width: '120px' }} />
                  <col />
                  <col style={{ width: '192px' }} />
                  <col style={{ width: '240px' }} />
                  <col style={{ width: '96px' }} />
                </colgroup>
                <thead>
                  <TableHeaderRow>
                    <Th>시간</Th>
                    <Th>직원</Th>
                    <Th>작업</Th>
                    <Th>자재명</Th>
                    <Th>자재 코드</Th>
                    <Th>변경 내용</Th>
                    <Th>상태</Th>
                  </TableHeaderRow>
                </thead>
                <tbody>
                  {filteredRows.map((row) => (
                    <DataRow key={row.id}>
                      <Td>{row.time}</Td>
                      <Td>{row.employee}</Td>
                      <Td>
                        <ActionBadge type={row.action}>{ACTION_LABELS[row.action]}</ActionBadge>
                      </Td>
                      <Td>{row.materialName}</Td>
                      <Td muted>{row.materialCode}</Td>
                      <Td muted>{row.change}</Td>
                      <Td>
                        <StatusBadge status={row.status}>{STATUS_LABELS[row.status]}</StatusBadge>
                      </Td>
                    </DataRow>
                  ))}
                </tbody>
              </Table>
            </TableWrap>

            <Pagination>
              <PagInfo>총 {totalCount}건 중 1-{Math.min(7, totalCount)}</PagInfo>
              <PagButtons>
                <PagBtn type="button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </PagBtn>
                {[1, 2, 3, 4].map((page) => (
                  <PagBtn key={page} type="button" active={currentPage === page} onClick={() => setCurrentPage(page)}>
                    {page}
                  </PagBtn>
                ))}
                <PagBtn type="button" onClick={() => setCurrentPage((p) => Math.min(4, p + 1))}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </PagBtn>
              </PagButtons>
              <div />
            </Pagination>
          </TableCard>
        </ContentArea>
      </PageWrap>
    </Layout>
  );
};

export default EditHistoryManagementPage;
