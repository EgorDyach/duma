import {
  AuditoryItem,
  ClassItem,
  LessonTime,
  SubjectItem,
  TeacherItem,
} from "@modules/rootPage/RootPage";

export const validateTeacher = (item: TeacherItem): string => {
  // if (!item.name) return "Введите имя учителя!";
  item.subjects.forEach((el) => {
    if (!el.name) return `У предмета должно быть название!`;
  });
  return "";
};
export const validateClass = (item: ClassItem): string => {
  if (!item.name) return "Введите название класса!";
  return "";
};

export const validateAuditory = (item: AuditoryItem): string => {
  if (!item.name) return "Введите название аудитории!";
  if (!item.capacity) return "Введите вместимость!";
  return "";
};

export const validateSubject = (item: SubjectItem): string => {
  if (!item.name) return "Введите название дисциплины!";
  if (!item.teacher?.length) return "Необходимо прекрепить учителя!";
  if (!item.teacher) return "Укажите учителя!";
  return "";
};

export const validateLessonTime = (item: LessonTime): string => {
  if (
    Number(item.EndTime.split(":")[0]) * 60 +
      Number(item.EndTime.split(":")[1]) <=
    Number(item.StartTime.split(":")[0]) * 60 +
      Number(item.StartTime.split(":")[1])
  )
    return "Время окончание должно быть позже времени начала!";
  return "";
};

export const getLocaleTime = (number: number): string => {
  if (number % 10 === 1 && number % 100 !== 11) return `минута`;
  if (
    number % 10 >= 2 &&
    number % 10 <= 4 &&
    number % 100 > 15 &&
    number % 100 > 11
  )
    return `минуты`;
  return `минут`;
};
