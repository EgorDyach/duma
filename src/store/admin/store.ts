import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { adminStateName } from './types';
import { adminInitialState, educationTypeMap } from './constants';
import { InstitutionsAdmin } from '@type/user';

const adminSlice = createSlice({
  name: adminStateName,
  initialState: adminInitialState,
  reducers: {
    setSchools(state, { payload }: PayloadAction<InstitutionsAdmin[]>) {
      state.schools = payload;
    },
    setSecondaries(state, { payload }: PayloadAction<InstitutionsAdmin[]>) {
      state.secondaries = payload;
    },
    setUniversities(state, { payload }: PayloadAction<InstitutionsAdmin[]>) {
      state.universities = payload;
    },
    setOtherEducations(state, { payload }: PayloadAction<InstitutionsAdmin[]>) {
      state.otherInstitutions = payload;
    },
    removeItem(state, { payload }: PayloadAction<string>) {
      state.schools = state.schools.filter((el) => payload !== el.email);
      state.universities = state.universities.filter(
        (el) => payload !== el.email,
      );
      state.secondaries = state.secondaries.filter(
        (el) => payload !== el.email,
      );
      state.otherInstitutions = state.otherInstitutions.filter(
        (el) => payload !== el.email,
      );
    },
    addItem(state, { payload }: PayloadAction<InstitutionsAdmin>) {
      const educationKey =
        educationTypeMap[payload.institution.type] || educationTypeMap.default;

      state[educationKey] = [...state[educationKey], payload].sort((a, b) =>
        a.institution.name.localeCompare(b.institution.name),
      );
    },
    editItem(state, { payload }: PayloadAction<InstitutionsAdmin>) {
      const educationKey =
        educationTypeMap[payload.institution.type] || educationTypeMap.default;

      state[educationKey] = [
        ...state[educationKey].filter((el) => el.ID !== payload.ID),
        payload,
      ].sort((a, b) => a.institution.name.localeCompare(b.institution.name));
    },
  },
});

export const { name, reducer, actions } = adminSlice;
