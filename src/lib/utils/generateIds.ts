export const generateIds = (count: number, offset: number) => {
  return Array.from({ length: count }, (_, index) => index + offset);
};
