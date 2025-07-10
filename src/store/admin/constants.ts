import { InstitutionType } from '@type/user';
import { AdminState } from './types';

export const adminInitialState: AdminState = {
  Schools: [],
  Universities: [],
  Secondaries: [],
  otherInstitutions: [],
};

export const educationTypeMap: Record<
  InstitutionType | 'default',
  'Schools' | 'Secondaries' | 'Universities' | 'otherInstitutions'
> = {
  School: 'Schools',
  Secondary: 'Secondaries',
  University: 'Universities',
  default: 'otherInstitutions',
};
