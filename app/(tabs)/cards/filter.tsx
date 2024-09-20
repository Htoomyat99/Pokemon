import { colors, fontSize, screenPadding } from "@/constants/Token";
import GradientText from "@/src/components/GradientText";
import GridView from "@/src/components/GridView";
import LoadingView from "@/src/components/LoadingView";
import NotFound from "@/src/components/NotFound";
import { useCardType, useRarities } from "@/src/hooks/useQuery";
import { useStore } from "@/src/store/store";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const Filter = () => {
  const router = useRouter();
  const { data, isLoading, isError } = useRarities();

  const {
    data: cardType,
    isLoading: cardIsLoading,
    isError: cardIsError,
  } = useCardType();

  const type = useStore.getState().typeSelected;
  const rarity = useStore.getState().raritySelected;
  const updateType = useStore((state) => state.setTypeSelected);
  const updateRarity = useStore((state) => state.setRaritySelected);

  const [typeSelected, setTypeSelected] = useState<string>(type);
  const [raritySelected, setRaritySelected] = useState<string>(rarity);

  const handleFilter = () => {
    updateType(typeSelected);
    updateRarity(raritySelected);

    router.navigate("/cards");
  };

  if (isError || cardIsError) return <NotFound />;

  if (isLoading || cardIsLoading) return <LoadingView />;

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <GradientText colors={["#FF3330", "#FFB520"]} style={styles.chooseText}>
        Choose Types and Rarities
      </GradientText>

      <Pressable onPress={handleFilter} style={styles.filterContainer}>
        <FontAwesome5
          name="filter"
          size={moderateScale(20)}
          color={colors.text}
        />
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: verticalScale(20) }}>
        <GridView
          data={cardType?.data}
          headerText="Types"
          selected={typeSelected}
          setSelected={setTypeSelected}
        />

        <GridView
          data={data?.data}
          headerText="Rarities"
          selected={raritySelected}
          setSelected={setRaritySelected}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Filter;

const styles = StyleSheet.create({
  chooseText: {
    fontFamily: "InterSemiBold",
    fontSize: fontSize.sm,
    color: colors.text,
    paddingHorizontal: screenPadding.horizontal,
    paddingTop: verticalScale(20),
    textAlign: "center",
  },
  filterContainer: {
    alignSelf: "flex-end",
    marginHorizontal: screenPadding.horizontal,
    borderWidth: 1,
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(8),
    borderRadius: moderateScale(6),
    marginTop: verticalScale(15),
    backgroundColor: colors.background,
    borderColor: colors.text,
  },
});
