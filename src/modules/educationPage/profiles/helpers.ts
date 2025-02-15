export const validateProfile = (
  newProfile: Profile,
  profiles: Profile[],
): string | undefined => {
  if (!newProfile.name) return 'Необходимо ввести название профиля!';
  if (profiles.map((el) => el.name).includes(newProfile.name))
    return 'Данный профиль существует!';
};
