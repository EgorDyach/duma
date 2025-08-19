import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { adminStateName } from './types';
import { adminInitialState, educationTypeMap } from './constants';
import { Institution, InstitutionsAdmin } from '@type/user';

const adminSlice = createSlice({
  name: adminStateName,
  initialState: adminInitialState,
  reducers: {
    setSchools(state, { payload }: PayloadAction<Institution[]>) {
      state.Schools = payload;
    },
    setSecondaries(state, { payload }: PayloadAction<Institution[]>) {
      state.Secondaries = payload;
    },
    setUniversities(state, { payload }: PayloadAction<Institution[]>) {
      state.Universities = payload;
    },
    setOtherInstitutions(state, { payload }: PayloadAction<Institution[]>) {
      state.otherInstitutions = payload;
    },
    removeItem(state, { payload }: PayloadAction<number>) {
      state.Schools = state.Schools.filter((el) => payload !== el.id);
      state.Universities = state.Universities.filter((el) => payload !== el.id);
      state.Secondaries = state.Secondaries.filter((el) => payload !== el.id);
      state.otherInstitutions = state.otherInstitutions.filter(
        (el) => payload !== el.id,
      );
    },
    addItem(state, { payload }: PayloadAction<Institution>) {
      const educationKey =
        educationTypeMap[payload.institution_type || 'School'] ||
        educationTypeMap.default;

      state[educationKey] = [...state[educationKey], payload];
    },
    editItem(state, { payload }: PayloadAction<Institution>) {
      const educationKey =
        educationTypeMap[payload.institution_type || 'School'] ||
        educationTypeMap.default;

      state[educationKey] = [
        ...state[educationKey].filter((el) => el.id !== payload.id),
        payload,
      ];
    },
    setAdmins(state, { payload }: PayloadAction<InstitutionsAdmin[]>) {
      state.admins = payload;
    },
    removeAdmin(state, { payload }: PayloadAction<string>) {
      state.admins = state.admins.filter((el) => payload !== el.email);
    },
    addAdmin(state, { payload }: PayloadAction<InstitutionsAdmin>) {
      state.admins = [...state.admins, payload];
    },
    editAdmin(state, { payload }: PayloadAction<InstitutionsAdmin>) {
      state.admins = [
        ...state.admins.filter((el) => el.email !== payload.email),
        payload,
      ];
    },
  },
});

export const { name, reducer, actions } = adminSlice;
