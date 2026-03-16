import useAuthStore from "@/store/auth.store";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { user, signout } = useAuthStore();
  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="py-5 ">
        <View className="flex flex-col items-center justify-center bg-white px-5 pt-5 mx-5 mb-5 gap-5 rounded-2xl">
          <View className="flex items-center justify-center w-1/4 aspect-square bg-primary-100 rounded-full">
            <Text className="font-bold text-4xl text-primary-500">
              {user?.name.slice(0, 1)}
            </Text>
          </View>
          <Text className="text-2xl font-bold">{user?.name}</Text>
          <Text className="text-xl text-gray-500">{user?.email}</Text>
          <View className="flex flex-row justify-center border-t border-gray-200 py-5">
            <View className="w-1/3 flex flex-col justify-center items-center p-5 border-r border-gray-200">
              <Text className="font-semibold text-primary-500 text-2xl">0</Text>
              <Text className="text-lg text-gray-500">Orders</Text>
            </View>
            <View className="w-1/3 flex flex-col justify-center items-center p-5">
              <Text className="font-semibold text-primary-500 text-2xl">
                $ 0
              </Text>
              <Text className="text-lg text-gray-500">Spent</Text>
            </View>
            <View className="w-1/3 flex flex-col justify-center items-center p-5 border-l border-gray-200">
              <View className="flex flex-row items-center justify-center gap-1">
                <Text className="font-semibold text-primary-500 text-2xl">
                  0
                </Text>
                <Ionicons name="star" size={20} color={"#fb923c"} />
              </View>
              <Text className="text-lg text-gray-500">Rating</Text>
            </View>
          </View>
        </View>
        <View className="flex flex-row items-center bg-white p-5 mx-5 mb-5 rounded-2xl">
          <View className="w-1/4 items-center justify-center">
            <Ionicons name="cube" color={"#fb923c"} size={30} />
          </View>
          <Text className="flex-1 font-medium text-base">My Orders</Text>
          <Ionicons name="chevron-forward" color={"#d1d5db"} size={20} />
        </View>
        <View className="flex flex-row items-center bg-white p-5 mx-5 mb-5 rounded-2xl">
          <View className="w-1/4 items-center justify-center">
            <Ionicons name="location" color={"#fb923c"} size={30} />
          </View>
          <Text className="flex-1 font-medium text-base">Delivery Address</Text>
          <Ionicons name="chevron-forward" color={"#d1d5db"} size={20} />
        </View>

        <View className="flex flex-row items-center bg-white p-5 mx-5 mb-5 rounded-2xl">
          <View className="w-1/4 items-center justify-center">
            <Ionicons name="settings-outline" color={"#fb923c"} size={30} />
          </View>
          <Text className="flex-1 font-medium text-base">Settings</Text>
          <Ionicons name="chevron-forward" color={"#d1d5db"} size={20} />
        </View>
        <TouchableOpacity
          onPress={async () => {
            await signout();
          }}
          className="bg-primary-500 py-4 rounded-2xl items-center mx-5"
        >
          <Text className="text-white font-bold text-lg">Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
