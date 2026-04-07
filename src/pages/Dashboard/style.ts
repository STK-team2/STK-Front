import { css } from '@emotion/react';

export const page = css`
  background: #f4f6f9;
  min-height: 100%;
  padding: 32px 40px 40px;
  box-sizing: border-box;

  @media (max-width: 1440px) {
    padding: 26px 32px 32px;
  }
`;

/* ── Header ── */
export const pageHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
`;

export const pageTitle = css`
  font-size: 22px;
  font-weight: 700;
  color: #1a1c23;
  margin: 0;
`;

export const headerMeta = css`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #8b8e9b;
  font-size: 13px;
`;

export const headerUser = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

/* ── Summary cards ── */
export const summaryRow = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 14px;

  @media (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const summaryCard = css`
  background: #fff;
  border: 1px solid #e6e8ed;
  border-radius: 12px;
  padding: 18px 20px 16px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const summaryLabel = css`
  font-size: 13px;
  color: #9497a0;
  font-weight: 400;
`;

export const summaryValue = css`
  font-size: 30px;
  font-weight: 700;
  color: #1a1c23;
  line-height: 1.15;
  margin-top: 4px;

  @media (max-width: 1440px) {
    font-size: 26px;
  }
`;

export const summaryUnit = css`
  font-size: 12px;
  color: #9497a0;
`;

export const summaryIconBox = css`
  position: absolute;
  top: 18px;
  right: 18px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const summaryBadge = css`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  margin-top: 6px;
  background: #FDE68A;
  color: #92400E;
`;

/* ── Shared card ── */
export const card = css`
  background: #fff;
  border: 1px solid #e6e8ed;
  border-radius: 12px;
  padding: 18px 20px;
  overflow: hidden;
  min-width: 0;
`;

export const cardHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
`;

export const cardTitle = css`
  font-size: 14px;
  font-weight: 600;
  color: #1a1c23;
  margin: 0;
`;

/* ── Chart legend ── */
export const chartLegend = css`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #595b66;
`;

export const legendItem = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const legendDot = css`
  width: 8px;
  height: 8px;
  border-radius: 50%;
`;

/* ── Mid row ── */
export const midRow = css`
  display: grid;
  grid-template-columns: 370px 1fr;
  gap: 14px;
  margin-bottom: 14px;
  min-width: 0;

  @media (max-width: 1440px) {
    grid-template-columns: 320px 1fr;
  }
  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

/* ── Donut card ── */
export const donutBody = css`
  display: flex;
  gap: 18px;
  align-items: center;
`;

export const donutLeft = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const donutWrap = css`
  position: relative;
  width: 130px;
  height: 130px;
`;

export const donutCenter = css`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #1a1c23;
`;

export const donutLegendRow = css`
  display: flex;
  gap: 10px;
  font-size: 11px;
  color: #8b8e9b;
`;

export const donutLegendItem = css`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const donutRight = css`
  flex: 1;
  min-width: 0;
`;

export const donutMeta = css`
  display: flex;
  gap: 6px;
  font-size: 11px;
  color: #9497a0;
  margin-bottom: 10px;
  flex-wrap: wrap;
`;

export const donutMetaDivider = css`
  color: #d0d2d8;
`;

export const donutStatGrid = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 8px;
`;

export const donutStatItem = css`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

export const donutStatLabel = css`
  font-size: 11px;
  color: #9497a0;
`;

export const donutStatValue = css`
  font-size: 18px;
  font-weight: 700;
  color: #1a1c23;
`;

/* ── Bottom row ── */
export const bottomRow = css`
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 8px;
  margin-bottom: 14px;
  min-width: 0;

  @media (max-width: 1440px) {
    grid-template-columns: 1fr 450px;
  }
  @media (max-width: 1280px) {
    grid-template-columns: 1fr;
  }
`;

/* ── Table ── */
export const downloadBtn = css`
  display: flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: 1px solid #e0e2e7;
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 12px;
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
  padding: 8px 12px;
  font-size: 12px;
  color: #9497a0;
  font-weight: 500;
  background: #f8f9fb;
  border-bottom: 1px solid #e8eaed;
  border-top: 1px solid #e8eaed;
  white-space: nowrap;

  &:first-of-type { border-radius: 6px 0 0 0; }
  &:last-of-type  { border-radius: 0 6px 0 0; }
`;

export const td = css`
  padding: 9px 12px;
  font-size: 13px;
  color: #333;
  border-bottom: 1px solid #f0f1f4;
`;

/* ── Recent activity ── */
export const activityTabRow = css`
  display: flex;
  gap: 2px;
`;

export const activityTabBtn = css`
  background: none;
  border: none;
  padding: 3px 9px;
  font-size: 12px;
  font-weight: 500;
  color: #9497a0;
  cursor: pointer;
  border-radius: 4px;
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
  gap: 10px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f1f4;

  &:last-child { border-bottom: none; }
`;

export const activityDot = css`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
`;

export const activityInfo = css`
  flex: 1;
  min-width: 0;
`;

export const activityName = css`
  font-size: 13px;
  font-weight: 500;
  color: #1a1c23;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const activityCode = css`
  font-size: 11px;
  color: #9497a0;
  margin-top: 1px;
`;

export const activityRight = css`
  text-align: right;
  flex-shrink: 0;
`;

export const activityQty = css`
  font-size: 13px;
  font-weight: 600;
  color: #0068e0;
`;

export const activityTime = css`
  font-size: 11px;
  color: #9497a0;
  margin-top: 1px;
`;

/* ── Monthly area chart ── */
export const areaCard = css`
  background: #fff;
  border: 1px solid #e6e8ed;
  border-radius: 12px;
  padding: 18px 20px;
  overflow: hidden;
  min-width: 0;
`;

export const chartWrap = css`
  position: relative;
  overflow: hidden;
  min-width: 0;
  width: 100%;
`;
