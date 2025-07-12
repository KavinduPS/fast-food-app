import { Slot } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

const _layout = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        className="bg-white h-full"
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="w-full relative"
          style={{ height: Dimensions.get("screen").height / 2.25 }}
        >
          <View className="size-full rounded-b-2xl overflow-hidden">
            <ImageBackground
              source={require("@/assets/images/background.png")}
              resizeMode="stretch"
              className="size-full"
            />
          </View>
          <View className="absolute inset-0 justify-center">
            <Image
              source={require("@/assets/images/logo-white.png")}
              className="size-48"
            />
            <Text className="text-white font-bold text-4xl mb-2 ml-4">
              Get started now!
            </Text>
            <Text className="text-white text-xl ml-4">
              Create an account or login to explore
            </Text>
          </View>
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default _layout;
