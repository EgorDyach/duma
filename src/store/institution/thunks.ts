import { showErrorNotification } from '@lib/utils/notification';
import { institutionActions } from '.';
import { AppDispatch } from '..';
import { AxiosError } from 'axios';
import {
  requestCreateRoom,
  requestCreateTeacher,
  requestCreateGroup,
  requestCreateLessonTime,
  requestCreateProfile,
  requestCreateShift,
  requestCreateSubject,
  requestCreateDiscipline,
  requestAllDiscipline,
  requestAllLessonTime,
  requestAllProfile,
  requestAllRoom,
  requestAllShift,
  requestAllSubject,
  requestAllTeacher,
  requestAllGroup,
  requestDeleteDiscipline,
  requestDeleteGroup,
  requestDeleteLessonTime,
  requestDeleteProfile,
  requestDeleteRoom,
  requestDeleteShift,
  requestDeleteSubject,
  requestDeleteTeacher,
  requestUpdateDiscipline,
  requestUpdateGroup,
  requestUpdateLessonTime,
  requestUpdateRoom,
  requestUpdateShift,
  requestUpdateSubject,
  requestUpdateTeacher,
  requestUpdateProfile,
} from '@lib/api';
import { uiActions } from '@store/ui';

export const fetchAddRoom = (item: Room) => async (dispatch: AppDispatch) => {
  try {
    await requestCreateRoom(item);
    dispatch(institutionActions.addRoom(item));
    dispatch(uiActions.closeModals());
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchRemoveRoom =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteRoom({ id });
      dispatch(institutionActions.removeRoom(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateRoom =
  (data: Room, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateRoom(data);
      dispatch(institutionActions.updateRoom({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchAddSubject =
  (item: Subject) => async (dispatch: AppDispatch) => {
    try {
      await requestCreateSubject(item);
      dispatch(institutionActions.addSubject(item));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchRemoveSubject =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteSubject({ id });
      dispatch(institutionActions.removeSubject(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateSubject =
  (data: Subject, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateSubject(data);
      dispatch(institutionActions.updateSubject({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchAddTeacher =
  (item: Teacher) => async (dispatch: AppDispatch) => {
    try {
      await requestCreateTeacher(item);
      dispatch(institutionActions.addTeacher(item));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchRemoveTeacher =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteTeacher({ id });
      dispatch(institutionActions.removeTeacher(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateTeacher =
  (data: Teacher, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateTeacher(data);
      dispatch(institutionActions.updateTeacher({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchAddDiscipline =
  (item: Discipline) => async (dispatch: AppDispatch) => {
    try {
      await requestCreateDiscipline(item);
      dispatch(institutionActions.addDiscipline(item));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchRemoveDiscipline =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteDiscipline({ id });
      dispatch(institutionActions.removeDiscipline(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateDiscipline =
  (data: Discipline, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateDiscipline(data);
      dispatch(institutionActions.updateDiscipline({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchAddLessonTime =
  (item: LessonTime) => async (dispatch: AppDispatch) => {
    try {
      await requestCreateLessonTime(item);
      dispatch(institutionActions.addLessonTime(item));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchRemoveLessonTime =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteLessonTime({ id });
      dispatch(institutionActions.removeLessonTime(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateLessonTime =
  (data: LessonTime, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateLessonTime(data);
      dispatch(institutionActions.updateLessonTime({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchAddShift = (item: Shift) => async (dispatch: AppDispatch) => {
  try {
    await requestCreateShift(item);
    dispatch(institutionActions.addShift(item));
    dispatch(uiActions.closeModals());
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchRemoveShift =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteShift({ id });
      dispatch(institutionActions.removeShift(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateShift =
  (data: Shift, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateShift(data);
      dispatch(institutionActions.updateShift({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchAddGroup = (item: Group) => async (dispatch: AppDispatch) => {
  try {
    await requestCreateGroup(item);
    dispatch(institutionActions.addGroup(item));
    dispatch(uiActions.closeModals());
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchRemoveGroup =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteGroup({ id });
      dispatch(institutionActions.removeGroup(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateGroup =
  (data: Group, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateGroup(data);
      dispatch(institutionActions.updateGroup({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchAddProfile =
  (item: Profile) => async (dispatch: AppDispatch) => {
    try {
      await requestCreateProfile(item);
      dispatch(institutionActions.addProfile(item));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchRemoveProfile =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteProfile({ id });
      dispatch(institutionActions.removeProfile(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateProfile =
  (data: Profile, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateProfile(data);
      dispatch(institutionActions.updateProfile({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };

export const fetchAllRooms = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllRoom();
    dispatch(institutionActions.setRooms(message));
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllSubjects = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllSubject();
    dispatch(institutionActions.setSubjects(message));
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllTeachers = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllTeacher();
    dispatch(institutionActions.setTeachers(message));
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllDisciplines = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllDiscipline();
    dispatch(institutionActions.setDisciplines(message));
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllLessonTimes = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllLessonTime();
    dispatch(institutionActions.setLessonTimes(message));
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllShifts = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllShift();
    dispatch(institutionActions.setShifts(message));
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllGroups = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllGroup();
    dispatch(institutionActions.setGroups(message));
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllProfiles = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllProfile();
    dispatch(institutionActions.setProfiles(message));
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
