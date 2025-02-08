import { ApiResponse } from '@type/api';
import { handledRequest, getEmptyApiResponse } from './utils';
import { request } from '.';
import { InstitutionsAdmin } from '@type/user';

const requestEducations$ = async (): Promise<
  ApiResponse<InstitutionsAdmin[]>
> => {
  return request.get('/s9rk988utk/admin/manage/accounts');
};

export const requestEducations = handledRequest(
  requestEducations$,
  'Не удалось получить список учреждений!',
  getEmptyApiResponse<InstitutionsAdmin[]>(),
);

export const requestRemoveEducation$ = async (
  email: string,
): Promise<ApiResponse<void>> => {
  return request.delete('/s9rk988utk/admin/manage/delete', {
    data: { email },
  });
};

export const requestEditEducation$ = async (
  newItem: InstitutionsAdmin,
): Promise<ApiResponse<void>> => {
  return request.put('/s9rk988utk/admin/manage/change', newItem);
};

export const requestAddEducation$ = async (
  newItem: InstitutionsAdmin,
): Promise<ApiResponse<void>> => {
  return request.post('/s9rk988utk/admin/manage/create', newItem);
};
