import { ApiResponse } from '@type/api';
import { handledRequest, getEmptyApiResponse } from './utils';
import { request } from '.';
import { UserEducation } from '@type/user';

const requestEducations$ = async (): Promise<ApiResponse<UserEducation[]>> => {
  return request.get('/s9rk988utk/admin/manage/accounts');
};

export const requestEducations = handledRequest(
  requestEducations$,
  'Не удалось получить список учреждений!',
  getEmptyApiResponse<UserEducation[]>(),
);

export const requestRemoveEducation$ = async (
  email: string,
): Promise<ApiResponse<void>> => {
  return request.delete('/s9rk988utk/admin/manage/delete', {
    data: { email },
  });
};

export const requestEditEducation$ = async (
  newItem: UserEducation,
): Promise<ApiResponse<void>> => {
  return request.put('/s9rk988utk/admin/manage/change', newItem);
};

export const requestAddEducation$ = async (
  newItem: UserEducation,
): Promise<ApiResponse<void>> => {
  return request.post('/s9rk988utk/admin/manage/create', newItem);
};
