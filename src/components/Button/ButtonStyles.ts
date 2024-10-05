import styled from "styled-components";
import { boxShadow, button, content } from "@lib/theme/colors";
import { ReactNode } from "react";
import { indent } from "@lib/theme/sizes";

export const StyledButton = styled.button<{
  icon?: ReactNode;
  $type: "default" | "primary" | "danger";
  $borderRadius: number;
  padding?: string;
}>`
  padding: ${(props) => props.padding || `${indent.small} ${indent.medium}`};
  padding-left: ${(props) => props.icon && "12px"};
  transition: background-color 0.3s ease;
  font-size: ${indent.medium};
  font-family: "Montserrat";
  line-height: ${indent.medium};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.$borderRadius}px;
  color: ${(props) => (props.$type === "default" ? "#333" : "#fff")};
  cursor: pointer;
  background-color: ${(props) =>
    props.$type === "primary"
      ? content.primary
      : props.$type === "danger"
        ? "#D90D00"
        : "eee"};
  border: ${(props) =>
    props.$type === "default" ? `1px solid #cfd6dd` : "none"};

  &:not(:disabled) {
    &:focus-visible {
      outline-color: transparent;
      box-shadow: ${boxShadow.focused};
    }
  }

  &:disabled {
    color: ${content.white};
    background-color: ${button.primaryBg};
    opacity: 0.5;
    cursor: default;
  }

  & svg {
    transition: transform 0.3s ease;
    ${(props) =>
      props.$type === "danger" &&
      `
      transform: rotate(135deg);
    `}
  }

  &.ant-btn-default {
    &:not(:disabled) {
      &:hover {
        color: ${button.secondaryTextHover} !important;
        border-color: ${button.secondaryHover} !important;
      }

      &:active {
        color: ${button.secondaryTextActive} !important;
        border-color: ${button.secondaryActive} !important;
      }
    }
  }
`;
