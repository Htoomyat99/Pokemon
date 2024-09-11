import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/constants/Token";
import { scale, verticalScale } from "react-native-size-matters";

const CardItem = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const cardRenderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <Image
        source={require("@/assets/images/error.png")}
        style={styles.image}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: verticalScale(80) }}
        // keyextractor={(item) => item.id.toString()}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={cardRenderItem}
      />
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.text,
    marginTop: verticalScale(25),
    alignItems: "center",
  },
  itemContainer: {
    backgroundColor: "#f0f1f0",
    paddingHorizontal: scale(6),
    marginHorizontal: scale(6),
    marginBottom: verticalScale(15),
  },
  image: {
    width: scale(130),
    height: verticalScale(120),
    // backgroundColor: colors.background,
  },
});
