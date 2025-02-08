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
  'schools' | 'secondaries' | 'universities' | 'otherEducations'
> = {
  school: 'schools',
  secondary: 'secondaries',
  university: 'universities',
  default: 'otherEducations',
};
