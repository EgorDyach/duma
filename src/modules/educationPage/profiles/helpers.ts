export const validateProfile = (
  newProfile: Profile,
  shifts: Profile[],
): string | undefined => {
  if (!newProfile.name) return 'Необходимо ввести название профиля!';
  if (shifts.map((el) => el.name).includes(newProfile.name))
    return 'Данный профиль существует!';
};
