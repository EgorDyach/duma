import { TeacherItem } from "./RootPage";

export const validateTeacher = (item: TeacherItem): string => {
  if (!item.name) return "Введите имя учителя!";
  item.subjects.forEach((el) => {
    if (!el.classes.length) return `У предмета должен быть хоть 1 класс!`;
    if (!el.name) return `У предмета должно быть название!`;
  });
  return "";
};
