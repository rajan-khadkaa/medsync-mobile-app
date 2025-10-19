import { useEffect, useRef } from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { typeCircularProgressBar } from "../types/typeCircularProgressBar";
import { brandColors } from "@/constants/Colors";

const { width } = Dimensions.get("window");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// interface CircularProgressProps {
//   progress: number;
//   totalDoses: number;
//   completedDoses: number;
// }

function CircularProgressBar({
  progress,
  totalDoses,
  completedDoses,
}: typeCircularProgressBar) {
  const animationValue = useRef(new Animated.Value(0)).current;
  const size = width * 0.42;
  // const size = width * 0.55;
  const strokeWidth = 5;
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
        //here i added +2 because the circle was getting cropped from all 4 directions
        width={size + 2}
        height={size + 2}
        style={{ padding: 1, transform: [{ rotate: "-90deg" }] }}
      >
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={brandColors.white}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={brandColors.primaryDrk}
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

export default CircularProgressBar;
