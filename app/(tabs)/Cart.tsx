import CartItem from "@/components/CartItem";
import { useCartStore } from "@/store/cart.store";
import { useOrderStore } from "@/store/order.store";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const { items } = useCartStore();
  const { setStatus } = useOrderStore();

  const handlePlaceOrder = () => {
    setStatus("confirmed");
    router.push("/OrderTracking");
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <SafeAreaView className="flex-1 mx-5">
      {items.length !== 0 ? (
        <>
          <FlatList
            data={items}
            renderItem={({ item, index }) => {
              return <CartItem item={item} />;
            }}
            contentContainerClassName=""
            ListHeaderComponent={() => (
              <View className="flex justify-between items-left flex-col w-full my-5">
                <View className="flex-start">
                  <Text className="text-primary-500 font-bold">YOUR ORDER</Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                  <Text className="font-bold text-3xl">Cart</Text>
                  <Text className="text-gray-500 text-lg">
                    {items.length} items
                  </Text>
                </View>
              </View>
            )}
          />
          <View className="gap-5 pb-20">
            <View className="flex flex-col p-5 bg-white rounded-xl gap-2">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-gray-500 text-lg">Subtotal</Text>
                <Text className="text-gray-500 text-lg">{subtotal}</Text>
              </View>
              <View className="flex flex-row items-center justify-between">
                <Text className="text-gray-500 text-lg">Delivery fee</Text>
                <Text className="text-green-700 text-lg">free</Text>
              </View>
              <View className="w-full h-[1px] bg-gray-300"></View>
              <View className="flex flex-row items-center justify-between">
                <Text className="text-black text-lg font-bold">Total</Text>
                <Text className="text-primary-500 text-lg font-bold">
                  {subtotal}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handlePlaceOrder}
              className="bg-primary-500 py-4 rounded-2xl items-center"
            >
              <Text className="text-white font-bold text-lg">Place Order</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View className="flex-1 items-center justify-center gap-3">
          <Ionicons name="cart-outline" size={64} color="#f97316" />
          <Text className="text-xl font-bold">Your cart is empty</Text>
          <Text className="text-gray-500">Add some items to get started</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Cart;
