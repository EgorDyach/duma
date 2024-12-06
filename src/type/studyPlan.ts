export type Item = {
  name: string;
  id: number;
};

export type TeacherItem = Item & {
  hours: number;
  surName: string;
  firstName: string;
  lastName: string;
  subjects: {
    name: string;
    room: AuditoryItem | null;
    id: number;
    type: "practice" | "lecture";
  }[];
};

export type ClassItem = Item & {
  shift: 1 | 2;
  count: number;
  account: AccountItem | null;
};

export type AuditoryItem = Item & {
  capacity: number;
  accounts: AccountItem[];
};

export type AccountItem = Item;

export type SubjectItem = Item & {
  room: AuditoryItem | null;
  teacher: TeacherItem[] | null;
  type: "practice" | "lecture";
  dependsOn: [];
};

export type LessonTime = {
  ID: number;
  StartTime: string;
  EndTime: string;
};

export type StudyPlan = {
  classId: number;
  id: number;
  subjectId: number;
  value: number;
};
