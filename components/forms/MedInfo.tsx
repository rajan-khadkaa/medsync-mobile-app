import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { units } from "@/constants/Values";
import { typeMedicine } from "../types/allTypes";
import PrimaryBtn from "../other/PrimaryBtn";
import { usePathname, useRouter } from "expo-router";
import {
  formPageBackAction,
  useFormPageBackHook,
} from "@/utils/formPageBackHandler";

type typeMedicineProp = {
  medInfo: typeMedicine;
  setMedInfo: React.Dispatch<React.SetStateAction<typeMedicine>>;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

const MedInfo = ({
  medInfo,
  setMedInfo,
  count,
  setCount,
}: typeMedicineProp) => {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const pathname = usePathname();

  useFormPageBackHook();

  const validateForm = () => {
    return (
      (medInfo.name?.trim()?.length || 0) > 0
      // && // empty check if '' is the value then .trim='', .length=0, ||0=0, so at last >0 checks the value is atleast one character or length
      // medInfo.strength !== null && // Strength is a number
      // medInfo.unit !== "" // Unit is selected
      // true
    );
  };

  const handleNext = () => {
    if (validateForm()) {
      setCount(count + 1); // Only proceed if validation passes
    }
  };

  return (
    <View className="body-padding">
      <Text className="head-title">Enter Your Medication Information</Text>
      <View className="flex flex-col gap-5">
        <View>
          <Text className="form-label">Medication Name</Text>
          <TextInput
            className="form-field"
            placeholder="Eg. Ibuprofen"
            placeholderTextColor="#999"
            value={medInfo.name || ""} // string fallback
            onChangeText={(value) =>
              setMedInfo((prev) => ({ ...prev, name: value }))
            }
          />
        </View>

        <View>
          <Text className="form-label">Strength</Text>
          <TextInput
            className="form-field"
            keyboardType="numeric"
            placeholder="Eg. 500"
            placeholderTextColor="#999"
            value={medInfo.strength ? medInfo.strength.toString() : ""}
            onChangeText={(value) => {
              const filteredVal = value.replace(/[^0-9]/g, "");
              const strengthNum = filteredVal ? Number(filteredVal) : null;
              setMedInfo((prev) => ({ ...prev, strength: strengthNum }));
            }}
          />
        </View>
        <View>
          <Text className="form-label">Choose Unit</Text>
          <View className="px-4 bg-zinc-50 border-[1.5px] border-zinc-100 rounded-lg">
            {units.map((ut) => (
              <Pressable
                key={ut.id}
                className={` ${
                  ut.id === 5 ? "border-none" : "border-b-[1px]"
                } px-2 h-16 border-zinc-200/80 flex flex-row items-center justify-between`}
                // onPress={() => setMedInfo( {...medInfo, unit:ut.unit})}
                onPress={() =>
                  setMedInfo((prev) => ({ ...prev, unit: ut.unitValue }))
                }
              >
                <Text>{ut.unitValue}</Text>
                {ut.unitValue === medInfo.unit && (
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
            // handlePressAction={() => setCount(count + 1)
          />
          <TouchableOpacity
            className={`border-[1.5px] border-zinc-300 rounded-lg py-3`}
            onPress={() => formPageBackAction(pathname)}
          >
            <Text className="text-zinc-800 text-center font-medium text-lg">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MedInfo;
