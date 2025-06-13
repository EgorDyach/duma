import { Lesson } from './ScheduleCard';

export const toFixedNumberLessons = (lessons: Lesson[], amount: number) => {
  const newLessons = [...lessons];
  if (lessons.length < amount) {
    for (let i = 0; i < amount - lessons.length; i++) {
      newLessons.push({});
    }
  }

  return newLessons;
};
