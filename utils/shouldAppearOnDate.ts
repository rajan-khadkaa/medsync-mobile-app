import { today } from "./date";

export const shouldAppearOnDate = (
  medDate: Date,
  freq: string,
  dateArg: string
): boolean => {
  const checkDate = new Date(dateArg);
  switch (freq) {
    case "Daily":
      return true;

    case "Weekly":
      return medDate.getDay() === checkDate.getDay();

    case "Monthly":
      return medDate.getDate() === checkDate.getDate();

    case "Yearly":
      return (
        medDate.getMonth() === checkDate.getMonth() &&
        medDate.getDate() === checkDate.getDate()
      );

    case "Once":
      return (
        medDate.getFullYear() === checkDate.getFullYear() &&
        medDate.getMonth() === checkDate.getMonth() &&
        medDate.getDate() === checkDate.getDate()
      );
    default:
      return false;
  }
};
