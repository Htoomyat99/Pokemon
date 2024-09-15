import { colors, fontSize, screenPadding } from "@/constants/Token";
import EmptyCollection from "@/src/components/EmptyCollection";
import GradientText from "@/src/components/GradientText";
import CollectionItem from "@/src/screens/collections/CollectionItem";
import { useStore } from "@/src/store/store";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { verticalScale } from "react-native-size-matters";

const FavoriteListScreen = () => {
  const collectionCards = useStore((state) => state.collections);

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <GradientText
          colors={["#FFCC33", "#FF7F00", "#FFB347"]}
          style={styles.title}
        >
          My Collections
        </GradientText>

        <View style={styles.divider} />

        <View style={{ flex: 1, paddingHorizontal: screenPadding.horizontal }}>
          <FlatList
            contentContainerStyle={{ paddingBottom: verticalScale(70) }}
            data={collectionCards}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <CollectionItem item={item} />}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListEmptyComponent={() => <EmptyCollection />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: verticalScale(10),
  },
  title: {
    fontSize: fontSize.base,
    fontFamily: "InterSemiBold",
    textAlign: "center",
    color: colors.text,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.textMuted,
    marginVertical: verticalScale(12),
  },
  separator: {
    height: verticalScale(10),
  },
});

export default FavoriteListScreen;
