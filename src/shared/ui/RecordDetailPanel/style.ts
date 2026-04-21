import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const panel = css`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 30;
  width: min(420px, calc(100vw - 32px));
  height: 100vh;
  border: 1px solid #e5e7eb;
  border-right: none;
  border-radius: 20px 0 0 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfcff 100%);
  box-shadow: -20px 0 60px rgba(15, 23, 42, 0.18);
  overflow-y: auto;
  animation: ${slideIn} 180ms ease-out;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const panelClosing = css`
  animation: ${slideOut} 180ms ease-in forwards;
`;

export const overlay = css`
  position: fixed;
  inset: 0;
  z-index: 29;
  background: rgba(15, 23, 42, 0.08);
  animation: ${fadeIn} 180ms ease-out;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const overlayClosing = css`
  animation: ${fadeOut} 180ms ease-in forwards;
`;

export const header = css`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 24px 24px 20px;
  border-bottom: 1px solid #edf0f4;
`;

export const titleWrap = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const title = css`
  margin: 0;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  line-height: 1.25;
  word-break: keep-all;
`;

export const subtitle = css`
  margin: 0;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 14px;
  color: #6b7280;
  line-height: 1.5;
`;

export const closeButton = css`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #6b7280;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    background: #f8fafc;
  }
`;

export const body = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
`;

export const section = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const sectionTitle = css`
  margin: 0;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
`;

export const fieldList = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const fieldRow = css`
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr);
  gap: 12px;
  align-items: start;
`;

export const fieldLabel = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  line-height: 1.5;
`;

export const fieldValue = css`
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  color: #111827;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const fieldValueEditable = css`
  cursor: text;
  border-radius: 6px;

  &:hover {
    background: #f1f5f9;
  }
`;

export const fieldValueMuted = css`
  color: #6b7280;
`;

export const fieldInput = css`
  width: 100%;
  height: 34px;
  padding: 0 10px;
  border: 1px solid #0068e0;
  border-radius: 8px;
  outline: none;
  box-sizing: border-box;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 15px;
  color: #111827;
  background: #ffffff;
`;

export const footer = css`
  position: sticky;
  bottom: 0;
  padding: 16px 24px 24px;
  background: linear-gradient(180deg, rgba(251, 252, 255, 0) 0%, #fbfcff 28%);
`;

export const deleteButton = css`
  width: 100%;
  height: 48px;
  border: none;
  border-radius: 12px;
  background: #e85454;
  color: #ffffff;
  font-family: 'Pretendard Variable', sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #c94040;
  }
`;

export const Panel = styled('aside', {
  shouldForwardProp: (prop) => prop !== 'closing',
})<{ closing?: boolean }>`
  ${panel}
  ${({ closing }) => closing && panelClosing}
`;
export const Overlay = styled('div', {
  shouldForwardProp: (prop) => prop !== 'closing',
})<{ closing?: boolean }>`
  ${overlay}
  ${({ closing }) => closing && overlayClosing}
`;
export const Header = styled.div`${header}`;
export const TitleWrap = styled.div`${titleWrap}`;
export const Title = styled.h2`${title}`;
export const Subtitle = styled.p`${subtitle}`;
export const CloseButton = styled.button`${closeButton}`;
export const Body = styled.div`${body}`;
export const Section = styled.section`${section}`;
export const SectionTitle = styled.h3`${sectionTitle}`;
export const FieldList = styled.div`${fieldList}`;
export const FieldRow = styled.div`${fieldRow}`;
export const FieldLabel = styled.div`${fieldLabel}`;
export const FieldValue = styled('div', {
  shouldForwardProp: (prop) => prop !== 'editable',
})<{ editable?: boolean }>`
  ${fieldValue}
  ${({ editable }) => editable && fieldValueEditable}
`;
export const FieldInput = styled.input`${fieldInput}`;
export const Footer = styled.div`${footer}`;
export const DeleteButton = styled.button`${deleteButton}`;
