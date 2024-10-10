import {
  Auditorium,
  Coaching,
  CoachLesson,
  Group,
  Subject,
  Teacher,
} from "@type/common";

export const requestCreateAuditorium = async (
  auditories: Auditorium[]
): Promise<void> => {
  await fetch(
    "http://puzzlesignlanguage.online:8001/api/v1/create/auditorium",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(auditories),
    }
  );
};

export const requestCreateTeacher = async (data: Teacher[]): Promise<void> => {
  await fetch("http://puzzlesignlanguage.online:8001/api/v1/create/teacher", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const requestCreateGroup = async (data: Group[]): Promise<void> => {
  await fetch("http://puzzlesignlanguage.online:8001/api/v1/create/group", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const requestCreateSubjects = async (data: Subject[]): Promise<void> => {
  await fetch("http://puzzlesignlanguage.online:8001/api/v1/create/subject", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const requestCreateCoach = async (data: Coaching[]): Promise<void> => {
  await fetch("http://puzzlesignlanguage.online:8001/api/v1/create/coach", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const requestCreateCoachLessons = async (
  data: CoachLesson[]
): Promise<void> => {
  await fetch(
    "http://puzzlesignlanguage.online:8001/api/v1/create/coachlesson",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
};
