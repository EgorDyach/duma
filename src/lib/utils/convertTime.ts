export function convertUtcToMsk(isoString: string): string {
  // Создаем объект Date из ISO строки
  const utcDate = new Date(isoString);

  // Получаем время в миллисекундах и добавляем 3 часа (3 * 60 * 60 * 1000)
  const mskDate = new Date(utcDate.getTime() + 3 * 60 * 60 * 1000);

  // Возвращаем строку в формате ISO
  return mskDate.toISOString();
}
