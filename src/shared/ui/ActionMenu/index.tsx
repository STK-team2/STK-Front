import { ChevronDownIcon, ChevronUpIcon } from '../Icons';
import { ActionWrap, ActionBtn, ActionDropdown, ActionOption } from './style';

interface ActionMenuProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items: string[];
  onItemClick?: (item: string) => void;
}

export const ActionMenu = ({ label, isOpen, onToggle, items, onItemClick }: ActionMenuProps) => (
  <ActionWrap>
    <ActionBtn active={isOpen} onClick={onToggle} type="button">
      {label}
      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </ActionBtn>
    {isOpen && (
      <ActionDropdown>
        {items.map(item => (
          <ActionOption
            key={item}
            type="button"
            onClick={() => onItemClick?.(item)}
          >
            {item}
          </ActionOption>
        ))}
      </ActionDropdown>
    )}
  </ActionWrap>
);
