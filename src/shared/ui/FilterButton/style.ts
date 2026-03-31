import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const FilterWrap = styled.div`
  position: relative;
`;

export const FilterBtn = styled('button', {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  height: 40px;
  min-width: 96px;
  padding: 0 12px;
  border: 1px solid #bbbcc2;
  border-radius: 6px;
  background: #ffffff;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #1a1b1e;
  cursor: pointer;
  font-feature-settings: 'ss05' 1;
  white-space: nowrap;

  @media (max-width: 1440px) {
    height: 36px;
    min-width: 84px;
    font-size: 13px;
  }

  ${({ active }) => active && css`
    border-color: #0068e0;
    color: #0068e0;
  `}
`;

export const FilterPopover = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  z-index: 20;
  background: #ffffff;
  border: 1px solid #e5e6ea;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 180px;
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
