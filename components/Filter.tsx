import { Categories } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity } from "react-native";

interface FilterProps {
  categories: Categories[];
}

const Filter = ({ categories }: FilterProps) => {
  const searchParams = useLocalSearchParams();
  const [active, setActive] = useState(searchParams.category || "");

  const handlePress = async (id: string) => {
    setActive(id);
    if (id === "all") router.setParams({ category: undefined });
    else router.setParams({ category: id });
  };

  const filterData: Categories[] | { $id: string; name: string }[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  return (
    <FlatList
      data={filterData}
      keyExtractor={(item) => item.$id}
      renderItem={({ item, index }) => {
        const selectedItem = item.$id === active;
        return (
          <TouchableOpacity
            className={cn(
              "items-center mb-2 py-2 px-4 mr-2 rounded-2xl",
              selectedItem ? "bg-primary-500" : "bg-white"
            )}
            onPress={() => handlePress(item.$id)}
          >
            <Text
              className={cn(selectedItem ? "text-white" : "text-primary-500")}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Filter;
