import { typeTodayMeds } from "./typeTodayMeds";

export type typeMedHistory = {
  [dateKey: string]: typeTodayMeds[];
};
