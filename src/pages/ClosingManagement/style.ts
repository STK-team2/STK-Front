import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;
`;

export const PageInner = styled.div`
  padding: 32px;
  position: relative;

  @media (max-width: 1440px) {
    padding: 24px;
  }
`;

export const PageTitle = styled.h1`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #1a1b1e;
  margin: 0 0 20px 0;
  font-feature-settings: 'ss05' 1;

  @media (max-width: 1440px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

export const HeaderRow = styled.tr`
  background: #f8f9fa;
  border-bottom: 1px solid #bbbcc2;
`;

export const Th = styled.th`
  height: 44px;
  padding: 0 12px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #595b66;
  text-align: left;
  font-feature-settings: 'ss05' 1;
`;

export const DataRow = styled.tr`
  border-bottom: 1px solid #e5e6ea;
  &:hover {
    background: #f8f9fa;
  }
`;

export const Td = styled.td`
  height: 52px;
  padding: 0 12px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #1a1b1e;
  font-feature-settings: 'ss05' 1;
  max-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusText = styled('span', {
  shouldForwardProp: prop => prop !== 'closed',
})<{ closed?: boolean }>`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  font-weight: 500;
  font-feature-settings: 'ss05' 1;

  ${({ closed }) => closed ? css`
    color: #0068e0;
  ` : css`
    color: #1a1b1e;
  `}
`;

export const CloseBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 16px;
  background: #0068e0;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background: #0056b8;
  }
`;

export const CancelBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 16px;
  background: #9497a0;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background: #7c7f8a;
  }
`;
