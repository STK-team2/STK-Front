import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const backdrop = css`
  position: fixed;
  inset: 0;
  z-index: 10;
`;

export const pageInner = css`
  padding: 32px;
  position: relative;

  @media (max-width: 1280px) {
    padding: 24px;
  }
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const pageTitle = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 26px;
  font-weight: 700;
  color: #1a1b1e;
  margin: 0 0 20px 0;
  font-feature-settings: 'ss05' 1;

  @media (max-width: 1280px) {
    font-size: 22px;
    margin-bottom: 16px;
  }
  @media (max-width: 768px) {
    font-size: 18px;
    margin-bottom: 12px;
  }
`;

export const toolbar = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const filters = css`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 6px;
  }
`;

export const tableWrap = css`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const table = css`
  width: 100%;
  min-width: 870px;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const headerRow = css`
  background: #f8f9fa;
  border-bottom: 1px solid #bbbcc2;
`;

export const th = css`
  height: 44px;
  padding: 0 12px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #595b66;
  text-align: left;
  white-space: nowrap;
  font-feature-settings: 'ss05' 1;

  @media (max-width: 768px) {
    height: 36px;
    padding: 0 8px;
    font-size: 13px;
  }
`;

export const dataRow = css`
  border-bottom: 1px solid #e5e6ea;
  &:hover {
    background: #f8f9fa;
  }
`;

export const td = css`
  height: 52px;
  padding: 0 12px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16px;
  color: #1a1b1e;
  font-feature-settings: 'ss05' 1;
  max-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 768px) {
    height: 44px;
    padding: 0 8px;
    font-size: 13px;
  }
`;

export const statusClosed = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #0068e0;
  font-feature-settings: 'ss05' 1;
`;

export const statusOpen = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #1a1b1e;
  font-feature-settings: 'ss05' 1;
`;

export const closeBtn = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 16px;
  background: #0068e0;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background: #0056b8;
  }

  @media (max-width: 768px) {
    height: 36px;
    font-size: 13px;
    padding: 0 12px;
  }
`;

export const cancelBtn = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 16px;
  background: #9497a0;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background: #7c7f8a;
  }

  @media (max-width: 768px) {
    height: 36px;
    font-size: 13px;
    padding: 0 12px;
  }
`;

export const Backdrop = styled.div`${backdrop}`;
export const PageInner = styled.div`${pageInner}`;
export const PageTitle = styled.h1`${pageTitle}`;
export const Toolbar = styled.div`${toolbar}`;
export const Filters = styled.div`${filters}`;
export const TableWrap = styled.div`${tableWrap}`;
export const Table = styled.table`${table}`;
export const HeaderRow = styled.tr`${headerRow}`;
export const Th = styled.th`${th}`;
export const DataRow = styled.tr`${dataRow}`;
export const Td = styled.td`${td}`;
export const StatusText = styled('span', {
  shouldForwardProp: (prop) => prop !== 'closed',
})<{ closed?: boolean }>`
  ${({ closed }) => (closed ? statusClosed : statusOpen)}
`;
export const CloseBtn = styled.button`${closeBtn}`;
export const CancelBtn = styled.button`${cancelBtn}`;
