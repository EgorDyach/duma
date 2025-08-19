import { showErrorNotification } from '@lib/utils/notification';
import { uiActions } from '@store/ui';
import { AppDispatch } from '..';
import {
  requestAddInstitution$,
  requestAddInstitutionAdmin$,
  requestEditInstitution$,
  requestEditInstitutionAdmin$,
  requestInstitutionAdmins,
  requestRemoveInstitution$,
  requestRemoveInstitutionAmin$,
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
      const educations = await requestInstitutionAdmins();
      const data: Record<string, Institution[]> = {
        School: [],
        University: [],
        Secondary: [],
        otherInstitutions: [],
      };

      for (const el of educations.message
        .map((el) => toLowerCaseKeys(el))
        // TODO: чтобы отображались админы с уровнем ниже
        .filter((el) => el.level === 1)
        .filter(
          (item, index, self) =>
            index ===
            self.findIndex((t) => t.institution_id === item.institution_id),
        )) {
        const institution = (await requestInstitution(el.institution_id))
          .message;

        if (institution.institution_type in data) {
          data[institution.institution_type].push(institution);
        } else {
          data['otherInstitutions'].push(institution);
        }
      }

      dispatch(
        adminActions.setAdmins(
          educations.message.filter((el) => el.level === 1),
        ),
      );
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
  (id: number) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      await requestRemoveInstitution$(id);
      dispatch(adminActions.removeItem(id));
      dispatch(uiActions.closeModals());
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };

export const fetchEditInstitution =
  (newItem: Institution) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
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
  (newItem: Institution) =>
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

export const fetchEditInstitutionAdmin =
  (newItem: InstitutionsAdmin) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    if (!newItem.password) delete newItem.password;
    try {
      await requestEditInstitutionAdmin$({ ...newItem });
      dispatch(adminActions.editAdmin(newItem));
      dispatch(uiActions.closeModals());
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };

export const fetchAddInstitutionAdmin =
  (newItem: InstitutionsAdmin) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      await requestAddInstitutionAdmin$(newItem);
      dispatch(adminActions.addAdmin(newItem));
      dispatch(uiActions.closeModals());
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };

export const fetchDeleteInstitutionAdmin =
  (email: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(uiActions.setRequestStarted('educations'));
    try {
      await requestRemoveInstitutionAmin$(email);
      dispatch(adminActions.removeAdmin(email));
      dispatch(uiActions.closeModals());
    } catch (error) {
      showErrorNotification('Ошибка при удалении учреждений');
    } finally {
      dispatch(uiActions.setRequestFinished('educations'));
    }
  };
