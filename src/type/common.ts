import React, { ReactNode } from "react";

export type Indent =
  | "none"
  | "xsmall"
  | "small"
  | "xmedium"
  | "medium"
  | "large"
  | "xlarge"
  | "xxlarge"
  | "vlarge";

export interface IndentStylesProps {
  $top?: Indent;
  $left?: Indent;
}

export type FontSize =
  | "small"
  | "medium"
  | "default"
  | "big"
  | "title"
  | "subheader"
  | "header"
  | "heroMedium"
  | "heroLarge";

export interface BreadcrumbItem {
  title: string;
  path?: string;
}

export interface SidebarMenuLink {
  key: string;
  icon: ReactNode;
  label: string;
  path: string;
}

export interface SidebarMenuSubs {
  type: "divider";
}

export type SidebarMenuItem = SidebarMenuSubs | SidebarMenuLink;

export interface FormControlProps {
  name: string;
}

export interface PaginationQueryParams {
  limit: number;
  offset: number;
}

export interface TabsItem {
  label: string;
  key: string;
  children: string | ReactNode;
}

export interface CategoryItem {
  id: number;
  title: string;
}

export type Response<T> = {
  message: T;
  statusCode: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
