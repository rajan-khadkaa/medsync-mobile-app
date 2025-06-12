import { Ionicons } from "@expo/vector-icons";
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
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const boxColor = "#DAEBDF";
const boxColor2 = "#DAEBDF";
// const boxColor = "#E8F3EB";
// const boxColor2 = "#E8F3EB";

const QUICK_ACTIONS = [
  {
    icon: "add-circle-outline" as const,
    label: "Add Medications",
    // label: "Add\nMedications",
    route: "/medications/add" as const,
    color: "#2e7d32",
    gradient: [boxColor, boxColor2] as [string, string],
    // gradient: ["#4caf50", "#2e7d32"] as [string, string],
  },
  {
    icon: "calendar-outline" as const,
    label: "Calendar View",
    // label: "Calendar\nView",
    route: "/calendar" as const,
    color: "#1976d2",
    gradient: [boxColor, boxColor2] as [string, string],
    // gradient: ["#2196f3", "#1976d2"] as [string, string],
  },
  {
    icon: "time-outline" as const,
    label: "History Log",
    // label: "History\nLog",
    route: "/history" as const,
    color: "#c21858",
    gradient: [boxColor, boxColor2] as [string, string],
    // gradient: ["#e91e63", "#c21858"] as [string, string],
  },
  {
    icon: "medical-outline" as const,
    label: "Refill Tracker",
    // label: "Refill\nTracker",
    route: "/refill" as const,
    color: "#e64a19",
    gradient: [boxColor, boxColor2] as [string, string],
    // gradient: ["#ff5722", "#e64a19"] as [string, string],
  },
];

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
  const size = width * 0.55;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
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
          {Math.round(progress)}
        </Text>
        <Text className="text-white/90 text-sm mt-1">
          {completedDoses} of {totalDoses} doses.
        </Text>
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

  interface Medication {
    id: string;
    name: string;
    doses: string;
    time: string;
    taken: boolean;
  }

  const handleMedToggle = (id: string) => {
    const medication = medications.find((med) => med.id === id);
    if (!medication) return;

    if (medication.taken) {
      Alert.alert(
        "Mark as untaken?",
        "Did you want this medication as untaken?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Mark Untaken",
            onPress: () => {
              setMedications(
                medications.map((med) =>
                  med.id === id ? { ...med, taken: false } : med
                )
              );
              // later add toast here saying that med is marked as not taken
            },
          },
        ]
      );
    } else {
      setMedications(
        medications.map((med) =>
          med.id === id ? { ...med, taken: true } : med
        )
      );
    }
  };

  const [medications, setMedications] = useState<Medication[]>([
    {
      id: "1",
      name: "Aspirin",
      doses: "1 tablet",
      time: "8:00 AM",
      taken: true,
    },
    {
      id: "2",
      name: "Ibuprofen",
      doses: "2 tablets",
      time: "12:00 PM",
      taken: false,
    },
  ]);

  return (
    <ScrollView
      className="flex-1 bg-[#fff]"
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        className="pt-[50px] pb-[25px] rounded-b-[3rem] overflow-hidden"
        colors={["#3da35d", "#3da35d"]}
        // colors={["#3fa34d", "#3fa34d"]}
      >
        <View className="items-center px-5">
          <View className="flex-row items-center justify-center w-full mb-5">
            <View className="flex-1">
              <Text className="font-semibold text-white text-2xl">
                Daily Progress
              </Text>
            </View>
            <TouchableOpacity className="p-2 bg-[#3da35d]/50 rounded-xl ml-2">
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
          <CircularProgress progress={50} totalDoses={10} completedDoses={5} />
        </View>
      </LinearGradient>
      <View className="flex-1 pt-5">
        <View className="px-5 mb-[25px]">
          <Text className="text-[#1a1a1a] text-xl font-bold mb-1">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-3 mt-4">
            {QUICK_ACTIONS.map((action) => (
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
      </View>
      <View className="px-5 mb-10">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-[#1a1a1a] text-xl font-bold">
            Today's Schedule
          </Text>
          <Link href="/calendar">
            <TouchableOpacity>
              <Text className="text-[#2e7d32] font-semibold">See All</Text>
            </TouchableOpacity>
          </Link>
        </View>
        {medications.length === 0 ? (
          <View className="items-center">
            <Ionicons name="medical-outline" size={48} color="#ccc" />
            <Text className="text-[#666] text-base mt-2.5 mb-5">
              No medications scheduled
            </Text>
            <Link href="/medications/add">
              <TouchableOpacity className="bg-[#1a8e2d] px-8 py-4 rounded-lg">
                <Text className="text-white font-semibold">
                  Add Medications
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        ) : (
          medications.map((med: Medication) => (
            <View
              key={med.id}
              className="flex-row items-center border-[1px] border-zinc-200 bg-white rounded-2xl p-4 mb-3 shadow-sm"
            >
              <View className="w-[50px] h-[50px] rounded-[35px] justify-center items-center mr-[15px]">
                <Ionicons name="medical" size={24} color="#3da35d" />
              </View>
              <View className="flex-1 gap-2">
                <View>
                  <Text className="text-[#1a1a1a] text-base font-semibold">
                    {med.name}
                  </Text>
                  {/* <Text className="text-[#666] text-sm">{med.doses}</Text> */}
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={16} color="#ccc" />
                  <Text className="text-[#666] text-sm ml-1 mb-[0.2rem]">
                    {med.time}
                  </Text>
                </View>
              </View>
              {med.taken ? (
                <TouchableOpacity
                  onPress={() => handleMedToggle(med.id)}
                  style={{
                    // borderColor: "#3da35d",
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    width: 90,
                  }}
                  className="flex-row gap-[0.5rem] items-center border-[1.3px] border-zinc-200 rounded-lg"
                >
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={18}
                    color="#3da35d"
                  />
                  <Text className="text-[#3da35d]">Taken</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => handleMedToggle(med.id)}
                  className="bg-[#3da35d]  border-[1.3px] border-[#3da35d] rounded-lg flex justify-center items-center"
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                    width: 90,
                  }}
                >
                  <Text className="text-white font-semibold">Take</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
