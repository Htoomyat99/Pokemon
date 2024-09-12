import { colors, fontSize, screenPadding } from "@/constants/Token";
import { TCardDetail } from "@/src/utils/cardDetailType";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
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

  const backAction = () => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
      <Pressable style={styles.iconContainer} onPress={backAction}>
        <FontAwesome6
          name="arrow-left"
          size={moderateScale(20)}
          color="black"
        />
      </Pressable>

      <ScrollView style={styles.container}>
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
            <View key={index} style={styles.attack}>
              <Text style={styles.attackName}>{attack.name}</Text>
              <Text>Cost: {attack.cost.join(", ")}</Text>
              <Text>Damage: {attack.damage}</Text>
              <Text>{attack.text}</Text>
            </View>
          ))}

        {/* Set Info */}
        <Text style={styles.sectionTitle}>Set Information</Text>
        <Text style={styles.cardText}>Set: {card.set.name}</Text>
        <Text style={styles.cardText}>Set ID: {card.set.id}</Text>
        <Image
          source={{ uri: card.set.images.symbol }}
          style={styles.setSymbol}
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
        <Text style={styles.sectionTitle}>Prices</Text>
        <Text style={styles.cardText}>
          Market Price: ${card?.tcgplayer.prices.holofoil.low.toFixed(2)}
        </Text>
        <Text style={{ ...styles.cardText, marginBottom: verticalScale(15) }}>
          Low: ${card?.tcgplayer.prices.holofoil.low.toFixed(2)}, High: $
          {card?.tcgplayer.prices.holofoil.high.toFixed(2)}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardDetailItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: screenPadding.horizontal,
    backgroundColor: "#FFFFFE",
    paddingTop: verticalScale(5),
  },
  iconContainer: {
    alignSelf: "flex-start",
    padding: moderateScale(5),
    marginLeft: screenPadding.horizontal,
    marginTop: verticalScale(10),
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
  attack: {
    marginBottom: verticalScale(15),
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
