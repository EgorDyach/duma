import { FC, PropsWithChildren, ReactNode } from "react";
import { StyledButton } from "./ButtonStyles";
import { withIndentStyles } from "@hocs/withIndentStyles";

interface ButtonProps extends PropsWithChildren {
  onClick?: VoidFunction;
  disabled?: boolean;
  type?: "default" | "primary" | "danger";
  icon?: ReactNode;
  borderRadius?: number;
  padding?: string;
  className?: string;
}

const RawButton: FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  type = "primary",
  icon,
  borderRadius = 5,
  padding,
  className,
}) => (
  <StyledButton
    className={className}
    onClick={onClick}
    $borderRadius={borderRadius}
    $type={type}
    disabled={disabled}
    icon={icon}
    padding={padding}
  >
    {icon}
    {children}
  </StyledButton>
);

const Button = withIndentStyles(RawButton);
export default Button;
