import { typeTodayMeds } from "./typeTodayMeds";

export type typeMedObject = {
  [dateKey: string]: typeTodayMeds[];
};
