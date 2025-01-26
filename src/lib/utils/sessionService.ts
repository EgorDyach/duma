const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

class SessionService {
  static get refreshToken(): string | null {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static get accessToken(): string | null {
    return window.localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  static set accessToken(token: string) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  static set refreshToken(token: string) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  static login = (access: string) => {
    SessionService.accessToken = access;
    // SessionService.refreshToken = refresh;
  };

  static logout = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  };
}

export default SessionService;
