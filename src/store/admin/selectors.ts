import { InstitutionsAdmin } from '@type/user';
import { AdminState, adminStateName, StoreWithAdminState } from './types';

const getState = (store: StoreWithAdminState): AdminState =>
  store[adminStateName];

export const getSchools = (s: StoreWithAdminState): InstitutionsAdmin[] =>
  getState(s).schools;

export const getUniversities = (s: StoreWithAdminState): InstitutionsAdmin[] =>
  getState(s).universities;

export const getSecondaries = (s: StoreWithAdminState): InstitutionsAdmin[] =>
  getState(s).secondaries;

export const getOtherEducations = (
  s: StoreWithAdminState,
): InstitutionsAdmin[] => getState(s).otherInstitutions;
