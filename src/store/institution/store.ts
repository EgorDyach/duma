import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InstitutionState, institutionStateName } from './types';
import { institutionInitialState } from './constants';

export function getId(item: any): string | number | undefined {
  return item.id || item.ID || item.Id;
}

function createListReducers<T>(key: keyof InstitutionState) {
  return {
    set: (state: InstitutionState, { payload }: PayloadAction<T[]>) => {
      (state[key] as T[]) = payload;
    },
    add: (state: InstitutionState, { payload }: PayloadAction<T>) => {
      (state[key] as T[]).push(payload);
    },
    remove: (
      state: InstitutionState,
      { payload }: PayloadAction<string | number>,
    ) => {
      (state[key] as T[]) = (state[key] as T[]).filter(
        (item: any) => getId(item) !== payload,
      );
    },
    update: (
      state: InstitutionState,
      { payload }: PayloadAction<{ id: string | number; data: Partial<T> }>,
    ) => {
      const list = state[key] as T[];
      const index = list.findIndex((item: any) => getId(item) === payload.id);
      if (index !== -1) {
        list[index] = { ...list[index], ...payload.data };
      }
    },
  };
}

// Далее в createSlice:
const roomsReducers = createListReducers<Room>('rooms');
const subjectsReducers = createListReducers<Subject>('subjects');
const teachersReducers = createListReducers<Teacher>('teachers');
const disciplinesReducers = createListReducers<Discipline>('disciplines');
const lessonTimesReducers = createListReducers<LessonTime>('lessonTimes');
const shiftsReducers = createListReducers<Shift>('shifts');
const groupsReducers = createListReducers<Group>('groups');
const profilesReducers = createListReducers<Profile>('profiles');
const coursesReducers = createListReducers<Course>('courses');

const institutionSlice = createSlice({
  name: institutionStateName,
  initialState: institutionInitialState,
  // TODO: придумать что-то с этой тонной редьюсеров
  reducers: {
    addRoom: roomsReducers.add,
    setRooms: roomsReducers.set,
    removeRoom: roomsReducers.remove,
    updateRoom: roomsReducers.update,
    addSubject: subjectsReducers.add,
    setSubjects: subjectsReducers.set,
    removeSubject: subjectsReducers.remove,
    updateSubject: subjectsReducers.update,
    addTeacher: teachersReducers.add,
    setTeachers: teachersReducers.set,
    removeTeacher: teachersReducers.remove,
    updateTeacher: teachersReducers.update,
    addDiscipline: disciplinesReducers.add,
    setDisciplines: disciplinesReducers.set,
    removeDiscipline: disciplinesReducers.remove,
    updateDiscipline: disciplinesReducers.update,
    addLessonTime: lessonTimesReducers.add,
    setLessonTimes: lessonTimesReducers.set,
    removeLessonTime: lessonTimesReducers.remove,
    updateLessonTime: lessonTimesReducers.update,
    addShift: shiftsReducers.add,
    setShifts: shiftsReducers.set,
    removeShift: shiftsReducers.remove,
    updateShift: shiftsReducers.update,
    addGroup: groupsReducers.add,
    setGroups: groupsReducers.set,
    removeGroup: groupsReducers.remove,
    updateGroup: groupsReducers.update,
    addProfile: profilesReducers.add,
    setProfiles: profilesReducers.set,
    removeProfile: profilesReducers.remove,
    updateProfile: profilesReducers.update,
    addCourse: coursesReducers.add,
    setCourses: coursesReducers.set,
    removeCourse: coursesReducers.remove,
    updateCourse: coursesReducers.update,
  },
});

export const { name, reducer, actions } = institutionSlice;
