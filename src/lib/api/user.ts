import { User } from '@type/user';
import { noAuthRequest, request } from '.';
import SessionService from '@lib/utils/sessionService';

type AuthLoginRes = {
  message: User;
  statusCode: number;
};

export const requestAuthenticate = (
  email?: string,
  password?: string,
): Promise<AuthLoginRes> => {
  const token = SessionService.accessToken;
  if (token && !email && !password)
    return request.post<AuthLoginRes>('/v1/login');
  return noAuthRequest.post<AuthLoginRes>('/v1/login', { email, password });
};
