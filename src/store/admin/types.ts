import { UserEducation } from '@type/user';

export const adminStateName = 'admin';

export type AdminState = {
  schools: UserEducation[];
  universities: UserEducation[];
  secondaries: UserEducation[];
  otherEducations: UserEducation[];
};

export type StoreWithAdminState = {
  [adminStateName]: AdminState;
};
