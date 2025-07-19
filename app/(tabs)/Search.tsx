import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuItem from "@/components/MenuItem";
import SearchBar from "@/components/SearchBar";
import { getCategories, getMenu } from "@/libs/appwrite";
import { Categories, Menu } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const { category, query } = useLocalSearchParams<{
    category: string;
    query: string;
  }>();

  const [isLoading, setIsLoading] = useState<boolean>();
  const [menu, setMenu] = useState<Menu[]>();
  const [categories, setCategories] = useState<Categories[]>();
  console.log(menu);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        Promise.all([
          await getMenu({ category, query }),
          await getCategories(),
        ]).then((data) => {
          setMenu(data[0]);
          setCategories(data[1]);
        });
      } catch (error) {
        throw new Error(error as string);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category, query]);

  return (
    <SafeAreaView className="h-full">
      <FlatList
        data={menu}
        renderItem={({ item, index }) => {
          const isEvenItem = index % 2 === 0;
          return (
            <View
              className={cn(
                "bg-white h-full rounded-2xl py-2 px-5",
                !isEvenItem ? "mt-10" : "mt-0"
              )}
              style={{ width: "45%" }}
            >
              <MenuItem
                $id={item.$id}
                name={item.name}
                imageUrl={item.image_url}
                price={item.price}
              />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7 justify-between"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="gap-5 my-5">
            <View className="justify-between flex-row w-full">
              <View className="flex-start">
                <Text className="text-m font-bold text-primary-500">
                  SEARCH
                </Text>
                <View className="flex-start flex-row gap-x-1 mt-0.5">
                  <Text className="text-neutral-500">
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <CartButton />
            </View>
            <SearchBar />
            <Filter categories={categories!} />
          </View>
        )}
        ListEmptyComponent={() => !isLoading && <Text>No results</Text>}
      />
    </SafeAreaView>
  );
};

export default Search;
