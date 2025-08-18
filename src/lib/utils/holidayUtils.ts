// Временно используем any для тестирования
// import { Holiday } from '@type/index';

/**
 * Преобразует каникулы из API в массив дат для отображения
 * Учитывает как конкретные даты (date), так и дни недели (weekday)
 */
export const processHolidays = (holidays: any[]): Date[] => {
  const dates: Date[] = [];
  
  holidays.forEach(holiday => {
    if (holiday.date) {
      // Если есть конкретная дата, добавляем её
      try {
        const date = new Date(holiday.date);
        if (!isNaN(date.getTime())) {
          dates.push(date);
          
          // Временное исправление: если weekday неправильный (всегда 0),
          // вычисляем правильный день недели из даты
          if (holiday.weekday === 0 && date.getDay() !== 0) {
            console.warn(`API returned incorrect weekday ${holiday.weekday} for date ${holiday.date}, actual weekday is ${date.getDay()}`);
          }
        }
      } catch (e) {
        console.warn('Invalid date format:', holiday.date);
      }
    } else if (holiday.weekday !== undefined) {
      // Если есть день недели, добавляем все даты этого дня недели в текущем году
      const currentYear = new Date().getFullYear();
      for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= 31; day++) {
          try {
            const date = new Date(currentYear, month, day);
            if (date.getDay() === holiday.weekday && 
                date.getMonth() === month && 
                date.getDate() === day) {
              dates.push(date);
            }
          } catch (e) {
            // Пропускаем недопустимые даты
            break;
          }
        }
      }
    }
  });
  
  return dates;
};

/**
 * Проверяет, является ли дата выходным днем (суббота или воскресенье)
 */
export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = воскресенье, 6 = суббота
};

/**
 * Получает название дня недели на русском языке
 */
export const getWeekdayName = (weekday: number): string => {
  const names = [
    'Воскресенье',
    'Понедельник', 
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота'
  ];
  return names[weekday] || 'Неизвестно';
};

/**
 * Временная функция для исправления неправильного weekday в API ответе
 * Вычисляет правильный день недели из даты
 */
export const fixWeekdayFromDate = (holiday: any): any => {
  if (holiday.date && holiday.weekday === 0) {
    try {
      const date = new Date(holiday.date);
      if (!isNaN(date.getTime())) {
        const actualWeekday = date.getDay();
        if (actualWeekday !== 0) {
          return {
            ...holiday,
            weekday: actualWeekday
          };
        }
      }
    } catch (e) {
      // Игнорируем ошибки парсинга даты
    }
  }
  return holiday;
};
