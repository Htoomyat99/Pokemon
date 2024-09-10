import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { router } from "expo-router";

const Login = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text onPress={() => router.replace("/(tabs)/cards")}>login</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
