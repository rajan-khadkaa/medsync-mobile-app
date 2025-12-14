import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
// import { getMedData } from "@/utils/storage"; // if needed later
import { getMarks, medTakenToggle } from "@/utils/storage";
import { getEachDayMeds } from "@/utils/storage";
import { typeTodayMeds } from "@/components/types/allTypes";
import HeaderBar from "@/components/other/HeaderBar";
import { today } from "@/utils/date";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { displayIcons } from "@/utils/displayIcons";

const CalendarScreen = () => {
  const [markedDates, setMarkedDates] = useState<any>({});
  const [selectedDate, setSelectedDate] = useState<string>(
    today().split("T")[0]
  );
  const [dayMeds, setDayMeds] = useState<typeTodayMeds[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🟩 1. Run on mount to get current month's marks
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // JS months are 0-indexed (0 = Jan)

    const loadMarks = async () => {
      setLoading(true);

      // const meds = await getEachDayMeds(selectedDate);
      // setDayMeds(meds);
      await handleEachDayMeds();

      const marks = await getMarks(year, month);
      setMarkedDates(marks);
      setLoading(false);
    };

    loadMarks();
  }, []);

  const handleEachDayMeds = async () => {
    const meds = await getEachDayMeds(selectedDate);
    setDayMeds(meds);
  };

  const handleMedToggle = async (
    id: string,
    time: string,
    taken: boolean
    // date: Date
  ) => {
    // console.log('medication by default is: ', )
    if (taken) {
      // console.log("taken is true so this untake action will run.");
      Alert.alert(
        "Mark as not taken?",
        "Do you want to mark this medication as not taken?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Mark as not taken",
            onPress: async () => {
              await medTakenToggle(id, time);
              // await medTakenToggle(id, date, time);
              // fetchData();
              handleEachDayMeds();
            },
          },
        ]
      );
    } else {
      // console.log("taken is false so this TAKE action will run.");
      await medTakenToggle(id, time);
      // await medTakenToggle(id, date, time);
      // fetchData();
      handleEachDayMeds();
    }

    // fetchData();
  };

  // 🟦 2. When a day is pressed
  const handleDayPress = async (dayObj: any) => {
    const dateStr = dayObj.dateString; // format: "2025-10-12"
    setSelectedDate(dateStr);

    // For now, just log; later we’ll use getEachDayMeds()
    console.log("Selected date:", dateStr);

    const meds = await getEachDayMeds(dateStr);
    setDayMeds(meds);
  };

  if (loading) {
    return (
      <View className="h-screen flex-row justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 h-screen">
      <HeaderBar title="Medications Calendar" />
      <View className="px-3 py-2 flex-col gap-5">
        <Calendar
          markedDates={{
            ...markedDates,
            ...{
              [selectedDate]: {
                selected: true,
                selectedColor: "#3da35d",
                marked: markedDates[selectedDate]?.marked,
                // dotColor: markedDates[selectedDate]?.dotColor || "green",
              },
            },
          }}
          onDayPress={handleDayPress}
          theme={{
            todayTextColor: "#3da35d",
            arrowColor: "#3da35d",
          }}
        />

        <View className="px-2">
          <View className="flex-col gap-2">
            <Text className="text-xl font-semibold text-gray-700 mb-2">
              Medications Scheduled
            </Text>
            <Text className="text-lg font-semibold text-gray-700 mb-2">
              {`${new Date(selectedDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}`}
            </Text>
            {/* <Text className="text-xl font-semibold text-gray-700 mb-2">
            {`Meds for ${new Date(selectedDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}`}
            {selectedDate ? `Meds for ${selectedDate}` : "Select a date"}
          </Text> */}
          </View>

          {/* {dayMeds.length > 0 ? dayMeds.map((med, index) => (
                <View key={index}>
                  <Text>{med.name}</Text>
                </View>
              ))
            : selectedDate && (
                <Text className="text-gray-500">
                  No medications found for this day
                </Text>
              )} */}
          <View>
            {dayMeds.length === 0 ? (
              <View className="items-center mt-10">
                <Octicons name="clock" size={46} color="#ccc" />
                <View className="flex gap-2 mt-5 items-center">
                  <Text className="text-gray-600 text-lg font-medium">
                    No medications
                  </Text>
                  <Text className="text-gray-500 text-base">
                    No medication scheduled for this day
                  </Text>
                </View>
                {/* <Link className="w-full" href="/medications/add" asChild>
                  <TouchableOpacity className="bg-[#1a8e2d] w-[60%] flex items-center justify-center p-4 rounded-md">
                    <Text className="text-white font-semibold">
                      Add Medications
                    </Text>
                  </TouchableOpacity>
                </Link> */}
              </View>
            ) : (
              <View className="gap-2">
                {dayMeds.map((medicine) => (
                  <View key={medicine.time} className="gap-2">
                    <View className="flex-row items-center border-[1px] border-zinc-200 bg-white rounded-2xl p-4 shadow-sm">
                      <View
                        className={`w-[50px] h-[50px] rounded-full justify-center items-center mr-[15px]`}
                        style={{ backgroundColor: medicine.color }}
                      >
                        {displayIcons(
                          medicine.iconPackage,
                          medicine.icon,
                          24,
                          "#fff"
                        )}
                      </View>
                      <View className="flex-1 gap-2">
                        <View>
                          <Text className="text-[#1a1a1a] text-base font-semibold">
                            {medicine.name}
                          </Text>
                          {/* <Text className="text-[#666] text-sm">{med.doses}</Text> */}
                        </View>

                        <View className="flex-row items-center">
                          <Ionicons
                            name="time-outline"
                            size={16}
                            color="#ccc"
                          />
                          <Text className="text-[#666] text-sm ml-1 mb-[0.2rem]">
                            {medicine.time}
                          </Text>
                        </View>
                      </View>
                      {medicine.taken ? (
                        <TouchableOpacity
                          onPress={() => {
                            // console.log("Take button pressed.", medicine.taken);
                            handleMedToggle(
                              medicine.id,
                              medicine.time,
                              medicine.taken
                              // medicine.date
                            );
                          }}
                          style={{
                            // borderColor: "#3da35d",
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            width: 90,
                          }}
                          className="flex-row gap-[0.3rem] items-center justify-center border-[1.3px] border-zinc-200 rounded-full"
                        >
                          <Ionicons
                            name="checkmark-circle-outline"
                            size={18}
                            color="#3da35d"
                          />
                          <Text className="text-[#3da35d] mr-1">Taken</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            // console.log(
                            //   "TAKEN button pressed.",
                            //   medicine.taken
                            // );

                            handleMedToggle(
                              medicine.id,
                              medicine.time,
                              medicine.taken
                              // medicine.date
                            );
                          }}
                          className="brand-surface  border-[1.3px] surface-bdr rounded-full flex justify-center items-center"
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            width: 90,
                          }}
                        >
                          <Text className="brand-text font-semibold">Take</Text>
                        </TouchableOpacity>
                      )}
                      {/* {medicine.taken ? (
                        <TouchableOpacity
                          onPress={() => {
                            console.log("Take button pressed.", medicine.taken);
                            handleMedToggle(
                              medicine.id,
                              medicine.time,
                              medicine.taken
                              // medicine.date
                            );
                          }}
                          style={{
                            // borderColor: "#3da35d",
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            width: 90,
                          }}
                          className="flex-row gap-[0.3rem] items-center justify-center brand-surface  border-[1.3px] surface-bdr rounded-full"
                        >
                          <Ionicons
                            name="checkmark-circle-outline"
                            size={18}
                            color="#3da35d"
                          />
                          <Text className="text-[#3da35d] mr-1">Taken</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            console.log(
                              "TAKEN button pressed.",
                              medicine.taken
                            );

                            handleMedToggle(
                              medicine.id,
                              medicine.time,
                              medicine.taken
                              // medicine.date
                            );
                          }}
                          className="border-[1.3px] border-zinc-200 rounded-full flex justify-center items-center"
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            width: 90,
                          }}
                        >
                          <Text className="brand-text font-semibold">Take</Text>
                        </TouchableOpacity>
                      )} */}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CalendarScreen;
