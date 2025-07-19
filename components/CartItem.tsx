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
    <View className="bg-white flex-row mb-5 rounded-2xl p-3 gap-2">
      <View className="w-1/4 items-center justify-center p-5 bg-primary-50 rounded-lg">
        <Image
          source={{ uri: image_url }}
          resizeMode="contain"
          className="size-24"
        />
      </View>
      <View className="gap-5 w-3/4 px-2 py-1">
        <Text className="font-bold text-lg">{name}</Text>
        <Text className="text-primary-500 text-lg ">$ {price}</Text>
        <View className="flex-1 items-center justify-between flex-row">
          <View className="flex-row gap-2 items-center justify-center">
            <TouchableOpacity onPress={() => removeFromCart($id)}>
              <Ionicons
                name="remove-circle-outline"
                size={20}
                color={"#fb923c"}
              />
            </TouchableOpacity>
            <Text className="font-semibold text-lg">{quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                console.log(items);
                addToCart({ $id, name, price, quantity, imageUrl });
              }}
            >
              <Ionicons name="add-circle-outline" size={20} color={"#fb923c"} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Ionicons name="trash" size={20} color={"red"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
