export const institutionStateName = 'institution';

export type InstitutionState = {
  teachers: Teacher[];
  rooms: Room[];
  subjects: Subject[];
  disciplines: Discipline[];
  lessonTimes: LessonTime[];
  shifts: Shift[];
  groups: Group[];
  profiles: Profile[];
};

export type StoreWithInstitutionState = {
  [institutionStateName]: InstitutionState;
};
