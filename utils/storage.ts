import { typeDoseHistory } from "@/components/types/typeDoseHistory";
import { typeMedicine } from "@/components/types/typeMedicine";
import { typeTodayMeds } from "@/components/types/typeTodayMeds";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert } from "react-native";

// const [medData, setMedData] = useState({});

const MED_DATA = "@medicationData";
const DOSE_HISTORY = "@doseHistory";

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

    console.log("med data to be added: ", medWithId);
    const existingMeds = await getMedData();
    const updatedMeds = [...existingMeds, medWithId];

    console.log("all med data list with newly added: ", updatedMeds);
    const medicationJson = JSON.stringify(updatedMeds);
    await AsyncStorage.setItem(MED_DATA, medicationJson);
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
      // console.log("medication data from storage", medicationData);
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
    console.log("single med data: ", singleMed);
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

export const getTodayMeds = async (): Promise<typeTodayMeds[]> => {
  const now = new Date(); // current time
  const midnight = new Date(); //past midnight
  midnight.setDate(midnight.getDate() + 1); //this sets the upcoming midnight and not the past midnight
  midnight.setHours(0, 0, 0, 0); // set time to 12:00 AM
  let medDate = new Date();

  // if (now < midnight) {
  //   console.log("It's before midnight");
  // } else {
  //   console.log("It's after midnight");
  // }

  try {
    const stringMedData = await AsyncStorage.getItem(MED_DATA);

    if (stringMedData) {
      const medicationData = (await JSON.parse(
        stringMedData
      )) as typeMedicine[];
      // console.log("medication data from storage", medicationData);
      // return Array.isArray(medicationData) ? medicationData : [medicationData];

      Array.isArray(medicationData) ? medicationData : [medicationData]; //if it is array then fine else make it array
      // let allMedsList: typeMedicine[] = [];

      // const todayMeds = medicationData.

      const flattenedMeds = medicationData.flatMap((medication) => {
        return medication.time.map((tm) => ({
          ...medication,
          medTime: tm.medTime,
          taken: tm.taken,
        }));
        // const singleArrangedMeds = medication.time.map((tm) => (
        // {
        //   ...medication,
        //   medTime: tm.medTime,
        //   taken: tm.taken,
        // }
        // return singleArrangedMeds;
      });

      const arrangedMeds = flattenedMeds.map((medication) => {
        const { time, ...timeArrayRemovedMeds } = medication;
        return timeArrayRemovedMeds;
      });

      return arrangedMeds;
    } else {
      console.log("No med data");
      return [];
    }
  } catch (error) {
    console.log("Failed to get med data: ", error);
    return [];
  }
};

export const medTakenToggle = async (
  id: string,
  time: string
): Promise<boolean> => {
  try {
    const allMedData = await getMedData();
    console.log("all med data are: ", allMedData);

    const updatedMedData = allMedData.map((medication) => {
      if (medication.id === id) {
        const updatedTimeArray = medication.time.map((tm) => {
          if (tm.medTime === time) {
            return { ...tm, taken: !tm.taken };
          }
          return tm;
        });

        console.log("medication after toggle is: ", updatedTimeArray);

        return { ...medication, time: updatedTimeArray };
      }
      return medication;
    });

    console.log(
      "updated toggle and time info of first element is: ",
      updatedMedData[0].time[0]
    );

    const medicationJson = JSON.stringify(updatedMedData);
    await AsyncStorage.setItem(MED_DATA, medicationJson);
    return true;
  } catch (error) {
    console.log("Could not toggle taken/not-taken: ", error);
    return false;
  }
};

export const getDoseHistory = async (): Promise<typeDoseHistory[]> => {
  try {
    const data = await AsyncStorage.getItem(DOSE_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Failed to view dose history: ", error);
    return [];
  }
};

export const getTodaysDose = async (): Promise<typeDoseHistory[]> => {
  try {
    const history = await getDoseHistory();
    const today = new Date().toDateString();
    const filteredTodayDose = history.filter(
      (dose) => new Date(dose.timestamp).toDateString() === today
    );
    return filteredTodayDose ? filteredTodayDose : [];
  } catch (error) {
    console.log("Failed to get today's dose: ", error);
    return [];
  }
};

export const recordDose = async (
  medId: string,
  taken: boolean,
  timestamp: string
): Promise<boolean> => {
  try {
    const history = await getDoseHistory();
    const newDose: typeDoseHistory = {
      id: Math.random().toString(32).substr(2, 9),
      medId,
      timestamp,
      taken,
    };
    history.push(newDose);
    await AsyncStorage.setItem(DOSE_HISTORY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.log("Failed to record med dose: ", error);
    return false;
  }
};

export const clearAllData = async (): Promise<boolean> => {
  try {
    await AsyncStorage.multiRemove([MED_DATA, DOSE_HISTORY]);
    return true;
  } catch (error) {
    console.log("Failed to delete all data: ", error);
    return false;
  }
};
