import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const ActionWrap = styled.div`
  position: relative;
`;

export const ActionBtn = styled('button', {
  shouldForwardProp: prop => prop !== 'active',
})<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 0 14px;
  background: #0068e0;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;
  font-feature-settings: 'ss05' 1;
  &:hover {
    background: #0056b8;
  }

  @media (max-width: 1440px) {
    height: 36px;
    font-size: 13px;
  }

  ${({ active }) => active && css`
    background: #0056b8;
  `}
`;

export const ActionDropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 20;
  background: #ffffff;
  border: 1px solid #e5e6ea;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  min-width: 140px;
  overflow: hidden;
`;

export const ActionOption = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  background: none;
  border: none;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #1a1b1e;
  text-align: left;
  cursor: pointer;
  font-feature-settings: 'ss05' 1;
  &:hover {
    background: #f5f6f8;
  }
`;
