import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import { medColor, medTypes } from "@/constants/Values";
import { typeMedicine } from "../types/allTypes";
import PrimaryBtn from "../other/PrimaryBtn";
import {
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
// import { typePageCounter } from "../types/typePageCounter";
import { brandColors } from "@/constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { addMedData, addTodaysMeds } from "@/utils/storage";
import Toast from "react-native-toast-message";
import { scheduleMedicationReminder } from "@/utils/notification";
import { displayIcons } from "@/utils/displayIcons";

type typeMedicineProp = {
  medFinal: typeMedicine;
  setMedFinal: React.Dispatch<React.SetStateAction<typeMedicine>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const MedFinal = ({
  medFinal,
  setMedFinal,
  count,
  setCount,
}: typeMedicineProp) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  //   const [bgColor, setBgColor] = useState<string>(medColor[0].color);
  const [medIcon, setMedIcon] = useState<string>("Tablet");
  const router = useRouter();
  //   const [pageCount, setPageCount] = useState<number>(1);
  //   const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  //   const [showTimePicker, setShowTimePicker] = useState<string | null>(null);
  //   const [addNewTime, setAddNewTime] = useState<boolean>(false);

  // useEffect(()=> {
  //     const pickedIcon= medTypes.filter(type=> ( type.))
  // },[])

  type MCIIcons = "liquid-spot" | "dots-horizontal";
  type FontistoIcons = "injection-syringe";

  const validateForm = () => {
    return (
      // medDuration.duration !== null &&
      // medDuration.duration !== undefined &&
      // medDuration.duration > 0
      true
    );
  };

  const handleNext = async () => {
    if (validateForm()) {
      //   setCount(1);
      // setCount(count + 1);

      const checkAdded = await addMedData(medFinal); //without the await it will always be true as even an empty
      // promise is truthy i.e. Promise<void> is truth as well so it will alwyas navigate to home page regardless of returned value

      await addTodaysMeds();

      if (medFinal.reminder) {
        await scheduleMedicationReminder(medFinal);
      }

      if (checkAdded) {
        Toast.show({
          type: "success",
          text1: "Medication added successfully.",
          position: "bottom",
        });
        router.push("/home");
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong. Please try again.",
          position: "bottom",
        });
      }
    }
  };
  return (
    <View className="body-padding">
      <Text className="head-title">And it's done.</Text>
      <View className="flex gap-5">
        <View>
          <Text className="form-label text-center mb-2">Final Review</Text>
          <View className="p-4  border-[1.5px] border-zinc-200/80 rounded-xl">
            {/* <View className="card-style"> */}
            <View
              style={{ backgroundColor: medFinal.color }}
              className={`size-36 rounded-full flex items-center self-center justify-center`}
            >
              <View>
                {displayIcons(
                  medFinal.iconPackage,
                  medFinal.icon,
                  40,
                  brandColors.white
                )}
              </View>

              {/* {medTypes.map((med) => (
                <View key={med.id}>
                  {med.name === medFinal.type &&
                    displayIcons(med.iconPackage, med.icon)}
                </View>
              ))} */}
            </View>
            <View className="flex gap-2 mt-3 px-2">
              <View className="flex mt-1 flex-row justify-between">
                <Text className="font-semibold text-lg flex-1 max-w-[80%]">
                  {medFinal.name || "Paracetamol"}
                </Text>
                {medFinal.strength && medFinal.unit && (
                  <Text className="font-medium text-zinc-500">{`${medFinal.strength} ${medFinal.unit}`}</Text>
                )}
              </View>
              <View className="w-full h-[1px] bg-zinc-200/60" />
              <View className="flex-1 flex-row justify-between gap-3 items-center">
                <View className="flex-row items-center gap-3">
                  <View className="brand-surface rounded-full p-[0.42rem]">
                    <Ionicons
                      name="calendar"
                      size={15}
                      color={brandColors.primary}
                    />
                  </View>

                  <View className="flex flex-row gap-1">
                    <Text className="text-zinc-600">Starts: </Text>
                    <Text className="font-medium">
                      {medFinal.date.toLocaleDateString()}
                    </Text>
                  </View>
                </View>
                {/* {medFinal.duration && (
                  <Text className="font-medium text-zinc-500">
                    ({medFinal.duration} days)
                  </Text>
                )} */}
              </View>
              <View className="w-full h-[1px] bg-zinc-200/60" />
              <View className="flex gap-3">
                {medFinal.time.map((item, index) => {
                  return (
                    <View
                      key={index}
                      className={` flex flex-row justify-between items-center`}
                    >
                      <View className="flex-1 flex-row gap-3 items-center">
                        <View className="brand-surface rounded-full p-[0.42rem]">
                          {/* <View className="border-[1.2px] border-zinc-200  bg-zinc-100 rounded-md p-[0.42rem]"> */}
                          <Ionicons
                            name="time"
                            // name="remove-circle"
                            size={16}
                            color={brandColors.primary}
                          />
                        </View>
                        <Text className="font-medium">
                          {medFinal.time[index] || "N/A"}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text className="form-label">Description (Optional)</Text>
          <TextInput
            numberOfLines={5}
            multiline={true}
            style={{ textAlignVertical: "top" }}
            className="form-field h-32"
            placeholder="Eg. Prescribed for fever."
            placeholderTextColor="#999"
            value={medFinal.description || ""} // string fallback
            onChangeText={(value) =>
              setMedFinal((prev) => ({ ...prev, description: value }))
            }
          />
        </View>
        <View className="w-full flex gap-2">
          {/* <View className="w-full"> */}
          <PrimaryBtn
            text="Add Medication"
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

export default MedFinal;
