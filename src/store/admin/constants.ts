import { InstitutionType } from '@type/user';
import { AdminState } from './types';

export const adminInitialState: AdminState = {
  schools: [],
  universities: [],
  secondaries: [],
  otherInstitutions: [],
};

export const educationTypeMap: Record<
  InstitutionType | 'default',
  'schools' | 'secondaries' | 'universities' | 'otherInstitutions'
> = {
  school: 'schools',
  secondary: 'secondaries',
  university: 'universities',
  default: 'otherInstitutions',
};
