import { appwriteConfig } from "@/libs/appwrite";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
  imageUrl: string;
  name: string;
  price: number;
}
const MenuItem = ({ imageUrl, name, price }: MenuItemProps) => {
  const image_url = `${imageUrl}?project=${appwriteConfig.projectId}`;
  return (
    <TouchableOpacity className="flex-1 items-center justify-center gap-5">
      <Image
        className="size-32"
        source={{ uri: image_url }}
        resizeMode="contain"
      />
      <View className="items-center gap-5">
        <Text className="font-bold text-xl text-center" numberOfLines={1}>
          {name}
        </Text>
        <Text className="text-neutral-500 text-lg font-semibold">
          From ${price}
        </Text>
        <TouchableOpacity>
          <Text className="text-primary-500 text-lg font-semibold">
            + Add to cart
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;
