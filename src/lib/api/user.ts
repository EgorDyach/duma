import { UserDuma } from '@type/user';
import { noAuthRequest, request } from '.';

// TODO: make requests for EducationUsers

type AuthLoginRes = {
  message: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
    uuid: string;
    email: string;
    password: string;
    token: string;
  };
  statusCode: number;
};

export const requestAuthenticateDuma = (
  email: string,
  password: string,
): Promise<AuthLoginRes> => {
  return noAuthRequest.post<AuthLoginRes>('/login', { email, password });
};

export const requestUserDuma = () => {
  return request.get<UserDuma>('/s9rk988utk/admin/manage/accounts');
};
