import { ApiResponse } from '@type/api';
import { handledRequest, getEmptyApiResponse } from './utils';
import { request } from '.';
import { Institution, InstitutionsAdmin } from '@type/user';

const requestInstitution$ = async (
  id: number,
): Promise<ApiResponse<Institution>> => {
  return request.get(`/v1/s9rk988utk/accounts/manage/institution/:${id}`);
};

export const requestInstitutions = handledRequest(
  requestInstitution$,
  'Не удалось получить список учреждений!',
  getEmptyApiResponse<Institution>(),
);

export const requestRemoveInstitution$ = async (
  id: number,
): Promise<ApiResponse<void>> => {
  return request.delete('/v1/s9rk988utk/accounts/manage/institution', {
    data: { id },
  });
};

export const requestEditInstitution$ = async (
  newItem: Institution,
): Promise<ApiResponse<void>> => {
  return request.put('/v1/s9rk988utk/accounts/manage/institution', newItem);
};

export const requestAddInstitution$ = async (
  newItem: Institution,
): Promise<ApiResponse<void>> => {
  console.log(newItem);
  return request.post('/v1/s9rk988utk/accounts/manage/institution', newItem);
};

const requestInstitutionAdmins$ = async (): Promise<
  ApiResponse<InstitutionsAdmin[]>
> => {
  return request.get('/v1/s9rk988utk/accounts/manage/institution/admin/list');
};

export const requestInstitutionAdmins = handledRequest(
  requestInstitutionAdmins$,
  'Не удалось получить список учреждений!',
  getEmptyApiResponse<InstitutionsAdmin[]>(),
);

export const requestRemoveInstitutionAmin$ = async (
  email: string,
): Promise<ApiResponse<void>> => {
  return request.delete('/v1/s9rk988utk/accounts/manage/institution/admin', {
    data: { email },
  });
};

export const requestEditInstitutionAdmin$ = async (
  newItem: InstitutionsAdmin,
): Promise<ApiResponse<void>> => {
  return request.put(
    '/v1/s9rk988utk/accounts/manage/institution/admin',
    newItem,
  );
};

export const requestAddInstitutionAdmin$ = async (
  newItem: InstitutionsAdmin,
): Promise<ApiResponse<void>> => {
  console.log(newItem);
  return request.post(
    '/v1/s9rk988utk/accounts/manage/institution/admin/',
    newItem,
  );
};
