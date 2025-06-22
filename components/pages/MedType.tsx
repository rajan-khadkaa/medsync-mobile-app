import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { medTypes } from "@/constants/Values";
import { typeMedicine } from "../types/typeMedicine";
import PrimaryBtn from "../other/PrimaryBtn";

type typeMedicineProp = {
  medType: typeMedicine;
  setMedType: React.Dispatch<React.SetStateAction<typeMedicine>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const MedType = ({
  medType,
  setMedType,
  count,
  setCount,
}: typeMedicineProp) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const validateForm = () => {
    return medType.type;
    // return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      setCount(count + 1); // Only proceed if validation passes
    }
  };

  // setting type for the material community icons and fiesto icons as they accept only the literal/specific
  // string and not name={icon} like other i.e. fontawesome and ionicons as typescript is strict about icon names
  type MCIIcons = "liquid-spot" | "dots-horizontal";
  type FontistoIcons = "injection-syringe";

  const displayIcons = (iconPackage: string, icon: string) => {
    const iconSize = 16;
    const iconColor = "#3da35d";
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

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="body-padding">
      <Text className="head-title">Choose the Medication Type</Text>
      <View className="flex gap-8">
        {/* Common forms/types */}
        <View>
          <Text className="body-title">Common Forms</Text>
          <View className="px-4 bg-zinc-50 border-[1.5px] border-zinc-100 rounded-lg">
            {medTypes.slice(0, 4).map((med) => (
              <Pressable
                key={med.id}
                className={` ${
                  med.id === 4 ? "border-none" : "border-b-[1px]"
                } h-16 border-zinc-200/80 flex flex-row items-center justify-between`}
                onPress={() =>
                  setMedType((prev) => ({ ...prev, type: med.name }))
                }
              >
                <View className="flex flex-row items-center gap-3">
                  <View className="brand-surface rounded-xl size-10 flex items-center justify-center p-2">
                    {displayIcons(med.iconPackage, med.icon)}
                  </View>
                  <Text>{med.name}</Text>
                </View>
                {med.name === medType.type && (
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="#3da35d"
                  />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        {/* More forms/types */}
        <View>
          <Text className="body-title">More Forms</Text>
          <View className="px-4 bg-zinc-50 border-[1.5px] border-zinc-100 rounded-lg">
            {medTypes.slice(4).map((med) => (
              <Pressable
                key={med.id}
                className={` ${
                  med.id === 11 ? "border-none" : "border-b-[1px]"
                } h-16 border-zinc-200/80 flex flex-row items-center justify-between`}
                onPress={() =>
                  setMedType((prev) => ({ ...prev, type: med.name }))
                }
              >
                <View className="flex flex-row items-center gap-3">
                  <View className="brand-surface rounded-xl size-10 flex items-center justify-center p-2">
                    {displayIcons(med.iconPackage, med.icon)}
                  </View>
                  <Text>{med.name}</Text>
                </View>
                {med.name === medType.type && (
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="#3da35d"
                  />
                )}
              </Pressable>
            ))}
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
            <Text className="text-zinc-800 text-center font-medium text-lg">
              Previous
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default MedType;
