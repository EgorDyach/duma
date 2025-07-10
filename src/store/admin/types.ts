import { InstitutionsAdmin } from '@type/user';

export const adminStateName = 'admin';

export type AdminState = {
  Schools: InstitutionsAdmin[];
  Universities: InstitutionsAdmin[];
  Secondaries: InstitutionsAdmin[];
  otherInstitutions: InstitutionsAdmin[];
};

export type StoreWithAdminState = {
  [adminStateName]: AdminState;
};
