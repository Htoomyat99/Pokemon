import { colors, fontSize } from "@/constants/Token";
import { TCard } from "@/src/utils/cardType";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Props {
  item: TCard;
}

const CardListItem = ({ item }: Props) => {
  const goCardDetail = () => {
    router.push(`/cards/${item.id}`);
  };

  return (
    <Pressable onPress={goCardDetail} style={styles.card}>
      <Image
        resizeMode="contain"
        source={{ uri: item.images.small }}
        style={styles.cardImage}
      />
      <Text style={styles.cardName}>{item.name}</Text>
      {item.types && (
        <Text style={styles.cardInfo}>Type: {item.types.join(", ")}</Text>
      )}
      <Text style={styles.cardInfo}>Rarity: {item.rarity}</Text>
    </Pressable>
  );
};

export default CardListItem;

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
  row: {
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
    paddingVertical: verticalScale(10),
    width: "48%",
    shadowColor: colors.text,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },
  cardImage: {
    width: "100%",
    height: verticalScale(150),
    marginBottom: verticalScale(7),
    alignSelf: "center",
  },
  cardName: {
    fontSize: fontSize.sm,
    textAlign: "center",
    marginBottom: verticalScale(7),
    fontFamily: "InterSemiBold",
  },
  cardInfo: {
    fontSize: moderateScale(11),
    color: "#555555",
    marginBottom: verticalScale(4),
    textAlign: "center",
    fontFamily: "InterMedium",
  },
});
