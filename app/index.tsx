import CartButton from "@/components/CartButton";
import cn from "clsx";
import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { offers } from "../constants";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isEven = index % 2 === 0;
          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isEven ? "flex-row-reverse" : "flex-row"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffffff22" }}
              >
                {() => (
                  <>
                    <View className="w-1/2 h-full">
                      <Image
                        source={item.image}
                        className={cn(
                          "w-56 h-full",
                          isEven ? "pl-10" : "pr-10"
                        )}
                        resizeMode="contain"
                      />
                    </View>
                    <View
                      className={cn(
                        "offer-card-info",
                        isEven ? "pl-10" : "pr-10"
                      )}
                    >
                      <Text className="text-white h1 text-2xl font-bold">
                        {item.title}
                      </Text>

                      <Image
                        source={require("@/assets/icons/arrow-right.png")}
                        className="h-20"
                        resizeMode="contain"
                      />
                    </View>
                  </>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => (
          <View className="flex justify-between items-center flex-row w-full my-5">
            <View className="flex-start">
              <Text className="text-primary-500 font-bold">DELIVER TO</Text>
              <TouchableOpacity className="flex flex-row items-center gap-x-2 mt-0.5">
                <Text>Sri lanka</Text>
                <Image
                  source={require("@/assets/icons/arrow-down.png")}
                  className="size-4"
                />
              </TouchableOpacity>
            </View>
            <CartButton />
          </View>
        )}
      />
    </SafeAreaView>
  );
}
