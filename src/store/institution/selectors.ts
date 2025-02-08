import {
  InstitutionState,
  institutionStateName,
  StoreWithInstitutionState,
} from './types';

const getState = (store: StoreWithInstitutionState): InstitutionState =>
  store[institutionStateName];

export const getRooms = (s: StoreWithInstitutionState): Room[] =>
  getState(s).rooms;

export const getSubjects = (s: StoreWithInstitutionState): Subject[] =>
  getState(s).subjects;

export const getTeachers = (s: StoreWithInstitutionState): Teacher[] =>
  getState(s).teachers;

export const getShifts = (s: StoreWithInstitutionState): Shift[] =>
  getState(s).shifts;

export const getLessonTimes = (s: StoreWithInstitutionState): LessonTime[] =>
  getState(s).lessonTimes;

export const getDiscplines = (s: StoreWithInstitutionState): Discipline[] =>
  getState(s).disciplines;

export const getGroups = (s: StoreWithInstitutionState): Group[] =>
  getState(s).groups;

export const getProfiles = (s: StoreWithInstitutionState): Profile[] =>
  getState(s).profiles;
