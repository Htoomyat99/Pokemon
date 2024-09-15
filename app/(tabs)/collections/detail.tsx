import CardDetailItem from "@/src/screens/cards/CardDetailItem";
import { useLocalSearchParams } from "expo-router";

const CollectionDetails = () => {
  const params = useLocalSearchParams<{ card: string }>();

  const cardDetail = JSON.parse(params.card);

  return <CardDetailItem card={cardDetail} />;
};

export default CollectionDetails;
