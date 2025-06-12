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
  StyleSheet,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const QUICK_ACTIONS = [
  {
    icon: "add-circle-outline" as const,
    label: "Add\nMedications",
    route: "/medications/add" as const,
    color: "#2e7d32",
    gradient: ["#4caf50", "#2e7d32"] as [string, string],
  },
  {
    icon: "calendar-outline" as const,
    label: "Calendar\nView",
    route: "/calendar" as const,
    color: "#1976d2",
    gradient: ["#2196f3", "#1976d2"] as [string, string],
  },
  {
    icon: "time-outline" as const,
    label: "History\nLog",
    route: "/history" as const,
    color: "#c21858",
    gradient: ["#e91e63", "#c21858"] as [string, string],
  },
  {
    icon: "medical-outline" as const,
    label: "Refill\nTracker",
    route: "/refills" as const,
    color: "#e64a19",
    gradient: ["#ff5722", "#e64a19"] as [string, string],
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
    <View style={styles.progressContainer}>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressPercentage}>{Math.round(progress)}</Text>
        <Text style={styles.progressLabel}>
          {completedDoses} of {totalDoses} doses.
        </Text>
      </View>
      <Svg width={size} height={size} style={styles.progressRing}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255, 255, 0.2)"
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
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient style={styles.header} colors={["#5d83fb", "#3464fa"]}>
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View style={styles.flex1}>
              <Text className="text-red-600 text-2xl">Daily Progress</Text>
              {/* <Text style={styles.greeting}>Daily Progress</Text> */}
            </View>
            <TouchableOpacity style={styles.notificationBtn}>
              <View style={styles.notificationIconContainer}>
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="white"
                  // style={styles.notificationIcon}
                />
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationCount}> 10</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {/* Circular Progress */}
          <CircularProgress progress={50} totalDoses={10} completedDoses={5} />
        </View>
      </LinearGradient>
      <View style={styles.content}>
        <View style={styles.quickActionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionGrid}>
            {QUICK_ACTIONS.map((action) => (
              <Link href={action.route} key={action.label} asChild>
                <TouchableOpacity style={styles.actionButton}>
                  <LinearGradient
                    colors={action.gradient}
                    style={styles.actionGradient}
                  >
                    <View style={styles.actionContent}>
                      <View style={styles.actionIcon}>
                        <Ionicons name={action.icon} size={24} color="white" />
                      </View>
                      <Text style={styles.actionLabel}>{action.label}</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </View>
      </View>

      <View>
        <View>
          <Text>Today's Schedule</Text>
          <Link rel="stylesheet" href="/calender">
            <TouchableOpacity>
              <Text>See All</Text>
            </TouchableOpacity>
          </Link>
        </View>
        {true ? (
          <View>
            <Ionicons name="medical-outline" size={48} color="#ccc" />
            <Text>No medications scheduled</Text>
            <Link href="/medications/add">
              <TouchableOpacity>
                <Text>Add Medications</Text>
              </TouchableOpacity>
            </Link>
          </View>
        ) : (
          [].map((medications) => {
            return (
              <View>
                <View>
                  <Ionicons name="medical" size={24} />
                </View>
                <View>
                  <View>
                    <Text>name</Text>
                    <Text>doses</Text>
                  </View>
                  <View>
                    <Ionicons name="time-outline" size={16} color="#ccc" />
                    <Text>time</Text>
                  </View>
                </View>
                {true ? (
                  <View>
                    <Ionicons name="checkmark-circle-outline" size={24} />
                    <Text>Taken</Text>
                  </View>
                ) : (
                  <TouchableOpacity>
                    {/* <Ionicons name='close-circle-outline' size={24}/> */}
                    <Text>Take</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: " 100%",
    marginBottom: 20,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.9,
    color: "white",
  },
  content: {
    flex: 1,
    paddingTop: 20,
    // borderColor: "red",
    // borderWidth: 1,
  },
  notificationBtn: {
    // position: "relative",
    // width: 'fit-content',
    padding: 8,

    backgroundColor: "rgba(231, 231, 227, 0.5)",
    // backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    marginLeft: 8,
  },

  notificationIconContainer: {
    position: "relative",
    // borderWidth: 2,
    width: 28,
    height: 28,
    // borderColor: "red",
  },

  notificationBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "rgb(239, 70, 70)",
    minWidth: 22,
    height: 22,
    maxWidth: 28,
    borderRadius: 11,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 2,
  },
  notificationCount: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    // width: 24,
    // height: 24,
    // borderRadius: 100,
    // borderWidth: 3,
    // borderColor: "yellow",
    textAlign: "center",
    includeFontPadding: false,
    // marginTop: -2,
  },

  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },

  progressTextContainer: {
    position: "absolute",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  progressPercentage: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
  },

  progressLabel: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },

  progressDetails: {
    fontSize: 11,
    color: "white",
    fontWeight: "bold",
  },

  progressRing: {
    transform: [{ rotate: "-90deg" }],
  },

  flex1: {
    flex: 1,
  },

  quickActionContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },

  quickActionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 15,
    // borderColor: "red",
    // borderWidth: 1,
  },
  actionButton: {
    // width: (width - 56) / 2, //lookout for this number 52 and experimetn other numbers as well
    flex: 1,
    minWidth: 100,
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
  },
  actionGradient: {
    flex: 1,
    padding: 15,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 700,
    color: "#1a1a1a",
    marginBottom: 5,
  },
  actionContent: {
    flex: 1,
    justifyContent: "space-between",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAllButton: {
    color: "#2e7d32",
    fontWeight: "600",
  },
  emptyState: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
  },
  addMedicationButton: {
    backgroundColor: "#1a8e2d",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addMedicationButtonText: {
    color: "white",
    fontWeight: "600",
  },
  doseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  doseBadge: {
    width: 50,
    height: 50,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  doesInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
});
