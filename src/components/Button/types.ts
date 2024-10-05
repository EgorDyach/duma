import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  type?: "primary" | "default" | "text";
  htmlType?: "button" | "submit";
  size?: "small" | "medium" | "large";
  width?: "auto" | "full";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
}

export enum ButtonSize {
  small = "small",
  medium = "middle",
  large = "large",
}

export enum ButtonWidth {
  auto = "auto",
  full = "full",
}
