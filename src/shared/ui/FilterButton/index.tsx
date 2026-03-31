import { type ReactNode } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '../Icons';
import { FilterWrap, FilterBtn, FilterPopover } from './style';

interface FilterButtonProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children?: ReactNode;
}

export const FilterButton = ({ label, isOpen, onToggle, children }: FilterButtonProps) => (
  <FilterWrap>
    <FilterBtn active={isOpen} onClick={onToggle} type="button">
      {label}
      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </FilterBtn>
    {isOpen && children && (
      <FilterPopover>
        {children}
      </FilterPopover>
    )}
  </FilterWrap>
);
