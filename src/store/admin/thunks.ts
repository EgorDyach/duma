import { showErrorNotification } from '@lib/utils/notification';
import { uiActions } from '@store/ui';
import { AppDispatch } from '..';
import {
  requestAddInstitution$,
  requestEditInstitution$,
  requestInstitutions,
  requestRemoveInstitution$,
} from '@lib/api/admin';
import { adminActions } from '.';
import { InstitutionsAdmin } from '@type/user';
import toLowerCaseKeys from '@lib/toLowerCaseKeys';

export const fetchInstitutions =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      const educations = await requestInstitutions();
      console.log(educations);
      const data: Record<string, InstitutionsAdmin[]> = {
        school: [],
        university: [],
        secondary: [],
        otherInstitutions: [],
      };
      educations.message
        .map((el) => toLowerCaseKeys(el))
        .forEach((el) => {
          console.log(el.institution);
          if (el.institution.institution_type in data)
            data[el.institution.institution_type].push(el);
          else data['otherInstitutions'].push(el);
        });
      console.log(data);
      dispatch(adminActions.setSchools(data.school));
      dispatch(adminActions.setSecondaries(data.secondary));
      dispatch(adminActions.setUniversities(data.university));
      dispatch(adminActions.setOtherInstitutions(data.otherInstitutions));
    } catch (error) {
      showErrorNotification(
        `Ошибка при получении учреждений: ${String(error)}`,
      );
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };

export const fetchDeleteInstitution =
  (email: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      await requestRemoveInstitution$(email);
      dispatch(adminActions.removeItem(email));
      dispatch(uiActions.closeModals());
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };
5;
export const fetchEditInstitution =
  (newItem: InstitutionsAdmin) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    if (!newItem.password) delete newItem.password;
    try {
      await requestEditInstitution$({ ...newItem });
      dispatch(adminActions.editItem(newItem));
      dispatch(uiActions.closeModals());
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };

export const fetchAddInstitution =
  (newItem: InstitutionsAdmin) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      await requestAddInstitution$(newItem);
      dispatch(adminActions.addItem(newItem));
      dispatch(uiActions.closeModals());
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };
