import { colors, fontSize } from "@/constants/Token";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const SearchAndFilter = ({
  setShowFilter,
  showFilter,
  goAction,
  cardType,
}: {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;
  goAction: (text: string) => void;
  cardType: string;
}) => {
  const [example, setExample] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const toggleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const handleTextChange = (newText: string) => {
    setExample(newText);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      goAction(newText);
    }, 800);

    setTypingTimeout(timeout);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={moderateScale(23)} color={"#6E8194"} />

        <TextInput
          value={example}
          onChangeText={handleTextChange}
          style={styles.searchInput}
          cursorColor={colors.text}
          placeholder="Search Cards"
        />
      </View>

      <Pressable style={styles.filterContainer}>
        {cardType && <View style={styles.dot} />}

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
    borderWidth: 1,
    borderColor: "#BBBBBB",
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
  dot: {
    width: scale(10),
    height: scale(10),
    borderRadius: moderateScale(5),
    backgroundColor: colors.primary,
    position: "absolute",
    top: verticalScale(2),
    right: verticalScale(2),
  },
});
