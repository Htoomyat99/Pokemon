import { Stack } from "expo-router";

const CardsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default CardsLayout;
