import { colors, fontSize, screenPadding } from "@/constants/Token";
import GradientText from "@/src/components/GradientText";
import GridView from "@/src/components/GridView";
import LoadingView from "@/src/components/LoadingView";
import NotFound from "@/src/components/NotFound";
import { useCardType, useRarities } from "@/src/hooks/useQuery";
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
  const { data, error, isLoading, isError } = useRarities();

  const {
    data: cardType,
    error: cardError,
    isLoading: cardIsLoading,
    isError: cardIsError,
  } = useCardType();

  const [typeSelected, setTypeSelected] = useState<string>("");
  const [raritySelected, setRaritySelected] = useState<string>("");

  const handleFilter = () => {
    console.log("filter >>>", typeSelected, raritySelected);
    router.navigate({
      pathname: "/cards",
      params: { type: typeSelected, rarity: raritySelected },
    });
  };

  if (isError || cardIsError) return <NotFound />;

  if (isLoading || cardIsLoading) return <LoadingView />;

  const selectMode = typeSelected || raritySelected;

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <GradientText colors={["#FF3330", "#FFB520"]} style={styles.chooseText}>
        Choose Types and Rarities
      </GradientText>

      <Pressable
        onPress={handleFilter}
        disabled={selectMode ? false : true}
        style={{
          ...styles.filterContainer,
          backgroundColor: colors.background,
          borderColor: selectMode ? colors.text : colors.textMuted,
        }}
      >
        <FontAwesome5
          name="filter"
          size={moderateScale(20)}
          color={selectMode ? colors.text : colors.textMuted}
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
  },
});
