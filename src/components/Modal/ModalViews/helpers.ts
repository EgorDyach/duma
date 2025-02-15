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
