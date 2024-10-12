export const removeDuplicates = <T extends { id: number }>(items: T[]): T[] => {
  const uniqueItemsMap = new Map<number, T>(); // Используем Map для хранения уникальных элементов

  items.forEach((item) => {
    if (!uniqueItemsMap.has(item.id)) {
      uniqueItemsMap.set(item.id, item); // Добавляем элемент, если его ID еще нет в Map
    }
  });

  return Array.from(uniqueItemsMap.values()); // Возвращаем массив уникальных элементов
};
