import { ApiResponse } from '@type/api';
import { handledRequest, getEmptyApiResponse } from './utils';
import { request } from '.';
import { InstitutionsAdmin } from '@type/user';

const requestInstitutions$ = async (): Promise<
  ApiResponse<InstitutionsAdmin[]>
> => {
  return request.get('/v1/s9rk988utk/accounts/manage/institution/admin/list');
};

export const requestInstitutions = handledRequest(
  requestInstitutions$,
  'Не удалось получить список учреждений!',
  getEmptyApiResponse<InstitutionsAdmin[]>(),
);

export const requestRemoveInstitution$ = async (
  email: string,
): Promise<ApiResponse<void>> => {
  return request.delete('/v1/s9rk988utk/accounts/manage/institution/admin', {
    data: { email },
  });
};

export const requestEditInstitution$ = async (
  newItem: InstitutionsAdmin,
): Promise<ApiResponse<void>> => {
  return request.put(
    '/v1/s9rk988utk/accounts/manage/institution/admin',
    newItem,
  );
};

export const requestAddInstitution$ = async (
  newItem: InstitutionsAdmin,
): Promise<ApiResponse<void>> => {
  console.log(newItem);
  return request.post(
    '/v1/s9rk988utk/accounts/manage/institution/admin/',
    newItem,
  );
};
