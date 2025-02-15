import axios, { AxiosError } from 'axios';
import { ENV } from '@lib/configs/enviorement';
import { ApiError, AppApi } from '@type/api';
import AppRoutes from '@lib/configs/routes';
import SessionService from '@lib/utils/sessionService';
import { showErrorNotification } from '@lib/utils/notification';
import { Response } from '@type/common';

const defaultHeaders = {
  'Accept-Language': 'ru',
  'Content-type': 'application/json',
};

const createRequestInstance = (addAuthHeader: boolean): AppApi => {
  const instance = axios.create({
    baseURL: ENV.apiBaseUrl,
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
  return await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/Room',
    [data],
  );
};
export const requestUpdateRoom = async (data: Room): Promise<void> => {
  await request.put('https://puzzlesignlanguage.online/api/v1/update/Room', [
    data,
  ]);
};
export const requestDeleteRoom = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.online/api/v1/delete/room', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    data: [data],
  });
};
export const requestAllRoom = async (): Promise<Response<Room[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/Get/Room',
    {},
  );
};
//
export const requestCreateTeacher = async (
  data: Teacher,
): Promise<Response<{ Info: string; Teachers: Teacher[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/teacher',
    [data],
  );
};
export const requestUpdateTeacher = async (data: Teacher): Promise<void> => {
  await request.put('https://puzzlesignlanguage.online/api/v1/update/teacher', [
    data,
  ]);
};
export const requestDeleteTeacher = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/teacher',
    {
      data: [data],
    },
  );
};
export const requestAllTeacher = async (): Promise<Response<Teacher[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/Get/teacher',
    {},
  );
};
export const requestCreateGroup = async (
  data: Group,
): Promise<Response<{ Info: string; Groups: Group[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/group',
    [data],
  );
};
export const requestUpdateGroup = async (data: Group): Promise<void> => {
  await request.put('https://puzzlesignlanguage.online/api/v1/update/group', [
    data,
  ]);
};
export const requestDeleteGroup = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/group',
    {
      data: [data],
    },
  );
};
export const requestAllGroup = async (): Promise<Response<Group[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/get/group',
    {},
  );
};
export const requestCreateSubject = async (
  data: Subject,
): Promise<Response<{ Info: string; Subjects: Subject[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/subject',
    [data],
  );
};
export const requestUpdateSubject = async (data: Subject): Promise<void> => {
  await request.put('https://puzzlesignlanguage.online/api/v1/update/subject', [
    data,
  ]);
};
export const requestDeleteSubject = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/subject',
    {
      data: [data],
    },
  );
};
export const requestAllSubject = async (): Promise<Response<Subject[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/Get/subject',
    {},
  );
};

export const requestCreateProfile = async (
  data: Profile,
): Promise<Response<{ Info: string; Profiles: Profile[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/profile',
    [data],
  );
};
export const requestDeleteProfile = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/profile',
    {
      data: [data],
    },
  );
};
export const requestUpdateProfile = async (data: Profile): Promise<void> => {
  await request.put('https://puzzlesignlanguage.online/api/v1/update/profile', [
    data,
  ]);
};
export const requestAllProfile = async (): Promise<Response<Profile[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/get/profile',
    {},
  );
};
export const requestCreateLessonTime = async (
  data: LessonTime,
): Promise<Response<{ Info: string; LessonTimes: LessonTime[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/lessontime',
    [data],
  );
};
export const requestDeleteLessonTime = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/lessontime',
    {
      data: [data],
    },
  );
};
export const requestUpdateLessonTime = async (
  data: LessonTime,
): Promise<void> => {
  await request.put(
    'https://puzzlesignlanguage.online/api/v1/update/lessontime',
    [data],
  );
};
export const requestAllLessonTime = async (): Promise<
  Response<LessonTime[]>
> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/get/lessontime',
    {},
  );
};

export const requestCreateShift = async (
  data: Shift,
): Promise<Response<{ Info: string; Shifts: Shift[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/shift',
    [data],
  );
};
export const requestDeleteShift = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/shift',
    {
      data: [data],
    },
  );
};
export const requestUpdateShift = async (data: Shift): Promise<void> => {
  await request.put('https://puzzlesignlanguage.online/api/v1/update/shift', [
    data,
  ]);
};
export const requestAllShift = async (): Promise<Response<Shift[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/get/shift',
  );
};

export const requestCreateDiscipline = async (
  data: Discipline,
): Promise<Response<{ Info: string; Disciplines: Discipline[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/discipline',
    [data],
  );
};
export const requestDeleteDiscipline = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/discipline',
    {
      data: [data],
    },
  );
};
export const requestUpdateDiscipline = async (
  data: Discipline,
): Promise<void> => {
  await request.put(
    'https://puzzlesignlanguage.online/api/v1/update/discipline',
    [data],
  );
};
export const requestAllDiscipline = async (): Promise<
  Response<Discipline[]>
> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/get/discipline',
  );
};

export const requestCreateCourse = async (
  data: Course,
): Promise<Response<{ Info: string; Courses: Course[] }>> => {
  return await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/course',
    [data],
  );
};
export const requestDeleteCourse = async (data: {
  id: string | number;
}): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/course',
    {
      data: [data],
    },
  );
};
export const requestUpdateCourse = async (data: Course): Promise<void> => {
  await request.put('https://puzzlesignlanguage.online/api/v1/update/course', [
    data,
  ]);
};
export const requestAllCourse = async (): Promise<Response<Course[]>> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/get/course',
  );
};
