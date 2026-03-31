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
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ToolbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const QtyLabel = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 12px;
  color: #595b66;
  margin: 0 0 8px 0;
  font-feature-settings: 'ss05' 1;
`;

export const QtyInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const QtyInput = styled.input`
  width: 72px;
  height: 28px;
  border: none;
  border-bottom: 1.5px solid #0068e0;
  outline: none;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  text-align: center;
  color: #1a1b1e;
  background: transparent;
  &::placeholder {
    color: #bbbcc2;
  }
`;

export const QtySep = styled.span`
  font-size: 14px;
  color: #595b66;
`;

export const SortOptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 120px;
`;

export const SortOption = styled('button', {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 8px;
  border-radius: 4px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  color: #1a1b1e;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
  width: 100%;
  font-feature-settings: 'ss05' 1;
  &:hover {
    background: #f5f6f8;
  }

  ${({ active }) => active && css`
    color: #0068e0;
    font-weight: 500;
  `}
`;

export const TotalLabel = styled.p`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  color: #595b66;
  margin: 16px 0 8px;
  font-feature-settings: 'ss05' 1;
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

export const NewRow = styled.tr`
  border-bottom: 1px solid #e5e6ea;
  background: #fafbfc;
`;

export const NewRowInput = styled.input`
  width: 100%;
  height: 34px;
  padding: 0 8px;
  border: 1px solid #bbbcc2;
  border-radius: 4px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  color: #1a1b1e;
  outline: none;
  box-sizing: border-box;
  background: #ffffff;
  &:focus {
    border-color: #0068e0;
  }
`;

export const NewRowDateWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const NewRowDateInput = styled.input`
  width: 100%;
  height: 34px;
  padding: 0 8px;
  border: 1px solid #bbbcc2;
  border-radius: 4px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  color: #1a1b1e;
  outline: none;
  box-sizing: border-box;
  background: #ffffff;
  cursor: pointer;
  &:focus {
    border-color: #0068e0;
  }
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
  }
`;

export const CancelBtn = styled.button`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 16px;
  background: #ffffff;
  border: 1px solid #bbbcc2;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #595b66;
  cursor: pointer;
  &:hover {
    background: #f5f6f8;
  }
`;

export const DeleteBtn = styled.button`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 20px;
  background: #e85454;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background: #c94040;
  }
`;
