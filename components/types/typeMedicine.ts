export type typeMedicine = {
  name: string;
  description: string;
  strength: number | null;
  unit: string;
  type: string;
  duration: number | null;
  date: Date;
  time: string[];
  color: string;
  reminder: boolean;
  refill: boolean;
};
