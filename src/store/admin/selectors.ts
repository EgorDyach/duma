import { Institution, InstitutionsAdmin } from '@type/user';
import { AdminState, adminStateName, StoreWithAdminState } from './types';

const getState = (store: StoreWithAdminState): AdminState =>
  store[adminStateName];

export const getSchools = (s: StoreWithAdminState): Institution[] =>
  getState(s).Schools;

export const getUniversities = (s: StoreWithAdminState): Institution[] =>
  getState(s).Universities;

export const getSecondaries = (s: StoreWithAdminState): Institution[] =>
  getState(s).Secondaries;

export const getOtherEducations = (s: StoreWithAdminState): Institution[] =>
  getState(s).otherInstitutions;

export const getAdmins = (s: StoreWithAdminState): InstitutionsAdmin[] =>
  getState(s).admins;
