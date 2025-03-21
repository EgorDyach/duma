import { indent, radius } from '@lib/theme/sizes';
import styled from 'styled-components';
import { ModalWidth } from './constants';
import { ItemTitle, SubHeader } from '@components/Typography';
import Flex from '@components/Flex';
import Button from '@components/Button';

export const StyledModalWrap = styled.div<{ $size: ModalWidth }>(
  () => `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: 100%;
    outline: 0;
    height: 100%;
    padding: 20px 0;
    overflow-y: auto;
    align-content: center;
  `,
);

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

export const StyledModalContent = styled.div`
  z-index: 100;
  position: relative;
  margin: auto;
  background: #fff;
  max-width: 80vw;
  width: fit-content;
  min-width: 320px;
  border-radius: ${radius.xmedium};
  padding: ${indent.large};
`;

export const StyledModalTitle = styled(SubHeader)`
  line-height: 20px;
  font-weight: 600;
  margin-right: 50px;
  color: black;
  text-align: left;
  width: fit-content;
  border-radius: 10px;
`;

export const StyledModalInput = styled.input`
  font-size: 16px;
  border: none;
  outline: none;
  background-color: #641aee;
  color: #fff;
  padding: 3px 24px;
  text-align: left;
  border-radius: 10px;
  &::placeholder {
    color: #b982c4;
    font-size: 13px;
  }
`;

export const StyledModalButton = styled.button<{
  $active: boolean;
}>`
  background-color: ${(props) => (props.$active ? '#641AEE' : '#fff')};
  width: 100%;
  padding: 6px;
  border-radius: 9px;
  border: 1.2px solid #641aee;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: 80px;
  color: ${(props) => (props.$active ? '#fff' : '#641AEE')};
`;

export const StyledItemTitle = styled(ItemTitle)`
  color: #c9c9cf;
  font-size: 12px;
  font-weight: 400;
  line-height: 16.39px;
  span {
    color: #d90000;
  }
`;

export const StyledModalButtons = styled(Flex)`
  width: 100%;
`;

export const StyledModalAdd = Button;
