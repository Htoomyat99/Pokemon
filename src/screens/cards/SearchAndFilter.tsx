import { colors, fontSize } from "@/constants/Token";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Props {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  showFilter: boolean;
  handleSearch: (text: string) => void;
  cardType: string;
}

const SearchAndFilter = ({
  setShowFilter,
  showFilter,
  handleSearch,
  cardType,
}: Props) => {
  const router = useRouter();

  const [text, setText] = useState("");
  const [typingTimeout, setTypingTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const toggleShowFilter = () => {
    // setShowFilter(!showFilter);
    router.navigate("/cards/filter");

    console.log("hie");
  };

  const handleTextChange = (newText: string) => {
    setText(newText);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      handleSearch(newText);
    }, 800);

    setTypingTimeout(timeout);
  };

  const handleClearSearch = () => {
    setText("");
    handleSearch("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather name="search" size={moderateScale(23)} color={"#6E8194"} />

        <TextInput
          value={text}
          onChangeText={handleTextChange}
          style={styles.searchInput}
          cursorColor={colors.text}
          placeholder="Search Cards"
        />

        {text && (
          <Feather
            onPress={handleClearSearch}
            name="x"
            size={moderateScale(20)}
            color={"#6E8194"}
          />
        )}
      </View>

      <Pressable style={styles.filterContainer}>
        {cardType && (
          <LinearGradient
            colors={["#FF512F", "#F09819", "#FF7F00"]}
            style={styles.dot}
          />
        )}

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
    position: "absolute",
    top: verticalScale(2),
    right: verticalScale(2),
  },
});
