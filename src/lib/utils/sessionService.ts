const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

class SessionService {
  static rememberMe: boolean = false;

  static get refreshToken(): string | null {
    return (
      window.localStorage.getItem(REFRESH_TOKEN_KEY) ||
      window.sessionStorage.getItem(REFRESH_TOKEN_KEY)
    );
  }

  static get accessToken(): string | null {
    return (
      window.localStorage.getItem(ACCESS_TOKEN_KEY) ||
      window.sessionStorage.getItem(ACCESS_TOKEN_KEY)
    );
  }

  static set accessToken(token: string) {
    if (this.rememberMe) window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
    else window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  static set refreshToken(token: string) {
    if (this.rememberMe) window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
    else window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  static login = (access: string, remember: boolean = false) => {
    this.rememberMe = remember;
    SessionService.accessToken = access;
  };

  static logout = () => {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  };
}

export default SessionService;
