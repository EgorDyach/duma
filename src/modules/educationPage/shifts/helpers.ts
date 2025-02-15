export const validateShift = (
  newShift: Shift,
  shifts: Shift[],
): string | undefined => {
  if (newShift.number <= 0 || newShift.number % 1 !== 0)
    return 'Некорректный номер смены!';
  if (shifts.map((el) => el.number).includes(newShift.number))
    return 'Данная смена существует!';
};
