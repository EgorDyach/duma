export const validateRoom = (
  newRoom: Room,
  shifts: Room[],
): string | undefined => {
  if (!newRoom.name) return 'Необходимо ввести название аудитории!';
  if (
    shifts
      .filter((el) => el.id !== newRoom.id)
      .map((el) => el.name)
      .includes(newRoom.name)
  )
    return 'Данная аудитория существует!';
  if (newRoom.capacity <= 0 || newRoom.capacity > 1000000)
    return 'Некорректная вместимость аудитории!';
};
