import { colors, fontSize, screenPadding } from "@/constants/Token";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Props {
  data: string[];
  headerText: string;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const GridView = ({ data, headerText, selected, setSelected }: Props) => {
  const handleItemSelect = (item: string) => {
    if (item === selected) {
      setSelected("");
    } else {
      setSelected(item);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{headerText}</Text>

      <View style={styles.listContainer}>
        {data?.map((item: string, index: number) => {
          return (
            <Pressable key={index} onPress={() => handleItemSelect(item)}>
              <LinearGradient
                colors={
                  selected === item
                    ? ["#FFF9C4", "#FFCCCB"]
                    : ["#FFFFFF", "#FFFFFF"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.itemContainer}
              >
                <Text style={styles.text}>{item}</Text>
              </LinearGradient>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default GridView;

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(15),
    paddingHorizontal: screenPadding.horizontal,
  },
  headerText: {
    fontFamily: "InterSemiBold",
    fontSize: fontSize.sm,
    color: colors.text,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(10),
    marginTop: verticalScale(15),
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: colors.textMuted,
    borderRadius: moderateScale(5),
  },
  text: {
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(5),
  },
});
