import { colors, fontSize } from "@/constants/Token";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const NotFound = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/animations/noData.json")}
        style={styles.lottie}
        autoPlay
        loop
      />

      <Text style={styles.text}>No Data Found</Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lottie: {
    width: scale(250),
    height: scale(200),
    marginTop: verticalScale(20),
  },
  text: {
    fontSize: fontSize.sm,
    fontFamily: "InterSemiBold",
    color: colors.textMuted,
  },
});
