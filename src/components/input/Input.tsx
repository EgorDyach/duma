import React from 'react';
import { content } from '@lib/theme/colors';
import { InputProps } from './types';
import {
  ErrorText,
  StyledInput,
  StyledLabel,
  SuffixWrapper,
  labelWrapper,
} from './InputStyles';

import Flex from '@components/Flex';

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
  disabled,
  ...props
}) => {
  return (
    <Flex direction="column" {...props}>
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
          onWheel={
            type === 'number' ? (e) => e.currentTarget.blur() : props.onWheel
          }
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.currentTarget.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
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
