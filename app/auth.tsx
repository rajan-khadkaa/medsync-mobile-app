import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function AuthScreen() {
  const [hasBiometrics, setHasBiometrics] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setHasBiometrics(hasHardware && isEnrolled);
  };

  const authenticate = async () => {
    try {
      setIsAuthenticating(true);
      setError(null);

      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to access your health data",
        fallbackLabel: "Use PIN",
      });
      // const auth = { success: true };

      if (auth.success) {
        router.replace("/home");
      } else {
        setError("Authentication is required.");
      }
    } catch (err) {
      setError("Authentication error");
    } finally {
      setIsAuthenticating(false);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <View className="flex-1 bg-gray-50 p-6">
      {/* Header */}
      <View className="items-center mt-12">
        <View className="w-full flex justify-center items-center h-16">
          <ImageBackground
            className="w-full h-full"
            source={require("../assets/images/medsync.png")}
            resizeMode="center"
          />
        </View>
        {/* <Text className="text-3xl font-bold text-[#3da35d]">MedSync</Text> */}
        <Text className="text-gray-500 mt-2">Personalized medication care</Text>
      </View>

      {/* Central Biometric Prompt */}
      <View className="flex-1 justify-center items-center">
        <TouchableOpacity
          className={`items-center justify-center p-8 rounded-full ${
            hasBiometrics ? "bg-[#3da35d]/10" : "bg-gray-200"
          }`}
          onPress={authenticate}
          disabled={isAuthenticating}
        >
          <Ionicons
            name={hasBiometrics ? "finger-print" : "key"}
            size={120}
            color={hasBiometrics ? "#3da35d" : "#9ca3af"}
          />
        </TouchableOpacity>

        <Text className="text-gray-600 mt-8 text-center text-lg">
          {hasBiometrics
            ? "Press verify button to continue."
            : "Press verify button to continue."}
        </Text>

        {error && <Text className="text-red-500 mt-4">{error}</Text>}
      </View>

      {/* Bottom Action */}
      <View>
        <TouchableOpacity
          className={`bg-[#3da35d] rounded-lg py-4 ${
            isAuthenticating ? "opacity-70" : ""
          }`}
          onPress={authenticate}
          disabled={isAuthenticating}
        >
          <Text className="text-white text-center font-medium text-lg">
            {isAuthenticating ? "Verifying..." : "Verify"}
          </Text>
        </TouchableOpacity>

        <Text className="text-gray-400 text-xs text-center mt-4">
          All health data is encrypted and stored securely
        </Text>
      </View>
    </View>
  );
}
