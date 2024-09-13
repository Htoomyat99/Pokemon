import { colors, fontSize } from "@/constants/Token";
import LoadingView from "@/src/components/LoadingView";
import { useCardType } from "@/src/hooks/useQuery";
import React from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Props {
  cardType: string;
  setCardType: React.Dispatch<React.SetStateAction<string>>;
}

const FilterList = ({ cardType, setCardType }: Props) => {
  const { data, isError, error, isLoading, isFetching } = useCardType();

  const handleSelect = (item: string) => {
    if (item === cardType) {
      setCardType("");
    } else {
      setCardType(item);
    }
  };

  if (isError) {
    Alert.alert("Error", error?.message);
  }

  if (isLoading) {
    return <LoadingView />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data?.data || []}
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={{
              ...styles.itemContainer,
              backgroundColor: cardType === item ? "#6E8194" : undefined,
            }}
            onPress={() => handleSelect(item)}
          >
            <Text
              style={{
                ...styles.item,
                color: cardType === item ? colors.background : colors.text,
              }}
            >
              {isFetching ? (
                <Text style={styles.loading}>Loading...</Text>
              ) : (
                item
              )}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
};

export default FilterList;

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(8),
  },
  itemContainer: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(20),
    marginRight: scale(10),
    borderRadius: moderateScale(6),
    borderWidth: 1,
    borderColor: "#6E8194",
  },
  item: {
    fontFamily: "InterMedium",
    fontSize: moderateScale(13),
  },
  loading: {
    fontFamily: "InterMedium",
    fontSize: fontSize.xs,
    color: colors.background,
  },
});
