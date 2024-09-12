import { colors, fontSize, screenPadding } from "@/constants/Token";
import CollectionItem from "@/src/screens/collections/CollectionItem";
import { TCard } from "@/src/utils/cardType";
import { useRouter } from "expo-router";
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

const FavoriteListScreen = () => {
  const apiKey = "06fff1ae-79ec-4bde-b43b-a1af3dfcaa92";
  const page = 1;
  const pageSize = 10;
  const url = `https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${pageSize}`;
  const router = useRouter();

  const [data, setData] = useState<TCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
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

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <Text style={styles.title}>My Favorite Cards</Text>
        <FlatList
          contentContainerStyle={{ paddingBottom: verticalScale(70) }}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CollectionItem item={item} />}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: verticalScale(10),
    paddingHorizontal: screenPadding.horizontal,
  },
  title: {
    fontSize: fontSize.base,
    fontFamily: "InterSemiBold",
    textAlign: "center",
    marginBottom: verticalScale(15),
    color: colors.text,
  },
  separator: {
    height: verticalScale(10),
  },
});

export default FavoriteListScreen;
