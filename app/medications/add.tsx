import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import HeaderBar from "@/components/other/HeaderBar";
import { router, usePathname } from "expo-router";
import { useFormPageBackHook } from "@/utils/formPageBackHandler";
import { today } from "@/utils/date";

const AddMedicationScreen = () => {
  const pathname = usePathname();
  const [pageCount, setPageCount] = useState<number>(1);
  const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`;

  const [medicineInfo, setMedicineInfo] = useState<typeMedicine>({
    id: "",
    name: "",
    strength: null,
    unit: "",
    type: "",
    icon: "",
    iconPackage: "",
    // icon: "medical",
    // iconPackage: "Ionicons",
    // duration: null,
    frequency: "Daily",
    date: today(),
    // time: [{ medTime: currentTime, taken: false }],
    // time: ["10:00", "11:00"],
    time: [],
    color: "#26A69A",
    reminder: false,
    refill: false,
    description: "",
  });

  useFormPageBackHook();

  // useEffect(() => {
  //   if (pathname !== "/medications/add") return;
  //   const backAction = () => {
  //     Alert.alert(
  //       "Go Back?",
  //       "Going back will reset all medication data filled on the form.",
  //       [
  //         {
  //           text: "Yes, Go Back",
  //           onPress: () => router.back(),
  //         },
  //         {
  //           text: "Cancel",
  //           onPress: () => {},
  //         },
  //       ]
  //     );
  //     return true;
  //   };

  //   const exitPage = BackHandler.addEventListener(
  //     "hardwareBackPress",
  //     backAction
  //   );
  //   return () => exitPage.remove();
  // }, []);

  return (
    <View className="flex-1 relative">
      <LinearGradient
        colors={["#c21858", "#3da35d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <View className="flex-1 justify-between">
        <HeaderBar title="Add Medication" formPage={true} />

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
              medFrequency={medicineInfo}
              setMedFrequency={setMedicineInfo}
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
