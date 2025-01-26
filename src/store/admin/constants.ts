import { EducationType } from '@type/user';
import { AdminState } from './types';

export const adminInitialState: AdminState = {
  schools: [],
  universities: [],
  secondaries: [],
  otherEducations: [],
};

export const educationTypeMap: Record<
  EducationType | 'default',
  'schools' | 'secondaries' | 'universities' | 'otherEducations'
> = {
  school: 'schools',
  secondary: 'secondaries',
  university: 'universities',
  default: 'otherEducations',
};
