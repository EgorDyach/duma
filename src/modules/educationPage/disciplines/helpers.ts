import { Filters } from './DisciplineModule';

export const validateDiscipline = (
  newDiscipline: Discipline,
): string | undefined => {
  if (newDiscipline.subject_id === -1) return 'Необходимо выбрать предмет!';
  // if (!newDiscipline.groups) return 'Необходимо выбрать группы!';
  if (
    newDiscipline.hours <= 0 ||
    newDiscipline.hours % 1 !== 0 ||
    newDiscipline.hours > 10_000
  )
    return 'Некорректный формат часов!';
};

export const validateCourse = (newCourse: Course): string | undefined => {
  if (newCourse.course.discipline_id === -1) return 'Не выбрана дисциплина!';
  if (newCourse.course.teacher_id === -1) return 'Не выбран учитель!';
};

export const displayFilteredDisciplines = (
  filters: Filters,
  disciplines: Discipline[],
) => {
  let newDisciplines = [...disciplines];

  if (filters.subject.length) {
    newDisciplines = disciplines.filter((el) => {
      return filters.subject.includes(el.subject_id);
    });
  }

  if (filters.group.length) {
    newDisciplines = newDisciplines.filter((el) => {
      return filters.group.some((group) => {
        if (!el.groups) return;
        el.groups.map((gr) => gr.id).includes(group);
      });
    });
  }

  return newDisciplines;
};
