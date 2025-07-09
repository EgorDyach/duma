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
  requestAllCourse,
  requestCreateCourse,
  requestDeleteCourse,
  requestUpdateCourse,
  requestAllFaculty,
  requestCreateFaculty,
  requestDeleteFaculty,
  requestUpdateFaculty,
  requestAllDepartment,
  requestCreateDepartment,
  requestDeleteDepartment,
  requestUpdateDepartment,
  requestAllLessons,
} from '@lib/api';
import { uiActions } from '@store/ui';
import toLowerCaseKeys from '@lib/toLowerCaseKeys';

export const fetchAddRoom = (item: Room) => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestCreateRoom(item);
    dispatch(
      institutionActions.setRooms(
        message.Rooms.map((el) => toLowerCaseKeys(el)),
      ),
    );
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
      const { message } = await requestCreateSubject(item);
      dispatch(
        institutionActions.setSubjects(
          message.Subjects.map((el) => toLowerCaseKeys(el)),
        ),
      );
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
      const { message } = await requestCreateTeacher(item);
      dispatch(
        institutionActions.setTeachers(
          message.Teachers.map((el) => toLowerCaseKeys(el)),
        ),
      );
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
      const { message } = await requestCreateDiscipline(item);
      dispatch(
        institutionActions.setDisciplines(
          message.Disciplines.map((el) =>
            toLowerCaseKeys({
              ...el,
              groups: el.groups.map((q) => toLowerCaseKeys(q)),
            }),
          ),
        ),
      );
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
      dispatch(
        institutionActions.updateDiscipline({
          data: toLowerCaseKeys({
            ...data,
            groups: data.groups.map((q) => toLowerCaseKeys(q)),
          }),
          id,
        }),
      );
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
      const { message } = await requestCreateLessonTime(item);
      dispatch(
        institutionActions.setLessonTimes(
          message['Lesson Times'].map((el) => toLowerCaseKeys(el)),
        ),
      );
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
      console.log(id);
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
    const { message } = await requestCreateShift(item);
    dispatch(
      institutionActions.setShifts(
        message.Shifts.map((el) => toLowerCaseKeys(el)),
      ),
    );
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
    const { message } = await requestCreateGroup(item);
    dispatch(
      institutionActions.setGroups(
        message.Groups.map((el) => toLowerCaseKeys(el)),
      ),
    );
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
      const { message } = await requestCreateProfile(item);
      dispatch(
        institutionActions.setProfiles(
          message.Profiles.map((el) => toLowerCaseKeys(el)),
        ),
      );
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
    dispatch(
      institutionActions.setRooms(
        message
          .map((el) => toLowerCaseKeys(el))
          .map((el) => ({ ...el, room: toLowerCaseKeys(el.room) })),
      ),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllSubjects = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllSubject();
    dispatch(
      institutionActions.setSubjects(message.map((el) => toLowerCaseKeys(el))),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllTeachers = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllTeacher();
    dispatch(
      institutionActions.setTeachers(message.map((el) => toLowerCaseKeys(el))),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllDisciplines = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllDiscipline();
    const { message: courses } = await requestAllCourse();
    dispatch(
      institutionActions.setDisciplines(
        message.map((el) =>
          toLowerCaseKeys(
            toLowerCaseKeys({
              ...el,
              groups: el.groups.map((q) => toLowerCaseKeys(q)),
            }),
          ),
        ),
      ),
    );
    dispatch(
      institutionActions.setCourses(courses.map((el) => toLowerCaseKeys(el))),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllLessonTimes = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllLessonTime();
    dispatch(
      institutionActions.setLessonTimes(
        message.map((el) => toLowerCaseKeys(el)),
      ),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllShifts = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllShift();
    dispatch(
      institutionActions.setShifts(message.map((el) => toLowerCaseKeys(el))),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllGroups = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllGroup();
    dispatch(
      institutionActions.setGroups(message.map((el) => toLowerCaseKeys(el))),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllProfiles = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllProfile();
    dispatch(
      institutionActions.setProfiles(message.map((el) => toLowerCaseKeys(el))),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllCourses = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllCourse();
    dispatch(
      institutionActions.setCourses(message.map((el) => toLowerCaseKeys(el))),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};

export const fetchAddCourse =
  (item: Course) => async (dispatch: AppDispatch) => {
    try {
      const { message } = await requestCreateCourse(item);
      dispatch(
        institutionActions.setCourses(
          message.Courses.map((el) => toLowerCaseKeys(el)),
        ),
      );
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchRemoveCourse =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteCourse({ id });
      dispatch(institutionActions.removeCourse(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateCourse =
  (data: Course, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateCourse(data);
      dispatch(institutionActions.updateCourse({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };

export const fetchAllFaculty = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllFaculty();
    dispatch(
      institutionActions.setFaculty(message.map((el) => toLowerCaseKeys(el))),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};

export const fetchAddFaculty =
  (item: Faculty) => async (dispatch: AppDispatch) => {
    try {
      const { message } = await requestCreateFaculty(item);
      dispatch(
        institutionActions.setFaculty(
          message.Faculties.map((el) => toLowerCaseKeys(el)),
        ),
      );
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchRemoveFaculty =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteFaculty({ id });
      dispatch(institutionActions.removeFaculty(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateFaculty =
  (data: Faculty, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateFaculty(data);
      dispatch(institutionActions.updateFaculty({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };

export const fetchAllDepartment = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllDepartment();
    dispatch(
      institutionActions.setDepartment(
        message.map((el) => toLowerCaseKeys(el)),
      ),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};

export const fetchAddDepartment =
  (item: Department) => async (dispatch: AppDispatch) => {
    try {
      const { message } = await requestCreateDepartment(item);
      dispatch(
        institutionActions.setFaculty(
          message.Departments.map((el) => toLowerCaseKeys(el)),
        ),
      );
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchRemoveDepartment =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestDeleteDepartment({ id });
      dispatch(institutionActions.removeDepartmnent(id));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
export const fetchUpdateDepartment =
  (data: Department, id: string | number) => async (dispatch: AppDispatch) => {
    try {
      await requestUpdateDepartment(data);
      dispatch(institutionActions.updateDepartment({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };

export const fetchAllLessons = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllLessons();
    dispatch(
      institutionActions.setLessons(message.map((el) => toLowerCaseKeys(el))),
    );
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
