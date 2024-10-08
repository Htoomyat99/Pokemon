import { colors, fontSize } from "@/constants/Token";
import LottieView from "lottie-react-native";
import { StyleSheet, Text, View } from "react-native";
import { scale } from "react-native-size-matters";

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/animations/pokeLoading.json")}
        style={styles.lottie}
        autoPlay
        loop
      />

      <Text style={styles.text}>Loading ...</Text>
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: scale(100),
    height: scale(100),
  },
  text: {
    textAlign: "center",
    color: colors.textMuted,
    marginLeft: scale(15),
    fontFamily: "InterSemiBold",
    fontSize: fontSize.sm,
  },
});
