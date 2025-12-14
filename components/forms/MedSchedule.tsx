import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { medFreq } from "@/constants/Values";
import { typeMedicine } from "../types/allTypes";
import { Ionicons } from "@expo/vector-icons";
import PrimaryBtn from "../other/PrimaryBtn";
// import { typePageCounter } from "../types/typePageCounter";
import { brandColors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

type typeMedicineProp = {
  medFrequency: typeMedicine;
  setMedFrequency: React.Dispatch<React.SetStateAction<typeMedicine>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const MedSchedule = ({
  medFrequency,
  setMedFrequency,
  count,
  setCount,
}: typeMedicineProp) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  //   const [pageCount, setPageCount] = useState<number>(1);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<string | null>(null);
  const [addNewTime, setAddNewTime] = useState<boolean>(false);

  const validateForm = () => {
    return (
      // medFrequency.duration !== null &&
      // medFrequency.duration !== undefined &&
      // medFrequency.duration > 0
      true
    );
  };

  const handleNext = () => {
    if (validateForm()) {
      // setCount(1);
      setCount(count + 1);
    }
  };

  const showTime = (index: number) => {
    const date = new Date();
    const stringDate = medFrequency.time[index].split(":"); //contains ['10','00']
    const [hour, minute] = stringDate.map((val) => Number(val)); //this now contains number [10, 00] i.e. hour=10, minute=00
    date.setHours(hour, minute, 0, 0);
    return date;
  };

  const handleDateChange = (e: any, pickedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (e.type === "set" && pickedDate)
      setMedFrequency((prev) => ({ ...prev, date: pickedDate }));
  };
  const handleTimeChange = (
    e: any,
    pickedTime: Date | undefined,
    index: number
  ) => {
    setShowTimePicker(null);
    if (e.type === "set" && pickedTime) {
      const hour = pickedTime.getHours();
      const minute = pickedTime.getMinutes();
      // This below line was used while having only time like [10, 2] and not like [{medTime:10, taken:false}, ]
      // const checkTime = medFrequency.time.includes(formattedTime);

      const checkTime = medFrequency.time.some(
        (time) => time === formattedTime
      );

      const formattedTime = `${hour}:${minute}`;
      // console.log("does item exist already? ", checkTime);
      // console.log("index of time picked: ", index);
      // console.log("new value of time received from picker: ", pickedTime);
      // console.log("formatted new value of time: ", formattedTime);
      if (!checkTime) {
        setMedFrequency((prev) => {
          const replacedTime = [...prev.time];
          // console.log("spreading existing times array: ", replacedTime);
          replacedTime[index] = formattedTime;
          // console.log("spreading newly added times array: ", replacedTime);
          return {
            ...prev,
            time: replacedTime,
          };
        });
      }
    }
  };

  const handleRemoveTime = (item: string) => {
    if (item) {
      const filteredTime = medFrequency.time.filter(
        (timeObj) => timeObj !== item
      );

      setMedFrequency((prev) => ({ ...prev, time: filteredTime }));
    }
  };

  const handleAddNewTime = (e: any, pickedTime: Date | undefined) => {
    setAddNewTime(false);
    if (e.type === "set" && pickedTime) {
      const hour = pickedTime.getHours();
      const minute = pickedTime.getMinutes();
      const formattedTime = `${hour}:${minute}`;
      // const checkTime = medFrequency.time.includes(formattedTime);

      const checkTime = medFrequency.time.some(
        (time) => time === formattedTime
      );
      // console.log("does item exist already? ", checkTime);
      // console.log("index of time picked: ", index);
      // console.log("new value of time received from picker: ", pickedTime);
      // console.log("formatted new value of time: ", formattedTime);
      if (!checkTime) {
        setMedFrequency((prev) => {
          return {
            ...prev,
            time: [...prev.time, formattedTime],
          };
        });
      } else {
        Alert.alert(
          "Time Already Set!",
          `The time ${formattedTime} is already set.`
        );
      }
    }
  };

  //   const showTime = () => {
  //   const date = new Date();

  //   date.setHours(hour, minute, 0, 0);
  //   return date;
  // };

  return (
    <View className="body-padding">
      <Text className="head-title">Set a Medication Schedule</Text>
      <View className="flex gap-8">
        <View>
          <Text className="body-title">How often?</Text>
          <View className="flex gap-3">
            <View className="flex flex-row flex-wrap justify-between">
              {medFreq.map((freq) => (
                <Pressable
                  className={`flex relative rounded-lg ${
                    freq.frequency === medFrequency.frequency
                      ? "brand-surface"
                      : "bg-zinc-50"
                  }  border-[1px] border-zinc-200/60 items-center justify-center gap-2 mb-2 p-5 w-[48.9%]`}
                  key={freq.id}
                  onPress={() => {
                    setInputValue("");
                    setMedFrequency((prev) => ({
                      ...prev,
                      frequency: freq.frequency,
                    }));
                  }}
                >
                  {/* If the check icons is needed instead of bg-fill */}
                  {/* {freq.frequency === medFrequency.frequency && (
                    <Ionicons
                      className="absolute top-1 right-1"
                      name="checkmark-circle-outline"
                      size={24}
                      color="#3da35d"
                    />
                  )} */}
                  <Text className="brand-text text-base font-medium">
                    {freq.frequency}
                  </Text>
                  {/* <Text>{freq.info}</Text> */}
                </Pressable>
              ))}
            </View>
          </View>
        </View>
        <View>
          <Text className="form-label">
            {medFrequency.frequency === "Just Once" ? "Set on?" : "Start from?"}
          </Text>
          <View className="">
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="flex date-field mb-4 flex-row justify-between items-center"
            >
              <View className="flex-1 flex-row gap-3 items-center">
                <View className="brand-surface rounded-md p-[0.42rem]">
                  <Ionicons
                    name="calendar"
                    size={15}
                    color={brandColors.primary}
                  />
                </View>

                <Text>{medFrequency.date?.toLocaleDateString()}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={17}
                color={brandColors.surfaceBlack}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={medFrequency.date || new Date()}
                mode="date"
                onChange={(e, pickedDate) => handleDateChange(e, pickedDate)}
              />
            )}
            <View>
              {/* adding new time */}
              <TouchableOpacity
                onPress={() => setAddNewTime(true)}
                className="flex date-field flex-row justify-between items-center"
              >
                <View className="flex-1 flex-row gap-3 items-center">
                  <View className="brand-surface rounded-md p-[0.42rem]">
                    <Ionicons
                      name="add-circle"
                      size={16}
                      color={brandColors.primary}
                    />
                  </View>
                  <Text>
                    {medFrequency.time.length === 0
                      ? "Add time"
                      : "Add another time"}
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={17}
                  color={brandColors.surfaceBlack}
                />
              </TouchableOpacity>
              {addNewTime && (
                <DateTimePicker
                  value={new Date()}
                  display="spinner"
                  mode="time"
                  onChange={(e, pickedTime) => handleAddNewTime(e, pickedTime)}
                />
              )}

              {/* displaying existing times */}
              <View className="gap-2 mt-2">
                {medFrequency.time.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className={`self-start px-1 flex-row justify-between items-center`}
                    >
                      <View className="flex-row gap-3 items-center">
                        <View className="bg-zinc-200/60 rounded-md ml-1 p-[0.35rem]">
                          <TouchableOpacity
                            onPress={(event) => {
                              event.stopPropagation();
                              handleRemoveTime(item);
                            }}
                            className="bg-red-100 rounded-full"
                          >
                            <Ionicons
                              name="remove-circle"
                              size={20}
                              color={brandColors.danger}
                            />
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          key={index}
                          onPress={() => setShowTimePicker(item)}
                          className="rounded-md py-[0.37rem] bg-zinc-200 px-3"
                        >
                          <Text>{medFrequency.time[index] || "N/A"}</Text>
                        </TouchableOpacity>
                      </View>

                      {showTimePicker === item && (
                        <DateTimePicker
                          value={showTime(index)}
                          mode="time"
                          display="spinner"
                          onChange={(e, pickedTime) =>
                            handleTimeChange(e, pickedTime, index)
                          }
                        />
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <View className="w-full flex gap-2">
          {/* <View className="w-full"> */}
          <PrimaryBtn
            text="Next"
            loading={!validateForm()}
            handlePressAction={() => handleNext()}
          />
          <TouchableOpacity
            className={`border-[1.5px] border-zinc-300 rounded-lg py-3`}
            onPress={() => setCount(count - 1)}
          >
            <Text className="text-zinc-700 text-center font-medium text-lg">
              Previous
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MedSchedule;
