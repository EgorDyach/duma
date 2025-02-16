export const validateLessonTime = (
  newLessonTime: LessonTime,
): string | undefined => {
  if (!newLessonTime.start_time) return 'Необходимо ввести время начала!';
  if (!newLessonTime.end_time) return 'Необходимо ввести время окончания!';
  if (newLessonTime.start_time >= newLessonTime.end_time)
    return 'Некорректное время!';
  if (newLessonTime.shift_id === -1) return 'Необходимо выбрать смену!';
};
