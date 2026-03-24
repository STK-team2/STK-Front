/** @jsxImportSource @emotion/react */
import { SearchIcon } from '../Icons';
import * as s from './style';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({ value, onChange, placeholder = '검색' }: SearchInputProps) => (
  <div css={s.searchWrap}>
    <input
      css={s.searchInput}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    <span css={s.searchIcon}><SearchIcon /></span>
  </div>
);
