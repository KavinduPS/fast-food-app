import { appwriteConfig } from "@/libs/appwrite";
import React from "react";
import { Image, Text, View } from "react-native";

interface CheckoutItemProps {
  $id: string;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}
const CheckoutItem = ({
  $id,
  imageUrl,
  name,
  price,
  quantity,
}: CheckoutItemProps) => {
  const image_url = `${imageUrl}?project=${appwriteConfig.projectId}`;

  return (
    <View className="flex flex-row justify-between items-center p-1">
      <View className="flex flex-row items-center">
        <Image
          source={{ uri: image_url }}
          resizeMode="contain"
          className="size-20 bg-primary-50 rounded-lg"
        />
        <View className="ml-2 gap-5 flex flex-row">
          <View className="flex flex-col items-left">
            <Text className="text-lg " numberOfLines={2}>
              {name}
            </Text>
            <Text className="text-gray-500">x{quantity}</Text>
          </View>
        </View>
      </View>
      <Text className="text-neutral-500 font-semibold">${price}</Text>
    </View>
  );
};

export default CheckoutItem;
