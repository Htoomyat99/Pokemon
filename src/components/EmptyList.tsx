import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "@/constants/Token";

const EmptyList = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: colors.text }}>EmptyList</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({});
