import { css } from '@emotion/react';

export const wrapper = css`
  display: flex;
  flex-direction: row;
  min-height: 100svh;
  background: #ffffff;
`;

export const sidebar = css`
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  position: sticky;
  top: 0;
  height: 100svh;

  @media (max-width: 1280px) {
    width: 190px;
  }
`;

export const logoWrap = css`
  padding: 20px 16px 16px;
`;

export const logoClip = css`
  width: 88px;
  overflow: hidden;
`;

export const logo = css`
  display: block;
  width: 242px;
  height: auto;
`;

export const nav = css`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const navItem = css`
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 20px;
  background: none;
  border: none;
  border-left: 3px solid transparent;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: #595b66;
  cursor: pointer;
  text-align: left;
  width: 100%;
  box-sizing: border-box;
  font-feature-settings: 'ss05' 1;
  &:hover {
    background: #f5f6f8;
  }

  @media (max-width: 1280px) {
    font-size: 15px;
    height: 44px;
  }
`;

export const navItemActive = css`
  border-left-color: #0068e0;
  background: linear-gradient(to right, rgba(0, 104, 224, 0.12), rgba(0, 104, 224, 0.01));
  color: #0068e0;
  font-weight: 600;
  &:hover {
    background: linear-gradient(to right, rgba(0, 104, 224, 0.18), rgba(0, 104, 224, 0.04));
  }
`;

export const logoutBtn = css`
  padding: 20px;
  background: none;
  border: none;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16px;
  color: #9497a0;
  cursor: pointer;
  text-align: left;
  font-feature-settings: 'ss05' 1;
  &:hover {
    color: #595b66;
  }
`;

export const content = css`
  flex: 1;
  min-width: 0;
  background: #ffffff;
  overflow-y: auto;
`;
