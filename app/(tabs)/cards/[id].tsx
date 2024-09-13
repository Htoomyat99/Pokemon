import LoadingView from "@/src/components/LoadingView";
import { useCardDetail } from "@/src/hooks/useQuery";
import CardDetailItem from "@/src/screens/cards/CardDetailItem";
import { TCardDetail } from "@/src/utils/cardDetailType";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { verticalScale } from "react-native-size-matters";

const CardDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, error, isError, isLoading } = useCardDetail(id);

  if (isError) {
    return Alert.alert("Error", error?.message);
  }

  if (isLoading)
    return (
      <View style={{ marginTop: verticalScale(50) }}>
        <LoadingView />
      </View>
    );

  return <CardDetailItem card={data.data} />;
};

export default CardDetail;
