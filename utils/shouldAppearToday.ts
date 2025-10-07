import { today } from "./date";

export const shouldAppearToday = (medDate: Date, freq: string): boolean => {
  switch (freq) {
    case "Daily":
      return true;

    case "Weekly":
      return medDate.getDay() === today().getDay();

    case "Monthly":
      return medDate.getDate() === today().getDate();

    case "Yearly":
      return (
        medDate.getMonth() === today().getMonth() &&
        medDate.getDate() === today().getDate()
      );

    case "Once":
      return (
        medDate.getFullYear() === today().getFullYear() &&
        medDate.getMonth() === today().getMonth() &&
        medDate.getDate() === today().getDate()
      );
    default:
      return false;
  }
};
