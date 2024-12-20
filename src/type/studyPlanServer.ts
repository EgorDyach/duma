import { Item } from "./studyPlan";

export type Profile = {
  id: number;
  name: string;
};

export type Room = {
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
  count: number;
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
  RoomID?: number;
  groupID: number;
  subjectID: number;
  hours: number;
  id: number;
};

export type CoachLesson = {
  coachingID: number;
  teacherID: number;
};
