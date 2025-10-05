import { View, Text } from "react-native";
import React from "react";
import { BaseToastProps } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

export const CustomSuccessToast = ({ text1, text2 }: BaseToastProps) => {
  return (
    <View className="h-fit w-fit mb-20 py-3 px-6 bg-zinc-700 rounded-full justify-center items-center">
      {/* <View className="h-fit w-fit mb-20 py-3 px-6 bg-green-100 rounded-full justify-center items-center"> */}
      {/* <View className="flex-row gap-2 items-center">
        <Ionicons name="checkmark" size={18} color="#22c55e" />
        <Text className="text-green-600 text-sm">{text1}</Text>
      </View> */}
      <Text className="text-white text-sm">{text1}</Text>
      {/* <Text className="text-green-600 text-sm">{text1}</Text> */}
      {text2 ? <Text className="text-neutral-300 text-xs">{text2}</Text> : null}
    </View>
  );
};
export const CustomInfoToast = ({ text1, text2 }: BaseToastProps) => {
  return (
    <View className="h-fit w-fit mb-20  py-3 px-6 bg-blue-100 rounded-full justify-center items-center">
      {/* <View className="flex-row gap-2 items-center">
        <Ionicons name="information" size={18} color="#3b82f6" />
        <Text className="text-blue-500 text-sm">{text1}</Text>
      </View> */}
      <Text className="text-blue-500 text-sm">{text1}</Text>
      {text2 ? <Text className="text-neutral-300 text-xs">{text2}</Text> : null}
    </View>
  );
};
export const CustomErrorToast = ({ text1, text2 }: BaseToastProps) => {
  return (
    <View className="h-fit w-fit mb-20  py-3 px-6 bg-red-100 rounded-full justify-center items-center">
      {/* <View className="flex-row gap-2 items-center">
        <Ionicons name="close" size={18} color="#ef4444" />
        <Text className="text-red-500 text-sm">{text1}</Text>
      </View> */}
      <Text className="text-red-500 text-sm">{text1}</Text>
      {text2 ? <Text className="text-neutral-300 text-xs">{text2}</Text> : null}
    </View>
  );
};

// import React from "react";
// import { View, Text } from "react-native";
// import { BaseToastProps } from "react-native-toast-message";

// const CustomToast = ({ text1, text2 }: BaseToastProps) => (
//   <View className="h-fit w-fit py-3 px-6 bg-zinc-700 rounded-full justify-center items-center">
//     <Text className="text-white text-sm">{text1}</Text>
//     {text2 ? <Text className="text-neutral-300 text-xs">{text2}</Text> : null}
//   </View>
// );

// export default CustomToast;

// export default CustomToast
