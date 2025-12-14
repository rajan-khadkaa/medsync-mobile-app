import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { deleteMedData, getMedData } from "@/utils/storage";
import {
  FontAwesome5,
  FontAwesome6,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import { Link } from "expo-router";
import { dummyData } from "@/constants/Values";
import HeaderBar from "@/components/other/HeaderBar";
import { brandColors } from "@/constants/Colors";
import { typeMedicine } from "@/components/types/allTypes";
import Toast from "react-native-toast-message";
import { displayIcons } from "@/utils/displayIcons";

const DisplayMedicationScreen = () => {
  const [medData, setMedData] = useState<typeMedicine[]>([]);

  // type MCIIcons = "liquid-spot" | "dots-horizontal";
  // type FontistoIcons = "injection-syringe";
  // type Ionicons = "medical";

  // const displayIcons = (iconPackage?: string, icon?: string) => {
  //   const iconSize = 20;
  //   const iconColor = "#fff";
  //   switch (iconPackage) {
  //     case "FontAwesome6":
  //       return <FontAwesome6 name={icon} size={iconSize} color={iconColor} />;
  //     case "MaterialCommunityIcons":
  //       return (
  //         <MaterialCommunityIcons
  //           name={icon as MCIIcons}
  //           size={iconSize}
  //           color={iconColor}
  //         />
  //       );
  //     case "Fontisto":
  //       return (
  //         <Fontisto
  //           name={icon as FontistoIcons}
  //           size={iconSize}
  //           color={iconColor}
  //         />
  //       );
  //     // return <Fontisto name={icon} size={iconSize} color={iconColor}/>;
  //     case "FontAwesome5":
  //       return <FontAwesome5 name={icon} size={iconSize} color={iconColor} />;
  //     case "Ionicons":
  //       return (
  //         <Ionicons name={icon as Ionicons} size={iconSize} color={iconColor} />
  //       );
  //     default:
  //       return <Ionicons name="medical" size={iconSize} color={iconColor} />;
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const medicationData = await getMedData();
      setMedData(medicationData);
      // console.log("ALL med data from storage on UI: ", medicationData);
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

  const handleDeleteMed = async (id: string) => {
    Alert.alert(
      "Delete Medication?",
      "Are you sure that you want to delete this medication?",
      [
        {
          text: "Yes, Delete",
          onPress: async () => {
            try {
              const checkDelete = await deleteMedData(id);
              if (checkDelete) {
                Toast.show({
                  type: "success",
                  text1: "Medication deleted.",
                  position: "bottom",
                });
                fetchData();
              }
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Something went wrong. Please try again.",
                position: "bottom",
              });
              console.error("Delete failed:", error);
            }
          },
          style: "destructive",
        },
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
      ]
    );
  };
  const handleEditMed = (id: string) => {};

  return (
    <View className="flex-1 h-screen justify-between">
      <HeaderBar title="All Medications" />
      <View className="px-5 py-2">
        <View className="flex-row justify-between items-center mb-4">
          {/* <Text className="text-[#1a1a1a] text-xl font-bold">
            All Medications
          </Text> */}
          {/* <Link href="/calendar">
            <TouchableOpacity>
              <Text className="text-[#2e7d32] font-semibold">
                See Archived Medications
              </Text>
            </TouchableOpacity>
          </Link> */}
          {/* <TouchableOpacity
            onPress={() =>
              Toast.show({
                type: "success",
                text1: "Medication added successfully!",
                position: "bottom",
              })
            }
            className="p-2 bg-green-500 rounded-xl"
          >
            <Text className="text-white">Show success toast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Toast.show({
                type: "info",
                // text1: "Medication added successfully!",
                text1: "Please add medication!",
                position: "bottom",
              })
            }
            className="p-2 bg-sky-500 rounded-xl"
          >
            <Text className="text-white">Show info toast</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              Toast.show({
                type: "error",
                text1: "Something went wrong. Please try again.",
                position: "bottom",
              })
            }
            className="p-2 bg-red-500 rounded-xl"
          >
            <Text className="text-white">Show error toast</Text>
          </TouchableOpacity> */}
        </View>
        <View className="h-[90vh]">
          <ScrollView
            // contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            // nestedScrollEnabled={true}
          >
            {medData.length === 0 ? (
              <View className="items-center justify-between h-[85vh]">
                <View className="items-center mt-44">
                  <Octicons name="clock" size={52} color="#ccc" />
                  <Text className="text-[#666] text-base mt-4 font-medium mb-5">
                    No medication scheduled
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
              medData.map((med: typeMedicine) => (
                <View
                  key={med.name}
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
                        {med.time.map((item, index) => (
                          <View
                            key={index}
                            className="flex flex-row items-center self-start"
                          >
                            <Ionicons
                              name="time-outline"
                              size={16}
                              color="#ccc"
                            />
                            <Text className="text-[#666] text-sm ml-1 mb-[0.2rem]">
                              {item}
                            </Text>
                          </View>
                        ))}
                      </View>
                      <View className="flex-row gap-4">
                        {/* <TouchableOpacity
                          onPress={() => handleEditMed(med.id)}
                          style={
                            {
                              // paddingVertical: 8,
                              // paddingHorizontal: 8,
                            }
                          }
                          // className="flex-row gap-[0.5rem] items-center"
                          // className="flex-row gap-[0.5rem] items-center brand-surface rounded-lg"
                        >
                          <Ionicons
                            name="create-outline"
                            size={18}
                            color={brandColors.primary}
                          />
                          <Text className="text-zinc-700 text-sm font-medium">
                            Edit
                          </Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => handleDeleteMed(med.id)}
                          style={
                            {
                              // borderColor: "#3da35d",
                              // paddingVertical: 8,
                              // paddingHorizontal: 8,
                              // width: 90,
                            }
                          }
                          // className="flex-row gap-[0.5rem] items-center bg-red-100 rounded-lg"
                        >
                          {/* <Ionicons
                            name="trash-bin-outline"
                            size={18}
                            color={brandColors.danger}
                          /> */}
                          <Text className="text-red-500 text-sm font-medium">
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default DisplayMedicationScreen;
