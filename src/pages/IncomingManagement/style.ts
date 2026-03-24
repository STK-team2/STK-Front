import { css } from '@emotion/react';

export const backdrop = css`
  position: fixed;
  inset: 0;
  z-index: 10;
`;

export const pageInner = css`
  padding: 32px;
  position: relative;

  @media (max-width: 1440px) {
    padding: 24px;
  }
`;

export const pageTitle = css`
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

export const toolbar = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const filters = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const toolbarRight = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const qtyLabel = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 12px;
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
  font-size: 13px;
  text-align: center;
  color: #1a1b1e;
  background: transparent;
  &::placeholder {
    color: #bbbcc2;
  }
`;

export const qtySep = css`
  font-size: 14px;
  color: #595b66;
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
`;

export const sortOptionActive = css`
  color: #0068e0;
  font-weight: 500;
`;

export const totalLabel = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  color: #595b66;
  margin: 16px 0 8px;
  font-feature-settings: 'ss05' 1;
`;

export const tableWrap = css`
  width: 100%;
  overflow-x: auto;
`;

export const table = css`
  width: 100%;
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
  font-size: 13px;
  font-weight: 500;
  color: #595b66;
  text-align: left;
  font-feature-settings: 'ss05' 1;
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
  font-size: 14px;
  color: #1a1b1e;
  font-feature-settings: 'ss05' 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  font-size: 13px;
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


export const cancelBtn = css`
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

export const deleteBtn = css`
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

