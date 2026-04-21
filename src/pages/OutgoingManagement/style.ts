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

export const toolbarRight = css`
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 6px;
  }
`;

export const qtyLabel = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #595b66;
  margin: 0 0 8px 0;
  font-feature-settings: 'ss05' 1;
`;

export const qtyInputRow = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const qtyInput = css`
  width: 72px;
  height: 28px;
  border: none;
  border-bottom: 1.5px solid #0068e0;
  outline: none;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  text-align: center;
  color: #1a1b1e;
  background: transparent;
  &::placeholder {
    color: #bbbcc2;
  }
`;

export const qtySep = css`
  font-size: 16px;
  color: #595b66;
`;

export const totalLabel = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  color: #595b66;
  margin: 16px 0 8px;
  font-feature-settings: 'ss05' 1;
`;

export const contentLayout = css`
  display: flex;
  align-items: flex-start;
  gap: 24px;

  @media (max-width: 1280px) {
    flex-direction: column;
  }
`;

export const tableSection = css`
  flex: 1;
  min-width: 0;
`;

export const tableWrap = css`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

export const table = css`
  width: 100%;
  min-width: 1120px;
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
  cursor: pointer;
  &:hover {
    background: #f8f9fa;
  }
`;

export const dataRowActive = css`
  background: #eef5ff;
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

export const newRow = css`
  border-bottom: 1px solid #e5e6ea;
  background: #fafbfc;
`;

export const newRowInput = css`
  width: 100%;
  height: 34px;
  padding: 0 8px;
  border: 1px solid #bbbcc2;
  border-radius: 4px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  color: #1a1b1e;
  outline: none;
  box-sizing: border-box;
  background: #ffffff;
  &:focus {
    border-color: #0068e0;
  }
`;

export const newRowDateWrap = css`
  position: relative;
  display: flex;
  align-items: center;
`;

export const newRowDateInput = css`
  width: 100%;
  height: 34px;
  padding: 0 8px;
  border: 1px solid #bbbcc2;
  border-radius: 4px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
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

export const cancelBtn = css`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 16px;
  background: #ffffff;
  border: 1px solid #bbbcc2;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #595b66;
  cursor: pointer;
  &:hover {
    background: #f5f6f8;
  }
`;

export const deleteBtn = css`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 20px;
  background: #e85454;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background: #c94040;
  }
`;

export const saveBtn = css`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 20px;
  background: #0068e0;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background: #0056b8;
  }
`;

export const Backdrop = styled.div`${backdrop}`;
export const PageInner = styled.div`${pageInner}`;
export const PageTitle = styled.h1`${pageTitle}`;
export const Toolbar = styled.div`${toolbar}`;
export const Filters = styled.div`${filters}`;
export const ToolbarRight = styled.div`${toolbarRight}`;
export const QtyLabel = styled.p`${qtyLabel}`;
export const QtyInputRow = styled.div`${qtyInputRow}`;
export const QtyInput = styled.input`${qtyInput}`;
export const QtySep = styled.span`${qtySep}`;
export const TotalLabel = styled.p`${totalLabel}`;
export const ContentLayout = styled.div`${contentLayout}`;
export const TableSection = styled.div`${tableSection}`;
export const TableWrap = styled.div`${tableWrap}`;
export const Table = styled.table`${table}`;
export const HeaderRow = styled.tr`${headerRow}`;
export const Th = styled.th`${th}`;
export const DataRow = styled('tr', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  ${dataRow}
  ${({ active }) => active && dataRowActive}
`;
export const Td = styled.td`${td}`;
export const NewRow = styled.tr`${newRow}`;
export const NewRowInput = styled.input`${newRowInput}`;
export const NewRowDateWrap = styled.div`${newRowDateWrap}`;
export const NewRowDateInput = styled.input`${newRowDateInput}`;
export const CancelBtn = styled.button`${cancelBtn}`;
export const DeleteBtn = styled.button`${deleteBtn}`;
export const SaveBtn = styled.button`${saveBtn}`;
