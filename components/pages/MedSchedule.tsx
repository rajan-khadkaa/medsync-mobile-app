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
import { duration } from "@/constants/Values";
import { typeMedicine } from "../types/typeMedicine";
import { Ionicons } from "@expo/vector-icons";
import PrimaryBtn from "../other/PrimaryBtn";
// import { typePageCounter } from "../types/typePageCounter";
import { brandColors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

type typeMedicineProp = {
  medDuration: typeMedicine;
  setMedDuration: React.Dispatch<React.SetStateAction<typeMedicine>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const MedSchedule = ({
  medDuration,
  setMedDuration,
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
      medDuration.duration !== null &&
      medDuration.duration !== undefined &&
      medDuration.duration > 0
      // true
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
    const stringDate = medDuration.time[index].split(":"); //contains ['10','00']
    const [hour, minute] = stringDate.map((val) => Number(val)); //this now contains number [10, 00] i.e. hour=10, minute=00
    date.setHours(hour, minute, 0, 0);
    return date;
  };

  const handleDateChange = (e: any, pickedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (e.type === "set" && pickedDate)
      setMedDuration((prev) => ({ ...prev, date: pickedDate }));
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
      const formattedTime = `${hour}:${minute}`;
      const checkTime = medDuration.time.includes(formattedTime);
      // console.log("does item exist already? ", checkTime);
      // console.log("index of time picked: ", index);
      // console.log("new value of time received from picker: ", pickedTime);
      // console.log("formatted new value of time: ", formattedTime);
      if (!checkTime) {
        setMedDuration((prev) => {
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
      const filteredTime = medDuration.time.filter((time) => time !== item);

      setMedDuration((prev) => ({ ...prev, time: filteredTime }));
    }
  };

  const handleAddNewTime = (e: any, pickedTime: Date | undefined) => {
    setAddNewTime(false);
    if (e.type === "set" && pickedTime) {
      const hour = pickedTime.getHours();
      const minute = pickedTime.getMinutes();
      const formattedTime = `${hour}:${minute}`;
      const checkTime = medDuration.time.includes(formattedTime);
      // console.log("does item exist already? ", checkTime);
      // console.log("index of time picked: ", index);
      // console.log("new value of time received from picker: ", pickedTime);
      // console.log("formatted new value of time: ", formattedTime);
      if (!checkTime) {
        setMedDuration((prev) => {
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
          <Text className="body-title">For how many days?</Text>
          <View className="flex gap-3">
            <View className="flex flex-row flex-wrap justify-between">
              {duration.map((dur) => (
                <Pressable
                  className={`flex relative rounded-lg ${
                    dur.day === medDuration.duration && !inputValue
                      ? "brand-surface"
                      : "bg-zinc-50"
                  }  border-[1px] border-zinc-200/60 items-center justify-center gap-2 mb-2 p-5 w-[48.9%]`}
                  key={dur.id}
                  onPress={() => {
                    setInputValue("");
                    setMedDuration((prev) => ({ ...prev, duration: dur.day }));
                  }}
                >
                  {/* If the check icons is needed instead of bg-fill */}
                  {/* {dur.day === medDuration.duration && !inputValue && (
                    <Ionicons
                      className="absolute top-1 right-1"
                      name="checkmark-circle-outline"
                      size={24}
                      color="#3da35d"
                    />
                  )} */}
                  <Text className="brand-text text-3xl font-bold">
                    {dur.title}
                  </Text>
                  <Text>{dur.info}</Text>
                </Pressable>
              ))}
            </View>
            <Text className="w-full text-center font-bold text-zinc-500 text-sm">
              OR
            </Text>
            <View>
              <Text className="single-label">Enter custom days</Text>
              <TextInput
                className="form-field"
                placeholder="Eg. 90 days"
                value={inputValue ? inputValue : ""}
                keyboardType="numeric"
                placeholderTextColor="#999"
                onChangeText={(day) => {
                  const filteredVal = day.replace(/[^0-9]/g, "");
                  setMedDuration((prev) => ({
                    ...prev,
                    duration: Number(filteredVal),
                  }));
                  setInputValue(filteredVal);
                }}
              />
              {inputValue && (
                <View
                  className={`flex mt-1 relative rounded-lg ${
                    inputValue ? "brand-surface" : "bg-zinc-50"
                  }  border-[1px] border-zinc-200/60 items-center justify-center p-5 w-[48%]`}
                >
                  <Text className="brand-text text-3xl font-bold">
                    {inputValue}
                  </Text>
                  <Text>{inputValue === "1" ? "day" : "days"}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
        <View>
          <Text className="form-label">Start from?</Text>
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

                <Text>{medDuration.date.toLocaleDateString()}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={17}
                color={brandColors.surfaceBlack}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={medDuration.date || new Date()}
                mode="date"
                onChange={(e, pickedDate) => handleDateChange(e, pickedDate)}
              />
            )}
            <View className="time-wrapper-field">
              {medDuration.time.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setShowTimePicker(item)}
                    className={`border-b-[1.5px] flex time-field flex-row justify-between items-center`}
                    // className={`
                    //   ${index !== medDuration.time.length - 1 && "border-b-[1.5px]"}
                    //   flex time-field flex-row justify-between items-center`}
                  >
                    <View className="flex-1 flex-row gap-3 items-center">
                      <View className="bg-zinc-200/60 rounded-md p-[0.42rem]">
                        {/* <View className="border-[1.2px] border-zinc-200  bg-zinc-100 rounded-md p-[0.42rem]"> */}
                        <Ionicons
                          name="time"
                          // name="remove-circle"
                          size={16}
                          color={brandColors.primary}
                        />
                      </View>
                      <Text>{medDuration.time[index] || "N/A"}</Text>
                    </View>
                    {/* <Ionicons
                      name="chevron-forward"
                      size={17}
                      color={brandColors.surfaceBlack}
                    /> */}
                    <TouchableOpacity
                      onPress={(event) => {
                        event.stopPropagation();
                        handleRemoveTime(item);
                      }}
                      className="bg-red-100 rounded-md p-[0.42rem]"
                    >
                      <Ionicons
                        name="remove-circle"
                        size={16}
                        color={brandColors.danger}
                      />
                    </TouchableOpacity>
                    {showTimePicker === item && (
                      <DateTimePicker
                        value={showTime(index)}
                        mode="time"
                        onChange={(e, pickedTime) =>
                          handleTimeChange(e, pickedTime, index)
                        }
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                onPress={() => setAddNewTime(true)}
                className="flex flex-row justify-between items-center"
              >
                <View className="flex-1 flex-row gap-3 items-center py-3">
                  <View className="brand-surface rounded-md p-[0.42rem]">
                    <Ionicons
                      name="add-circle"
                      size={16}
                      color={brandColors.primary}
                    />
                  </View>
                  <Text>
                    {medDuration.time.length === 0
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
