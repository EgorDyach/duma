import { uiActions } from '@store/ui';
import { AppDispatch } from '@store/index';
import { showErrorNotification } from '@lib/utils/notification';
import SessionService from '@lib/utils/sessionService';
import AppRoutes from '@lib/configs/routes';

import { getLocationQuery } from '@lib/utils/getLocationQuery';
import { NavigateFunction } from 'react-router-dom';
import { requestAuthenticate } from '@lib/api/user';

export const fetchUser =
  (navigate: NavigateFunction) => async (dispatch: AppDispatch) => {
    const token = SessionService.accessToken;
    console.log(token, "token");
    
    if (!token) {
      const backPath = getLocationQuery('back') || location.pathname.slice(1);
      const url = backPath
        ? `${AppRoutes.login}?back=${backPath}`
        : AppRoutes.login;
      navigate(url);
      return;
    }

    dispatch(uiActions.setRequestStarted('getUser'));
    try {
      const user = await requestAuthenticate();
      dispatch(uiActions.setUser(user.message));
    } catch (e) {
      showErrorNotification('Ошибка при получении информации о пользователе');
    } finally {
      dispatch(uiActions.setRequestFinished('getUser'));
    }
  };
