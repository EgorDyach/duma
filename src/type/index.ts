type Teacher = {
  createdAt?: string;
  deletedAt?: {};
  updatedAt?: string;
  id?: number;
  institution_id?: number;
  fullname: string;
  holidays?: Holiday[];
};

type Holiday = (HolidayDate | HolidayWeekDay) & {
  createdAt?: string;
  deletedAt?: {};
  updatedAt?: string;
  id?: number;
  institution_id?: number;
};

type HolidayDate = { date: string };
type HolidayWeekDay = { weekday: number };

type Subject = {
  createdAt?: string;
  deletedAt?: {};
  updatedAt?: string;
  id?: number;
  name: string;
  tags?: string[];
  institution_id?: number;
};

type Shift = {
  createdAt?: string;
  deletedAt?: {};
  updatedAt?: string;
  ID?: number;
  number: number;
  institution_id?: number;
};

type Group = {
  createdAt?: string;
  deletedAt?: {};
  updatedAt?: string;
  id?: number;
  name: string;
  shift?: number;
  studentsCount: number;
  profile_id?: number;
  disciplines?: string[];
  holidays?: Holiday[];
  institution_id?: number;
};

type Discipline = {
  createdAt?: string;
  deletedAt?: {};
  updatedAt?: string;
  id?: number;
  institution_id?: number;
  groups: Group[];
  hours: number;
  discipline_type: string;
  subject_id: number;
};

type Course = {
  createdAt?: string;
  deletedAt?: {};
  updatedAt?: string;
  id?: number;
  institution_id?: number;
  discipline_id: number;
  teacher_id: number;
};

type LessonTime = {
  createdAt?: string;
  deletedAt?: {};
  updatedAt?: string;
  id?: number;
  institution_id?: number;
  shift_id: number;
  startTime: string;
  endTime: string;
};

type Profile = {
  createdAt?: string;
  deletedAt?: {};
  updatedAt?: string;
  id?: number;
  institution_id?: number;
  name: string;
};

type Room = {
  createdAt?: string;
  deletedAt?: {};
  updatedAt?: string;
  id?: number;
  institution_id?: number;
  tags?: string[];
  capacity: number;
  name: string;
};
