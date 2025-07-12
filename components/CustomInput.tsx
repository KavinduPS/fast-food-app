import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface CustomInputProps {
  placeholder: string;
  value: string;
  label: string;
  isSecuredEntry?: boolean;
  keyboardType: "default" | "email-address" | "numeric" | "phone-pad";
  onChangeText: (text: string) => void;
}

const CustomInput = ({
  placeholder,
  value,
  label,
  isSecuredEntry,
  keyboardType,
  onChangeText,
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View className="w-11/12 ">
      <Text className="text-neutral-400 text-lg">{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={isSecuredEntry}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="border-b border-neutral-400 py-2 text-lg"
      />
    </View>
  );
};

export default CustomInput;
