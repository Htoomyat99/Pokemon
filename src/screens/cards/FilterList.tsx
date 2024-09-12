import { colors, fontSize } from "@/constants/Token";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const FilterList = ({ filterData }: { filterData: string[] }) => {
  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={filterData}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => console.log("item", item)}
          >
            <Text style={styles.item}>{item}</Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default FilterList;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(8),
  },
  itemContainer: {
    backgroundColor: "#6E8194",
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(20),
    marginRight: scale(10),
    borderRadius: moderateScale(6),
  },
  item: {
    fontFamily: "InterMedium",
    fontSize: fontSize.sm,
    color: colors.background,
  },
});
