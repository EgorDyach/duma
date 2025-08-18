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
import { useState } from 'react';
import Flex from '@components/Flex';
import ConfirmationModal from '@components/Modal/ConfirmationModal/ConfirmationModal';

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
  setIsEdit,
  ...props
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal)
  }

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
        {suffix && disabled && (
          <SuffixWrapper direction="row" align="center" onClick={handleOpenModal}>
            {suffix}
          </SuffixWrapper>
        )}
        {isOpenModal && setIsEdit && <ConfirmationModal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} setIsEdit={setIsEdit} />}
      </Flex>
    </Flex>
  );
};

export default Input;
