export const validateRoom = (
  newRoom: Room,
  shifts: Room[],
): string | undefined => {
  if (!newRoom.room.name) return 'Необходимо ввести название аудитории!';
  if (
    shifts
      .filter((el) => el.room.id !== newRoom.room.id)
      .map((el) => el.room.name)
      .includes(newRoom.room.name)
  )
    return 'Данная аудитория существует!';
  if (newRoom.room.capacity <= 0 || newRoom.room.capacity > 1000000)
    return 'Некорректная вместимость аудитории!';
};
