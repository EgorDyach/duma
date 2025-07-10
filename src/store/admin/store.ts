import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { adminStateName } from './types';
import { adminInitialState, educationTypeMap } from './constants';
import { InstitutionsAdmin } from '@type/user';

const adminSlice = createSlice({
  name: adminStateName,
  initialState: adminInitialState,
  reducers: {
    setSchools(state, { payload }: PayloadAction<InstitutionsAdmin[]>) {
      state.Schools = payload;
    },
    setSecondaries(state, { payload }: PayloadAction<InstitutionsAdmin[]>) {
      state.Secondaries = payload;
    },
    setUniversities(state, { payload }: PayloadAction<InstitutionsAdmin[]>) {
      state.Universities = payload;
    },
    setOtherInstitutions(
      state,
      { payload }: PayloadAction<InstitutionsAdmin[]>,
    ) {
      state.otherInstitutions = payload;
    },
    removeItem(state, { payload }: PayloadAction<string>) {
      state.Schools = state.Schools.filter((el) => payload !== el.email);
      state.Universities = state.Universities.filter(
        (el) => payload !== el.email,
      );
      state.Secondaries = state.Secondaries.filter(
        (el) => payload !== el.email,
      );
      state.otherInstitutions = state.otherInstitutions.filter(
        (el) => payload !== el.email,
      );
    },
    addItem(state, { payload }: PayloadAction<InstitutionsAdmin>) {
      const educationKey =
        educationTypeMap[payload.institution?.institution_type || 'School'] ||
        educationTypeMap.default;

      state[educationKey] = [...state[educationKey], payload];
    },
    editItem(state, { payload }: PayloadAction<InstitutionsAdmin>) {
      const educationKey =
        educationTypeMap[payload.institution?.institution_type || 'School'] ||
        educationTypeMap.default;

      state[educationKey] = [
        ...state[educationKey].filter((el) => el.id !== payload.id),
        payload,
      ];
    },
  },
});

export const { name, reducer, actions } = adminSlice;
