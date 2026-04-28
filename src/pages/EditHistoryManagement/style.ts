import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const pageWrap = css`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #f9fafb;
`;

export const header = css`
  background: #fff;
  border-bottom: 1.2px solid #e5e8eb;
  position: sticky;
  top: 0;
  z-index: 10;
  flex-shrink: 0;
`;

export const titleBar = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76.8px;
  padding: 0 38.4px;

  @media (max-width: 1280px) {
    height: 60px;
    padding: 0 24px;
  }
  @media (max-width: 768px) {
    height: 52px;
    padding: 0 16px;
  }
`;

export const pageTitle = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 26.4px;
  font-weight: 700;
  color: #191f28;
  font-feature-settings: 'ss05' 1;

  @media (max-width: 1280px) {
    font-size: 22px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

export const searchField = css`
  display: flex;
  align-items: center;
  gap: 9.6px;
  background: #f3f4f6;
  border-radius: 12px;
  height: 48px;
  width: 336px;
  padding: 0 16.8px;
  flex-shrink: 0;

  @media (max-width: 1280px) {
    width: 260px;
    height: 40px;
  }
  @media (max-width: 768px) {
    width: 160px;
    height: 36px;
  }
`;

export const searchInput = css`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16.8px;
  color: #191f28;
  font-feature-settings: 'ss05' 1;
  &::placeholder {
    color: #8b95a1;
  }

  @media (max-width: 1280px) {
    font-size: 14px;
  }
`;

export const chipsBar = css`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 57.6px;
  padding: 0 38.4px;
  overflow-x: auto;

  @media (max-width: 1280px) {
    padding: 0 24px;
    gap: 8px;
    height: 50px;
  }
  @media (max-width: 768px) {
    padding: 0 16px;
    gap: 6px;
  }
`;

export const chip = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38.4px;
  padding: 0 16.8px;
  border-radius: 19.2px;
  border: 1.2px solid #d1d6db;
  background: none;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15.6px;
  color: #4e5968;
  cursor: pointer;
  white-space: nowrap;
  font-feature-settings: 'ss05' 1;
  flex-shrink: 0;
  &:hover {
    background: #f3f4f6;
  }

  @media (max-width: 1280px) {
    height: 34px;
    padding: 0 12px;
    font-size: 14px;
  }
`;

export const chipActive = css`
  background: #3182f6;
  border-color: #3182f6;
  color: #fff;
  &:hover {
    background: #1a6fdf;
  }
`;

export const separator = css`
  width: 1.2px;
  height: 19.2px;
  background: #d1d6db;
  flex-shrink: 0;
`;

export const contentArea = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28.8px;
  padding: 33.6px 38.4px;

  @media (max-width: 1280px) {
    padding: 24px;
    gap: 20px;
  }
  @media (max-width: 768px) {
    padding: 16px;
    gap: 14px;
  }
`;

export const statsCards = css`
  display: flex;
  gap: 19.2px;

  @media (max-width: 1280px) {
    gap: 14px;
  }
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
  }
`;

export const statCard = css`
  flex: 1;
  min-width: 0;
  background: #fff;
  border: 1.2px solid #e5e8eb;
  border-radius: 14.4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 9.6px;

  @media (max-width: 768px) {
    flex: 0 0 calc(50% - 5px);
    padding: 16px;
  }
`;

export const statLabel = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15.6px;
  color: #8b95a1;
  font-feature-settings: 'ss05' 1;

  @media (max-width: 1280px) {
    font-size: 13px;
  }
`;

export const statRow = css`
  display: flex;
  align-items: flex-end;
  gap: 7.2px;
`;

export const statValue = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 38.4px;
  font-weight: 700;
  color: #191f28;
  line-height: 1;

  @media (max-width: 1280px) {
    font-size: 28px;
  }
`;

export const statValueBlue = css`
  color: #3182f6;
`;

export const statValueYellow = css`
  color: #f59e0b;
`;

export const statUnit = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16.8px;
  color: #8b95a1;
  padding-bottom: 3px;
  font-feature-settings: 'ss05' 1;

  @media (max-width: 1280px) {
    font-size: 13px;
  }
`;

export const tableCard = css`
  background: #fff;
  border: 1.2px solid #e5e8eb;
  border-radius: 14.4px;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const tableWrap = css`
  overflow-x: auto;
  flex: 1;
  -webkit-overflow-scrolling: touch;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
`;

export const tableHeaderRow = css`
  background: #f9fafb;
  border-bottom: 1.2px solid #e5e8eb;
`;

export const th = css`
  height: 57.6px;
  padding: 0 12px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14.4px;
  font-weight: 600;
  color: #8b95a1;
  text-align: left;
  white-space: nowrap;
  font-feature-settings: 'ss05' 1;

  &:first-of-type {
    padding-left: 24px;
  }
  &:last-of-type {
    padding-right: 24px;
  }
`;

export const dataRow = css`
  border-bottom: 1.2px solid #e5e8eb;
  &:last-of-type {
    border-bottom: none;
  }
`;

export const td = css`
  height: 67.2px;
  padding: 0 12px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16.8px;
  color: #191f28;
  font-feature-settings: 'ss05' 1;
  white-space: nowrap;

  &:first-of-type {
    padding-left: 24px;
  }
  &:last-of-type {
    padding-right: 24px;
  }
`;

export const tdMuted = css`
  font-size: 15.6px;
  color: #4e5968;
`;

export const actionBadge = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28.8px;
  padding: 0 12px;
  border-radius: 14.4px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14.4px;
  font-weight: 500;
  white-space: nowrap;
  font-feature-settings: 'ss05' 1;
`;

export const actionEdit = css`
  background: #ebf4ff;
  color: #3182f6;
`;

export const actionInbound = css`
  background: #e8faf0;
  color: #30c85e;
`;

export const actionOutbound = css`
  background: #fff8e6;
  color: #f59e0b;
`;

export const actionDelete = css`
  background: #fff0f0;
  color: #f04452;
`;

export const statusBadge = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28.8px;
  padding: 0 12px;
  border-radius: 14.4px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14.4px;
  font-weight: 500;
  white-space: nowrap;
  font-feature-settings: 'ss05' 1;
`;

export const statusDone = css`
  background: #e8faf0;
  color: #30c85e;
`;

export const statusReview = css`
  background: #fff8e6;
  color: #f59e0b;
`;

export const pagination = css`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  height: 62.4px;
  padding: 0 24px;
  background: #f9fafb;
  flex-shrink: 0;
`;

export const pagInfo = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15.6px;
  color: #8b95a1;
  white-space: nowrap;
  font-feature-settings: 'ss05' 1;
`;

export const pagButtons = css`
  display: flex;
  align-items: center;
  gap: 4.8px;
`;

export const pagBtn = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38.4px;
  height: 38.4px;
  border-radius: 9.6px;
  border: 1.2px solid #e5e8eb;
  background: none;
  cursor: pointer;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15.6px;
  line-height: 1;
  color: #4e5968;
  padding: 0;
  &:hover {
    background: #f3f4f6;
  }
`;

export const pagBtnActive = css`
  background: #3182f6;
  border-color: #3182f6;
  color: #fff;
  font-weight: 600;
  &:hover {
    background: #1a6fdf;
  }
`;

export const perPageBtn = css`
  display: flex;
  align-items: center;
  gap: 7.2px;
  height: 38.4px;
  padding: 0 14.4px;
  border: 1.2px solid #e5e8eb;
  border-radius: 9.6px;
  background: none;
  cursor: pointer;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15.6px;
  color: #4e5968;
  &:hover {
    background: #f3f4f6;
  }
`;

export const PageWrap = styled.div`${pageWrap}`;
export const Header = styled.div`${header}`;
export const TitleBar = styled.div`${titleBar}`;
export const PageTitle = styled.h1`${pageTitle}`;
export const SearchField = styled.div`${searchField}`;
export const SearchInput = styled.input`${searchInput}`;
export const ChipsBar = styled.div`${chipsBar}`;
export const Chip = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  ${chip}
  ${({ active }) => active && chipActive}
`;
export const Separator = styled.div`${separator}`;
export const ContentArea = styled.div`${contentArea}`;
export const StatsCards = styled.div`${statsCards}`;
export const StatCard = styled.div`${statCard}`;
export const StatLabel = styled.p`${statLabel}`;
export const StatRow = styled.div`${statRow}`;
export const StatValue = styled('span', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: 'blue' | 'yellow' }>`
  ${statValue}
  ${({ color }) => color === 'blue' && statValueBlue}
  ${({ color }) => color === 'yellow' && statValueYellow}
`;
export const StatUnit = styled.span`${statUnit}`;
export const TableCard = styled.div`${tableCard}`;
export const TableWrap = styled.div`${tableWrap}`;
export const Table = styled.table`${table}`;
export const TableHeaderRow = styled.tr`${tableHeaderRow}`;
export const Th = styled.th`${th}`;
export const DataRow = styled.tr`${dataRow}`;
export const Td = styled('td', {
  shouldForwardProp: (prop) => prop !== 'muted',
})<{ muted?: boolean }>`
  ${td}
  ${({ muted }) => muted && tdMuted}
`;
export const ActionBadge = styled('span', {
  shouldForwardProp: (prop) => prop !== 'type',
})<{ type: 'edit' | 'inbound' | 'outbound' | 'delete' }>`
  ${actionBadge}
  ${({ type }) => type === 'edit' && actionEdit}
  ${({ type }) => type === 'inbound' && actionInbound}
  ${({ type }) => type === 'outbound' && actionOutbound}
  ${({ type }) => type === 'delete' && actionDelete}
`;
export const StatusBadge = styled('span', {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: 'done' | 'review' }>`
  ${statusBadge}
  ${({ status }) => status === 'done' && statusDone}
  ${({ status }) => status === 'review' && statusReview}
`;
export const Pagination = styled.div`${pagination}`;
export const PagInfo = styled.p`${pagInfo}`;
export const PagButtons = styled.div`${pagButtons}`;
export const PagBtn = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  ${pagBtn}
  ${({ active }) => active && pagBtnActive}
`;
export const PerPageBtn = styled.button`${perPageBtn}`;
