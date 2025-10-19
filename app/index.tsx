import { View, Text, Animated, ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { useRouter } from "expo-router";
import { addTodaysMeds, handleMissedDays } from "@/utils/storage";
// import { addTodaysMeds, handleDayChange } from "@/utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { addMedHistory } from "@/utils/storage";

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const router = useRouter();

  useEffect(() => {
    const startApp = async () => {
      // 1️⃣ Animate splash screen (no change)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 10,
          friction: 2,
          useNativeDriver: true,
        }),
      ]).start();

      // 2️⃣ Get today's date
      const todayDate = new Date().toDateString();

      // 3️⃣ Check if last active date exists
      const lastActive = await AsyncStorage.getItem("LAST_ACTIVE_DATE");

      if (lastActive && lastActive !== todayDate) {
        // user skipped at least one day

        console.log(`Last active: ${lastActive}, today: ${todayDate}`);

        // 4️⃣ Fill missed days + move last day’s meds to MED_HISTORY
        await handleMissedDays(lastActive, todayDate);
      }

      // 5️⃣ Always generate today's meds fresh
      await addTodaysMeds();

      // 6️⃣ Update last active date
      await AsyncStorage.setItem("LAST_ACTIVE_DATE", todayDate);

      // 7️⃣ Navigate to Home
      router.replace("/home");
    };

    startApp();
  }, []);

  // useEffect(() => {
  //   // addMedHistory();

  //   Animated.parallel([
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }),
  //     Animated.spring(scaleAnim, {
  //       toValue: 1,
  //       tension: 10,
  //       friction: 2,
  //       useNativeDriver: true,
  //     }),
  //   ]).start();

  //   addTodaysMeds();

  //   const timer = setTimeout(() => {
  //     router.replace("/home");
  //   }, 600);

  //   // const timer = setTimeout(() => {
  //   //   router.replace("/auth");
  //   // }, 2000);

  //   //IF ALL PROMISE NEEDS TO BE WAITED/FULFILLED AT ONCE

  //   // let timer: NodeJS.Timeout;
  //   // const wait = (tm: number): Promise<void> => {
  //   //   //here new promise is created that promises to resolve/fulfill of timer (of number received in argument)
  //   //   return new Promise((resolve) => {
  //   //     // here 'timer' can also be done as times = setTimeout(resolve, tm)
  //   //     timer = setTimeout(() => {
  //   //       resolve();
  //   //     }, tm);
  //   //   });
  //   // };

  //   // const initializeApp = async () => {
  //   //   await Promise.all([
  //   //     await addTodaysMeds(),
  //   //     //here Promise.all makes sure that all promise are fulfillled so then only other blocks run
  //   //     // handleDayChange(),
  //   //     wait(600), //passing 500 ms for setTimeout function that is inside new Promise above
  //   //   ]);
  //   //   router.replace("/home");
  //   // };
  //   // initializeApp();

  //   return () => {
  //     if (timer) clearTimeout(timer);
  //   };
  // }, []);

  return (
    <View className="flex-1 bg-[#3da35d] items-center justify-center">
      <Animated.View
        className="items-center"
        style={[
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View className="flex items-center justify-center">
          <View className="items-center justify-center size-28 p-4 rounded-full bg-white">
            <ImageBackground
              className="h-full w-full"
              source={require("../assets/images/medsync-logo.png")}
            />
          </View>
          <Text className="text-white text-[32px] font-bold mt-5 tracking-wider">
            Medsync
          </Text>
        </View>
        {/* <View className="items-center justify-center p-4 rounded-full bg-white">
          <MaterialIcons name="health-and-safety" size={100} color="#3da35d" />
        </View>
        <Text className="text-white text-[32px] font-bold mt-5 tracking-wider">
          Medsync
        </Text> */}
      </Animated.View>
    </View>
  );
}
