import { colors, fontSize, screenPadding } from "@/constants/Token";
import { useSession } from "@/src/providers/SessionPrvoider";
import CartItem from "@/src/screens/cards/CartItem";
import FilterList from "@/src/screens/cards/FilterList";
import SearchAndFilter from "@/src/screens/cards/SearchAndFilter";
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import { verticalScale } from "react-native-size-matters";

const Cards = () => {
  const { signOut } = useSession();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.headerText}>Pokémon</Text>

        <Text style={styles.descText}>
          Search for pokemon by name or using its national number
        </Text>

        <SearchAndFilter />

        <FilterList />

        <CartItem />
      </View>
    </SafeAreaView>
  );
};

export default Cards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.text,
    paddingHorizontal: screenPadding.horizontal,
  },
  headerText: {
    fontFamily: "InterSemiBold",
    fontSize: fontSize.lg,
    color: colors.text,
    marginTop: verticalScale(15),
  },
  descText: {
    fontFamily: "InterMedium",
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: verticalScale(10),
  },
});
