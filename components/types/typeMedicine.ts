// import { typeDoseTime } from "./typeDoseTime";

export type typeMedicine = {
  id: string;
  name: string;
  description?: string;
  strength?: number | null;
  unit?: string;
  type?: string;
  icon?: string;
  iconPackage?: string;
  // duration?: number | null;
  frequency: string;
  date: Date;
  // time: typeDoseTime[];
  time: string[];
  color: string;
  reminder: boolean;
  refill: boolean;
};
