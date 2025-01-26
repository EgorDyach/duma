import { UserEducation } from '@type/user';
import { AdminState, adminStateName, StoreWithAdminState } from './types';

const getState = (store: StoreWithAdminState): AdminState =>
  store[adminStateName];

export const getSchools = (s: StoreWithAdminState): UserEducation[] =>
  getState(s).schools;

export const getUniversities = (s: StoreWithAdminState): UserEducation[] =>
  getState(s).universities;

export const getSecondaries = (s: StoreWithAdminState): UserEducation[] =>
  getState(s).secondaries;

export const getOtherEducations = (s: StoreWithAdminState): UserEducation[] =>
  getState(s).otherEducations;
