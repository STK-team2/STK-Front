import { CheckIcon } from '../Icons';
import { CheckboxBox } from './style';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export const Checkbox = ({ checked, onChange }: CheckboxProps) => (
  <CheckboxBox checked={checked} onClick={onChange}>
    {checked && <CheckIcon />}
  </CheckboxBox>
);
