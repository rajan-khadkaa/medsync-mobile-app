export type typeButton = {
  loading?: boolean;
  handlePressAction: () => void;
  text: string;
  loadingText?: string;
};

export type typeCircularProgressBar = {
  progress: number;
  totalDoses: number;
  completedDoses: number;
};

export type typeDoseHistory = {
  id: string;
  medId: string;
  timestamp: string;
  taken: boolean;
};

export type typeDoseTime = {
  medTime: string;
  taken: boolean;
};

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

export type typeMedObject = {
  [dateKey: string]: typeTodayMeds[];
};

import React from "react";

export type typePageCounter = {
  pageCounter: React.Dispatch<React.SetStateAction<number>>;
};

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
