import { indent, radius } from "@lib/theme/sizes";
import styled from "styled-components";
import { ModalWidth } from "./constants";
import { ItemTitle, SubHeader } from "@components/Typography";
import Flex from "@components/Flex";

export const StyledModalWrap = styled.div<{ $size: ModalWidth }>(
  () => `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: inherit;
    outline: 0;
    height: 100%;
    overflow-y: auto;
    padding: 20px 0;
    align-content: center;
  `
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
  border-radius: ${radius.xmedium};
  padding: ${indent.large};
`;

export const StyledModalTitle = styled(SubHeader)`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  background-color: #f0f0f7;
  color: #b4b4b9;
  padding: 3px 24px;
  text-align: left;
  border-radius: 10px;
`;

export const StyledModalInput = styled.input`
  font-size: 16px;
  border: none;
  outline: none;
  background-color: #9813d7;
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
  background-color: ${(props) => (props.$active ? "#9813D7" : "#fff")};
  width: 100%;
  padding: 6px;
  border-radius: 9px;
  border: 1.2px solid #9813d7;
  transition:
    background-color 0.2s ease-in-out,
    color 0.2s ease-in-out;
  cursor: pointer;
  max-width: 80px;
  color: ${(props) => (props.$active ? "#fff" : "#9813D7")};
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
