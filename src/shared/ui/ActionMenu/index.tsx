/** @jsxImportSource @emotion/react */
import { ChevronDownIcon, ChevronUpIcon } from '../Icons';
import * as s from './style';

interface ActionMenuProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items: string[];
  onItemClick?: (item: string) => void;
}

export const ActionMenu = ({ label, isOpen, onToggle, items, onItemClick }: ActionMenuProps) => (
  <div css={s.actionWrap}>
    <button
      css={[s.actionBtn, isOpen && s.actionBtnActive]}
      onClick={onToggle}
      type="button"
    >
      {label}
      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </button>
    {isOpen && (
      <div css={s.actionDropdown}>
        {items.map(item => (
          <button
            key={item}
            css={s.actionOption}
            type="button"
            onClick={() => onItemClick?.(item)}
          >
            {item}
          </button>
        ))}
      </div>
    )}
  </div>
);
