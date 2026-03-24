import { css } from '@emotion/react';

export const registerWrapper = css`
  flex: 1;
  display: flex;
  flex-direction: row;
  text-align: left;
  min-height: 100svh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const leftPanel = css`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const leftBgImage = css`
  width: 72%;
  max-width: 800px;
  height: auto;
  transform: translateY(-40px);
`;

export const leftBgOverlay = css`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.7);
`;

export const rightPanel = css`
  width: 580px;
  flex-shrink: 0;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 80px 48px;
  box-sizing: border-box;
  overflow-y: auto;

  @media (max-width: 1440px) {
    width: 460px;
    padding: 60px 36px;
  }

  @media (max-width: 1280px) {
    width: 420px;
    padding: 60px 32px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 48px 24px;
    min-height: 100svh;
  }

  @media (max-width: 480px) {
    padding: 36px 20px;
  }
`;

export const formContainer = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 446px;
`;

export const heading = css`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const title = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 700;
  font-size: 28px;
  line-height: 1.4;
  color: #000000;
  font-feature-settings: 'ss05' 1;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const subtitle = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.6;
  color: #595b66;
  letter-spacing: -0.014px;
  font-feature-settings: 'ss05' 1;
  margin: 0;
`;

export const fieldsContainer = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const inputGroup = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const inputLabel = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  color: #595b66;
  font-feature-settings: 'ss05' 1;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const inputField = css`
  width: 100%;
  height: 48px;
  padding: 10px 16px;
  border: 1px solid #bbbcc2;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #1a1b1e;
  font-feature-settings: 'ss05' 1;
  outline: none;
  box-sizing: border-box;
  background: #ffffff;
  &::placeholder {
    color: #9497a0;
  }
  &:focus {
    border-color: #0068e0;
  }
`;

export const verifyRow = css`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const verifyInput = css`
  flex: 1;
  min-width: 0;
  height: 48px;
  padding: 10px 16px;
  border: 1px solid #bbbcc2;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #1a1b1e;
  font-feature-settings: 'ss05' 1;
  outline: none;
  box-sizing: border-box;
  background: #ffffff;
  &::placeholder {
    color: #9497a0;
  }
  &:focus {
    border-color: #0068e0;
  }
`;

export const verifyBtn = css`
  height: 48px;
  padding: 10px 16px;
  background: #0068e0;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  color: #ffffff;
  white-space: nowrap;
  cursor: pointer;
  font-feature-settings: 'ss05' 1;
  flex-shrink: 0;
  &:hover {
    background: #0056b8;
  }
`;

export const passwordWrapper = css`
  position: relative;
  display: flex;
  align-items: center;
`;

export const passwordInput = css`
  width: 100%;
  height: 48px;
  padding: 10px 48px 10px 16px;
  border: 1px solid #bbbcc2;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: #1a1b1e;
  font-feature-settings: 'ss05' 1;
  outline: none;
  box-sizing: border-box;
  background: #ffffff;
  &::placeholder {
    color: #9497a0;
  }
  &:focus {
    border-color: #0068e0;
  }
`;

export const visibilityBtn = css`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  color: #9497a0;
`;

export const submitBtn = css`
  width: 100%;
  height: 48px;
  background: #dddee3;
  border: none;
  border-radius: 6px;
  font-family: 'Pretendard Variable', sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.3;
  color: #ffffff;
  cursor: not-allowed;
  font-feature-settings: 'ss05' 1;
  transition: background 0.2s;
`;

export const submitBtnActive = css`
  background: #0068e0;
  cursor: pointer;
  &:hover {
    background: #0056b8;
  }
`;
