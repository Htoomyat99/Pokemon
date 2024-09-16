import { colors, fontSize, screenPadding } from "@/constants/Token";
import ErrorAlertModal from "@/src/components/ErrorAlertModal";
import LoadingView from "@/src/components/LoadingView";
import NotFound from "@/src/components/NotFound";
import { useCardFilter } from "@/src/hooks/useQuery";
import CardHeader from "@/src/screens/cards/CardHeader";
import CardListItem from "@/src/screens/cards/CartListItem";
import FilterList from "@/src/screens/cards/FilterList";
import SearchAndFilter from "@/src/screens/cards/SearchAndFilter";
import { stringWithoutSpaces } from "@/src/utils/stringWithoutSpaces";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { verticalScale } from "react-native-size-matters";

const Cards = () => {
  const { type, rarity } = useLocalSearchParams<{
    type: string;
    rarity: string;
  }>();

  console.log(typeof type, typeof rarity);
  const [errModal, setErrModal] = useState({ status: false, errMsg: "" });
  const [showFilter, setShowFilter] = useState(false);

  const [searchText, setSearchText] = useState<string>("");
  const [cardType, setCardType] = useState("");

  const stringWithoutSpacesText = stringWithoutSpaces(searchText);

  const {
    data: filterData,
    isError,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isFetching,
  } = useCardFilter(stringWithoutSpacesText, cardType);

  const filterCardData = filterData?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    isError && setErrModal({ status: true, errMsg: error.message });
  }, [isError]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const refreshControl = (
    <RefreshControl
      refreshing={isFetching && !isFetchingNextPage && !isLoading}
      onRefresh={refetch}
    />
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <CardHeader />

        <Text style={styles.descText}>
          Search for pokemon by name or using its national number
        </Text>

        <SearchAndFilter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          handleSearch={(text) => setSearchText(text)}
          cardType={cardType}
        />

        {showFilter && (
          <FilterList cardType={cardType} setCardType={setCardType} />
        )}

        <View style={styles.flatListContainer}>
          <FlatList
            refreshControl={refreshControl}
            style={{ marginTop: verticalScale(25) }}
            data={filterCardData}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: verticalScale(80) }}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CardListItem item={item} />}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={isLoading ? <LoadingView /> : null}
            ListFooterComponent={isFetchingNextPage ? <LoadingView /> : null}
            ListEmptyComponent={() => (isLoading ? null : <NotFound />)}
          />
        </View>

        <ErrorAlertModal
          hideModal={() => {
            setErrModal({ status: false, errMsg: "" });
            refetch();
          }}
          btnText="Retry"
          errModal={errModal}
        />
      </View>
    </SafeAreaView>
  );
};

export default Cards;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight,
  },
  container: {
    flex: 1,
    paddingHorizontal: screenPadding.horizontal,
  },

  descText: {
    fontFamily: "InterMedium",
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: verticalScale(10),
  },
  flatListContainer: {
    flex: 1,
  },
});
