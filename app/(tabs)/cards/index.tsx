import { colors, fontSize, screenPadding } from "@/constants/Token";
import LoadingView from "@/src/components/LoadingView";
import CartItem from "@/src/screens/cards/CartItem";
import FilterList from "@/src/screens/cards/FilterList";
import SearchAndFilter from "@/src/screens/cards/SearchAndFilter";
import { TCard } from "@/src/utils/type";
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
  const apiKey = "06fff1ae-79ec-4bde-b43b-a1af3dfcaa92";
  const page = 1;
  const pageSize = 10;
  const url = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`;
  const filterUrl = "https://api.pokemontcg.io/v2/types";

  const [data, setData] = useState<TCard[]>([]);
  const [filterData, setFilterData] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    fetchData();
    fetchFilterData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setData(data.data);
        setLoading(false);
      } else {
        console.log("Error fetching data:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const fetchFilterData = async () => {
    setLoading(true);
    try {
      const response = await fetch(filterUrl, {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (response.ok) {
        const data = await response.json();

        setFilterData(data.data);
        setLoading(false);
      } else {
        console.log("Error fetching data:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
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

        {showFilter && <FilterList filterData={filterData} />}

        <View style={styles.flatListContainer}>
          <FlatList
            ListHeaderComponent={loading ? <LoadingView /> : null}
            data={data}
            numColumns={2}
            contentContainerStyle={{ paddingBottom: verticalScale(80) }}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CartItem item={item} />}
            columnWrapperStyle={{ justifyContent: "space-between" }}
          />
        </View>
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
  flatListContainer: {
    flex: 1,
    marginTop: verticalScale(25),
  },
});
