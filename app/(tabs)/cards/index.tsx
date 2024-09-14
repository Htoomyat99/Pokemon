import { colors, fontSize, screenPadding } from "@/constants/Token";
import ConfirmLogout from "@/src/components/ConfirmLogout";
import ErrorAlertModal from "@/src/components/ErrorAlertModal";
import LoadingView from "@/src/components/LoadingView";
import NotFound from "@/src/components/NotFound";
import { useDebounce } from "@/src/hooks/useDebounce";
import { useCardFilter } from "@/src/hooks/useQuery";
import { useSession } from "@/src/providers/SessionPrvoider";
import CardListItem from "@/src/screens/cards/CartListItem";
import FilterList from "@/src/screens/cards/FilterList";
import SearchAndFilter from "@/src/screens/cards/SearchAndFilter";
import { stringWithoutSpaces } from "@/src/utils/stringWithoutSpaces";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from "@react-native-community/blur";
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
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const Cards = () => {
  const [errModal, setErrModal] = useState({ status: false, errMsg: "" });
  const [showFilter, setShowFilter] = useState(false);

  const [searchText, setSearchText] = useState<string>("");
  const [cardType, setCardType] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  const { signOut } = useSession();

  const debounceText = useDebounce(stringWithoutSpaces(searchText), 500);

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
  } = useCardFilter(debounceText, cardType);

  const filterCardData = filterData?.pages.flatMap((page) => page.data) || [];

  useEffect(() => {
    isError && setErrModal({ status: true, errMsg: error.message });
  }, [isError]);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handleLogout = () => {
    setModalVisible(true);
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
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Pokémon</Text>

          <AntDesign
            onPress={handleLogout}
            name="logout"
            size={moderateScale(22)}
            color={colors.text}
            style={styles.iconContainer}
          />
        </View>

        <Text style={styles.descText}>
          Search for pokemon by name or using its national number
        </Text>

        <SearchAndFilter
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          searchText={searchText}
          setSearchText={setSearchText}
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

        {modalVisible && (
          <BlurView
            blurAmount={10}
            blurType="light"
            style={StyleSheet.absoluteFill}
          >
            <ConfirmLogout
              visible={modalVisible}
              hideModal={() => setModalVisible(false)}
              confirmAction={signOut}
            />
          </BlurView>
        )}
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "InterSemiBold",
    fontSize: fontSize.lg,
    color: colors.text,
    marginTop: verticalScale(15),
  },
  iconContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(7),
  },
  descText: {
    fontFamily: "InterMedium",
    fontSize: fontSize.sm,
    color: colors.textMuted,
    marginTop: verticalScale(10),
  },
  flatListContainer: {
    flex: 1,
    // marginTop: verticalScale(25),
  },
});
