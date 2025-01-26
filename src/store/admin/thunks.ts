import { showErrorNotification } from '@lib/utils/notification';
import { uiActions } from '@store/ui';
import { AppDispatch } from '..';
import {
  requestAddEducation$,
  requestEditEducation$,
  requestEducations,
  requestRemoveEducation$,
} from '@lib/api/admin';
import { adminActions } from '.';
import { UserEducation } from '@type/user';

export const fetchEducations =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      const educations = await requestEducations();
      const data: Record<string, UserEducation[]> = {
        school: [],
        university: [],
        secondary: [],
        otherEducations: [],
      };
      educations.message.forEach((el) => {
        console.log(el.Education.type, el);
        if (el.Education.type in data) data[el.Education.type].push(el);
        else data['otherEducations'].push(el);
      });
      console.log(data);
      dispatch(adminActions.setSchools(data.school));
      dispatch(adminActions.setSecondaries(data.secondary));
      dispatch(adminActions.setUniversities(data.university));
      dispatch(adminActions.setOtherEducations(data.otherEducations));
    } catch (error) {
      showErrorNotification('Ошибка при получении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };

export const fetchDeleteEducation =
  (email: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      await requestRemoveEducation$(email);
      dispatch(adminActions.removeItem(email));
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };
5;
export const fetchEditEducation =
  (newItem: UserEducation) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      await requestEditEducation$(newItem);
      dispatch(adminActions.editItem(newItem));
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };

export const fetchAddEducation =
  (newItem: UserEducation) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      await requestAddEducation$(newItem);
      dispatch(adminActions.addItem(newItem));
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };
