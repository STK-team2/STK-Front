import { useMemo, useState } from 'react';
import Layout from '../../widgets/Layout';
import { useGetChangeHistory, useDownloadChangeHistory } from '../../features/history/api/queries';
import type { ChangeHistoryDto } from '../../entities/history/types';
import {
  PageWrap, Header, TitleBar, PageTitle, SearchField, SearchInput,
  ChipsBar, Chip, Separator, ContentArea, StatsCards, StatCard,
  StatLabel, StatRow, StatValue, StatUnit, TableCard, TableWrap,
  Table, TableHeaderRow, Th, DataRow, Td, ActionBadge,
  Pagination, PagInfo, PagButtons, PagBtn,
} from './style';

type DateChip = 'today' | 'week' | 'month';
type ActionChip = 'inbound' | 'outbound' | 'edit' | 'delete' | null;

const PAGE_SIZE = 15;

const toLocalDateStr = (date: Date) => date.toISOString().slice(0, 10);

const getDateRange = (chip: DateChip): { startDate: string; endDate: string } => {
  const now = new Date();
  const today = toLocalDateStr(now);

  if (chip === 'today') {
    return { startDate: `${today}T00:00:00`, endDate: `${today}T23:59:59` };
  }

  if (chip === 'week') {
    const day = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - (day === 0 ? 6 : day - 1));
    return {
      startDate: `${toLocalDateStr(monday)}T00:00:00`,
      endDate: `${today}T23:59:59`,
    };
  }

  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  return {
    startDate: `${toLocalDateStr(firstDay)}T00:00:00`,
    endDate: `${today}T23:59:59`,
  };
};

const ACTION_CHIP_FILTER: Record<NonNullable<ActionChip>, (row: ChangeHistoryDto) => boolean> = {
  inbound: (row) => row.screenName === '입고 관리',
  outbound: (row) => row.screenName === '출고 관리',
  edit: (row) => row.action?.toUpperCase() === 'UPDATE',
  delete: (row) => row.action?.toUpperCase() === 'DELETE',
};

const ACTION_LABEL_MAP: Record<string, string> = {
  INSERT: '등록',
  UPDATE: '수정',
  DELETE: '삭제',
  INBOUND: '입고',
  OUTBOUND: '출고',
};

const resolveActionLabel = (row: ChangeHistoryDto): string => {
  if (row.action?.toUpperCase() === 'CREATE') {
    if (row.screenName === '입고 관리') return '입고';
    if (row.screenName === '출고 관리') return '출고';
  }
  return ACTION_LABEL_MAP[row.action?.toUpperCase()] ?? row.action;
};

const resolveActionType = (row: ChangeHistoryDto): 'edit' | 'inbound' | 'outbound' | 'delete' => {
  const upper = row.action?.toUpperCase();
  if (upper === 'DELETE') return 'delete';
  if (row.screenName === '입고 관리') return 'inbound';
  if (row.screenName === '출고 관리') return 'outbound';
  return 'edit';
};

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const EditHistoryManagementPage = () => {
  const [search, setSearch] = useState('');
  const [dateChip, setDateChip] = useState<DateChip>('today');
  const [actionChip, setActionChip] = useState<ActionChip>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { startDate, endDate } = getDateRange(dateChip);

  const { data: allRows = [], isLoading } = useGetChangeHistory({
    startDate,
    endDate,
    query: search.trim() || undefined,
  });

  const downloadMutation = useDownloadChangeHistory();

  const filteredRows = useMemo(() => {
    if (!actionChip) return allRows;
    const filter = ACTION_CHIP_FILTER[actionChip];
    return allRows.filter(filter);
  }, [allRows, actionChip]);

  const totalCount = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageRows = filteredRows.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const todayCount = allRows.filter(
    (r) => r.changedAt?.slice(0, 10) === toLocalDateStr(new Date()),
  ).length;
  const uniqueUsers = new Set(allRows.map((r) => r.userName)).size;
  const uniqueRecords = new Set(allRows.map((r) => r.recordId)).size;

  const handleDateChip = (chip: DateChip) => {
    setDateChip(chip);
    setCurrentPage(1);
  };

  const handleActionChip = (chip: ActionChip) => {
    setActionChip((prev) => (prev === chip ? null : chip));
    setCurrentPage(1);
  };

  const handleDownload = async () => {
    await downloadMutation.mutateAsync({ startDate, endDate, query: search.trim() || undefined });
  };

  const pageNumbers = Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
    const half = 2;
    let start = Math.max(1, safePage - half);
    const end = Math.min(totalPages, start + 4);
    start = Math.max(1, end - 4);
    return start + i;
  }).filter((n) => n <= totalPages);

  return (
    <Layout>
      <PageWrap>
        <Header>
          <TitleBar>
            <PageTitle>수정 이력</PageTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <SearchField>
                <svg width="19.2" height="19.2" viewBox="0 0 24 24" fill="none" stroke="#8b95a1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <SearchInput
                  placeholder="직원, 자재, 날짜 검색..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                />
              </SearchField>
              <button
                type="button"
                onClick={() => void handleDownload()}
                disabled={downloadMutation.isPending}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  height: 40, padding: '0 14px', borderRadius: 10,
                  border: '1px solid #d1d6db', background: 'none',
                  fontFamily: "'Pretendard Variable', sans-serif",
                  fontSize: 14, color: '#4e5968', cursor: 'pointer',
                }}
              >
                <DownloadIcon />
                다운로드
              </button>
            </div>
          </TitleBar>
          <ChipsBar>
            <Chip active={dateChip === 'today'} type="button" onClick={() => handleDateChip('today')}>오늘</Chip>
            <Chip active={dateChip === 'week'} type="button" onClick={() => handleDateChip('week')}>이번 주</Chip>
            <Chip active={dateChip === 'month'} type="button" onClick={() => handleDateChip('month')}>이번 달</Chip>
            <Separator />
            <Chip active={actionChip === 'inbound'} type="button" onClick={() => handleActionChip('inbound')}>입고</Chip>
            <Chip active={actionChip === 'outbound'} type="button" onClick={() => handleActionChip('outbound')}>출고</Chip>
            <Chip active={actionChip === 'edit'} type="button" onClick={() => handleActionChip('edit')}>수정</Chip>
            <Chip active={actionChip === 'delete'} type="button" onClick={() => handleActionChip('delete')}>삭제</Chip>
          </ChipsBar>
        </Header>

        <ContentArea>
          <StatsCards>
            <StatCard>
              <StatLabel>오늘 변경 건수</StatLabel>
              <StatRow>
                <StatValue>{todayCount}</StatValue>
                <StatUnit>건</StatUnit>
              </StatRow>
            </StatCard>
            <StatCard>
              <StatLabel>변경 참여 직원</StatLabel>
              <StatRow>
                <StatValue color="blue">{uniqueUsers}</StatValue>
                <StatUnit>명</StatUnit>
              </StatRow>
            </StatCard>
            <StatCard>
              <StatLabel>변경된 자재</StatLabel>
              <StatRow>
                <StatValue>{uniqueRecords}</StatValue>
                <StatUnit>종</StatUnit>
              </StatRow>
            </StatCard>
            <StatCard>
              <StatLabel>전체 건수</StatLabel>
              <StatRow>
                <StatValue>{totalCount}</StatValue>
                <StatUnit>건</StatUnit>
              </StatRow>
            </StatCard>
          </StatsCards>

          <TableCard>
            <TableWrap>
              <Table>
                <colgroup>
                  <col style={{ width: '160px' }} />
                  <col style={{ width: '120px' }} />
                  <col style={{ width: '100px' }} />
                  <col style={{ width: '120px' }} />
                  <col />
                  <col />
                </colgroup>
                <thead>
                  <TableHeaderRow>
                    <Th>변경 일시</Th>
                    <Th>직원</Th>
                    <Th>작업</Th>
                    <Th>화면</Th>
                    <Th>변경 전</Th>
                    <Th>변경 후</Th>
                  </TableHeaderRow>
                </thead>
                <tbody>
                  {isLoading && (
                    <tr>
                      <Td colSpan={6} style={{ textAlign: 'center', color: '#8b95a1' }}>
                        불러오는 중...
                      </Td>
                    </tr>
                  )}
                  {!isLoading && pageRows.length === 0 && (
                    <tr>
                      <Td colSpan={6} style={{ textAlign: 'center', color: '#8b95a1' }}>
                        이력이 없습니다.
                      </Td>
                    </tr>
                  )}
                  {pageRows.map((row) => (
                    <DataRow key={row.id}>
                      <Td>{row.changedAt ? row.changedAt.replace('T', ' ').slice(0, 16) : '-'}</Td>
                      <Td>{row.userName}</Td>
                      <Td>
                        <ActionBadge type={resolveActionType(row)}>
                          {resolveActionLabel(row)}
                        </ActionBadge>
                      </Td>
                      <Td muted>{row.screenName ?? row.tableName}</Td>
                      <Td muted style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.beforeValue ?? '-'}
                      </Td>
                      <Td muted style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {row.afterValue ?? '-'}
                      </Td>
                    </DataRow>
                  ))}
                </tbody>
              </Table>
            </TableWrap>

            <Pagination>
              <PagInfo>총 {totalCount}건</PagInfo>
              <PagButtons>
                <PagBtn type="button" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </PagBtn>
                {pageNumbers.map((page) => (
                  <PagBtn key={page} type="button" active={safePage === page} onClick={() => setCurrentPage(page)}>
                    {page}
                  </PagBtn>
                ))}
                <PagBtn type="button" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
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
