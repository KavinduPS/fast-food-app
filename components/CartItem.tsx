import { appwriteConfig } from "@/libs/appwrite";
import { useCartStore } from "@/store/cart.store";
import { CartItemType } from "@/type";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { $id, name, price, quantity, imageUrl } = item;
  const image_url = `${imageUrl}?project=${appwriteConfig.projectId}`;
  const { addToCart, removeFromCart, items } = useCartStore();
  return (
    <View className="bg-white flex-row justify-between items-center mb-5 rounded-2xl p-3 ">
      <View className="w-1/4 items-center justify-center p-5 bg-primary-50 rounded-lg">
        <Image
          source={{ uri: image_url }}
          resizeMode="contain"
          className="size-16"
        />
      </View>
      <View className="gap-2 px-2 py-1 w-1/2">
        <Text className="font-bold text-lg">{name}</Text>
        <Text className="text-primary-500 text-lg ">$ {price.toFixed(2)}</Text>
      </View>
      <View className="flex-row gap-2 items-center justify-center w-1/4">
        <TouchableOpacity onPress={() => removeFromCart($id)}>
          <Ionicons name="remove-circle-outline" size={30} color={"#fb923c"} />
        </TouchableOpacity>
        <Text className="font-semibold text-lg text-center w-[20px]">
          {quantity}
        </Text>
        <TouchableOpacity
          onPress={() => {
            addToCart({ $id, name, price, quantity, imageUrl });
          }}
        >
          <Ionicons name="add-circle-outline" size={30} color={"#fb923c"} />
        </TouchableOpacity>
      </View>
      <View className="flex-1 absolute top-3 right-3 flex-row">
        <TouchableOpacity>
          <Ionicons name="close" size={20} color={"gray"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
