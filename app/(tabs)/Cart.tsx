import CartItem from "@/components/CartItem";
import { useCartStore } from "@/store/cart.store";
import React from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const { items } = useCartStore();
  return (
    <SafeAreaView className="flex-1">
      <FlatList
        data={items}
        renderItem={({ item, index }) => {
          return <CartItem item={item} />;
        }}
        contentContainerClassName="mx-5"
      />
    </SafeAreaView>
  );
};

export default Cart;
