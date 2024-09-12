import { colors, fontSize } from "@/constants/Token";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const SearchAndFilter = ({
  setShowFilter,
  showFilter,
}: {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;
}) => {
  const [searchText, setSearchText] = useState<string>("");

  const toggleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={moderateScale(23)} color={"#6E8194"} />

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          cursorColor={colors.text}
          placeholder="Search"
        />
      </View>

      <Pressable style={styles.filterContainer}>
        <Ionicons
          onPress={toggleShowFilter}
          name="filter"
          size={moderateScale(22)}
          color={colors.background}
        />
      </Pressable>
    </View>
  );
};

export default SearchAndFilter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: scale(10),
    marginTop: verticalScale(20),
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: scale(10),
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    backgroundColor: "#E0E5E5",
    borderRadius: moderateScale(10),
  },
  searchInput: {
    color: colors.text,
    fontSize: fontSize.sm,
    fontFamily: "InterMedium",
    flex: 1,
  },
  filterContainer: {
    backgroundColor: "#6E8194",
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(7),
  },
});
