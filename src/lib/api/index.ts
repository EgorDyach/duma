import axios, { AxiosError } from 'axios';
import { ApiError, AppApi } from '@type/api';
import AppRoutes from '@lib/configs/routes';
import SessionService from '@lib/utils/sessionService';
import { showErrorNotification } from '@lib/utils/notification';
import { Response } from '@type/common';
import { TeacherAccount } from '@type/user';

const defaultHeaders = {
  'Accept-Language': 'ru',
  'Content-type': 'application/json',
};

const createRequestInstance = (addAuthHeader: boolean): AppApi => {
  const instance = axios.create({
    baseURL: 'https://puzzlesignlanguage.ru/api/auth/',
    headers: defaultHeaders,
  });

  if (addAuthHeader) {
    instance.interceptors.request.use((request) => {
      request.headers['Authorization'] = `Bearer ${SessionService.accessToken}`;
      return request;
    });
  }

  instance.interceptors.response.use(
    (response) => response.data,
    (error: AxiosError) => {
      if (error.status === 401) {
        SessionService.logout();
        window.location.pathname = AppRoutes.login;
        return;
      } else if (error.status === 500) {
        showErrorNotification('Сервер не доступен');
        return;
      }
      const errorObject = error.response?.data as ApiError | undefined;
      if (!!errorObject && typeof errorObject === 'object') {
        throw Object.fromEntries(
          errorObject.errors.map((v) => [v.code, v.detail]),
        );
      }
      throw error.message;
    },
  );
  return instance as AppApi;
};

export const request = createRequestInstance(true);
export const noAuthRequest = createRequestInstance(false);

export const requestCreateRoom = async (
  data: Room,
): Promise<Response<{ Info: string; Rooms: Room[] }>> => {
  return await request.post('https://puzzlesignlanguage.ru/api/back/v1/room', [
    data,
  ]);
};
export const requestUpdateRoom = async (data: Room): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/room', data);
};
export const requestDeleteRoom = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/room', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    data: [data],
  });
};
export const requestAllRoom = async (): Promise<Response<Room[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.ru/api/back/v1/room',
    {},
  );
};
//
export const requestCreateTeacher = async (
  data: Teacher,
): Promise<Response<{ Info: string; Teachers: Teacher[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.ru/api/back/v1/teacher',
    [data],
  );
};
export const requestUpdateTeacher = async (data: Teacher): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/teacher', [
    data,
  ]);
};
export const requestDeleteTeacher = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/teacher', {
    data: [data],
  });
};
export const requestAllTeacher = async (): Promise<Response<Teacher[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.ru/api/back/v1/teacher',
    {},
  );
};

// Accounts management for institution teachers (auth service)
// Returns created account object so caller can extract its ID
export const requestCreateTeacherAccount = async (
  data: TeacherAccount,
): Promise<{
  message: string; Status: string; Account: TeacherAccount
}> => {
  return await request.post(
    '/v1/s9rk988utk/accounts/manage/institution/teacher',
    data,
  );
};

export const requestUpdateTeacherAccount = async (
  data: TeacherAccount,
): Promise<void> => {
  await request.put(
    '/v1/s9rk988utk/accounts/manage/institution/teacher',
    data,
  );
};
export const requestCreateGroup = async (
  data: Group,
): Promise<Response<{ Info: string; Groups: Group[] }>> => {
  return await request.post('https://puzzlesignlanguage.ru/api/back/v1/group', [
    data,
  ]);
};
export const requestUpdateGroup = async (data: Group): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/group', [data]);
};
export const requestDeleteGroup = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/group', {
    data: [data],
  });
};
export const requestAllGroup = async (): Promise<Response<Group[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.ru/api/back/v1/group',
    {},
  );
};
export const requestCreateSubject = async (
  data: Subject,
): Promise<Response<{ Info: string; Subjects: Subject[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.ru/api/back/v1/subject',
    [data],
  );
};
export const requestUpdateSubject = async (data: Subject): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/subject', [
    data,
  ]);
};
export const requestDeleteSubject = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/subject', {
    data: [data],
  });
};
export const requestAllSubject = async (): Promise<
  Response<ResponseSubject[]>
> => {
  return await request.get(
    'https://puzzlesignlanguage.ru/api/back/v1/subject',
    {},
  );
};

export const requestCreateProfile = async (
  data: Profile,
): Promise<Response<{ Info: string; Profiles: Profile[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.ru/api/back/v1/profile',
    [data],
  );
};
export const requestDeleteProfile = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/profile', {
    data: [data],
  });
};
export const requestUpdateProfile = async (data: Profile): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/profile', [
    data,
  ]);
};
export const requestAllProfile = async (): Promise<Response<Profile[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.ru/api/back/v1/profile',
    {},
  );
};
export const requestCreateLessonTime = async (
  data: LessonTime,
): Promise<Response<{ Info: string; 'Lesson Times': LessonTime[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.ru/api/back/v1/lessontime',
    [data],
  );
};
export const requestDeleteLessonTime = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/lessontime', {
    data: [data],
  });
};
export const requestUpdateLessonTime = async (
  data: LessonTime,
): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/lessontime', [
    data,
  ]);
};
export const requestAllLessonTime = async (): Promise<
  Response<LessonTime[]>
> => {
  return await request.get(
    'https://puzzlesignlanguage.ru/api/back/v1/lessontime',
    {},
  );
};

export const requestCreateShift = async (
  data: Shift,
): Promise<Response<{ Info: string; Shifts: Shift[] }>> => {
  return await request.post('https://puzzlesignlanguage.ru/api/back/v1/shift', [
    data,
  ]);
};
export const requestDeleteShift = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/shift', {
    data: [data],
  });
};
export const requestUpdateShift = async (data: Shift): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/shift', [data]);
};
export const requestAllShift = async (): Promise<Response<Shift[]>> => {
  return await request.get('https://puzzlesignlanguage.ru/api/back/v1/shift');
};

export const requestCreateDiscipline = async (
  data: Discipline,
): Promise<Response<{ Info: string; Disciplines: Discipline[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.ru/api/back/v1/discipline',
    [data],
  );
};
export const requestDeleteDiscipline = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/discipline', {
    data: [data],
  });
};
export const requestUpdateDiscipline = async (
  data: Discipline,
): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/discipline', [
    data,
  ]);
};
export const requestAllDiscipline = async (): Promise<
  Response<Discipline[]>
> => {
  return await request.get(
    'https://puzzlesignlanguage.ru/api/back/v1/discipline',
  );
};

export const requestCreateCourse = async (
  data: Course,
): Promise<Response<{ Info: string; Courses: any }>> => {
  return await request.post(
    'https://puzzlesignlanguage.ru/api/back/v1/course',
    [data],
  );
};
export const requestDeleteCourse = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/course', {
    data: [data],
  });
};
export const requestUpdateCourse = async (data: Course): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/course', [data]);
};
export const requestAllCourse = async (): Promise<Response<any>> => {
  return await request.get('https://puzzlesignlanguage.ru/api/back/v1/course');
};

export const requestCreateFaculty = async (
  data: Faculty,
): Promise<Response<{ Info: string; Faculties: Faculty[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.ru/api/back/v1/faculty',
    [data],
  );
};
export const requestDeleteFaculty = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/faculty', {
    data: [data],
  });
};
export const requestUpdateFaculty = async (data: Faculty): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/faculty', [
    data,
  ]);
};
export const requestAllFaculty = async (): Promise<
  Response<ResponseFaculty[]>
> => {
  return await request.get('https://puzzlesignlanguage.ru/api/back/v1/faculty');
};

export const requestCreateDepartment = async (
  data: Department,
): Promise<Response<{ Info: string; Departments: Department[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.ru/api/back/v1/department',
    [data],
  );
};
export const requestDeleteDepartment = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.ru/api/back/v1/department', {
    data: [data],
  });
};
export const requestUpdateDepartment = async (
  data: Department,
): Promise<void> => {
  await request.put('https://puzzlesignlanguage.ru/api/back/v1/department', [
    data,
  ]);
};
export const requestAllDepartment = async (): Promise<
  Response<Department[]>
> => {
  return await request.get(
    'https://puzzlesignlanguage.ru/api/back/v1/department',
  );
};

export const requestAllLessons = async (): Promise<Response<Lesson[]>> => {
  return await request.get('https://puzzlesignlanguage.ru/api/back/v1/lesson');
};
