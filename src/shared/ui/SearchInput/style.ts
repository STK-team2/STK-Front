import { css } from '@emotion/react';

export const searchWrap = css`
  position: relative;
  display: flex;
  align-items: center;
`;

export const searchInput = css`
  width: 240px;
  height: 40px;
  padding: 0 40px 0 12px;
  border: 1px solid #bbbcc2;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16px;
  color: #1a1b1e;
  outline: none;
  box-sizing: border-box;
  &::placeholder {
    color: #9497a0;
  }
  &:focus {
    border-color: #0068e0;
  }

  @media (max-width: 1280px) {
    width: 200px;
    height: 36px;
    font-size: 15px;
  }
  @media (max-width: 768px) {
    width: 200px;
    height: 38px;
    font-size: 18px;
  }
  @media (max-width: 480px) {
    width: 180px;
  }
`;

export const searchIcon = css`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  pointer-events: none;
`;
