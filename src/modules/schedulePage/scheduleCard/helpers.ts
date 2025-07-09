import { LessonData } from './ScheduleCard';

export const toFixedNumberLessons = (
  lessons: (LessonData | null)[],
  amount: number,
) => {
  const newLessons = [...lessons];
  if (lessons.length < amount) {
    for (let i = 0; i < amount - lessons.length; i++) {
      newLessons.push(null);
    }
  }

  return newLessons;
};
