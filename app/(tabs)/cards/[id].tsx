import Skeleton from "@/src/components/Skeleton";
import { useCardDetail } from "@/src/hooks/useQuery";
import CardDetailItem from "@/src/screens/cards/CardDetailItem";
import { useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";

const CardDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, error, isError, isLoading } = useCardDetail(id);

  if (isError) {
    return Alert.alert("Error", error?.message);
  }

  if (isLoading) return <Skeleton />;

  return <CardDetailItem card={data.data} />;
};

export default CardDetail;
