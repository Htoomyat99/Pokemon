import { colors, fontSize, screenPadding } from "@/constants/Token";
import ErrorAlertModal from "@/src/components/ErrorAlertModal";
import LoadingView from "@/src/components/LoadingView";
import { useCard, useCardType } from "@/src/hooks/useQuery";
import CardListItem from "@/src/screens/cards/CartListItem";
import FilterList from "@/src/screens/cards/FilterList";
import SearchAndFilter from "@/src/screens/cards/SearchAndFilter";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { verticalScale } from "react-native-size-matters";

const Cards = () => {
  const [errModal, setErrModal] = useState({ status: false, errMsg: "" });
  const [showFilter, setShowFilter] = useState(false);

  const {
    isError,
    hasNextPage,
    fetchNextPage,
    data,
    error,
    status,
    isFetchingNextPage,
    refetch,
  } = useCard();

  const cardData = data?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    isError && setErrModal({ status: true, errMsg: error.message });
  }, [isError]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Pokémon</Text>

        <Text style={styles.descText}>
          Search for pokemon by name or using its national number
        </Text>

        <SearchAndFilter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />

        {showFilter && <FilterList />}

        <View style={styles.flatListContainer}>
          <FlatList
            // refreshing={false}
            // onRefresh={() => refetch()}
            data={cardData}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: verticalScale(80) }}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CardListItem item={item} />}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            ListHeaderComponent={status === "pending" ? <LoadingView /> : null}
            ListFooterComponent={isFetchingNextPage ? <LoadingView /> : null}
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
  flatListContainer: {
    flex: 1,
    marginTop: verticalScale(25),
  },
});
