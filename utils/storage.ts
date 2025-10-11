import { typeDoseHistory } from "@/components/types/typeDoseHistory";
import { typeMedicine } from "@/components/types/typeMedicine";
import { typeTodayMeds } from "@/components/types/typeTodayMeds";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert } from "react-native";
import { shouldAppearToday } from "././shouldAppearToday";
import { today } from "./date";
import { typeMedObject } from "@/components/types/typeMedObject";

// const [medData, setMedData] = useState({});

const MED_DATA = "@medicationData";
// const DOSE_HISTORY = "@doseHistory";
const MED_HISTORY = "@medicationHistory";
const MED_TODAY = "@medicationToday";

export const addMedData = async (medData: typeMedicine): Promise<boolean> => {
  try {
    // const medId = Math.random().toString(36).substr(2,9); direct method or a breakdown

    const randomNum = Math.random(); // let's say it will be 0.1234567890123456 for example
    const base36String = randomNum.toString(36); // this converts to base-36 like "0.4fzo5x2" example
    const id = base36String.substring(2); // removes the "0." prefix and makes it like "4fzo5x2"
    const medId = id.substr(0, 9) as string; // take first 9 characters as specified and gives "4fzo5x2" (if original
    // was shorter than 9 chars otherwise all 9 characters)

    const medWithId = {
      ...medData,
      id: medId,
    };

    // console.log("med data to be added: ", medWithId);
    const existingMeds = await getMedData();
    // console.log("existing meds data before adding new data: ", medWithId);
    const updatedMeds = [...existingMeds, medWithId];

    // console.log("all med data list including newly added: ", updatedMeds);
    await AsyncStorage.setItem(MED_DATA, JSON.stringify(updatedMeds));
    // const allKeys = await AsyncStorage.getAllKeys();
    // console.log("Stored keys in AsyncStorage:", allKeys);
    return true;
  } catch (error) {
    console.log("Failed to add medication.", error);
    return false;
  }
};

export const getMedData = async (): Promise<typeMedicine[]> => {
  try {
    const stringMedData = await AsyncStorage.getItem(MED_DATA);

    if (stringMedData) {
      const medicationData = (await JSON.parse(
        stringMedData
      )) as typeMedicine[];
      return Array.isArray(medicationData) ? medicationData : [medicationData];
    } else {
      console.log("No med data");
      return [];
    }
  } catch (error) {
    console.log("Failed to get med data: ", error);
    return [];
  }
};

export const getSingleMed = async (medId: string) => {
  try {
    const allMeds = await getMedData();
    const singleMed = allMeds.find((med) => med.id === medId);
    // console.log("single med data: ", singleMed);
    return singleMed;
  } catch (error) {
    console.log("Failed to view: ", error);
    return false;
  }
};

export const deleteMedData = async (medId: string): Promise<boolean> => {
  try {
    const allMeds = await getMedData();
    const filteredMed = allMeds.filter((med) => med.id !== medId);
    // console.log("med data list after deletion: ", filteredMed);
    await AsyncStorage.setItem(MED_DATA, JSON.stringify(filteredMed));
    return true;
  } catch (error) {
    console.log("Failed to delete: ", error);
    return false;
  }
};

export const getMedHistory = async (): Promise<typeMedObject> => {
  const stored = await AsyncStorage.getItem(MED_HISTORY);
  const history = stored ? JSON.parse(stored) : {};
  // console.log("med history data from storage is: ", history);
  // Object.entries(history).map((item) => console.log("item is: ", item));
  return history;
};

export const getMedsOfToday = async (): Promise<typeMedObject> => {
  try {
    const stored = await AsyncStorage.getItem(MED_TODAY);

    // If nothing stored, return empty object
    if (!stored) return {};

    const todaysMed: typeMedObject = JSON.parse(stored);
    console.log("Today's meds from storage:", todaysMed);

    return todaysMed;
  } catch (error) {
    console.log("Could not get today's meds: ", error);
    return {};
  }
};

export const addTodaysMeds = async () => {
  try {
    const medicationsData = await getMedData();
    if (medicationsData.length === 0) return;

    // const checkTodayMedsExists = await getMedsOfToday();
    // if(Object.keys(checkTodayMedsExists).length === 0) {}

    const todaysMedArray: typeTodayMeds[] = [];

    for (const medication of medicationsData) {
      if (shouldAppearToday(medication.date, medication.frequency)) {
        for (const tm of medication.time) {
          const timeMappedMed = {
            id: medication.id,
            name: medication.name,
            strength: medication.strength,
            unit: medication.unit,
            icon: medication.icon,
            iconPackage: medication.iconPackage,
            date: medication.date,
            time: tm,
            color: medication.color,
            taken: false,
            missed: false,
          };
          todaysMedArray.push(timeMappedMed);
        }
      }
    }

    const todaysDataObj = {
      [today().toDateString()]: todaysMedArray,
    };

    console.log(
      "Today's med object to be saved in async storage: ",
      todaysDataObj
    );

    await AsyncStorage.setItem(MED_TODAY, JSON.stringify(todaysDataObj));
  } catch (error) {
    console.log("Failed to get med data: ", error);
    return [];
  }
};

export const addMedHistory = async () => {
  try {
    const medicationsData = await getMedData();
    if (medicationsData.length === 0) return [];

    const checkTodayMedsExists = await getMedHistory();
    // if (checkTodayMedsExists[today().toDateString()]) {
    // console.log("This date's med " +(today().toDateString())+ " already exists in history so do nothing");
    // return;

    const todaysMedArray: typeTodayMeds[] = [];

    for (const medication of medicationsData) {
      if (shouldAppearToday(medication.date, medication.frequency)) {
        for (const tm of medication.time) {
          const timeMappedMed = {
            id: medication.id,
            name: medication.name,
            strength: medication.strength,
            unit: medication.unit,
            icon: medication.icon,
            iconPackage: medication.iconPackage,
            date: medication.date,
            time: tm,
            color: medication.color,
            taken: false,
            missed: false,
          };
          todaysMedArray.push(timeMappedMed);
        }
      }
    }

    // await saveMedsHistory(todaysMedArray, today().toDateString());
    const stored = await AsyncStorage.getItem(MED_HISTORY);
    const history =
      stored && stored.length !== 0 ? await JSON.parse(stored) : {};

    history[today().toDateString()] = todaysMedArray;

    await AsyncStorage.setItem(MED_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.log("Failed to get med data: ", error);
    return [];
  }
};

export const getTodayMeds = async (): Promise<typeTodayMeds[]> => {
  try {
    // const stored = await AsyncStorage.getItem(MED_HISTORY);
    // const history = stored ? await JSON.parse(stored) : {};
    const history: typeMedObject = await getMedHistory();
    // console.log(
    //   "meds history it got from getMedHistory() inside getToday() function: ",
    //   history
    // );
    const checkDate = today().toDateString();
    const todaysMedsArray: typeTodayMeds[] = history[checkDate];
    console.log(
      `all meds in array from getToday() for today i.e. ${today().toDateString()}: `,
      todaysMedsArray
    );
    return todaysMedsArray ? todaysMedsArray : [];
  } catch (error) {
    console.log("Could not get todays meds: ", error);
    return [];
  }
};

export const medTakenToggle = async (
  medId: string,
  // checkDate: Date,
  checkTime: string
) => {
  // console.log("GOT the function call. PROCEEDING...");
  try {
    // console.log("type of date received is: ", typeof checkDate);
    // console.log("date received is: ", checkDate);
    const dateString = today().toDateString();
    // const stringDate = checkDate.toDateString();
    // console.log(
    //   "type of date after converting to toDateString is: ",
    //   typeof dateString
    // );
    // console.log("date after toDateString is: ", dateString);
    const stored = await AsyncStorage.getItem(MED_HISTORY);
    const history = stored ? JSON.parse(stored) : {};
    // console.log("ALL data before toggling taken value: ", history);

    const checkSpecificMed = history[dateString];
    console.log(
      "specific med array of specific date to be toggled: ",
      checkSpecificMed
    );

    // const checkSpecificMed:typeTodayMeds[] = await getTodayMeds();

    if (!checkSpecificMed || checkSpecificMed.length === 0) return;

    const toggledMed = checkSpecificMed.map((medication: typeTodayMeds) => {
      if (medication.id === medId && medication.time === checkTime) {
        console.log("med whose taken value will be toggled: ", medication);
        return {
          ...medication,
          taken: !medication.taken,
          timestamp: today(),
        };
      }
      return medication;
    });

    // console.log(
    //   "toggled med array with edited/updated taken value is: ",
    //   toggledMed
    // );
    history[dateString] = toggledMed;

    await AsyncStorage.setItem(MED_HISTORY, JSON.stringify(history));
  } catch (error) {
    console.log("Could not toggle taken/not-taken: ", error);
    return false;
  }
};

// export const getDoseHistory = async (): Promise<typeDoseHistory[]> => {
//   try {
//     const data = await AsyncStorage.getItem(DOSE_HISTORY);
//     return data ? JSON.parse(data) : [];
//   } catch (error) {
//     console.log("Failed to view dose history: ", error);
//     return [];
//   }
// };

// export const getTodaysDose = async (): Promise<typeDoseHistory[]> => {
//   try {
//     const history = await getDoseHistory();
//     const today = new Date().toDateString();
//     const filteredTodayDose = history.filter(
//       (dose) => new Date(dose.timestamp).toDateString() === today
//     );
//     return filteredTodayDose ? filteredTodayDose : [];
//   } catch (error) {
//     console.log("Failed to get today's dose: ", error);
//     return [];
//   }
// };

// export const recordDose = async (
//   medId: string,
//   taken: boolean,
//   timestamp: string
// ): Promise<boolean> => {
//   try {
//     const history = await getDoseHistory();
//     const newDose: typeDoseHistory = {
//       id: Math.random().toString(32).substr(2, 9),
//       medId,
//       timestamp,
//       taken,
//     };
//     history.push(newDose);
//     await AsyncStorage.setItem(DOSE_HISTORY, JSON.stringify(history));
//     return true;
//   } catch (error) {
//     console.log("Failed to record med dose: ", error);
//     return false;
//   }
// };

export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.multiRemove([MED_DATA, MED_HISTORY]);
    return true;
  } catch (error) {
    console.log("Failed to delete all data: ", error);
    return false;
  }
};
