import { colors } from "@/constants/Token";
import { useSession } from "@/src/providers/SessionPrvoider";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

const AuthLayout = () => {
  const { session, isLoading } = useSession();

  if (isLoading)
    return <ActivityIndicator size={"small"} color={colors.text} />;

  if (session) {
    return <Redirect href={"/(tabs)/cards"} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="signUp" />
    </Stack>
  );
};

export default AuthLayout;
