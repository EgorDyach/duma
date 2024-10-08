export type DateRange = "quarter" | "semester" | "halfYear" | "year";

export function getDateRange(range: DateRange): string {
  const today = new Date();
  const startDate = new Date(today);
  let endDate: Date;

  switch (range) {
    case "quarter":
      endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 3);
      break;
    case "semester":
      endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 6);
      break;
    case "halfYear":
      endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 6);
      break;
    case "year":
      endDate = new Date(startDate);
      endDate.setFullYear(startDate.getFullYear() + 1);
      break;
    default:
      throw new Error("Invalid range");
  }

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
    const year = String(date.getFullYear()).slice(-2); // Берем последние 2 цифры года
    return `${day}.${month}.${year}`;
  };

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}
