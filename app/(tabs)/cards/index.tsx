import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStore } from "@/src/store/store";

const Cards = () => {
  const userName = useStore.getState().userName;
  const password = useStore.getState().password;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{userName}</Text>
      <Text>{password}</Text>
    </View>
  );
};

export default Cards;

const styles = StyleSheet.create({});
