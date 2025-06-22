import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import MedInfo from "@/components/pages/MedInfo";
import MedType from "@/components/pages/MedType";
import MedSchedule from "@/components/pages/MedSchedule";
// import MedNotify from "@/components/pages/MedNotify";
import MedNotify from "@/components/pages/MedNotify";
import { typeMedicine } from "@/components/types/typeMedicine";
import MedFinal from "@/components/pages/MedFinal";
import { brandColors } from "@/constants/Colors";

const AddMedicationScreen = () => {
  const [pageCount, setPageCount] = useState<number>(1);
  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;

  const [medicineInfo, setMedicineInfo] = useState<typeMedicine>({
    name: "",
    strength: null,
    unit: "",
    type: "",
    duration: null,
    date: new Date(),
    time: [currentTime],
    // time: ["10:00", "11:00"],
    color: "#26A69A",
    reminder: false,
    refill: false,
    description: "",
  });

  return (
    <View className="flex-1 relative">
      <LinearGradient
        colors={["#c21858", "#3da35d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View className="flex-1 justify-between">
        <View className="brand-bg flex-row items-end h-24">
          <View className="flex-row items-center gap-2 mb-4">
            <TouchableOpacity className=" p-1 flex items-center justify-center rounded-full">
              {/* <TouchableOpacity className="bg-white p-1 flex items-center justify-center rounded-full"> */}
              <Ionicons
                name="chevron-back"
                size={20}
                color={brandColors.white}
              />
              {/* <Ionicons
              name="chevron-back"
              size={20}
              color={brandColors.primary}
            /> */}
            </TouchableOpacity>
            <Text className="text-white text-lg font-medium">
              New Medication
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {pageCount === 1 && (
            <MedInfo
              medInfo={medicineInfo}
              setMedInfo={setMedicineInfo}
              count={pageCount}
              setCount={setPageCount}
            />
          )}
          {pageCount === 2 && (
            <MedType
              medType={medicineInfo}
              setMedType={setMedicineInfo}
              count={pageCount}
              setCount={setPageCount}
            />
          )}
          {pageCount === 3 && (
            <MedSchedule
              medDuration={medicineInfo}
              setMedDuration={setMedicineInfo}
              count={pageCount}
              setCount={setPageCount}
            />
          )}
          {pageCount === 4 && (
            <MedNotify
              medNotify={medicineInfo}
              setMedNotify={setMedicineInfo}
              count={pageCount}
              setCount={setPageCount}
            />
          )}
          {pageCount === 5 && (
            <MedFinal
              medFinal={medicineInfo}
              setMedFinal={setMedicineInfo}
              count={pageCount}
              setCount={setPageCount}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default AddMedicationScreen;
