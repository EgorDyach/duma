import axios, { AxiosError } from 'axios';
import { ENV } from '@lib/configs/enviorement';
import { ApiError, AppApi } from '@type/api';
import AppRoutes from '@lib/configs/routes';
import SessionService from '@lib/utils/sessionService';
import { showErrorNotification } from '@lib/utils/notification';
import { Response } from '@type/common';
import {
  Room,
  Teacher,
  Group,
  Subject,
  Coaching,
  CoachLesson,
} from '@type/studyPlanServer';
import { Account } from '@lib/utils/data/formatAccounts';
import { LessonTime } from '@type/studyPlan';

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
  data: Room[],
  education_id: number,
): Promise<void> => {
  await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/Room',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestUpdateRoom = async (
  data: Room[],
  education_id: number,
): Promise<void> => {
  await request.put(
    'https://puzzlesignlanguage.online/api/v1/update/Room',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestDeleteRoom = async (
  data: Room[],
  education_id: number,
): Promise<void> => {
  await request.delete('https://puzzlesignlanguage.online/api/v1/delete/room', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    data: data.map((el) => ({ ...el, education_id })),
  });
};
export const requestAllRoom = async (
  education_id: number,
): Promise<
  Response<
    {
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
      ID: number;
      Name: string;
      Capacity: number;
      profileID: number;
      profiles: null;
    }[]
  >
> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/Get/Room',
    {
      data: { education_id },
    },
  );
};
//
export const requestCreateTeacher = async (
  data: Teacher[],
  education_id: number,
): Promise<void> => {
  await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/teacher',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestUpdateTeacher = async (
  data: Teacher[],
  education_id: number,
): Promise<void> => {
  await request.put(
    'https://puzzlesignlanguage.online/api/v1/update/teacher',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestDeleteTeacher = async (
  data: Teacher[],
  education_id: number,
): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/teacher',
    {
      data: data.map((el) => ({ ...el, education_id })),
    },
  );
};
export const requestAllTeacher = async (
  education_id: number,
): Promise<
  Response<
    {
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
      ID: number;
      Fullname: string;
      holidays: [] | null;
      Lessons: [] | null;
    }[]
  >
> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/Get/teacher',
    {
      data: { education_id },
    },
  );
};
export const requestCreateGroup = async (
  data: Group[],
  education_id: number,
): Promise<void> => {
  await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/group',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestUpdateGroup = async (
  data: Group[],
  education_id: number,
): Promise<void> => {
  await request.put(
    'https://puzzlesignlanguage.online/api/v1/update/group',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestDeleteGroup = async (
  data: Group[],
  education_id: number,
): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/group',
    {
      data: data.map((el) => ({ ...el, education_id })),
    },
  );
};
export const requestAllGroups = async (
  education_id: number,
): Promise<
  Response<
    {
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
      Count: number;
      ID: number;
      Name: string;
      Shift: number;
      ProfileID: number;
      Profile: null;
      holidays: null;
    }[]
  >
> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/get/group',
    {
      data: { education_id },
    },
  );
};
export const requestCreateSubjects = async (
  data: Subject[],
  education_id: number,
): Promise<void> => {
  await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/subject',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestUpdateSubjects = async (
  data: Subject[],
  education_id: number,
): Promise<void> => {
  await request.put(
    'https://puzzlesignlanguage.online/api/v1/update/subject',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestDeleteSubjects = async (
  data: Subject[],
  education_id: number,
): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/subject',
    {
      data: data.map((el) => ({ ...el, education_id })),
    },
  );
};
export const requestAllSubjects = async (
  education_id: number,
): Promise<
  Response<
    {
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
      ID: number;
      Name: string;
    }[]
  >
> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/Get/subject',
    {
      data: { education_id },
    },
  );
};
export const requestCreateCoach = async (
  data: Coaching[],
  education_id: number,
): Promise<void> => {
  await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/coach',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestUpdateCoach = async (
  data: Coaching[],
  education_id: number,
): Promise<void> => {
  await request.put(
    'https://puzzlesignlanguage.online/api/v1/update/coach',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestDeleteCoach = async (
  data: Coaching[],
  education_id: number,
): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/coach',
    {
      data: data.map((el) => ({ ...el, education_id })),
    },
  );
};
export const requestAllCoaches = async (
  education_id: number,
): Promise<
  Response<
    {
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
      ID: number;
      SubjectID: number;
      Hours: number;
      depends_on: [];
      RoomID: number;
      GroupID: number;
    }[]
  >
> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/Get/coach',
    {
      data: { education_id },
    },
  );
};
export const requestCreateCoachLessons = async (
  data: CoachLesson[],
  education_id: number,
): Promise<void> => {
  await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/coachlesson',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestUpdateCoachLessons = async (
  data: CoachLesson[],
  education_id: number,
): Promise<void> => {
  await request.put(
    'https://puzzlesignlanguage.online/api/v1/update/coachlesson',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestDeleteCoachLessons = async (
  data: (CoachLesson & { id: number })[],
  education_id: number,
): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/coachlesson',
    {
      data: data.map((el) => ({ ...el, education_id })),
    },
  );
};
export const requestAllCoachLessons = async (
  education_id: number,
): Promise<
  Response<
    {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      TeacherID: number;
      CoachingID: number;
    }[]
  >
> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/get/coachlesson',
    {
      data: education_id,
    },
  );
};

export const requestCreateAccounts = async (
  data: Account[],
  education_id: number,
): Promise<void> => {
  await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/profile',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestDeleteAccounts = async (
  data: Account[],
  education_id: number,
): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/profile',
    {
      data: data.map((el) => ({ ...el, education_id })),
    },
  );
};
export const requestUpdateAccounts = async (
  data: Account[],
  education_id: number,
): Promise<void> => {
  await request.put(
    'https://puzzlesignlanguage.online/api/v1/update/profile',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestAllAccounts = async (
  education_id: number,
): Promise<
  Response<
    {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      name: string;
      classes: null | [];
    }[]
  >
> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/get/profile',
    {
      data: { education_id },
    },
  );
};
export const requestCreateLessonTimes = async (
  data: LessonTime[],
  education_id: number,
): Promise<void> => {
  await request.post(
    'https://puzzlesignlanguage.online/api/v1/create/lessontime',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestDeleteLessonTimes = async (
  data: LessonTime[],
  education_id: number,
): Promise<void> => {
  await request.delete(
    'https://puzzlesignlanguage.online/api/v1/delete/lessontime',
    {
      data: data.map((el) => ({ ...el, education_id })),
    },
  );
};
export const requestUpdateLessonTimes = async (
  data: LessonTime[],
  education_id: number,
): Promise<void> => {
  await request.put(
    'https://puzzlesignlanguage.online/api/v1/update/lessontime',
    data.map((el) => ({ ...el, education_id })),
  );
};
export const requestAllLessonTimes = async (
  education_id: number,
): Promise<
  Response<
    {
      ID: number;
      CreatedAt: string;
      UpdatedAt: string;
      StartTime: string;
      EndTime: string;
    }[]
  >
> => {
  return await request.get(
    'https://puzzlesignlanguage.online/api/v1/get/lessontime',
    {
      data: education_id,
    },
  );
};
