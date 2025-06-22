import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { typeButton } from "../types/typeButton";

const PrimaryBtn = ({ text, loading, handlePressAction }: typeButton) => {
  return (
    <TouchableOpacity
      className={`brand-bg rounded-lg py-[0.95rem] ${
        loading ? "opacity-70" : ""
      }`}
      onPress={handlePressAction}
      disabled={loading ? loading : false}
    >
      <Text className="text-white text-center font-medium text-lg">
        {text ? text : "Continue"}
      </Text>
    </TouchableOpacity>
  );
};

export default PrimaryBtn;
