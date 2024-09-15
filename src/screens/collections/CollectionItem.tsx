import { colors } from "@/constants/Token";
import { useStore } from "@/src/store/store";
import { TCardDetail } from "@/src/type/cardDetailType";
import { toastService } from "@/src/utils/toastService";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CollectionItem = ({ item }: { item: TCardDetail }) => {
  const router = useRouter();

  const isFavorite = useStore((state) => state.isFavorite(item.id));
  const { addFavoriteToast, removeFavoriteToast } = toastService();
  const handleCardPress = () => {
    router.navigate({
      pathname: "/collections/detail",
      params: { card: JSON.stringify(item) },
    });
  };

  const handleRemoveFavorite = () => {
    useStore.getState().toggleCollection(item);

    if (isFavorite) {
      removeFavoriteToast();
    } else {
      addFavoriteToast();
    }
  };

  return (
    <LinearGradient colors={["#FF6F61", "#FFB57A"]} style={styles.linear}>
      <Pressable onPress={handleCardPress} style={styles.cardContainer}>
        {/* Card Image */}
        <Image source={{ uri: item.images.small }} style={styles.cardImage} />

        {/* Card Info */}
        <View style={styles.cardInfo}>
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardText}>SuperType: {item.supertype}</Text>
          <Text style={styles.cardText}>
            Type: {item.types?.join(", ") || "Unknown"}
          </Text>
          <Text style={styles.cardText}>HP: {item.hp}</Text>
        </View>

        <Pressable style={styles.iconContainer} onPress={handleRemoveFavorite}>
          <FontAwesome name="heart" size={20} color={colors.text} />
        </Pressable>
      </Pressable>
    </LinearGradient>
  );
};

export default CollectionItem;

const styles = StyleSheet.create({
  linear: {
    paddingVertical: verticalScale(1),
    paddingHorizontal: scale(1),
    borderRadius: moderateScale(11),
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: colors.background,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(7),
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardImage: {
    width: scale(80),
    height: verticalScale(100),
    resizeMode: "contain",
    marginRight: scale(15),
  },
  cardInfo: {
    flex: 1,
    paddingVertical: verticalScale(5),
    justifyContent: "center",
  },
  cardName: {
    fontSize: moderateScale(16),
    fontFamily: "InterSemiBold",
    color: colors.text,
    marginBottom: verticalScale(5),
  },
  cardText: {
    fontSize: moderateScale(13),
    color: "#555555",
    fontFamily: "InterMedium",
  },
  iconContainer: {
    paddingTop: verticalScale(10),
    paddingHorizontal: scale(5),
    alignSelf: "flex-start",
  },
});
