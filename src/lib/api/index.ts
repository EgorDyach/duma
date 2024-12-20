import { Account } from "@lib/utils/data/formatAccounts";
import { Response } from "@type/common";
import { LessonTime } from "@type/studyPlan";
import {
  Room,
  Teacher,
  Group,
  Subject,
  Coaching,
  CoachLesson,
} from "@type/studyPlanServer";

export const requestCreateRoom = async (auditories: Room[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/create/Room", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(auditories),
  });
};

export const requestUpdateRoom = async (auditories: Room[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/update/Room", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(auditories),
  });
};

export const requestDeleteRoom = async (auditories: Room[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/delete/room", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(auditories),
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
  return await fetch("https://puzzlesignlanguage.online/api/v1/Get/Room", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then(async (res) => await res.json());
};

//

export const requestCreateTeacher = async (data: Teacher[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/create/teacher", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const requestUpdateTeacher = async (data: Teacher[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/update/teacher", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
};
export const requestDeleteTeacher = async (data: Teacher[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/delete/teacher", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
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

export const requestUpdateGroup = async (data: Group[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/update/group", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
};
export const requestDeleteGroup = async (data: Group[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/delete/group", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(data),
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

export const requestUpdateSubjects = async (data: Subject[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/update/subject", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
};
export const requestDeleteSubjects = async (data: Subject[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/delete/subject", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
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

export const requestUpdateCoach = async (data: Coaching[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/update/coach", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
};
export const requestDeleteCoach = async (data: Coaching[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/delete/coach", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
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
      RoomID: number;
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

export const requestUpdateCoachLessons = async (
  data: CoachLesson[]
): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/update/coachlesson", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const requestDeleteCoachLessons = async (
  data: (CoachLesson & { id: number })[]
): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/delete/coachlesson", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(data),
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
    "https://puzzlesignlanguage.online/api/v1/get/coachlesson",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  ).then(async (res) => await res.json());
};

export const requestCreateAccounts = async (data: Account[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/create/profile", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const requestDeleteAccounts = async (data: Account[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/delete/profile", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(data),
  });
};
export const requestUpdateAccounts = async (data: Account[]): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/update/profile", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
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
  return await fetch("https://puzzlesignlanguage.online/api/v1/get/profile", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  }).then(async (res) => await res.json());
};

export const requestCreateLessonTimes = async (
  data: LessonTime[]
): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/create/lessontime", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const requestDeleteLessonTimes = async (
  data: LessonTime[]
): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/delete/lessontime", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(data),
  });
};
export const requestUpdateLessonTimes = async (
  data: LessonTime[]
): Promise<void> => {
  await fetch("https://puzzlesignlanguage.online/api/v1/update/lessontime", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
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
    "https://puzzlesignlanguage.online/api/v1/get/lessontime",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  ).then(async (res) => await res.json());
};
