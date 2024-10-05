import styled from "styled-components";
import { indent } from "@lib/theme/sizes";
import { FC, ReactNode } from "react";
import { content } from "@lib/theme/colors";

const FieldErrorStyles = styled.div`
  position: absolute;
  top: ${indent.xsmall};
  left: 0;
  font-size: 12px;
  line-height: 12px;
  color: ${content.danger};
`;

export const FieldErrorStylesWrapper = styled.div`
  position: relative;
`;

export interface FieldErrorProps {
  error: ReactNode | null;
}

const FieldError: FC<FieldErrorProps> = ({ error }) => {
  if (!error) return null;
  return (
    <FieldErrorStylesWrapper>
      <FieldErrorStyles>{error}</FieldErrorStyles>
    </FieldErrorStylesWrapper>
  );
};

export default FieldError;
