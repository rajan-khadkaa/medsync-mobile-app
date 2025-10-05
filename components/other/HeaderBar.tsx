import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { brandColors } from "@/constants/Colors";
import { usePathname, useRouter } from "expo-router";
import { formPageBackAction } from "@/utils/formPageBackHandler";

const HeaderBar = ({
  title,
  formPage,
}: {
  title: string;
  formPage?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View className="brand-bg flex-row items-end h-24">
      <View className="flex-row items-center gap-2 mb-4">
        <TouchableOpacity
          onPress={() => formPageBackAction(pathname)}
          className=" p-1 flex items-center justify-center rounded-full"
        >
          {/* <TouchableOpacity className="bg-white p-1 flex items-center justify-center rounded-full"> */}
          <Ionicons name="chevron-back" size={20} color={brandColors.white} />
          {/* <Ionicons
              name="chevron-back"
              size={20}
              color={brandColors.primary}
            /> */}
        </TouchableOpacity>
        <Text className="text-white text-lg font-medium">
          {/* New Medication */}
          {title}
        </Text>
      </View>
    </View>
  );
};

export default HeaderBar;
