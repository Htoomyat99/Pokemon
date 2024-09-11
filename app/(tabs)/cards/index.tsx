import { useSession } from "@/src/providers/SessionPrvoider";
import { StyleSheet, Text, View } from "react-native";

const Cards = () => {
  const { signOut } = useSession();

  const handleSignOut = () => {
    console.log("cartds");
    signOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={handleSignOut}>Cards</Text>
      <Text>password</Text>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({});
