import {
  Auditorium,
  Coaching,
  CoachLesson,
  Group,
  Response,
  Subject,
  Teacher,
} from "@type/common";

export const requestCreateAuditorium = async (
  auditories: Auditorium[]
): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/create/auditorium", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(auditories),
  });
};

export const requestAllAuditorium = async (): Promise<
  Response<
    {
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
      ID: number;
      Name: string;
      Capacity: number;
      profiles: null;
    }[]
  >
> => {
  return await fetch(
    "https://puzzlesignlanguage.online/api/v1/Get/auditorium",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  ).then(async (res) => await res.json());
};

export const requestCreateTeacher = async (data: Teacher[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/create/teacher", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
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
  return await fetch("https://puzzlesignlanguage.online/api/v1/Get/teacher", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then(async (res) => await res.json());
};

export const requestCreateGroup = async (data: Group[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/create/group", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const requestAllGroups = async (): Promise<
  Response<
    {
      CreatedAt: string;
      UpdatedAt: string;
      DeletedAt: null;
      ID: number;
      Name: string;
      Shift: number;
      ProfileID: number;
      Profile: null;
      holidays: null;
    }[]
  >
> => {
  return await fetch("https://puzzlesignlanguage.online/api/v1/get/group", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then(async (res) => await res.json());
};

export const requestCreateSubjects = async (data: Subject[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/create/subject", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
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
  return await fetch("https://puzzlesignlanguage.online/api/v1/Get/subject", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then(async (res) => await res.json());
};

export const requestCreateCoach = async (data: Coaching[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/create/coach", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
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
      AuditoriumID: number;
      GroupID: number;
    }[]
  >
> => {
  return await fetch("https://puzzlesignlanguage.online/api/v1/Get/coach", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then(async (res) => await res.json());
};

export const requestCreateCoachLessons = async (
  data: CoachLesson[]
): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/create/coachlesson", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};
