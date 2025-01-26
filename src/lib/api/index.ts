import axios, { AxiosError } from 'axios';
import { ENV } from '@lib/configs/enviorement';
import { ApiError, AppApi } from '@type/api';
import AppRoutes from '@lib/configs/routes';
import SessionService from '@lib/utils/sessionService';
import { showErrorNotification } from '@lib/utils/notification';

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
export const requestCreateRoom = async (
  data: Room[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/create/Room', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      ...data.map((el) => ({ ...el, education_id })),
    }),
  });
};
export const requestUpdateRoom = async (
  data: Room[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/update/Room', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({
      ...data.map((el) => ({ ...el, education_id })),
    }),
  });
};
export const requestDeleteRoom = async (
  data: Room[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/delete/room', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({
      ...data.map((el) => ({ ...el, education_id })),
    }),
  });
};
export const requestAllRoom = async (): Promise<
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
  return await fetch('https://puzzlesignlanguage.online/api/v1/Get/Room', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (res) => await res.json());
};
//
export const requestCreateTeacher = async (
  data: Teacher[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/create/teacher', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestUpdateTeacher = async (
  data: Teacher[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/update/teacher', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestDeleteTeacher = async (
  data: Teacher[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/delete/teacher', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestAllTeacher = async (): Promise<
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
  return await fetch('https://puzzlesignlanguage.online/api/v1/Get/teacher', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (res) => await res.json());
};
export const requestCreateGroup = async (
  data: Group[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/create/group', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestUpdateGroup = async (
  data: Group[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/update/group', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestDeleteGroup = async (
  data: Group[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/delete/group', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestAllGroups = async (): Promise<
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
  return await fetch('https://puzzlesignlanguage.online/api/v1/get/group', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (res) => await res.json());
};
export const requestCreateSubjects = async (
  data: Subject[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/create/subject', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestUpdateSubjects = async (
  data: Subject[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/update/subject', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestDeleteSubjects = async (
  data: Subject[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/delete/subject', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestAllSubjects = async (): Promise<
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
  return await fetch('https://puzzlesignlanguage.online/api/v1/Get/subject', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (res) => await res.json());
};
export const requestCreateCoach = async (
  data: Coaching[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/create/coach', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestUpdateCoach = async (
  data: Coaching[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/update/coach', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestDeleteCoach = async (
  data: Coaching[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/delete/coach', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestAllCoaches = async (): Promise<
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
  return await fetch('https://puzzlesignlanguage.online/api/v1/Get/coach', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (res) => await res.json());
};
export const requestCreateCoachLessons = async (
  data: CoachLesson[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/create/coachlesson', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestUpdateCoachLessons = async (
  data: CoachLesson[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/update/coachlesson', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestDeleteCoachLessons = async (
  data: (CoachLesson & { id: number })[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/delete/coachlesson', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestAllCoachLessons = async (): Promise<
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
  return await fetch(
    'https://puzzlesignlanguage.online/api/v1/get/coachlesson',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  ).then(async (res) => await res.json());
};

export const requestCreateAccounts = async (
  data: Account[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/create/profile', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestDeleteAccounts = async (
  data: Account[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/delete/profile', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestUpdateAccounts = async (
  data: Account[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/update/profile', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestAllAccounts = async (): Promise<
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
  return await fetch('https://puzzlesignlanguage.online/api/v1/get/profile', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(async (res) => await res.json());
};
export const requestCreateLessonTimes = async (
  data: LessonTime[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/create/lessontime', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestDeleteLessonTimes = async (
  data: LessonTime[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/delete/lessontime', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestUpdateLessonTimes = async (
  data: LessonTime[],
  education_id: number,
): Promise<void> => {
  await fetch('https://puzzlesignlanguage.online/api/v1/update/lessontime', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'PUT',
    body: JSON.stringify({ ...data.map((el) => ({ ...el, education_id })) }),
  });
};
export const requestAllLessonTimes = async (): Promise<
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
  return await fetch(
    'https://puzzlesignlanguage.online/api/v1/get/lessontime',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    },
  ).then(async (res) => await res.json());
};
