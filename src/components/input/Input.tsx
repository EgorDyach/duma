import React from "react";
import { content } from "@lib/theme/colors";
import { InputProps } from "./types";
import {
  ErrorText,
  StyledInput,
  StyledLabel,
  SuffixWrapper,
  labelWrapper,
} from "./InputStyles";

import Flex from "@components/Flex";

const Input: React.FC<InputProps> = ({
  value,
  type,
  label,
  onChange,
  error,
  placeholder,
  suffix,
  onBlur,
  onFocus,
}) => {
  return (
    <Flex direction="column">
      <Flex
        justify="space-between"
        direction="row"
        align="end"
        style={labelWrapper}
      >
        <StyledLabel $color={content.secondary}>{label}</StyledLabel>
        {!!error && <ErrorText>{error}</ErrorText>}
      </Flex>
      <Flex>
        <StyledInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {suffix && (
          <SuffixWrapper direction="row" align="center">
            {suffix}
          </SuffixWrapper>
        )}
      </Flex>
    </Flex>
  );
};

export default Input;
