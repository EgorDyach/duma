export const validateLessonTime = (
  newLessonTime: LessonTime,
): string | undefined => {
  if (!newLessonTime.starttime) return 'Необходимо ввести время начала!';
  if (!newLessonTime.endtime) return 'Необходимо ввести время окончания!';
  if (newLessonTime.starttime >= newLessonTime.endtime)
    return 'Некорректное время!';
  if (newLessonTime.shift_id === -1) return 'Необходимо выбрать смену!';
};
