import { InstitutionsAdmin } from '@type/user';

export const adminStateName = 'admin';

export type AdminState = {
  schools: InstitutionsAdmin[];
  universities: InstitutionsAdmin[];
  secondaries: InstitutionsAdmin[];
  otherInstitutions: InstitutionsAdmin[];
};

export type StoreWithAdminState = {
  [adminStateName]: AdminState;
};
