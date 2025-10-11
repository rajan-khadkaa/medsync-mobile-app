import { typeMedicine } from "@/components/types/typeMedicine";
import { typeTodayMeds } from "@/components/types/typeTodayMeds";
import { brandColors } from "@/constants/Colors";
import { actions, dummyData, homeActions } from "@/constants/Values";
import { displayIcons } from "@/utils/displayIcons";
import {
  addMedHistory,
  clearAllData,
  getMedData,
  getTodayMeds,
  medTakenToggle,
} from "@/utils/storage";
import { Ionicons, Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
  progress: number;
  totalDoses: number;
  completedDoses: number;
}

function CircularProgress({
  progress,
  totalDoses,
  completedDoses,
}: CircularProgressProps) {
  const animationValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.48;
  // const size = width * 0.55;
  const strokeWidth = 18;
  // const strokeWidth = 28;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    // clearAllData();
    Animated.timing(animationValue, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  const strokeDashoffset = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View className="items-center justify-center my-2.5">
      <View className="absolute z-10 items-center justify-center">
        <Text className="text-white text-[36px] font-bold">
          {/* {Math.round(progress)} */}
          {/* {Math.round(progress * 100)}% */}
          {completedDoses}/{totalDoses}
        </Text>
        <View className="text-white/90 justify-center items-center flex-col gap-1 mt-1">
          {/* {completedDoses} of {totalDoses} doses. */}
          {/* <Text className="text-white/90 text-sm ">
            {Math.round(progress * 100)}% of today's
          </Text>
          <Text className="text-white/90 text-sm ">medications</Text> */}
          <Text className="text-white/90 text-sm ">of meds taken</Text>
        </View>
      </View>
      <Svg
        width={size}
        height={size}
        style={{ transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();

  const [notificationModal, setNotificationModal] = useState<boolean>(false);
  const [todayMedData, setTodayMedData] = useState<typeTodayMeds[]>([]);

  useEffect(() => {
    addMedHistory();
    fetchData();
    console.log("use effect just ran");
  }, []);

  const fetchData = async () => {
    try {
      const medicationData = await getTodayMeds();
      setTodayMedData(medicationData);
      console.log(
        "todays med data from storage on home page from getToday (): ",
        medicationData
      );
    } catch (error) {
      console.error("Failed to fetch med data:", error);
    }
  };

  const countTakenDoses = (): number => {
    if (todayMedData.length === 0) return 0;
    const countTotalTaken: typeTodayMeds[] = todayMedData.filter(
      (med) => med.taken
    );
    return countTotalTaken.length;
  };

  const countTotalDoses = (): number => {
    return todayMedData.length === 0 ? 0 : todayMedData.length;
  };

  //NEED TO REWRITE THIS LOGIC TO TOGGLE MED TAKEN / NOT-TAKEN
  const handleMedToggle = async (
    id: string,
    time: string,
    taken: boolean
    // date: Date
  ) => {
    // console.log('medication by default is: ', )
    if (taken) {
      // console.log("taken is true so this untake action will run.");
      Alert.alert(
        "Mark as not taken?",
        "Do you want to mark this medication as not taken?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Mark as not taken",
            onPress: async () => {
              await medTakenToggle(id, time);
              // await medTakenToggle(id, date, time);
              fetchData();
            },
          },
        ]
      );
    } else {
      // console.log("taken is false so this TAKE action will run.");
      await medTakenToggle(id, time);
      // await medTakenToggle(id, date, time);
      fetchData();
    }

    // fetchData();
  };

  // const [medications, setMedications] = useState<Medication[]>(dummyData);

  return (
    <View className="h-screen relative bg-[#fff]">
      <TouchableOpacity
        className="p-4 absolute z-10 bottom-0 right-4 rounded-full brand-bg"
        onPress={() => router.push("/medications/add")}
      >
        <Ionicons name="add" size={26} color={brandColors.white} />
      </TouchableOpacity>
      <ScrollView
        className=" relative bg-[#fff]"
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          className="pt-[45px] pb-[25px] rounded-b-[3rem] overflow-hidden"
          colors={["#3da35d", "#3da35d"]}
          // colors={["#3fa34d", "#3fa34d"]}
        >
          <View className="items-center px-5 py-1">
            <View className="flex-row items-center justify-center w-full mb-4">
              <View className="flex-1">
                <Text className="font-semibold text-white text-2xl">
                  Daily progress
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setNotificationModal(!notificationModal)}
                className="p-2 bg-[#3da35d]/50 rounded-xl ml-2"
              >
                <View className="relative w-7 h-7">
                  <Ionicons
                    name="notifications-outline"
                    size={24}
                    color="white"
                  />
                  <View className="absolute -top-2 -right-2 bg-red-400 min-w-[22px] h-[22px] max-w-[28px] rounded-full flex-row justify-center items-center pr-0.5">
                    <Text className="text-white text-[11px] font-bold text-center">
                      10
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <CircularProgress
              progress={countTakenDoses() / countTotalDoses()}
              totalDoses={countTotalDoses()}
              completedDoses={countTakenDoses()}
            />
          </View>
        </LinearGradient>
        {/* <View className="flex-1 pt-5">
          <View className="px-5 mb-[25px]">
            <Text className="text-[#1a1a1a] text-xl font-bold mb-1">
              Quick Actions
            </Text>
            <View className="flex-row flex-wrap gap-3 mt-4">
              {actions.map((action) => (
                <Link href={action.route} key={action.label} asChild>
                  <TouchableOpacity className="flex-1 min-w-[150px] min-h-[7rem] max-h-[8rem] rounded-2xl overflow-hidden">
                    <LinearGradient
                      colors={action.gradient}
                      className="flex-1 p-[15px] overflow-hidden rounded-2xl"
                    >
                      <View className="flex-1 justify-between">
                        <View className="w-10 h-10 rounded-xl bg-[#3da35d]/80 justify-center items-center">
                          <Ionicons
                            name={action.icon}
                            size={24}
                            color="white"
                            // color="#3da35d"
                          />
                        </View>
                        <Text className="text-['#1f1f1f'] text-sm font-semibold">
                          {action.label}
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          </View>
        </View> */}
        <View className="px-5 my-6">
          <View className="flex-row gap-3 mb-5">
            {homeActions.map((action) => (
              <Link href={action.route} key={action.label} asChild>
                <TouchableOpacity className="flex-1  rounded-2xl overflow-hidden">
                  <LinearGradient
                    colors={action.gradient}
                    className="flex-1 p-[15px] overflow-hidden rounded-2xl"
                  >
                    <View className="flex-1 gap-2">
                      <View className="w-8 h-8 rounded-md bg-[#3da35d]/80 justify-center items-center">
                        <Ionicons
                          name={action.icon}
                          size={16}
                          color="white"
                          // color="#3da35d"
                        />
                      </View>
                      <Text className="text-['#1f1f1f'] text-sm font-semibold">
                        {action.label}
                      </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-[#1a1a1a] text-xl font-bold">
              Today's Schedule
            </Text>
            {/* <Link href="/medications/display" asChild>
              <TouchableOpacity>
                <Text className="text-[#2e7d32] text-base font-semibold">
                  See All Medications
                </Text>
              </TouchableOpacity>
            </Link> */}
          </View>
          <View>
            {todayMedData.length === 0 ? (
              <View className="items-center mt-10">
                <Octicons name="clock" size={46} color="#ccc" />
                <View className="flex gap-2 mt-5 items-center">
                  <Text className="text-[#666] text-lg font-medium">
                    No medications
                  </Text>
                  <Text className="text-[#666] text-base">
                    Add new medications from the '+' icon.
                  </Text>
                </View>
                {/* <Link className="w-full" href="/medications/add" asChild>
                  <TouchableOpacity className="bg-[#1a8e2d] w-[60%] flex items-center justify-center p-4 rounded-md">
                    <Text className="text-white font-semibold">
                      Add Medications
                    </Text>
                  </TouchableOpacity>
                </Link> */}
              </View>
            ) : (
              <View className="gap-2">
                {todayMedData.map((medicine) => (
                  <View key={medicine.time} className="gap-2">
                    <View className="flex-row items-center border-[1px] border-zinc-200 bg-white rounded-2xl p-4 shadow-sm">
                      <View
                        className={`w-[50px] h-[50px] rounded-full justify-center items-center mr-[15px]`}
                        style={{ backgroundColor: medicine.color }}
                      >
                        {displayIcons(
                          medicine.iconPackage,
                          medicine.icon,
                          24,
                          "#fff"
                        )}
                      </View>
                      <View className="flex-1 gap-2">
                        <View>
                          <Text className="text-[#1a1a1a] text-base font-semibold">
                            {medicine.name}
                          </Text>
                          {/* <Text className="text-[#666] text-sm">{med.doses}</Text> */}
                        </View>

                        <View className="flex-row items-center">
                          <Ionicons
                            name="time-outline"
                            size={16}
                            color="#ccc"
                          />
                          <Text className="text-[#666] text-sm ml-1 mb-[0.2rem]">
                            {medicine.time}
                          </Text>
                        </View>
                      </View>
                      {medicine.taken ? (
                        <TouchableOpacity
                          onPress={() => {
                            // console.log("Take button pressed.", medicine.taken);
                            handleMedToggle(
                              medicine.id,
                              medicine.time,
                              medicine.taken
                              // medicine.date
                            );
                          }}
                          style={{
                            // borderColor: "#3da35d",
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            width: 90,
                          }}
                          className="flex-row gap-[0.3rem] items-center justify-center border-[1.3px] border-zinc-200 rounded-full"
                        >
                          <Ionicons
                            name="checkmark-circle-outline"
                            size={18}
                            color="#3da35d"
                          />
                          <Text className="text-[#3da35d] mr-1">Taken</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            // console.log(
                            //   "TAKEN button pressed.",
                            //   medicine.taken
                            // );

                            handleMedToggle(
                              medicine.id,
                              medicine.time,
                              medicine.taken
                              // medicine.date
                            );
                          }}
                          className="brand-surface  border-[1.3px] surface-bdr rounded-full flex justify-center items-center"
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            width: 90,
                          }}
                        >
                          <Text className="brand-text font-semibold">Take</Text>
                        </TouchableOpacity>
                      )}
                      {/* {medicine.taken ? (
                        <TouchableOpacity
                          onPress={() => {
                            console.log("Take button pressed.", medicine.taken);
                            handleMedToggle(
                              medicine.id,
                              medicine.time,
                              medicine.taken
                              // medicine.date
                            );
                          }}
                          style={{
                            // borderColor: "#3da35d",
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            width: 90,
                          }}
                          className="flex-row gap-[0.3rem] items-center justify-center brand-surface  border-[1.3px] surface-bdr rounded-full"
                        >
                          <Ionicons
                            name="checkmark-circle-outline"
                            size={18}
                            color="#3da35d"
                          />
                          <Text className="text-[#3da35d] mr-1">Taken</Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            console.log(
                              "TAKEN button pressed.",
                              medicine.taken
                            );

                            handleMedToggle(
                              medicine.id,
                              medicine.time,
                              medicine.taken
                              // medicine.date
                            );
                          }}
                          className="border-[1.3px] border-zinc-200 rounded-full flex justify-center items-center"
                          style={{
                            paddingVertical: 8,
                            paddingHorizontal: 8,
                            width: 90,
                          }}
                        >
                          <Text className="brand-text font-semibold">Take</Text>
                        </TouchableOpacity>
                      )} */}
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
        <Modal
          visible={notificationModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setNotificationModal(false)}
        >
          <Pressable
            onPress={() => setNotificationModal(false)}
            className="flex-1 w-full justify-end"
          >
            <Pressable
              // onPress={(e) => e.stopPropagation()}
              className="px-5 pt-5 pb-8 w-full h-fit max-h-[70%] bg-white rounded-t-3xl"
            >
              <View className="flex flex-row mb-1 justify-between">
                <Text className="text-xl font-bold">Notifications</Text>
                <TouchableOpacity onPress={() => setNotificationModal(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <View className="w-full h-full">
                {/* <ScrollView
              scrollEnabled={true}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{ paddingBottom: 20 }}
              className="w-full h-full border-2 border-red-500"
            > */}
                {todayMedData.length === 0 ? (
                  <View>
                    <Text>No upcoming meds today.</Text>
                  </View>
                ) : (
                  todayMedData
                    // .filter((med) => !med.taken)
                    .map((med) => (
                      <View
                        key={med.time}
                        className="flex-row items-start justify-start border-[1px] border-zinc-200 bg-white rounded-2xl p-4 mt-3 shadow-sm"
                      >
                        <View
                          className={`w-[50px] h-[50px] rounded-full justify-center items-center mr-[15px]`}
                          style={{ backgroundColor: med.color }}
                        >
                          {displayIcons(med.iconPackage, med.icon, 20, "#fff")}
                        </View>
                        <View className="flex-1 flex-row justify-between items-start gap-2">
                          <View>
                            <Text className="text-[#1a1a1a] text-base font-semibold">
                              {med.name}
                            </Text>
                            <Text className="text-[#666] text-sm">
                              {med.unit}
                            </Text>
                          </View>
                          <View className="flex-row items-center">
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
                    ))
                )}
                {/* </ScrollView> */}
              </View>
            </Pressable>
          </Pressable>
        </Modal>
        {notificationModal && (
          <TouchableOpacity
            onPress={() => setNotificationModal(false)}
            className="size-full absolute top-0 left-0  bg-black/40"
          ></TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}
