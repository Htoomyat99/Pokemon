import { colors, fontSize } from "@/constants/Token";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const FilterList = () => {
  const data = [
    { id: 1, name: "Fire" },
    { id: 2, name: "Water" },
    { id: 3, name: "Electric" },
    { id: 4, name: "Grass" },
    { id: 5, name: "Ice" },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.itemContainer}>
            <Text style={styles.item}>{item.name}</Text>
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
