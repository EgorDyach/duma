import { TeacherItem } from "@modules/rootPage/RootPage";
import { Teacher } from "@type/common";

export const formatTeachers = (teachers: TeacherItem[]): Teacher[] => {
  return teachers.map(({ id, name }) => ({
    id,
    fullname: name,
    holidays: [],
    lessons: [],
  }));
};
