import { colors, fontSize } from "@/constants/Token";
import { TCard } from "@/src/type/cardType";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

interface Props {
  item: TCard;
}

const CardListItem = ({ item }: Props) => {
  const goCardDetail = () => {
    router.push(`/cards/${item.id}`);
  };

  return (
    <LinearGradient
      colors={["#FFCC33", "#FFB347", "#FF7F00"]}
      style={styles.linear}
    >
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
    </LinearGradient>
  );
};

export default CardListItem;

const styles = StyleSheet.create({
  linear: {
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(13),
    paddingVertical: verticalScale(1.5),
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: moderateScale(7),
    paddingVertical: verticalScale(10),
    width: "98%",
    shadowColor: colors.text,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: verticalScale(120),
    marginBottom: verticalScale(7),
    alignSelf: "center",
  },
  cardName: {
    fontSize: fontSize.sm,
    textAlign: "center",
    marginBottom: verticalScale(7),
    fontFamily: "InterSemiBold",
    textAlignVertical: "center",
    minHeight: verticalScale(36),
  },
  cardInfo: {
    fontSize: moderateScale(11),
    color: "#555555",
    marginBottom: verticalScale(4),
    textAlign: "center",
    fontFamily: "InterMedium",
  },
});
