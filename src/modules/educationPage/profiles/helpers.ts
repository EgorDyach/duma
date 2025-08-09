export const validateProfile = (
  newProfile: Profile,
  profiles: Profile[],
): string | undefined => {
  if (!newProfile.name) return 'Необходимо ввести название профиля!';
  if (newProfile.department_id === undefined || newProfile.department_id === -1)
    return 'Необходимо указать кафедру!';
  if (profiles.map((el) => el.name).includes(newProfile.name))
    return 'Данный профиль существует!';
};

export const validateFaculty = (
  newFaculty: Faculty,
  faculties: Faculty[],
): string | undefined => {
  if (!newFaculty.name) return 'Необходимо ввести название факультета!';
  if (faculties.map((el) => el.name).includes(newFaculty.name))
    return 'Данный факультет существует!';
};

export const validateDepartment = (
  newDepartment: Department,
  departments: Department[],
): string | undefined => {
  if (!newDepartment.name) return 'Необходимо ввести название кафедры!';
  if (newDepartment.faculty_id === -1) return 'Необходимо указать факультет!';
  if (departments.map((el) => el.name).includes(newDepartment.name))
    return 'Данная кафедра существует!';
};
