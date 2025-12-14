import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { typeMedicine } from "@/components/types/allTypes";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const registerForPushNotificationAsync = async (): Promise<
  string | null
> => {
  let token: string | null = null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.getPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return null;
  }

  try {
    const response = await Notifications.getExpoPushTokenAsync();

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#1a8e2d",
      });
    }

    return token;
  } catch (error) {
    console.log("Error getting push token: ", error);
    return null;
  }
};

//helper function to pick which frequency user has choosen
// type Frequency = "Daily" | "Weekly" | "Monthly" | "Yearly" | "Once";

const pickerFrequencyFunction = (
  frequency: string | undefined,
  triggeringDate: Date,
  hours: number,
  minutes: number
): Notifications.NotificationTriggerInput => {
  switch (frequency) {
    case "Daily":
      return {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: hours,
        minute: minutes,
      };

    case "Weekly":
      return {
        type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
        weekday: triggeringDate.getDay() + 1, //WEEKLY trigger expects the days in 1-7 unlike 0-6 like JS
        hour: hours,
        minute: minutes,
      };

    case "Monthly":
      return {
        type: Notifications.SchedulableTriggerInputTypes.MONTHLY,
        day: triggeringDate.getDate(), //MONTHLY trigger expects 1-31 days just like JS
        hour: hours,
        minute: minutes,
      };

    case "Yearly":
      return {
        type: Notifications.SchedulableTriggerInputTypes.YEARLY,
        month: triggeringDate.getMonth(), //YEARLY trigger expects 0-11 months and 1-31 days just like JS
        day: triggeringDate.getDate(),
        hour: hours,
        minute: minutes,
      };

    case "Once":
    default:
      return {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: triggeringDate, //Trigger just once on the specific date and no 'repeats:true'
      };
  }
};

export const scheduleMedicationReminder = async (
  medication: typeMedicine
): Promise<string[] | undefined> => {
  if (!medication.reminder) return;

  try {
    const identifiers: string[] = [];
    const frequencyOfMed: string | undefined = medication.frequency;

    for (const eachTime of medication.time) {
      const [hours, minutes] = eachTime.split(":").map(Number);
      // if (isNaN(hours) || isNaN(minutes)) continue;

      const now = new Date();
      const triggerDate = new Date();
      triggerDate.setHours(hours, minutes, 0, 0);

      // if time already passed today, push to tomorrow
      if (triggerDate <= now) {
        triggerDate.setDate(triggerDate.getDate() + 1);
      }

      // console.log(
      //   "Now:",
      //   now.toLocaleTimeString(),
      //   "Trigger:",
      //   triggerDate.toLocaleTimeString()
      // );

      const trigger = pickerFrequencyFunction(
        frequencyOfMed,
        triggerDate,
        hours,
        minutes
      );

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Medication Follow Up",
          body: `Time to take ${medication.name}`,
          sound: "medsync-notification.wav",
          data: { medicationId: medication.id },
        },
        trigger,
        // trigger: {
        //   type: Notifications.SchedulableTriggerInputTypes.DATE,
        //   date: triggerDate, // THIS is the key difference
        // },

        //THIS WORKS FOR DAILY
        // trigger: {
        //   type: Notifications.SchedulableTriggerInputTypes.DAILY,
        //   hour: hours,
        //   minute: minutes,
        //   // repeats: true,
        // },
      });

      console.log("Scheduled id:", identifier);
      identifiers.push(identifier);
    }

    const all = await Notifications.getAllScheduledNotificationsAsync();
    console.log("All scheduled:", all);

    return identifiers;
  } catch (error) {
    console.log("Error scheduling med:", error);
    return undefined;
  }
};

// export const scheduleMedicationReminder = async (
//   medication: typeMedicine
// ): Promise<string[] | undefined> => {
//   if (!medication.reminder) return;

//   try {
//     const identifiers: string[] = [];

//     for (const eachTime of medication.time) {
//       const [hours, minutes] = eachTime.split(":").map(Number);
//       const now = new Date();
//       const triggerDate = new Date();

//       // Set the trigger time
//       triggerDate.setHours(hours, minutes, 0, 0);

//       // If the time has already passed today, schedule for tomorrow
//       if (triggerDate <= now) {
//         triggerDate.setDate(triggerDate.getDate() + 1);
//       }

//       // Important: Add a small delay (1 second) to ensure the notification schedules properly
//       // await new Promise((resolve) => setTimeout(resolve, 1000));

//       const identifier = await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "Medication Follow Up",
//           body: `Time to take ${medication.name}`,
//           data: { medicationId: medication.id },
//         },
//         trigger: {
//           // type: "calendar", // Explicitly set the type
//           // type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
//           hour: hours,
//           minute: minutes,
//           repeats: true,
//         },
//       });

//       identifiers.push(identifier);
//     }

//     return identifiers;
//   } catch (error) {
//     console.log("Failed to schedule med: ", error);
//     return undefined;
//   }
// };

// export const scheduleMedicationReminder = async (
//   medication: typeMedicine
// ): Promise<string | undefined> => {
//   if (!medication.reminder) return;

//   try {
//     for (const eachTime of medication.time) {
//       const [hours, minutes] = eachTime.split(":").map(Number);
//       const today = new Date();
//       today.setHours(hours, minutes, 0, 0);

//       if (today < new Date()) {
//         today.setDate(today.getDate() + 1);
//       }

//       const identifier = await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "Medication Follow Up",
//           body: `Time to take ${medication.name}`,
//           data: { medicationId: medication.id },
//         },
//         trigger: {
//           hour: hours,
//           minute: minutes,
//           repeats: true,
//         },
//         //  } as Notifications.NotificationTriggerInput,
//       });

//       return identifier;
//     }
//   } catch (error) {
//     console.log("Failed to schedule med: ", error);
//     return undefined;
//   }
// };

export const cancelMedicationReminder = async (
  medicationId: string
): Promise<boolean> => {
  try {
    const scheduldedNotifications =
      await Notifications.getAllScheduledNotificationsAsync();

    for (const notification of scheduldedNotifications) {
      //loofk here for:
      //  const medId: string| null = notification.content.data?.medicationId;
      const data = notification.content.data as {
        medicationId?: string;
      } | null;

      if (data?.medicationId === medicationId) {
        await Notifications.cancelScheduledNotificationAsync(
          notification.identifier
        );
      }
    }
    return true;
  } catch (error) {
    console.log("Failed to cancel reminder: ", error);
    return false;
  }
};

export const updateMedicationReminder = async (
  medication: typeMedicine
): Promise<boolean> => {
  try {
    await cancelMedicationReminder(medication.id);
    await scheduleMedicationReminder(medication);
    return true;
  } catch (error) {
    console.log("Failed to update med reminder: ", error);
    return false;
  }
};
