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
  requestCreateTeacherAccount,
  requestUpdateTeacherAccount,
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
  requestGroupLessons,
  requestTeacherLessons,
} from '@lib/api';
import { TeacherAccount } from '@type/user';
import { uiActions } from '@store/ui';
import toLowerCaseKeys from '@lib/toLowerCaseKeys';
import { removeId } from '@lib/utils/removeId';

// Deduplicate helpers
function uniqueById<T extends { id?: number }>(items: T[]): T[] {
  const seen = new Set<number>();
  return items.filter((it) => {
    const id = it?.id as number | undefined;
    if (!id) return true;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

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
      // Backend expects a flat models.Room shape, not nested { room: {...} }
      const payload = {
        id: data.room.id,
        name: data.room.name,
        capacity: data.room.capacity,
        room_taints: data.room_taints,
        room_labels: data.room_labels,
      };
      await requestUpdateRoom(payload);
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
      await requestUpdateSubject(removeId(data));
      dispatch(institutionActions.updateSubject({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };
// Create account first, then create teacher linked by account_id
export const fetchAddTeacher =
  (item: Teacher & { email?: string; password?: string }) =>
    async (dispatch: AppDispatch) => {
      try {
        // 1) Create account in auth service
        if (!item?.email || !item?.password) {
          return showErrorNotification('Нужны email и пароль для создания аккаунта учителя');
        }
        const res = await requestCreateTeacherAccount({
          email: item.email,
          fullname: item.fullname,
          password: item.password,
          // account_id: Account?.id,
        });
        console.log(res?.message?.Account?.id, 'res'); // Debugging line

        // 2) Create teacher in backend
        const teacherPayload = {
          ...removeId(item),
          // pass created account id to backend
          account_id: res?.message?.Account?.id || undefined,
        } as any;
        console.log(teacherPayload, 'teacherPayload');

        const { message } = await requestCreateTeacher(teacherPayload);
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
      console.log(data, "tutu");
      // await requestUpdateTeacher(removeId(data));

      await requestUpdateTeacher(data);
      dispatch(institutionActions.updateTeacher({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Что-то пошло не так...');
    }
  };

// Create teacher account in auth service
export const fetchCreateTeacherAccount =
  (payload: TeacherAccount) => async (_dispatch: AppDispatch) => {
    try {
      await requestCreateTeacherAccount(payload);
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Не удалось создать аккаунт учителя');
    }
  };

// Update teacher account in auth service
export const fetchUpdateTeacherAccount =
  (payload: TeacherAccount) => async (_dispatch: AppDispatch) => {
    try {
      await requestUpdateTeacherAccount(removeId(payload));
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      showErrorNotification('Не удалось обновить аккаунт учителя');
    }
  };
export const fetchAddDiscipline =
  (item: Discipline) => async (dispatch: AppDispatch) => {
    try {
      const payload: Discipline = {
        ...item,
        groups: uniqueById(item.groups || []),
      };
      const { message } = await requestCreateDiscipline(payload);
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
      // Do NOT remove id: backend validates discipline by id and updates by it
      const payload: Discipline = {
        ...data,
        groups: uniqueById(data.groups || []),
      };
      await requestUpdateDiscipline(payload);
      // Refetch disciplines and courses to avoid duplicates and stale relations in UI
      const { message } = await requestAllDiscipline();
      const { message: courses } = await requestAllCourse();
      dispatch(
        institutionActions.setDisciplines(
          message.map((el) =>
            toLowerCaseKeys({
              ...el,
              groups: el.groups.map((q) => toLowerCaseKeys(q)),
            }),
          ),
        ),
      );
      dispatch(
        institutionActions.setCourses(courses.map((el: any) => toLowerCaseKeys(el))),
      );
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
      await requestUpdateLessonTime(removeId(data));
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
      await requestUpdateShift(removeId(data));
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
      await requestUpdateGroup(removeId(data));
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
      await requestUpdateProfile(removeId(data));
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
    // API may return rooms in a flat shape (id, name, capacity, etc.)
    // Normalize to the Room type expected by UI: { room: { ... }, room_labels, room_taints }
    const normalizedRooms: Room[] = message.map((raw: any) => {
      const lower = toLowerCaseKeys(raw);
      // If backend already provides nested room, keep it; otherwise, build it from flat fields
      const roomData = lower.room
        ? toLowerCaseKeys(lower.room)
        : {
          id: lower.id,
          name: lower.name,
          capacity: lower.capacity,
          institution_id: lower.institution_id,
        };

      const room_labels = Array.isArray(lower.room_labels)
        ? lower.room_labels.map((l: any) => toLowerCaseKeys(l))
        : [];
      const room_taints = Array.isArray(lower.room_taints)
        ? lower.room_taints.map((t: any) => toLowerCaseKeys(t))
        : [];

      return {
        room: roomData,
        room_labels,
        room_taints,
      } as Room;
    });

    dispatch(institutionActions.setRooms(normalizedRooms));
  } catch (e) {
    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
};
export const fetchAllSubjects = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllSubject();

    const disciplines: Discipline[] = [];

    message.forEach((el) =>
      el.disciplines?.forEach((discipline) =>
        disciplines.push(toLowerCaseKeys(discipline)),
      ),
    );

    dispatch(
      institutionActions.setSubjects(message.map((el) => toLowerCaseKeys(el))),
    );
    dispatch(institutionActions.setDisciplines(disciplines));
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
      institutionActions.setCourses(courses.map((el: any) => toLowerCaseKeys(el))),
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
      institutionActions.setCourses(message.map((el: any) => toLowerCaseKeys(el))),
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
      console.log(item, 'trtr');

      // Backend expects flat models.Course, not nested { course: {...} }
      const payload = {
        id: item.course.id,
        teacher_id: item.course.teacher_id,
        discipline_id: item.discipline_id,
        course_affinity: item.course_affinity,
        course_toleration: item.course_toleration,
      } as any;
      const { message } = await requestCreateCourse(payload);
      dispatch(
        institutionActions.setCourses(
          message.Courses.map((el: any) => toLowerCaseKeys(el)),
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
    console.log(data, "data0");

    try {
      // Flatten payload and keep id for update
      const payload = {
        id: data.id,
        teacher_id: data.teacher_id,
        discipline_id: data.discipline_id,
        course_affinity: data.course_affinity,
        course_toleration: data.course_toleration,
      } as any;
      await requestUpdateCourse(payload);
      dispatch(institutionActions.updateCourse({ data, id }));
      dispatch(uiActions.closeModals());
    } catch (e) {
      if (e instanceof AxiosError) return showErrorNotification(e.message);
      if (typeof e === 'string') return showErrorNotification(e);
      console.log(e, "error");

      showErrorNotification('Что-то пошло не так...');
    }
  };

export const fetchAllFaculty = () => async (dispatch: AppDispatch) => {
  try {
    const { message } = await requestAllFaculty();
    const faculties: Faculty[] = [];
    const departments: Department[] = [];
    const profiles: Profile[] = [];
    const groups: Group[] = [];
    const teachers: Teacher[] = [];

    message.forEach((faculty) => {
      faculties.push(toLowerCaseKeys(faculty));

      faculty.departments.forEach((department) => {
        departments.push(toLowerCaseKeys(department));
        department.teachers?.forEach((teacher) => {
          teachers.push(toLowerCaseKeys(teacher));
        });

        department.profiles?.forEach((profile) => {
          profiles.push(toLowerCaseKeys(profile));

          profile.groups.forEach((group) => {
            groups.push(toLowerCaseKeys(group));
          });
        });
      });
    });

    dispatch(institutionActions.setFaculty(faculties));
    dispatch(institutionActions.setDepartment(departments));
    dispatch(institutionActions.setProfiles(profiles));
    dispatch(institutionActions.setGroups(groups));
    dispatch(institutionActions.setTeachers(teachers));
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
      await requestUpdateFaculty(removeId(data));
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
      await requestUpdateDepartment(removeId(data));
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

export const fetchGroupLessons = (id: string | number, level: number | string | undefined) => async (dispatch: AppDispatch) => {
  try {
    const { message } = level === 1 ? await requestGroupLessons(id) : await requestTeacherLessons(id)
    console.log(message, "message");

    dispatch(
      institutionActions.setLessons(message.map((el: any) => toLowerCaseKeys(el))),
    )
  } catch (e) {
    console.log(e, "error");

    if (e instanceof AxiosError) return showErrorNotification(e.message);
    if (typeof e === 'string') return showErrorNotification(e);
    showErrorNotification('Что-то пошло не так...');
  }
}
