import { indent, radius } from "@lib/theme/sizes";
import styled from "styled-components";
import { getModalSize } from "./helpers";
import { ModalWidth } from "./constants";

export const StyledModalWrap = styled.div<{ $size: ModalWidth }>(
  ({ $size }) => `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    width: ${getModalSize($size)};
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
