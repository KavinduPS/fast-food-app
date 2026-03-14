import { useCartStore } from "@/store/cart.store";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const { items } = useCartStore();
  const totalItems = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <TouchableOpacity className="w-12">
      <Image
        source={require("@/assets/icons/cart-icon.png")}
        className="size-10"
        resizeMode="contain"
      />
      {totalItems > 0 && (
        <View className="bg-primary-500 absolute top-0 right-0 rounded-full p-0.5 size-5 items-center justify-center">
          <Text className="text-white text-xs font-bold">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
