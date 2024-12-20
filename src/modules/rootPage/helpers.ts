import { TeacherItem } from "@type/studyPlan";

export const validateTeacher = (item: TeacherItem): string => {
  if (!item.name) return "Введите имя учителя!";
  item.subjects.forEach((el) => {
    if (!el.name) return `У предмета должно быть название!`;
  });
  return "";
};
