import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CartButton = () => {
  const totalItems = 10;
  return (
    <TouchableOpacity className="w-12">
      <Image
        source={require("@/assets/icons/cart-icon.png")}
        className="size-10"
        resizeMode="contain"
      />
      {totalItems > 0 && (
        <View className="bg-primary-500 absolute top-0 right-0 rounded-xl p-0.5">
          <Text className="text-white text-sm font-bold">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartButton;
