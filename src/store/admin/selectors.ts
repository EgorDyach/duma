import { InstitutionsAdmin } from '@type/user';
import { AdminState, adminStateName, StoreWithAdminState } from './types';

const getState = (store: StoreWithAdminState): AdminState =>
  store[adminStateName];

export const getSchools = (s: StoreWithAdminState): InstitutionsAdmin[] =>
  getState(s).Schools;

export const getUniversities = (s: StoreWithAdminState): InstitutionsAdmin[] =>
  getState(s).Universities;

export const getSecondaries = (s: StoreWithAdminState): InstitutionsAdmin[] =>
  getState(s).Secondaries;

export const getOtherEducations = (
  s: StoreWithAdminState,
): InstitutionsAdmin[] => getState(s).otherInstitutions;
