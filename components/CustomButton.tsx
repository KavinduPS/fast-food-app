import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface CustomButtonProps {
  buttonText: string;
  isLoading: boolean;
  leftIcon?: string;
  handlePress: () => void;
}

const CustomButton = ({
  buttonText,
  isLoading,
  leftIcon,
  handlePress,
}: CustomButtonProps) => {
  return (
    <View className="w-11/12">
      <TouchableOpacity
        className="bg-primary-500 items-center p-3 rounded-3xl"
        onPress={() => handlePress()}
      >
        {leftIcon}
        {isLoading ? (
          <ActivityIndicator size={"small"} color={"white"} />
        ) : (
          <Text className="text-white text-lg font-semibold">{buttonText}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;
