import { User } from '@type/user';
import { noAuthRequest } from '.';
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
  return noAuthRequest.post<AuthLoginRes>(
    '/login',
    token && !email && !password ? { token } : { email, password },
  );
};
