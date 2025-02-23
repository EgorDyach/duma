export const validateLessonTime = (
  newLessonTime: LessonTime,
): string | undefined => {
  console.log(newLessonTime);
  if (!newLessonTime.start_time) return 'Необходимо ввести время начала!';
  if (!newLessonTime.end_time) return 'Необходимо ввести время окончания!';
  if (newLessonTime.start_time >= newLessonTime.end_time)
    return 'Начальное время должно быть меньше!';
  if (newLessonTime.shift_id === -1) return 'Необходимо выбрать смену!';
};
