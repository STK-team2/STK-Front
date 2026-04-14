/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import * as s from './style';

ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, ArcElement,
  Filler, Tooltip,
);

/* ── 차트 데이터 ── */
const weeklyData = {
  labels: ['월', '화', '수', '목', '금', '토', '일'],
  datasets: [
    {
      label: '입고',
      data: [28, 42, 22, 58, 38, 18, 12],
      backgroundColor: '#4C8BF5',
      borderRadius: 3,
      barPercentage: 0.75,
      categoryPercentage: 0.6,
    },
    {
      label: '출고',
      data: [18, 28, 32, 22, 48, 13, 9],
      backgroundColor: '#F9A8C9',
      borderRadius: 3,
      barPercentage: 0.75,
      categoryPercentage: 0.6,
    },
  ],
};

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

const donutData = {
  datasets: [{
    data: [78.6, 21.4],
    backgroundColor: ['#0068e0', '#eaecf0'],
    borderWidth: 0,
  }],
};

const donutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '74%',
  plugins: { legend: { display: false }, tooltip: { enabled: false } },
} as const;

const monthlyData = {
  labels: ['11월', '12월', '1월', '2월', '3월', '4월'],
  datasets: [
    {
      label: '입고',
      data: [105, 120, 138, 155, 162, 165],
      borderColor: '#4C8BF5',
      backgroundColor: 'rgba(76,139,245,0.20)',
      fill: true,
      tension: 0.5,
      pointRadius: 0,
      borderWidth: 2,
    },
    {
      label: '출고',
      data: [98, 102, 112, 122, 130, 152],
      borderColor: '#F4A261',
      backgroundColor: 'rgba(244,162,97,0.12)',
      fill: true,
      tension: 0.5,
      pointRadius: 0,
      borderWidth: 2,
    },
  ],
};

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
      min: 0, max: 200,
      ticks: { stepSize: 50, font: { size: 11 }, color: '#9497a0' },
      grid: { color: '#f0f1f4' },
      border: { display: false },
    },
  },
} as const;

const inventoryRows = [
  { code: '1001', name: 'BGE2301031231293', box: 'ㅁ-12', qty: 2123, total: 34234134 },
  { code: '1001', name: 'BGE2301031231293', box: 'ㅁ-12', qty: 2123, total: 34234134 },
  { code: '1001', name: 'BGE2301031231293', box: 'ㅁ-12', qty: 2123, total: 34234134 },
];

const recentActivities = [
  { name: '스테인리스 볼트 M6', code: 'MAT-B01 · A-12', qty: '+50', time: '10:42' },
  { name: '알루미늄 판재 2T',   code: 'MAT-B02 · B-03', qty: '+20', time: '09:15' },
  { name: '육각 너트 M10',      code: 'MAT-B04 · A-01', qty: '+30', time: '어제'  },
];

/* ── 아이콘 컴포넌트 ── */
const IconIncoming = () => (
  /* 시계방향 순환 화살표 (입고) */
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#4C8BF5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 4v6h-6"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);

const IconOutgoing = () => (
  /* 반시계방향 순환 화살표 (출고) */
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#F06292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 4v6h6"/>
    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
  </svg>
);

const IconSparkle = () => (
  /* 4방향 반짝이 (전체 품목 수) */
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#48BB78" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 L13.8 10.2 L22 12 L13.8 13.8 L12 22 L10.2 13.8 L2 12 L10.2 10.2 Z"/>
  </svg>
);

const IconMail = () => (
  /* 봉투 (이번 달 마감) */
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#F6AD55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

/* ── 유저 아이콘 ── */
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
  const navigate = useNavigate();

  const handleActivityClick = () => {
    navigate(activeTab === 'in' ? '/incoming' : '/outgoing');
  };

  return (
    <Layout>
      <div css={s.page}>

        {/* Header */}
        <div css={s.pageHeader}>
          <h1 css={s.pageTitle}>대시보드</h1>
          <div css={s.headerMeta}>
            <span>2026. 04. 07.</span>
            <span css={s.headerUser}>
              <IconUser />
              example@gmail.com
            </span>
          </div>
        </div>

        {/* ── 요약 카드 ── */}
        <div css={s.summaryRow}>

          <div css={s.summaryCard}>
            <span css={s.summaryLabel}>오늘 입고</span>
            <span css={s.summaryValue}>12</span>
            <span css={s.summaryUnit}>건</span>
            <div css={s.summaryIconBox} style={{ background: '#EEF4FF' }}>
              <IconIncoming />
            </div>
          </div>

          <div css={s.summaryCard}>
            <span css={s.summaryLabel}>오늘 출고</span>
            <span css={s.summaryValue}>8</span>
            <span css={s.summaryUnit}>건</span>
            <div css={s.summaryIconBox} style={{ background: '#FFF0F5' }}>
              <IconOutgoing />
            </div>
          </div>

          <div css={s.summaryCard}>
            <span css={s.summaryLabel}>전체 품목 수</span>
            <span css={s.summaryValue}>247</span>
            <span css={s.summaryUnit}>목</span>
            <div css={s.summaryIconBox} style={{ background: '#F0FFF4' }}>
              <IconSparkle />
            </div>
          </div>

          <div css={s.summaryCard}>
            <span css={s.summaryLabel}>이번 달 마감</span>
            <span css={s.summaryBadge}>미마감</span>
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
                  <div css={s.donutCenter}>78.6%</div>
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
                  <span>날짜 기준(04.01 - 04.07)</span>
                </div>
                <div css={s.donutStatGrid}>
                  <div css={s.donutStatItem}>
                    <span css={s.donutStatLabel}>미마감</span>
                    <span css={s.donutStatValue}>134건</span>
                  </div>
                  <div css={s.donutStatItem}>
                    <span css={s.donutStatLabel}>마감</span>
                    <span css={s.donutStatValue}>14건</span>
                  </div>
                  <div css={s.donutStatItem}>
                    <span css={s.donutStatLabel}>전체 마감</span>
                    <span css={s.donutStatValue}>1329건</span>
                  </div>
                  <div css={s.donutStatItem}>
                    <span css={s.donutStatLabel}>취하량</span>
                    <span css={s.donutStatValue}>후ㅜㅜ</span>
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
              <Bar data={weeklyData} options={weeklyOptions} />
            </div>
          </div>

        </div>

        {/* ── 하단 행 ── */}
        <div css={s.bottomRow}>

          {/* 재고 현황 */}
          <div css={s.card}>
            <div css={s.cardHeader}>
              <p css={s.cardTitle}>재고 현황</p>
              <button css={s.downloadBtn} type="button">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                다운로드
              </button>
            </div>
            <table css={s.table}>
              <thead>
                <tr>
                  <th css={s.th}>자재코드</th>
                  <th css={s.th}>자재명</th>
                  <th css={s.th}>BOX</th>
                  <th css={s.th}>수량</th>
                  <th css={s.th}>총수량</th>
                </tr>
              </thead>
              <tbody>
                {inventoryRows.map((row, i) => (
                  <tr key={i}>
                    <td css={s.td}>{row.code}</td>
                    <td css={s.td}>{row.name}</td>
                    <td css={s.td}>{row.box}</td>
                    <td css={s.td}>{row.qty.toLocaleString()}</td>
                    <td css={s.td}>{row.total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
              {recentActivities.map((item, i) => (
                <div css={s.activityItem} key={i} onClick={handleActivityClick} role="button" tabIndex={0}>
                  <div css={s.activityDot} style={{ background: '#4C8BF5' }} />
                  <div css={s.activityInfo}>
                    <div css={s.activityName}>{item.name}</div>
                    <div css={s.activityCode}>{item.code}</div>
                  </div>
                  <div css={s.activityRight}>
                    <div css={s.activityQty}>{item.qty}</div>
                    <div css={s.activityTime}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── 월별 재고 추이 ── */}
        <div css={s.areaCard}>
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
            <Line data={monthlyData} options={monthlyOptions} />
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default DashboardPage;
