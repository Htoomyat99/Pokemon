import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const SignUp = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => router.replace("/(tabs)/cards")}>login</Text>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
