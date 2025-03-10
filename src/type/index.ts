type Teacher = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  institution_id?: number;
  fullname: string;
  holidays?: Holiday[];
};

type Holiday = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  institution_id?: number;
  date: string;
};

type Subject = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  name: string;
  tags?: string[];
  institution_id?: number;
};

type Shift = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  number: number;
  institution_id?: number;
};

type Group = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  name: string;
  shift_id: number;
  studentscount: number;
  profile_id?: number;
  disciplines?: string[];
  holidays?: Holiday[];
  institution_id?: number;
};

type Discipline = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  institution_id?: number;
  groups: Group[];
  hours: number;
  discipline_type: string;
  subject_id: number;
};

type Course = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  institution_id?: number;
  discipline_id: number;
  teacher_id: number;
};

type LessonTime = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  institution_id?: number;
  shift_id: number;
  start_time: string;
  end_time: string;
  number?: number;
};

type Profile = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  institution_id?: number;
  name: string;
};

type RoomData = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  institution_id?: number;
  capacity: number;
  name: string;
};

type RoomLabel = {
  createdat?: string;
  deletedAt?: {};
  id?: number;
  label_value: string;
  room_id?: number;
  updatedat?: string;
};

type RoomTaint = {
  createat?: string;
  deletedat?: {};
  id?: number;
  room_id?: number;
  should_exist?: boolean;
  taint_value: string;
  updatedat?: string;
};

type Room = {
  room: RoomData;
  roomtaints: RoomTaint[];
  roomlabels: RoomLabel[];
};
