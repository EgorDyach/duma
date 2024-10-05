import dayjs from "dayjs";
import "dayjs/locale/ru";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);
dayjs.updateLocale("ru", {
  monthsShort: [
    "янв",
    "фев",
    "мар",
    "апр",
    "мая",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ],
});

export const FULL_DATE_FORMAT = "D MMMM YYYY г.";

export const formatDate = (date: dayjs.ConfigType, format: string): string =>
  dayjs(date).locale("ru").format(format);
