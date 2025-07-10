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
import { Institution, InstitutionsAdmin } from '@type/user';
import toLowerCaseKeys from '@lib/toLowerCaseKeys';
import { ApiResponse } from '@type/api';
import { request } from '@lib/api';
// import { requestCreateFaculty } from '@lib/api';

const requestInstitution = async (
  institution_id?: number,
): Promise<ApiResponse<Institution>> => {
  return await request.get(
    `https://puzzlesignlanguage.ru/api/auth/v1/s9rk988utk/accounts/manage/institution/${institution_id}`,
  );
};

export const fetchInstitutions =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      const educations = await requestInstitutions();
      console.log(educations);
      const data: Record<string, InstitutionsAdmin[]> = {
        School: [],
        University: [],
        Secondary: [],
        otherInstitutions: [],
      };

      for (const el of educations.message.map((el) => toLowerCaseKeys(el))) {
        const institution = (await requestInstitution(el.institution_id))
          .message;

        const newEl = JSON.parse(JSON.stringify(el));
        newEl['institution'] = institution;

        if (institution.institution_type in data) {
          data[institution.institution_type].push(newEl);
        } else {
          data['otherInstitutions'].push(newEl);
        }
      }

      console.log(data);
      dispatch(adminActions.setSchools(data.School));
      dispatch(adminActions.setSecondaries(data.Secondary));
      dispatch(adminActions.setUniversities(data.University));
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
      // const { institution_id } =
      await requestAddInstitution$(newItem);
      // if (newItem.institution.institution_type === 'school') {
      //   await requestCreateFaculty({ name: 'Младшая школа', institution_id });
      // }
      dispatch(adminActions.addItem(newItem));
      dispatch(uiActions.closeModals());
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };
