import { Institution, InstitutionsAdmin } from '@type/user';

export const adminStateName = 'admin';

export type AdminState = {
  Schools: Institution[];
  Universities: Institution[];
  Secondaries: Institution[];
  otherInstitutions: Institution[];
  admins: InstitutionsAdmin[];
};

export type StoreWithAdminState = {
  [adminStateName]: AdminState;
};
