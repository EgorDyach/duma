export const institutionStateName = 'institution';

export type InstitutionState = {
  lessons: Lesson[];
  teachers: Teacher[];
  rooms: Room[];
  subjects: Subject[];
  disciplines: Discipline[];
  lessonTimes: LessonTime[];
  shifts: Shift[];
  groups: Group[];
  profiles: Profile[];
  courses: Course[];
  faculties: Faculty[];
  departments: Department[];
};

export type StoreWithInstitutionState = {
  [institutionStateName]: InstitutionState;
};
