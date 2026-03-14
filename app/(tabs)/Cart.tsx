import CartItem from "@/components/CartItem";
import { useCartStore } from "@/store/cart.store";
import { useOrderStore } from "@/store/order.store";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const { items } = useCartStore();
  const { setStatus } = useOrderStore();

  const handlePlaceOrder = () => {
    setStatus("confirmed");
    router.push("/OrderTracking");
  };

  return (
    <SafeAreaView className="flex-1">
      {items.length !== 0 ? (
        <FlatList
          data={items}
          renderItem={({ item, index }) => {
            return <CartItem item={item} />;
          }}
          contentContainerClassName="mx-5"
          ListFooterComponent={() => (
            <TouchableOpacity
              onPress={handlePlaceOrder}
              className="bg-primary-500 py-4 rounded-2xl items-center"
            >
              <Text className="text-white font-bold text-lg">Place Order</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text className="text-lg text-primary-500 text-center mt-5">
          No items in the cart
        </Text>
      )}
    </SafeAreaView>
  );
};

export default Cart;
