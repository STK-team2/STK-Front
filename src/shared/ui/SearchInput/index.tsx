import { SearchIcon } from '../Icons';
import { SearchWrap, Input, IconWrap } from './style';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder = '검색' }: SearchInputProps) => (
  <SearchWrap>
    <Input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <IconWrap><SearchIcon /></IconWrap>
  </SearchWrap>
);
