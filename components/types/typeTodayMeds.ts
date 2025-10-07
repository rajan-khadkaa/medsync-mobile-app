import { typeDoseTime } from "./typeDoseTime";

export type typeTodayMeds = {
  id: string;
  name: string;
  strength?: number | null;
  unit?: string;
  icon?: string;
  iconPackage?: string;
  date: Date;
  time: string;
  timestamp?: string;
  taken: boolean;
  missed: boolean;
  color: string;
};
