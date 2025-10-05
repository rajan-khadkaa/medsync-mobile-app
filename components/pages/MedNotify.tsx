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
import { typeMedicine } from "../types/typeMedicine";
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
import DateTimePicker from "@react-native-community/datetimepicker";

type typeMedicineProp = {
  medNotify: typeMedicine;
  setMedNotify: React.Dispatch<React.SetStateAction<typeMedicine>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const MedNotify = ({
  medNotify,
  setMedNotify,
  count,
  setCount,
}: typeMedicineProp) => {
  // const [bgColor, setBgColor] = useState<string>(medColor[0].color);

  type MCIIcons = "liquid-spot" | "dots-horizontal";
  type FontistoIcons = "injection-syringe";

  const displayIcons = (
    iconPackage: string | undefined,
    icon: string | undefined
  ) => {
    const iconSize = 44;
    const iconColor = brandColors.white;
    switch (iconPackage) {
      case "FontAwesome6":
        return <FontAwesome6 name={icon} size={iconSize} color={iconColor} />;
      case "MaterialCommunityIcons":
        return (
          <MaterialCommunityIcons
            name={icon as MCIIcons}
            size={iconSize}
            color={iconColor}
          />
        );
      case "Fontisto":
        return (
          <Fontisto
            name={icon as FontistoIcons}
            size={iconSize}
            color={iconColor}
          />
        );
      // return <Fontisto name={icon} size={iconSize} color={iconColor}/>;
      case "FontAwesome5":
        return <FontAwesome5 name={icon} size={iconSize} color={iconColor} />;
      default:
        return <Ionicons name="medical" size={iconSize} color={iconColor} />;
    }
  };

  const validateForm = () => {
    return (
      // medDuration.duration !== null &&
      // medDuration.duration !== undefined &&
      // medDuration.duration > 0
      true
    );
  };

  const handleNext = () => {
    if (validateForm()) {
      // setCount(1);
      setCount(count + 1);
    }
  };
  return (
    <View className="body-padding">
      <Text className="head-title">Set Medication Reminders</Text>
      <View className="flex gap-8">
        <View>
          <Text className="body-title text-center">
            Pick a color to identify easily.
          </Text>
          <View className="flex items-center mt-2 gap-5">
            <View
              style={{ backgroundColor: medNotify.color }}
              className={`size-36 rounded-full flex items-center justify-center`}
            >
              <View>
                {/* { (med.name === medNotify.type ||
                    medNotify.icon === "medical") && */}
                {displayIcons(medNotify.iconPackage, medNotify.icon)}
              </View>
              {/* {medTypes.map((med) => (
                <View key={med.id}>
                  {med.name === medNotify.type &&
                    displayIcons(med.iconPackage, med.icon)}
                </View>
              ))} */}

              {/* <Ionicons name="add-circle" size={52} color={brandColors.white} /> */}
            </View>
            <View className="flex flex-row justify-center flex-wrap gap-2 w-full">
              {medColor.map((col) => (
                <View
                  key={col.id}
                  className={`${
                    col.color === medNotify.color
                      ? "border-[#3da35d] border-2"
                      : // ? "border-zinc-400 border-2"
                        "border-white border-2"
                  } rounded-full`}
                >
                  <Pressable
                    style={{ backgroundColor: col.color }}
                    className="border-[1.5px] border-white size-12 rounded-full"
                    // className={`${
                    //   col.color === medNotify.color && "border-2 border-white"
                    // } size-12 rounded-full`}
                    onPress={() => {
                      // setBgColor(col.color);
                      setMedNotify((prev) => ({ ...prev, color: col.color }));
                    }}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
        {/* <View> */}
        {/* <Text className="body-title">Do you want to be reminded?</Text> */}
        <View className="flex gap-0">
          <View className="flex card-style mb-4 flex-row justify-between items-center">
            <View className="flex-1 flex-row gap-3 items-center">
              <View className="brand-surface rounded-full p-4">
                <Ionicons
                  name="notifications"
                  size={20}
                  color={brandColors.primary}
                />
              </View>
              <View className="w-[75%]">
                <Text className="body-title mb-0">Medication Reminder</Text>
                <Text className="supporting-text mt-0.5">
                  Get notified when it's time to take medication.
                </Text>
              </View>
            </View>
            <View>
              <Switch
                trackColor={{
                  false: brandColors.grey,
                  true: brandColors.primary,
                }}
                thumbColor={medNotify.reminder ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={() =>
                  setMedNotify((prev) => ({
                    ...prev,
                    reminder: !prev.reminder,
                  }))
                }
                value={medNotify.reminder}
              />
            </View>
          </View>
          <View className="flex card-style mb-4 flex-row justify-between items-center">
            <View className="flex-1 flex-row gap-3 items-center">
              <View className="brand-surface rounded-full p-3">
                <Ionicons
                  name="refresh-circle"
                  size={24}
                  color={brandColors.primary}
                />
              </View>
              <View className="w-[75%]">
                <Text className="body-title mb-0">Refill Reminder</Text>
                <Text className="supporting-text mt-0.5">
                  Get notified when it's time to refill medication.
                </Text>
              </View>
            </View>
            <View>
              <Switch
                trackColor={{
                  false: brandColors.grey,
                  true: brandColors.primary,
                }}
                thumbColor={medNotify.refill ? "#f4f3f4" : "#f4f3f4"}
                onValueChange={() =>
                  setMedNotify((prev) => ({
                    ...prev,
                    refill: !prev.refill,
                  }))
                }
                value={medNotify.refill}
              />
            </View>
          </View>
        </View>
        {/* </View> */}
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

export default MedNotify;
