import { Item } from "@modules/rootPage/RootPage";
import { ReactNode } from "react";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>;

export type StudyPlan = {
  account: string;
  classes: {
    days_of_week: number;
    holidays: string[];
    id: number;
    name: string;
    profile_id: number;
    shift: number;
  }[];
  plan_study: {
    class_id: number;
    depends_on: number[];
    id: number;
    preriod: string;
    room: string;
    subject_id: number;
    teacher_id: number;
    time_lesson: number;
    total_hours: number;
    type: string;
  }[];
  profiles: {
    id: number;
    name: string;
  }[];
  rooms: {
    capacity: number;
    id: number;
    name: string;
    profile_ids: number[];
  }[];
  subjects: {
    id: number;
    name: string;
  }[];
  teachers: {
    class_ids: number[];
    holidays: string[];
    hours: number;
    id: number;
    name: string;
    room: string;
    subject_id: number;
  }[];
  users: [];
};

export type Profile = {
  id: number;
  name: string;
};

export type Auditorium = {
  capacity: number;
  id: number;
  name: string;
  profiles: Item[];
};

export type Group = {
  holidays: {
    id: number;
    date: string;
  }[];
  id: number;
  name: string;
  profile?: Item;
  profileID: number;
  shift: number;
};

export type Subject = {
  id: number;
  name: string;
};

export type Teacher = {
  fullname: string;
  holidays: {
    id: number;
    date: string;
  }[];
  id: number;
  lessons: string[];
};

export type Coaching = {
  auditoriumID: number;
  groupID: number;
  subjectID: number;
  hours: number;
  id: number;
};

export type CoachLesson = {
  id: number;
  coachingID: number;
  teacherID: number;
};
