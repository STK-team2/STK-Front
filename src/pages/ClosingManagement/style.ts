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

export const toolbarRight = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const toolbarSaveBtn = css`
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

export const toolbarCancelBtn = css`
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
export const sortOptionList = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 120px;
`;

export const sortOption = css`
  display: flex;
  align-items: center;
  height: 36px;
  padding: 0 8px;
  border-radius: 4px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
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
`;

export const sortOptionActive = css`
  color: #0068e0;
  font-weight: 500;
`;

export const dateFilterWrap = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 210px;
`;

export const dateFilterLabel = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #595b66;
  margin: 0;
  font-feature-settings: 'ss05' 1;
`;

export const dateRangeRow = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const dateRangeInput = css`
  width: 110px;
  height: 28px;
  border: none;
  border-bottom: 1.5px solid #0068e0;
  outline: none;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #1a1b1e;
  background: transparent;
  cursor: pointer;
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
  }
`;

export const dateRangeSep = css`
  font-size: 16px;
  color: #595b66;
`;

export const tableWrap = css`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-top: 16px;

  @media (max-width: 768px) {
    overflow-x: visible;
  }
`;

export const table = css`
  width: 100%;
  min-width: 1080px;
  border-collapse: collapse;
  table-layout: fixed;

  @media (max-width: 768px) {
    min-width: unset;
    display: block;
    table-layout: auto;
    width: 100%;

    colgroup {
      display: none;
    }

    tbody {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%;
    }
  }
`;

export const headerRow = css`
  background: #f8f9fa;
  border-bottom: 1px solid #bbbcc2;

  @media (max-width: 768px) {
    display: none;
  }
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
    display: none;
  }
`;

export const dataRow = css`
  border-bottom: 1px solid #e5e6ea;
  cursor: pointer;
  &:hover {
    background: #f8f9fa;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    background: #ffffff;
    border: 1px solid #e5e6ea;
    border-radius: 8px;
    padding: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
    box-sizing: border-box;
    margin-bottom: 0;

    &:hover {
      background: #ffffff;
    }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: auto;
    padding: 12px 0;
    max-width: none;
    overflow: visible;
    white-space: normal;
    word-break: keep-all;
    font-size: 21px;
    line-height: 1.4;
    border-bottom: 1px dashed #f0f0f5;
    box-sizing: border-box;
    text-align: right;
    
    &:last-child {
      border-bottom: none;
    }

    &::before {
      content: attr(data-label);
      font-weight: 600;
      color: #595b66;
      margin-right: 12px;
      flex-shrink: 0;
      text-align: left;
      font-size: 20px;
    }
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
export const ToolbarRight = styled.div`${toolbarRight}`;
export const ToolbarCancelBtn = styled.button`${toolbarCancelBtn}`;
export const ToolbarSaveBtn = styled.button`${toolbarSaveBtn}`;
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
export const StatusText = styled('span', {
  shouldForwardProp: (prop) => prop !== 'closed',
})<{ closed?: boolean }>`
  ${({ closed }) => (closed ? statusClosed : statusOpen)}
`;
export const SortOptionList = styled.div`${sortOptionList}`;
export const SortOption = styled('button', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  ${sortOption}
  ${({ active }) => active && sortOptionActive}
`;
export const DateFilterWrap = styled.div`${dateFilterWrap}`;
export const DateFilterLabel = styled.p`${dateFilterLabel}`;
export const DateRangeRow = styled.div`${dateRangeRow}`;
export const DateRangeInput = styled.input`${dateRangeInput}`;
export const DateRangeSep = styled.span`${dateRangeSep}`;
export const CloseBtn = styled.button`${closeBtn}`;
export const CancelBtn = styled.button`${cancelBtn}`;

export const modalOverlay = css`
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const modalCard = css`
  background: #ffffff;
  border-radius: 12px;
  padding: 28px 32px;
  width: 540px;
  max-width: calc(100vw - 32px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const modalTitle = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 18px;
  font-weight: 700;
  color: #1a1b1e;
  margin: 0;
  font-feature-settings: 'ss05' 1;
`;

export const modalFieldLabel = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #595b66;
  margin: 0 0 6px 0;
  font-feature-settings: 'ss05' 1;
`;

export const modalMonthInput = css`
  width: 100%;
  height: 40px;
  border: 1.5px solid #d1d3db;
  border-radius: 8px;
  padding: 0 12px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  color: #1a1b1e;
  outline: none;
  box-sizing: border-box;
  background: transparent;
  cursor: pointer;
  &:focus {
    border-color: #0068e0;
  }
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    opacity: 0.6;
  }
`;

export const modalActions = css`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const modalCancelBtn = css`
  height: 38px;
  padding: 0 18px;
  background: #ffffff;
  border: 1px solid #bbbcc2;
  border-radius: 8px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #595b66;
  cursor: pointer;
  &:hover {
    background: #f5f6f8;
  }
`;

export const modalConfirmBtn = css`
  height: 38px;
  padding: 0 20px;
  background: #0068e0;
  border: none;
  border-radius: 8px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background: #0056b8;
  }
  &:disabled {
    background: #bbbcc2;
    cursor: not-allowed;
  }
`;

export const modalSearchInput = css`
  width: 100%;
  height: 36px;
  border: 1.5px solid #d1d3db;
  border-radius: 8px;
  padding: 0 12px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #1a1b1e;
  outline: none;
  box-sizing: border-box;
  background: transparent;
  margin-bottom: 8px;
  &:focus {
    border-color: #0068e0;
  }
  &::placeholder {
    color: #9497a0;
  }
`;

export const modalItemList = css`
  max-height: 240px;
  overflow-y: auto;
  border: 1px solid #e5e6ea;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

export const modalItemRow = css`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  border-bottom: 1px solid #f0f1f4;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: #f5f6f8;
  }
`;

export const modalItemCode = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  color: #595b66;
  white-space: nowrap;
  flex-shrink: 0;
  font-feature-settings: 'ss05' 1;
`;

export const modalItemName = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #1a1b1e;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-feature-settings: 'ss05' 1;
`;

export const modalEmptyText = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #9497a0;
  text-align: center;
  padding: 24px 0;
  font-feature-settings: 'ss05' 1;
`;

export const ModalOverlay = styled.div`${modalOverlay}`;
export const ModalCard = styled.div`${modalCard}`;
export const ModalTitle = styled.h2`${modalTitle}`;
export const ModalFieldLabel = styled.p`${modalFieldLabel}`;
export const ModalMonthInput = styled.input`${modalMonthInput}`;
export const ModalActions = styled.div`${modalActions}`;
export const ModalCancelBtn = styled.button`${modalCancelBtn}`;
export const ModalConfirmBtn = styled.button`${modalConfirmBtn}`;
export const ModalSearchInput = styled.input`${modalSearchInput}`;
export const ModalItemList = styled.div`${modalItemList}`;
export const ModalItemRow = styled.div`${modalItemRow}`;
export const ModalItemCode = styled.span`${modalItemCode}`;
export const ModalItemName = styled.span`${modalItemName}`;
export const ModalEmptyText = styled.p`${modalEmptyText}`;
