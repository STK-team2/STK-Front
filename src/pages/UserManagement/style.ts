import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const pageInner = css`
  display: flex;
  flex-direction: column;
  padding: 40px 48px;
  gap: 24px;
  min-height: 100%;
  box-sizing: border-box;

  @media (max-width: 1280px) {
    padding: 28px 32px;
  }
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

export const pageTitle = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #191f28;
  font-feature-settings: 'ss05' 1;
`;

export const tableCard = css`
  background: #fff;
  border: 1px solid #e5e8eb;
  border-radius: 14px;
  overflow: hidden;
`;

export const tableWrap = css`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

export const headerRow = css`
  background: #f9fafb;
  border-bottom: 1px solid #e5e8eb;
`;

export const th = css`
  height: 52px;
  padding: 0 16px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #8b95a1;
  text-align: left;
  white-space: nowrap;
  font-feature-settings: 'ss05' 1;

  &:first-of-type { padding-left: 24px; }
  &:last-of-type { padding-right: 24px; }
`;

export const dataRow = css`
  border-bottom: 1px solid #e5e8eb;
  &:last-of-type { border-bottom: none; }
`;

export const td = css`
  height: 60px;
  padding: 0 16px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  color: #191f28;
  font-feature-settings: 'ss05' 1;
  white-space: nowrap;

  &:first-of-type { padding-left: 24px; }
  &:last-of-type { padding-right: 24px; }
`;

export const roleBadge = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 0 10px;
  border-radius: 13px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 12px;
  font-weight: 600;
`;

export const roleBadgeAdmin = css`
  background: #ebf4ff;
  color: #0068e0;
`;

export const roleBadgeEmployee = css`
  background: #f3f4f6;
  color: #595b66;
`;

export const roleBtn = css`
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #d1d6db;
  background: none;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  color: #4e5968;
  cursor: pointer;
  font-feature-settings: 'ss05' 1;
  &:hover { background: #f3f4f6; }
`;

export const emptyRow = css`
  text-align: center;
  height: 80px;
  color: #8b95a1;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
`;

export const PageInner = styled.div`${pageInner}`;
export const PageTitle = styled.h1`${pageTitle}`;
export const TableCard = styled.div`${tableCard}`;
export const TableWrap = styled.div`${tableWrap}`;
export const Table = styled.table`${table}`;
export const HeaderRow = styled.tr`${headerRow}`;
export const Th = styled.th`${th}`;
export const DataRow = styled.tr`${dataRow}`;
export const Td = styled.td`${td}`;
export const RoleBadge = styled('span', {
  shouldForwardProp: (prop) => prop !== 'isAdmin',
})<{ isAdmin: boolean }>`
  ${roleBadge}
  ${({ isAdmin }) => isAdmin ? roleBadgeAdmin : roleBadgeEmployee}
`;
export const RoleBtn = styled.button`${roleBtn}`;
export const EmptyRow = styled.td`${emptyRow}`;
