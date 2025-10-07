import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getMedsHistory } from "@/utils/storage";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import HeaderBar from "@/components/other/HeaderBar";
import { displayIcons } from "@/utils/displayIcons";
import { typeMedHistory } from "@/components/types/typeMedHistory";

const MedicationHistoryScreen = () => {
  const [medData, setMedData] = useState<typeMedHistory>({});
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const medicationData = await getMedsHistory();
      setMedData(medicationData);
      console.log("med history on UI: ", medicationData);
    } catch (error) {
      console.error("Failed to fetch med data:", error);
    }
  };

  // const handleMedToggle = (id: string) => {
  //   const medication = medications.find((med) => med.id === id);
  //   if (!medication) return;

  //   if (medication.taken) {
  //     Alert.alert(
  //       "Mark as untaken?",
  //       "Did you want this medication as untaken?",
  //       [
  //         {
  //           text: "Cancel",
  //           style: "cancel",
  //         },
  //         {
  //           text: "Mark Untaken",
  //           onPress: () => {
  //             setMedications(
  //               medications.map((med) =>
  //                 med.id === id ? { ...med, taken: false } : med
  //               )
  //             );
  //             // later add toast here saying that med is marked as not taken
  //           },
  //         },
  //       ]
  //     );
  //   } else {
  //     setMedications(
  //       medications.map((med) =>
  //         med.id === id ? { ...med, taken: true } : med
  //       )
  //     );
  //   }
  // };

  return (
    <View className="flex-1 h-screen justify-between">
      <HeaderBar title="Medication History" />
      <View className="px-5 py-2">
        <View className="flex-row justify-between items-center mb-4"></View>
        <View className="h-[90vh]">
          <ScrollView
            // contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            // nestedScrollEnabled={true}
          >
            {Object.keys(medData).length === 0 ? (
              <View className="items-center justify-between h-[85vh]">
                <View className="items-center mt-44">
                  <Octicons name="history" size={52} color="#ccc" />
                  <Text className="text-[#666] text-base mt-4 font-medium mb-5">
                    No medication history
                  </Text>
                </View>
                <Link className="w-full" href="/medications/add" asChild>
                  <TouchableOpacity className="bg-[#1a8e2d] w-[60%] flex items-center justify-center p-4 rounded-md">
                    <Text className="text-white font-semibold">
                      Add Medications
                    </Text>
                  </TouchableOpacity>
                </Link>
              </View>
            ) : (
              Object.entries(medData).map(([medDate, medAray]) => (
                <View key={medDate}>
                  {medAray.map((med) => (
                    <View
                      key={med.time}
                      className="flex-row items-center border-[1px] border-zinc-200 bg-white rounded-2xl p-4 mb-3 shadow-sm"
                    >
                      <View
                        className={`w-[50px] h-[50px] rounded-full justify-center items-center mr-[15px]`}
                        style={{ backgroundColor: med.color }}
                      >
                        {displayIcons(med.iconPackage, med.icon, 20, "#fff")}
                      </View>
                      <View className="flex-1 gap-2">
                        <View className="flex-row justify-between items-center">
                          <Text className="text-[#1a1a1a] text-base font-semibold">
                            {med.name}
                          </Text>
                          {med.strength && med.unit && (
                            <Text className="text-[#666] text-sm">{`${med.strength}${med.unit}`}</Text>
                          )}
                        </View>
                        <View className="flex-row justify-between">
                          <View className=" flex-1 flex-wrap flex-row gap-4">
                            <View className="flex flex-row items-center self-start">
                              <Ionicons
                                name="time-outline"
                                size={16}
                                color="#ccc"
                              />
                              <Text className="text-[#666] text-sm ml-1 mb-[0.2rem]">
                                {med.time}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default MedicationHistoryScreen;
