import { TeacherItem } from "@type/studyPlan";
import { Teacher } from "@type/studyPlanServer";

export const formatTeachers = (teachers: TeacherItem[]): Teacher[] => {
  return teachers.map(({ id, name }) => ({
    id,
    fullname: name,
    holidays: [],
    lessons: [],
  }));
};
