import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import CloseIcon from '@components/icons/CloseIcon';
import Flex from '@components/Flex';
import Checkbox from './Checkbox';

// --------------------
// Styled Components
// --------------------

export const StyledCalendar = styled(Calendar)`
  border: 1.2px solid #641aee !important;
  border-radius: 10px;

  .react-calendar__tile {
    aspect-ratio: 1;
    padding-inline: 0;
    position: relative;
    abbr {
      z-index: 2;
      position: relative;
    }
  }

  .react-calendar__tile--now {
    background: #eadafe !important;
    color: #641aee;
  }

  .react-calendar__tile--active {
    background: transparent !important;
    color: #000;
  }
  .react-calendar__tile.selected {
    background: transparent !important;
    color: white;
  }

  .react-calendar__tile:enabled:hover {
    background-color: #f5eefe;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f5eefe !important;
  }

  .react-calendar__navigation button:disabled {
    background-color: #eadafe !important;
  }

  .react-calendar__navigation button:first-of-type {
    border-top-left-radius: 10px;
  }

  .react-calendar__navigation button:last-of-type {
    border-top-right-radius: 10px;
  }
`;

const DayCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333;

  input {
    accent-color: #641aee;
  }
`;

const DateList = styled.ul`
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  overflow-x: auto;
  padding: 0px 0;
  list-style: none;
  margin: 0;

  li {
    background: #f5f5f5;
    border: 1px solid #ddd;
    padding: 8px 12px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }

  button {
    border: none;
    padding: 0;
    cursor: pointer;
  }
`;

// --------------------
// Вспомогательные функции
// --------------------

// Сравнение дат (игнорируя время)
const isSameDate = (a: Date, b: Date) => a.toDateString() === b.toDateString();

// Группировка последовательных дат в диапазоны
const groupDatesToRanges = (dates: Date[]): { start: Date; end: Date }[] => {
  if (!dates.length) return [];
  const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
  const ranges: { start: Date; end: Date }[] = [];
  let start = sortedDates[0];
  let end = sortedDates[0];

  for (let i = 1; i < sortedDates.length; i++) {
    const current = sortedDates[i];
    const diffDays =
      (current.getTime() - end.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      // Если даты идут подряд – расширяем диапазон
      end = current;
    } else {
      ranges.push({ start, end });
      start = current;
      end = current;
    }
  }
  ranges.push({ start, end });
  return ranges;
};

// --------------------
// Component Props
// --------------------

export interface MultiDatePickerProps {
  /**
   * Исходный массив выбранных дат (может быть пустым)
   */
  value?: Date[];
  /**
   * Callback, вызываемый при изменении выбранных дат
   */
  onChange?: (dates: Date[]) => void;
  isEditable?: boolean;
}

// --------------------
// Component: MultiDatePicker
// --------------------

export const MultiDatePicker: React.FC<MultiDatePickerProps> = ({
  value = [],
  onChange = () => {},
  isEditable = true
}) => {
  // Локальное состояние выбранных дат, текущего месяца и "ожидаемой" даты
  const [selectedDates, setSelectedDates] = useState<Date[]>(value);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [pendingDate, setPendingDate] = useState<Date | null>(null);

  // При изменении выбранных дат уведомляем родительский компонент
  useEffect(() => {
    onChange(selectedDates);
  }, [selectedDates, onChange]);

  // Дни недели для чекбоксов
  const daysOfWeek: { name: string; value: number }[] = [
    { name: 'Понедельник', value: 1 },
    { name: 'Вторник', value: 2 },
    { name: 'Среда', value: 3 },
    { name: 'Четверг', value: 4 },
    { name: 'Пятница', value: 5 },
    { name: 'Суббота', value: 6 },
    { name: 'Воскресенье', value: 0 },
  ];

  // Возвращает все даты в заданном месяце для указанного дня недели (0..6)
  const getDatesForWeekday = (weekday: number, month: Date): Date[] => {
    const dates: Date[] = [];
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, monthIndex, day);
      if (date.getDay() === weekday) {
        dates.push(date);
      }
    }
    return dates;
  };

  // Проверяет, выбраны ли все даты указанного дня недели в текущем месяце
  const isWeekdayFullySelected = (weekday: number, month: Date): boolean => {
    const datesForWeekday = getDatesForWeekday(weekday, month);
    const selectedInMonth = selectedDates.filter(
      (date) =>
        date.getMonth() === month.getMonth() &&
        date.getFullYear() === month.getFullYear(),
    );
    return (
      datesForWeekday.length > 0 &&
      datesForWeekday.every((date) =>
        selectedInMonth.some((sel) => isSameDate(sel, date)),
      )
    );
  };

  // Обработчик переключения чекбокса для конкретного дня недели
  const handleWeekdayToggle = (weekday: number) => {
    const datesForWeekday = getDatesForWeekday(weekday, currentMonth);
    const fullySelected = isWeekdayFullySelected(weekday, currentMonth);

    // Убираем из выбранных дат те, что относятся к текущему месяцу и данному дню недели
    const selectedWithoutWeekday = selectedDates.filter(
      (date) =>
        !(
          date.getMonth() === currentMonth.getMonth() &&
          date.getFullYear() === currentMonth.getFullYear() &&
          date.getDay() === weekday
        ),
    );

    if (fullySelected) {
      setSelectedDates(selectedWithoutWeekday);
    } else {
      const newDates = datesForWeekday.filter(
        (date) => !selectedDates.some((sel) => isSameDate(sel, date)),
      );
      setSelectedDates([...selectedDates, ...newDates]);
    }
  };

  // Обработчик клика по дню календаря
  const handleDayClick = (value: Date) => {
    // Если кликнули по дате, которая не относится к текущему месяцу,
    // обновляем currentMonth и сохраняем дату во временное состояние pendingDate.
    if (
      value.getMonth() !== currentMonth.getMonth() ||
      value.getFullYear() !== currentMonth.getFullYear()
    ) {
      setCurrentMonth(new Date(value.getFullYear(), value.getMonth(), 1));
      setPendingDate(value);
      return;
    }

    // Если дата уже из текущего месяца – переключаем её выбор
    setSelectedDates((prevSelected) => {
      const isAlreadySelected = prevSelected.some((date) =>
        isSameDate(date, value),
      );
      return isAlreadySelected
        ? prevSelected.filter((date) => !isSameDate(date, value))
        : [...prevSelected, value];
    });
  };

  // После изменения currentMonth, если имеется pendingDate, проверяем,
  // относится ли она теперь к текущему месяцу. Если да – переключаем выбор.
  useEffect(() => {
    if (pendingDate) {
      if (
        pendingDate.getMonth() === currentMonth.getMonth() &&
        pendingDate.getFullYear() === currentMonth.getFullYear()
      ) {
        setSelectedDates((prevSelected) => {
          const isAlreadySelected = prevSelected.some((date) =>
            isSameDate(date, pendingDate),
          );
          return isAlreadySelected
            ? prevSelected.filter((date) => !isSameDate(date, pendingDate))
            : [...prevSelected, pendingDate];
        });
        setPendingDate(null);
      }
    }
  }, [currentMonth, pendingDate]);

  // Обработчик смены месяца в календаре – обновляем currentMonth и сбрасываем pendingDate,
  // если новая дата не соответствует ожидаемой.
  const handleMonthChange = ({
    activeStartDate,
  }: {
    activeStartDate: Date;
    view: 'century' | 'decade' | 'year' | 'month';
  }) => {
    setCurrentMonth(activeStartDate);
    setPendingDate((prevPending) => {
      if (
        prevPending &&
        prevPending.getFullYear() === activeStartDate.getFullYear() &&
        prevPending.getMonth() === activeStartDate.getMonth()
      ) {
        return prevPending;
      }
      return null;
    });
  };

  // Для подсветки выбранных дат в календаре
  const tileClassName = ({
    date,
    view,
  }: {
    date: Date;
    view: string;
  }): string => {
    if (view === 'month') {
      const isSelected = selectedDates.some((sel) => isSameDate(sel, date));
      return isSelected ? 'selected' : '';
    }
    return '';
  };

  // Удаление диапазона – убираем все даты, попадающие в интервал
  const removeRange = (range: { start: Date; end: Date }) => {
    setSelectedDates((prev) =>
      prev.filter(
        (date) =>
          date.getTime() < range.start.getTime() ||
          date.getTime() > range.end.getTime(),
      ),
    );
  };

  // Группируем выбранные даты (по всем выбранным датам, а не только текущего месяца)
  const ranges = groupDatesToRanges(selectedDates);

  return (
    <div style={{ maxWidth: 530 }}>
      <Flex gap="10px" direction="column">
        {/* Список сгруппированных диапазонов (для всех выбранных дат) */}
        {isEditable &&
        <>
        <DateList>
          {ranges.map((range, index) => (
            <li key={index}>
              {isSameDate(range.start, range.end)
                ? range.start.toLocaleDateString('ru-RU')
                : `${range.start.toLocaleDateString('ru-RU')} - ${range.end.toLocaleDateString('ru-RU')}`}
              <button onClick={() => removeRange(range)}>
                <CloseIcon color="black" width="24px" height="24px" />
              </button>
            </li>
          ))}
        </DateList>
        {/* Чекбоксы для дней недели (только для текущего месяца) */}
        <Flex wrap="wrap" gap="8px">
          {daysOfWeek.map((day) => (
            <DayCheckbox key={day.value}>
              <Checkbox
                checked={isWeekdayFullySelected(day.value, currentMonth)}
                setChecked={() => handleWeekdayToggle(day.value)}
              />
              {day.name}
            </DayCheckbox>
          ))}
        </Flex>
        </>}
        {/* Календарь – теперь передаём activeStartDate для управления отображаемым месяцем */}
        <Flex justify='center'>
          <StyledCalendar
            tileContent={(el) => (
              <div
                style={{
                  position: 'absolute',
                  top: 5,
                  left: 0,
                  width: 50,
                  height: 40,
                  backgroundColor: selectedDates.some((date) =>
                    isSameDate(date, el.date),
                  )
                    ? '#641aee'
                    : 'transparent',
                  borderRadius: '0',
                  borderTopLeftRadius:
                    ranges.find((range) => isSameDate(range.start, el.date)) &&
                    25,
                  borderBottomLeftRadius:
                    ranges.find((range) => isSameDate(range.start, el.date)) &&
                    25,
                  borderTopRightRadius:
                    ranges.find((range) => isSameDate(range.end, el.date)) &&
                    25,
                  borderBottomRightRadius:
                    ranges.find((range) => isSameDate(range.end, el.date)) &&
                    25,
                }}
              />
            )}
            activeStartDate={currentMonth}
            minDate={new Date(new Date().getFullYear(), 0, 1)}
            maxDate={new Date(new Date().getFullYear(), 11, 31)}
            locale="ru-RU"
            onClickWeekNumber={(weekNumber, date) =>
              alert('Clicked week: ' + weekNumber + 'that starts on: ' + date)
            }
            // @ts-ignore
            onActiveStartDateChange={handleMonthChange}
            onClickDay={(date) => isEditable && handleDayClick(date)}
            tileClassName={tileClassName}
          />
        </Flex>
        {/* <Flex gap="12px">
          <Text>
            <div
              style={{
                background: '#eec01a',
                width: 16,
                height: 16,
                display: 'inline-block',
              }}
            />{' '}
            – текущая дата
          </Text>
          <Text>
            <div
              style={{
                background: '#641aee',
                width: 16,
                height: 16,
                display: 'inline-block',
              }}
            />{' '}
            – выбрано
          </Text>
          <Text>
            <div
              style={{
                background: '#9663f4',
                width: 16,
                height: 16,
                display: 'inline-block',
              }}
            />{' '}
            – выбрано (др. месяц)
          </Text>
        </Flex> */}
      </Flex>
    </div>
  );
};

export default MultiDatePicker;
