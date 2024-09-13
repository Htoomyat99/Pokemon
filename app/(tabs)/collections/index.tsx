import { colors, fontSize, screenPadding } from "@/constants/Token";
import EmptyList from "@/src/components/EmptyList";
import CollectionItem from "@/src/screens/collections/CollectionItem";
import { useStore } from "@/src/store/store";
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
  const collectionCards = useStore((state) => state.collection);

  if (collectionCards.length <= 0) {
    return <EmptyList />;
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <Text style={styles.title}>My Collections</Text>

        <FlatList
          contentContainerStyle={{ paddingBottom: verticalScale(70) }}
          data={collectionCards}
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
