export const validateTeacher = (newTeacher: Teacher): string | undefined => {
  if (!newTeacher.fullname) return 'Необходимо ввести ФИО учителя!';
};
