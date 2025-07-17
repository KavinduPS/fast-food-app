import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  placeholder: string;
}
const SearchBar = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [query, setQuery] = useState(params.query);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text) router.setParams({ query: undefined });
  };

  const handleSubmit = () => {
    if (query?.trim()) router.setParams({ query });
  };
  return (
    <View className="bg-white rounded-3xl flex-row justify-between align-center px-3">
      <TextInput
        className="h-10 "
        placeholder="Search for burgers, pizza"
        onChangeText={handleSearch}
        value={query}
        keyboardType="default"
        returnKeyType="search"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity
        className="justify-center"
        onPress={() => router.setParams({ query })}
      >
        <Ionicons name="search" size={20} color={"rgb(203, 203, 203)"} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
