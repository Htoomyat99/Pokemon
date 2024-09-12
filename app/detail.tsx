import LoadingView from "@/src/components/LoadingView";
import CardDetailItem from "@/src/screens/cards/CardDetailItem";
import { TCardDetail } from "@/src/utils/cardDetailType";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, View } from "react-native";
import { verticalScale } from "react-native-size-matters";

const CardDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const apiKey = "06fff1ae-79ec-4bde-b43b-a1af3dfcaa92";

  const [card, setCard] = useState<TCardDetail>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
        headers: {
          "X-Api-Key": apiKey,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch card data");
      }

      const data = await response.json();

      setCard(data.data);
      setLoading(false);
    } catch (err) {
      // setError(err.message);
      Alert.alert("Error", "Failed to fetch card data");
      setLoading(false);
    }
  };

  if (loading || !card)
    return (
      <View style={{ marginTop: verticalScale(50) }}>
        <LoadingView />
      </View>
    );

  return <CardDetailItem card={card} />;
};

export default CardDetail;
