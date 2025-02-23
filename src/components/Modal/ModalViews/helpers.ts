export const getLocaleTime = (number: number): string => {
  if (number % 10 === 1 && number % 100 !== 11) return `минута`;
  if (
    number % 10 >= 2 &&
    number % 10 <= 4 &&
    number % 100 > 15 &&
    number % 100 > 11
  )
    return `минуты`;
  return `минут`;
};

export const validateGeneration = (
  start: Date | null,
  end: Date | null,
): string | undefined => {
  if (!start) return 'Необходимо выбрать начальную дату!';
  if (!end) return 'Необходимо выбрать конечную дату!';
  if (start.getTime() > end.getTime())
    return 'Начальная дата должна быть раньше конечной!';
};
