import { ChangeEvent, FC, ReactNode, useCallback } from "react";
import { withIndentStyles } from "@hocs/withIndentStyles";
import Flex from "@components/Flex";
import Label from "@components/Label";
import styled from "styled-components";

export interface InputProps {
  value: string;
  onChange: (v: string) => void;
  type?: "string" | "number" | "password";
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  label?: ReactNode;
  labelAction?: ReactNode;
  placeholder?: string;
  error?: boolean;
}

const StyledInput = styled.input`
  padding: 16px 24px;
  border: 1px solid #888;
  border-radius: 10px;
  font-size: 14px;
  font-family: "Montserrat";
  width: 100%;
`;

const RawInput: FC<InputProps> = ({
  labelAction,
  label,
  className,
  onChange,
  ...restProps
}) => {
  const showLabelRow = !!label || !!labelAction;

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div className={className}>
      {showLabelRow && (
        <Flex justify="space-between">
          {label && <Label>{label}</Label>}
          {labelAction && <Label>{labelAction}</Label>}
        </Flex>
      )}
      <StyledInput {...restProps} onChange={onChangeHandler} />
    </div>
  );
};

const Input = withIndentStyles(RawInput);

export default Input;
