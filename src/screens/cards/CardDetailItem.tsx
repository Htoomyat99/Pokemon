import { colors, fontSize, screenPadding } from "@/constants/Token";
import { useStore } from "@/src/store/store";
import { TCardDetail } from "@/src/type/cardDetailType";
import { toastService } from "@/src/utils/toastService";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CardDetailItem = ({ card }: { card: TCardDetail }) => {
  const router = useRouter();
  const isFavorite = useStore((state) => state.isFavorite(card.id));

  const { addFavoriteToast, removeFavoriteToast } = toastService();

  const backAction = () => {
    router.back();
  };

  const toggleFavorite = () => {
    useStore.getState().toggleCollection(card);

    if (isFavorite) {
      removeFavoriteToast();
    } else {
      addFavoriteToast();
    }
  };

  const cardPrice = card?.tcgplayer.prices.holofoil;

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.iconContainer} onPress={backAction}>
          <FontAwesome6
            name="arrow-left"
            size={moderateScale(20)}
            color="black"
          />
        </Pressable>

        <Text style={styles.headerText}>Card Details</Text>

        <Pressable style={styles.iconContainer} onPress={toggleFavorite}>
          <FontAwesome
            name="heart"
            size={moderateScale(22)}
            color={isFavorite ? colors.text : "#CCCCCC"}
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingVertical: verticalScale(15) }}
        style={styles.container}
      >
        {/* Card Image */}
        <Image
          resizeMode="contain"
          source={{ uri: card?.images.small }}
          style={styles.cardImage}
        />

        {/* Card Name */}
        <Text style={styles.cardName}>
          {card?.name}{" "}
          <Text style={styles.cardSupertype}>( {card.supertype} )</Text>
        </Text>

        {/* HP and Types */}
        <Text style={styles.cardText}>HP: {card?.hp}</Text>
        <Text style={styles.cardText}>
          Types: {card?.types && card.types.join(", ")}
        </Text>

        {/* Evolves To */}
        {card?.evolvesTo && (
          <Text style={styles.cardText}>
            Evolves To: {card.evolvesTo.join(", ")}
          </Text>
        )}

        {/* Attacks */}
        <Text style={styles.sectionTitle}>Attacks</Text>
        {card?.attacks &&
          card.attacks.map((attack, index) => (
            <LinearGradient
              colors={["#FFCC33", "#FFB347", "#FF7F00"]}
              key={index}
              style={styles.linear}
            >
              <View style={styles.attack}>
                <Text style={styles.attackName}>{attack.name}</Text>
                <Text>Cost: {attack.cost.join(", ")}</Text>
                <Text>Damage: {attack.damage}</Text>
                <Text>{attack.text}</Text>
              </View>
            </LinearGradient>
          ))}

        {/* Set Info */}
        <Text style={styles.sectionTitle}>Set Information</Text>
        <Text style={styles.cardText}>Set: {card.set.name}</Text>
        <Text style={styles.cardText}>Set ID: {card.set.id}</Text>
        <Image
          source={{ uri: card.set.images.symbol }}
          style={styles.setSymbol}
          resizeMode="contain"
        />

        {/* Weaknesses */}
        <Text style={styles.sectionTitle}>Weaknesses</Text>
        {card?.weaknesses &&
          card.weaknesses.map((weakness, index) => (
            <Text key={index} style={styles.cardText}>
              {weakness.type}: {weakness.value}
            </Text>
          ))}

        {/* Retreat Cost */}
        <Text style={styles.cardText}>
          Retreat Cost:{" "}
          {card?.retreatCost ? card.retreatCost.join(", ") : "None"}
        </Text>

        {/* Pricing Information */}
        {card.tcgplayer.prices.holofoil && (
          <View>
            <Text style={styles.sectionTitle}>Prices</Text>

            <Text style={styles.cardText}>
              Market Price: ${cardPrice.low ? cardPrice.low.toFixed(2) : ""}
            </Text>

            <Text style={styles.cardText}>
              Low: ${cardPrice?.low ? cardPrice.low.toFixed(2) : ""}, High: $
              {cardPrice.high ? cardPrice.high.toFixed(2) : ""}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardDetailItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: colors.background,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: screenPadding.horizontal,
    paddingVertical: verticalScale(7),
  },
  iconContainer: {
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(5),
  },
  headerText: {
    fontFamily: "InterSemiBold",
    fontSize: moderateScale(18),
    color: colors.text,
  },
  cardImage: {
    width: "100%",
    height: verticalScale(350),
    alignSelf: "center",
    marginBottom: verticalScale(15),
  },
  cardName: {
    fontSize: fontSize.base,
    textAlign: "center",
    marginBottom: verticalScale(10),
    fontFamily: "InterSemiBold",
    color: colors.text,
  },
  cardSupertype: {
    fontSize: moderateScale(16),
    textAlign: "center",
    marginBottom: verticalScale(10),
    fontFamily: "InterSemiBold",
    color: colors.text,
  },
  cardText: {
    fontSize: moderateScale(13),
    marginBottom: verticalScale(5),
    fontFamily: "InterMedium",
    color: colors.text,
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontFamily: "InterSemiBold",
    marginVertical: verticalScale(10),
    color: colors.text,
  },
  linear: {
    paddingVertical: verticalScale(1),
    paddingHorizontal: scale(1),
    marginBottom: verticalScale(15),
    borderRadius: moderateScale(9),
  },
  attack: {
    backgroundColor: colors.background,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: moderateScale(8),
  },
  attackName: {
    fontSize: moderateScale(14),
    fontFamily: "InterSemiBold",
    color: colors.text,
    marginBottom: verticalScale(5),
  },
  setSymbol: {
    width: scale(30),
    height: scale(30),
    marginBottom: verticalScale(10),
  },
});
