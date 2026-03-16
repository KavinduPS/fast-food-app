import CheckoutItem from "@/components/CheckoutItem";
import { renderOrderStatusText } from "@/libs/helpers";
import { useCartStore } from "@/store/cart.store";
import { useOrderStore } from "@/store/order.store";
import { OrderStatus } from "@/type";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

const steps = ["confirmed", "preparing", "on_the_way", "delivered"];

const OrderTracking = () => {
  const { status, estimatedMinutes, setStatus } = useOrderStore();
  const statusIndex = steps.indexOf(status);

  const { items } = useCartStore();
  const total = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index += 1;
      if (index >= steps.length) {
        clearInterval(interval);
        return;
      }
      setStatus(steps[index] as OrderStatus);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-primary-500" edges={["top"]}>
      <View className="flex-1">
        <View className="mx-10 my-5">
          <Text className="text-gray-200 text-lg">ORDER TRACKING</Text>
          <Text className="text-gray-200 text-3xl font-bold">
            {renderOrderStatusText(status)}
          </Text>
          <Text className="text-gray-200 text-lg">
            {status === "delivered"
              ? "Your order has arrived!"
              : `ETA: ${estimatedMinutes} mins`}
          </Text>
        </View>
        <MapView
          style={{
            width: "100%",
            height: 280,
          }}
          initialRegion={{
            latitude: 6.9271,
            longitude: 79.8612,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        />
        <View className="bg-gray-100 overflow-hidden">
          <View className="flex flex-col mx-5 bg-white mt-5 rounded-2xl p-4 gap-4 mb-5">
            <View className="flex flex-row justify-around items-center">
              <View className="absolute left-0 right-0 h-[3px] top-[8px] bg-gray-300 rounded-lg"></View>
              <View
                className={`absolute left-0 h-[3px] top-[8px] bg-primary-500 rounded-lg ${
                  statusIndex == 0
                    ? "w-1/4"
                    : statusIndex == 1
                    ? "w-1/2"
                    : statusIndex == 2
                    ? "w-3/4"
                    : "w-full"
                }`}
              ></View>
              <View
                className={`bg-gray-300 w-[20px] h-[20px] rounded-full z-10 ${
                  statusIndex >= 0 && "bg-primary-500"
                }`}
              ></View>
              <View
                className={`bg-gray-300 w-[20px] h-[20px] rounded-full z-10 ${
                  statusIndex >= 1 && "bg-primary-500"
                }`}
              ></View>
              <View
                className={`bg-gray-300 w-[20px] h-[20px] rounded-full z-10 ${
                  statusIndex >= 2 && "bg-primary-500"
                }`}
              ></View>
              <View
                className={`bg-gray-300 w-[20px] h-[20px] rounded-full z-10 ${
                  statusIndex >= 3 && "bg-primary-500"
                }`}
              ></View>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-gray-500">Confirmed</Text>
              <Text className="text-gray-500">Preparing</Text>
              <Text className="text-gray-500">On the Way</Text>
              <Text className="text-gray-500">Delivered</Text>
            </View>
          </View>
        </View>
        <FlatList
          className="bg-gray-100"
          ListHeaderComponent={() => (
            <View className="flex flex-col mx-5 bg-white mt-5 rounded-t-2xl pt-4 px-4">
              <Text className="text-gray-500 text-lg">ORDER SUMMARY</Text>
            </View>
          )}
          contentContainerClassName="bg-gray-100"
          contentContainerStyle={{ flexGrow: 1 }}
          data={items}
          renderItem={({ item }) => (
            <View className="flex flex-col bg-white mx-5 px-4">
              <CheckoutItem
                $id={item.$id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                quantity={item.quantity}
              />
            </View>
          )}
          ListFooterComponent={() => (
            <View className="bg-white mx-5 rounded-b-2xl px-6 pb-4">
              <View className="w-full h-[1px] bg-gray-200"></View>
              <View className="flex flex-row justify-between items-center mt-2">
                <Text className="font-semibold text-lg">Total</Text>
                <Text className="text-primary-600 font-semibold">
                  $ {total}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
      <View className="bg-gray-100 px-5 pt-5 pb-10">
        <TouchableOpacity
          onPress={() => {
            router.push("/");
            setStatus("confirmed");
          }}
          className="bg-primary-500 py-4 rounded-2xl items-center"
        >
          <Text className="text-white font-bold text-lg">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderTracking;
