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

type CourseData = {
  createdat?: string;
  deletedat?: {};
  updatedat?: string;
  id?: number;
  institution_id?: number;
  discipline_id: number;
  teacher_id: number;
};

type CourseAffinity = {
  course_id?: number;
  createdAt?: string;
  deletedAt?: {};
  entity: string;
  id?: 0;
  label?: string;
  should_exist: boolean;
  updatedAt?: string;
};

type CourseToleration = {
  course_id?: number;
  createdAt?: string;
  deletedAt?: {};
  id?: number;
  toleration_value: string;
  updatedAt?: string;
};

type Course = {
  course: CourseData;
  course_affinity: CourseAffinity[];
  course_toleration: CourseToleration[];
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
  createdAt?: string;
  deletedAt?: {};
  updatedat?: string;
  id?: number;
  institution_id?: number;
  capacity: number;
  name: string;
};

type RoomLabel = {
  createdAt?: string;
  deletedAt?: {};
  id?: number;
  label_value: string;
  room_id?: number;
  updatedat?: string;
};

type RoomTaint = {
  createAt?: string;
  deletedAt?: {};
  id?: number;
  room_id?: number;
  should_exist?: boolean;
  taint_value: string;
  updatedat?: string;
};

type Room = {
  room: RoomData;
  room_taints: RoomTaint[];
  room_labels: RoomLabel[];
};
