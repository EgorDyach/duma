export const validateGroup = (
  newGroup: Group,
  groups: Group[],
): string | undefined => {
  if (!newGroup.name) return 'Необходимо ввести название группы!';
  if (newGroup.name.length > 127) return 'Название группы слишком длинное!';
  if (
    newGroup.studentscount <= 0 ||
    newGroup.studentscount % 1 !== 0 ||
    newGroup.studentscount > 10000
  )
    return 'Некоректное количество студентов!';
  if (newGroup.shift_id === -1) return 'Необходимо выбрать смену!';
  if (
    groups
      .filter((el) => el.id !== newGroup.id)
      .map((el) => el.name)
      .includes(newGroup.name)
  )
    return 'Данная группа существует!';
};
