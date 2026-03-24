/** @jsxImportSource @emotion/react */
import { type ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../Icons';
import * as s from './style';

interface FilterButtonProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

export const FilterButton = ({ label, isOpen, onToggle, children }: FilterButtonProps) => (
  <div css={s.filterWrap}>
    <button
      css={[s.filterBtn, isOpen && s.filterBtnActive]}
      onClick={onToggle}
      type="button"
    >
      {label}
      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </button>
    {isOpen && children && (
      <div css={s.filterPopover}>
        {children}
      </div>
    )}
  </div>
);
