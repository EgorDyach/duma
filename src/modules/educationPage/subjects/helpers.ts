export const validateSubject = (
  newSubject: Subject,
  subjects: Subject[],
): string | undefined => {
  if (!newSubject.name) return 'Необходимо ввести название предмета!';
  if (subjects.map((el) => el.name).includes(newSubject.name))
    return 'Данный предмет существует!';
};
