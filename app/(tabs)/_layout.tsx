import useAuthStore from "@/store/auth.store";
import { TabBarIconProps } from "@/type";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => (
  <View>
    <Ionicons name={icon} size={20} color={focused ? "#f97316" : "#737373"} />
  </View>
);

const _layout = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/SignIn" />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#f97316",
        tabBarStyle: {
          borderRadius: 50,
          position: "absolute",
          marginHorizontal: 20,
          height: 55,
          bottom: 40,
          backgroundColor: "white",
          shadowColor: "#1a1a1a",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Home" icon="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Search" icon="search" />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} title="Cart" icon="cart" />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              focused={focused}
              title="Profile"
              icon="person-circle"
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
