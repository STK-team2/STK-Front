import { css } from '@emotion/react';

export const page = css`
  background: #f4f6f9;
  min-height: 100%;
  padding: 40px 48px 48px;
  box-sizing: border-box;

  @media (max-width: 1440px) {
    padding: 32px 38px 40px;
  }
`;

/* ── Header ── */
export const pageHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
`;

export const pageTitle = css`
  font-size: 30px;
  font-weight: 700;
  color: #1a1c23;
  margin: 0;
`;

export const headerMeta = css`
  display: flex;
  align-items: center;
  gap: 14px;
  color: #8b8e9b;
  font-size: 16px;
`;

export const headerUser = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;

/* ── Summary cards ── */
export const summaryRow = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 18px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const summaryCard = css`
  background: #fff;
  border: 1px solid #e6e8ed;
  border-radius: 14px;
  padding: 26px 28px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s, border-color 0.15s;

  &:hover {
    transform: translateY(-2px);
    border-color: #c9d3e5;
    box-shadow: 0 6px 16px rgba(23, 43, 77, 0.08);
  }
`;

export const summaryLabel = css`
  font-size: 16px;
  color: #9497a0;
  font-weight: 500;
`;

export const summaryValue = css`
  font-size: 40px;
  font-weight: 700;
  color: #1a1c23;
  line-height: 1.15;
  margin-top: 6px;

  @media (max-width: 1440px) {
    font-size: 34px;
  }
`;

export const summaryUnit = css`
  font-size: 15px;
  color: #9497a0;
`;

export const summaryIconBox = css`
  position: absolute;
  top: 22px;
  right: 22px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 26px;
    height: 26px;
  }
`;

export const summaryBadge = css`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
  background: #FDE68A;
  color: #92400E;
`;

/* ── Shared card ── */
export const card = css`
  background: #fff;
  border: 1px solid #e6e8ed;
  border-radius: 14px;
  padding: 24px 26px;
  overflow: hidden;
  min-width: 0;
`;

export const cardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`;

export const cardTitle = css`
  font-size: 18px;
  font-weight: 600;
  color: #1a1c23;
  margin: 0;
`;

/* ── Chart legend ── */
export const chartLegend = css`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #595b66;
`;

export const legendItem = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const legendDot = css`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

/* ── Mid row ── */
export const midRow = css`
  display: grid;
  grid-template-columns: 460px 1fr;
  gap: 18px;
  margin-bottom: 18px;
  min-width: 0;

  @media (max-width: 1440px) {
    grid-template-columns: 400px 1fr;
  }
  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

/* ── Donut card ── */
export const donutBody = css`
  display: flex;
  gap: 22px;
  align-items: center;
`;

export const donutLeft = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

export const donutWrap = css`
  position: relative;
  width: 170px;
  height: 170px;
`;

export const donutCenter = css`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  color: #1a1c23;
`;

export const donutLegendRow = css`
  display: flex;
  gap: 14px;
  font-size: 14px;
  color: #8b8e9b;
`;

export const donutLegendItem = css`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const donutRight = css`
  flex: 1;
  min-width: 0;
`;

export const donutMeta = css`
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: #9497a0;
  margin-bottom: 14px;
  flex-wrap: wrap;
`;

export const donutMetaDivider = css`
  color: #d0d2d8;
`;

export const donutStatGrid = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 10px;
`;

export const donutStatItem = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const donutStatLabel = css`
  font-size: 13px;
  color: #9497a0;
`;

export const donutStatValue = css`
  font-size: 22px;
  font-weight: 700;
  color: #1a1c23;
`;

/* ── Bottom row ── */
export const bottomRow = css`
  display: grid;
  grid-template-columns: 1fr 620px;
  gap: 18px;
  margin-bottom: 18px;
  min-width: 0;

  @media (max-width: 1440px) {
    grid-template-columns: 1fr 540px;
  }
  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

/* ── Table ── */
export const downloadBtn = css`
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid #e0e2e7;
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 14px;
  color: #595b66;
  cursor: pointer;
  font-family: 'Pretendard Variable', sans-serif;

  &:hover {
    background: #f5f6f8;
  }
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
`;

export const th = css`
  text-align: left;
  padding: 12px 16px;
  font-size: 14px;
  color: #9497a0;
  font-weight: 500;
  background: #f8f9fb;
  border-bottom: 1px solid #e8eaed;
  border-top: 1px solid #e8eaed;
  white-space: nowrap;

  &:first-of-type { border-radius: 8px 0 0 0; }
  &:last-of-type  { border-radius: 0 8px 0 0; }
`;

export const td = css`
  padding: 13px 16px;
  font-size: 15px;
  color: #333;
  border-bottom: 1px solid #f0f1f4;
`;

/* ── Recent activity ── */
export const activityTabRow = css`
  display: flex;
  gap: 4px;
`;

export const activityTabBtn = css`
  background: none;
  border: none;
  padding: 5px 14px;
  font-size: 14px;
  font-weight: 500;
  color: #9497a0;
  cursor: pointer;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;

  &:hover { background: #f5f6f8; }
`;

export const activityTabBtnActive = css`
  color: #0068e0;
  background: #eef4ff;

  &:hover { background: #dde9ff; }
`;

export const activityList = css`
  display: flex;
  flex-direction: column;
`;

export const activityItem = css`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 22px 10px;
  border-bottom: 1px solid #f0f1f4;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.15s;

  &:hover { background: #f5f8ff; }
  &:last-child { border-bottom: none; }
`;

export const activityDot = css`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
`;

export const activityInfo = css`
  flex: 1;
  min-width: 0;
`;

export const activityName = css`
  font-size: 15px;
  font-weight: 500;
  color: #1a1c23;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const activityCode = css`
  font-size: 13px;
  color: #9497a0;
  margin-top: 3px;
`;

export const activityRight = css`
  text-align: right;
  flex-shrink: 0;
`;

export const activityQty = css`
  font-size: 15px;
  font-weight: 600;
  color: #0068e0;
`;

export const activityTime = css`
  font-size: 13px;
  color: #9497a0;
  margin-top: 3px;
`;

/* ── Monthly area chart ── */
export const areaCard = css`
  background: #fff;
  border: 1px solid #e6e8ed;
  border-radius: 14px;
  padding: 24px 26px;
  overflow: hidden;
  min-width: 0;
`;

export const chartWrap = css`
  position: relative;
  overflow: hidden;
  min-width: 0;
  width: 100%;
`;
