import { withIndentStyles } from "@hocs/withIndentStyles";
import { FC, ReactNode } from "react";
import styled, { keyframes } from "styled-components";

const Input = styled.input`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`;

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-left: 28px;
`;

const rotate = keyframes`
 from {
    opacity: 0;
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    transform: rotate(45deg);
  }
`;

const Indicator = styled.div`
  width: 20px;
  height: 20px;
  background: transparent;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -28px;
  border: 1px solid #818181;
  border-radius: 0;

  ${Input}:not(:disabled):checked & {
    background: #d1d1d1;
  }

  ${Label}:hover & {
    background: #eee;
  }

  &::after {
    content: "";
    position: absolute;
    display: none;
  }

  ${Input}:checked + &::after {
    display: block;
    top: 0.1em;
    left: 0.35em;
    width: 25%;
    height: 60%;
    border: solid #f49200;
    border-width: 0 0.2em 0.2em 0;
    animation-name: ${rotate};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  &::disabled {
    cursor: not-allowed;
  }
`;

interface CheckboxProps {
  value?: string | number | readonly string[] | undefined;
  checked?: boolean;
  onChange?: VoidFunction;
  name?: string;
  id?: string;
  label?: ReactNode;
  className?: string;
}

const RawCheckbox: FC<CheckboxProps> = ({
  value,
  checked,
  onChange,
  name,
  id,
  label,
  className,
}) => {
  return (
    <Label className={className} htmlFor={id}>
      {label}
      <Input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <Indicator />
    </Label>
  );
};

export const Checkbox = withIndentStyles(RawCheckbox);
