import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const CheckboxBox = styled('div', {
  shouldForwardProp: prop => prop !== 'checked',
})<{ checked?: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 1.5px solid #bbbcc2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: #ffffff;
  flex-shrink: 0;

  ${({ checked }) => checked && css`
    background: #0068e0;
    border-color: #0068e0;
  `}
`;
