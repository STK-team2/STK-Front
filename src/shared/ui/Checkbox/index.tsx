/** @jsxImportSource @emotion/react */
import { CheckIcon } from '../Icons';
import * as s from './style';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ checked, onChange }: CheckboxProps) => (
  <div css={[s.checkbox, checked && s.checkboxChecked]} onClick={onChange}>
    {checked && <CheckIcon />}
  </div>
);
