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
            const schools: UserEducation[] = [];
            const universities: UserEducation[] = [];
            const secondaries: UserEducation[] = [];
            const otherEducations: UserEducation[] = [];
            educations.message.forEach((el) => {
                switch (el.Education.type) {
                    case 'school':
                        schools.push(el);
                        break;
                    case 'secondary':
                        secondaries.push(el);
                        break;
                    case 'university':
                        universities.push(el);
                        break;
                    default:
                        otherEducations.push(el);
                        break;
                }
                dispatch(adminActions.setSchools(schools));
                dispatch(adminActions.setSecondaries(secondaries));
                dispatch(adminActions.setUniversities(universities));
                dispatch(adminActions.setOtherEducations(otherEducations));
            });
        } catch (error) {
            showErrorNotification('Ошибка при получении учреждений');
        } finally {
            dispatch(uiActions.setRequestFinished('educations'));
        }
    };

export const fetchDeleteEducation =
    (id: number) =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatch(uiActions.setRequestStarted('educations'));
        try {
            await requestRemoveEducation$(id);
            dispatch(adminActions.removeItem(id));
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
