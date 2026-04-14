/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import Layout from '../../widgets/Layout';
import { dashboardApi } from '../../entities/dashboard/api/dashboardApi';
import * as s from './style';

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, ArcElement,
  Filler, Tooltip,
);

/* ── 요일 변환 ── */
const DAY_LABELS: Record<number, string> = { 1: '월', 2: '화', 3: '수', 4: '목', 5: '금', 6: '토', 0: '일' };
const toWeekdayLabel = (dateStr: string) => {
  const day = new Date(dateStr).getDay();
  return DAY_LABELS[day] ?? dateStr;
};

/* ── 월 라벨 변환 (2025-11 → 11월) ── */
const toMonthLabel = (month: string) => {
  const [, m] = month.split('-');
  return `${Number(m)}월`;
};

/* ── 차트 공통 옵션 ── */
const weeklyOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 }, color: '#9497a0' },
      border: { display: false },
    },
    y: {
      grid: { color: '#f0f1f4' },
      ticks: { font: { size: 11 }, color: '#9497a0', maxTicksLimit: 4 },
      border: { display: false },
    },
  },
} as const;

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '74%',
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
} as const;

const monthlyOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { size: 11 }, color: '#9497a0' },
      border: { display: false },
    },
    y: {
      ticks: { font: { size: 11 }, color: '#9497a0' },
      grid: { color: '#f0f1f4' },
      border: { display: false },
    },
  },
} as const;

/* ── 아이콘 ── */
const IconIncoming = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#4C8BF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);

const IconOutgoing = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#F06292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4v6h6"/>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
  </svg>
);

const IconSparkle = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#48BB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L13.8 10.2 L22 12 L13.8 13.8 L12 22 L10.2 13.8 L2 12 L10.2 10.2 Z"/>
  </svg>
);

const IconMail = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#F6AD55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconUser = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

/* ── 페이지 ── */
const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<'in' | 'out'>('in');

  const { data: summaryRes } = useQuery({
    queryKey: ['dashboard', 'summary'],
    queryFn: dashboardApi.getSummary,
  });

  const { data: weeklyRes } = useQuery({
    queryKey: ['dashboard', 'weekly-movements'],
    queryFn: dashboardApi.getWeeklyMovements,
  });

  const { data: recentRes } = useQuery({
    queryKey: ['dashboard', 'recent-movements'],
    queryFn: () => dashboardApi.getRecentMovements(10),
  });

  const { data: monthlyRes } = useQuery({
    queryKey: ['dashboard', 'monthly-trend'],
    queryFn: dashboardApi.getMonthlyTrend,
  });

  const { data: closingRes } = useQuery({
    queryKey: ['dashboard', 'closing-status'],
    queryFn: dashboardApi.getClosingStatus,
  });

  /* ── 데이터 가공 ── */
  const summary = summaryRes?.data;
  const weekly = weeklyRes?.data ?? [];
  const recentAll = recentRes?.data ?? [];
  const monthly = monthlyRes?.data ?? [];
  const closing = closingRes?.data;

  const weeklyChartData = {
    labels: weekly.map((d) => toWeekdayLabel(d.date)),
    datasets: [
      {
        label: '입고',
        data: weekly.map((d) => d.inboundCount),
        backgroundColor: '#4C8BF5',
        borderRadius: 3,
        barPercentage: 0.75,
        categoryPercentage: 0.6,
      },
      {
        label: '출고',
        data: weekly.map((d) => d.outboundCount),
        backgroundColor: '#F9A8C9',
        borderRadius: 3,
        barPercentage: 0.75,
        categoryPercentage: 0.6,
      },
    ],
  };

  const totalClosingCount = (closing?.closedCount ?? 0) + (closing?.unclosedCount ?? 0);
  const closedPct = totalClosingCount > 0
    ? Math.round((closing!.closedCount / totalClosingCount) * 1000) / 10
    : 0;

  const donutData = {
    datasets: [{
      data: [closedPct, 100 - closedPct],
      backgroundColor: ['#0068e0', '#eaecf0'],
      borderWidth: 0,
    }],
  };

  const monthlyChartData = {
    labels: monthly.map((d) => toMonthLabel(d.month)),
    datasets: [
      {
        label: '입고',
        data: monthly.map((d) => d.inboundTotal),
        borderColor: '#4C8BF5',
        backgroundColor: 'rgba(76,139,245,0.20)',
        fill: true,
        tension: 0.5,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: '출고',
        data: monthly.map((d) => d.outboundTotal),
        borderColor: '#F4A261',
        backgroundColor: 'rgba(244,162,97,0.12)',
        fill: true,
        tension: 0.5,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const filteredRecent = recentAll.filter((m) =>
    activeTab === 'in' ? m.type === 'INBOUND' : m.type === 'OUTBOUND',
  );

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
  });

  return (
    <Layout>
      <div css={s.page}>

        {/* Header */}
        <div css={s.pageHeader}>
          <h1 css={s.pageTitle}>대시보드</h1>
          <div css={s.headerMeta}>
            <span>{today}</span>
            <span css={s.headerUser}>
              <IconUser />
            </span>
          </div>
        </div>

        {/* ── 요약 카드 ── */}
        <div css={s.summaryRow}>

          <div css={s.summaryCard}>
            <span css={s.summaryLabel}>오늘 입고</span>
            <span css={s.summaryValue}>{summary?.todayInbound ?? '-'}</span>
            <span css={s.summaryUnit}>건</span>
            <div css={s.summaryIconBox} style={{ background: '#EEF4FF' }}>
              <IconIncoming />
            </div>
          </div>

          <div css={s.summaryCard}>
            <span css={s.summaryLabel}>오늘 출고</span>
            <span css={s.summaryValue}>{summary?.todayOutbound ?? '-'}</span>
            <span css={s.summaryUnit}>건</span>
            <div css={s.summaryIconBox} style={{ background: '#FFF0F5' }}>
              <IconOutgoing />
            </div>
          </div>

          <div css={s.summaryCard}>
            <span css={s.summaryLabel}>전체 품목 수</span>
            <span css={s.summaryValue}>{summary?.totalItems ?? '-'}</span>
            <span css={s.summaryUnit}>목</span>
            <div css={s.summaryIconBox} style={{ background: '#F0FFF4' }}>
              <IconSparkle />
            </div>
          </div>

          <div css={s.summaryCard}>
            <span css={s.summaryLabel}>이번 달 마감</span>
            <span css={s.summaryBadge} style={closing?.closed
              ? { background: '#C6F6D5', color: '#276749' }
              : { background: '#FDE68A', color: '#92400E' }}>
              {closing ? (closing.closed ? '마감' : '미마감') : '-'}
            </span>
            <div css={s.summaryIconBox} style={{ background: '#FFFBEB' }}>
              <IconMail />
            </div>
          </div>

        </div>

        {/* ── 중간 행 ── */}
        <div css={s.midRow}>

          {/* 이번 달 마감상태 */}
          <div css={s.card}>
            <div css={s.cardHeader}>
              <p css={s.cardTitle}>이번 달 마감상태</p>
            </div>
            <div css={s.donutBody}>
              <div css={s.donutLeft}>
                <div css={s.donutWrap}>
                  <Doughnut data={donutData} options={donutOptions} />
                  <div css={s.donutCenter}>{closedPct}%</div>
                </div>
                <div css={s.donutLegendRow}>
                  <div css={s.donutLegendItem}>
                    <div css={s.legendDot} style={{ background: '#eaecf0' }} />
                    미마감
                  </div>
                  <div css={s.donutLegendItem}>
                    <div css={s.legendDot} style={{ background: '#0068e0' }} />
                    마감
                  </div>
                </div>
              </div>

              <div css={s.donutRight}>
                <div css={s.donutMeta}>
                  <span>월간 누적</span>
                  <span css={s.donutMetaDivider}>|</span>
                  <span>{closing?.closingYm ?? '-'}</span>
                </div>
                <div css={s.donutStatGrid}>
                  <div css={s.donutStatItem}>
                    <span css={s.donutStatLabel}>미마감</span>
                    <span css={s.donutStatValue}>{closing?.unclosedCount ?? '-'}건</span>
                  </div>
                  <div css={s.donutStatItem}>
                    <span css={s.donutStatLabel}>마감</span>
                    <span css={s.donutStatValue}>{closing?.closedCount ?? '-'}건</span>
                  </div>
                  <div css={s.donutStatItem}>
                    <span css={s.donutStatLabel}>전체 마감</span>
                    <span css={s.donutStatValue}>{closing?.totalClosedAll ?? '-'}건</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 주간 입출고 현황 */}
          <div css={s.card}>
            <div css={s.cardHeader}>
              <p css={s.cardTitle}>주간 입출고 현황</p>
              <div css={s.chartLegend}>
                <div css={s.legendItem}>
                  <div css={s.legendDot} style={{ background: '#4C8BF5' }} />입고
                </div>
                <div css={s.legendItem}>
                  <div css={s.legendDot} style={{ background: '#F9A8C9' }} />출고
                </div>
              </div>
            </div>
            <div css={s.chartWrap} style={{ height: '170px' }}>
              <Bar data={weeklyChartData} options={weeklyOptions} />
            </div>
          </div>

        </div>

        {/* ── 하단 행 ── */}
        <div css={s.bottomRow}>

          {/* 최근 입출고 */}
          <div css={s.card}>
            <div css={s.cardHeader}>
              <p css={s.cardTitle}>최근 입출고</p>
              <div css={s.activityTabRow}>
                <button
                  css={[s.activityTabBtn, activeTab === 'in' && s.activityTabBtnActive]}
                  type="button"
                  onClick={() => setActiveTab('in')}
                >입고</button>
                <button
                  css={[s.activityTabBtn, activeTab === 'out' && s.activityTabBtnActive]}
                  type="button"
                  onClick={() => setActiveTab('out')}
                >출고</button>
              </div>
            </div>
            <div css={s.activityList}>
              {filteredRecent.length === 0 && (
                <div css={s.activityItem} style={{ justifyContent: 'center', color: '#9497a0', fontSize: 13 }}>
                  내역이 없습니다.
                </div>
              )}
              {filteredRecent.map((item) => (
                <div css={s.activityItem} key={item.movementId}>
                  <div css={s.activityDot}
                    style={{ background: item.type === 'INBOUND' ? '#4C8BF5' : '#F9A8C9' }} />
                  <div css={s.activityInfo}>
                    <div css={s.activityName}>{item.itemName}</div>
                    <div css={s.activityCode}>{item.itemCode} · {item.site}</div>
                  </div>
                  <div css={s.activityRight}>
                    <div css={s.activityQty}>
                      {item.type === 'INBOUND' ? '+' : '-'}{item.quantity}
                    </div>
                    <div css={s.activityTime}>{item.movementDate}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 월별 재고 추이 */}
          <div css={s.card}>
            <div css={s.cardHeader}>
              <p css={s.cardTitle}>월별 재고 추이</p>
              <div css={s.chartLegend}>
                <div css={s.legendItem}>
                  <div css={s.legendDot} style={{ background: '#4C8BF5' }} />입고
                </div>
                <div css={s.legendItem}>
                  <div css={s.legendDot} style={{ background: '#F4A261' }} />출고
                </div>
              </div>
            </div>
            <div css={s.chartWrap} style={{ height: '180px' }}>
              <Line data={monthlyChartData} options={monthlyOptions} />
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default DashboardPage;
