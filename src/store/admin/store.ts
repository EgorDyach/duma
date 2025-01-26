import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { adminStateName } from './types';
import { adminInitialState, educationTypeMap } from './constants';
import { UserEducation } from '@type/user';

const adminSlice = createSlice({
  name: adminStateName,
  initialState: adminInitialState,
  reducers: {
    setSchools(state, { payload }: PayloadAction<UserEducation[]>) {
      state.schools = payload;
    },
    setSecondaries(state, { payload }: PayloadAction<UserEducation[]>) {
      state.secondaries = payload;
    },
    setUniversities(state, { payload }: PayloadAction<UserEducation[]>) {
      state.universities = payload;
    },
    setOtherEducations(state, { payload }: PayloadAction<UserEducation[]>) {
      state.otherEducations = payload;
    },
    removeItem(state, { payload }: PayloadAction<string>) {
      state.schools = state.schools.filter((el) => payload !== el.email);
      state.universities = state.universities.filter(
        (el) => payload !== el.email,
      );
      state.secondaries = state.secondaries.filter(
        (el) => payload !== el.email,
      );
      state.otherEducations = state.otherEducations.filter(
        (el) => payload !== el.email,
      );
    },
    addItem(state, { payload }: PayloadAction<UserEducation>) {
      const educationKey =
        educationTypeMap[payload.Education.type] || educationTypeMap.default;

      state[educationKey] = [...state[educationKey], payload].sort((a, b) =>
        a.Education.name.localeCompare(b.Education.name),
      );
    },
    editItem(state, { payload }: PayloadAction<UserEducation>) {
      const educationKey =
        educationTypeMap[payload.Education.type] || educationTypeMap.default;

      state[educationKey] = [
        ...state[educationKey].filter((el) => el.ID !== payload.ID),
        payload,
      ].sort((a, b) => a.Education.name.localeCompare(b.Education.name));
    },
  },
});

export const { name, reducer, actions } = adminSlice;
