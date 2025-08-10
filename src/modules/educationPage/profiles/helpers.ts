export const validateProfile = (
  newProfile: Profile,
  profiles: Profile[],
): string | undefined => {
  if (!newProfile.name) return 'Необходимо ввести название профиля!';
  if (newProfile.department_id === undefined || newProfile.department_id === -1)
    return 'Необходимо указать кафедру!';
  if (
    profiles.find((el) => el.name === newProfile.name)?.department_id ===
    newProfile.department_id
  )
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
  if (
    departments.find((el) => el.name === newDepartment.name)?.faculty_id ===
    newDepartment.faculty_id
  )
    return 'Данная кафедра существует!';
};
