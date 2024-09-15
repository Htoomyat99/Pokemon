import { colors, fontSize } from "@/constants/Token";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import GradientText from "./GradientText";

const EmptyCollection = () => {
  const router = useRouter();

  const goCards = () => {
    router.navigate("/cards");
  };
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        source={require("@/assets/animations/noCollection.json")}
        style={styles.lottie}
      />

      <Text style={styles.noCollectionText}>No Collection yet</Text>

      <LinearGradient
        colors={["#FFCC33", "#FF7F00", "#FFB347"]}
        style={styles.linear}
      >
        <Pressable style={styles.btnContainer} onPress={goCards}>
          <GradientText
            colors={["#FFCC33", "#FF7F00", "#FFB347"]}
            style={styles.viewCardText}
          >
            View Cards
          </GradientText>
        </Pressable>
      </LinearGradient>
    </View>
  );
};

export default EmptyCollection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(80),
  },
  lottie: {
    width: scale(200),
    height: scale(200),
  },
  noCollectionText: {
    fontSize: fontSize.sm,
    fontFamily: "InterSemiBold",
    color: colors.textMuted,
  },
  linear: {
    marginTop: verticalScale(50),
    paddingVertical: verticalScale(1.5),
    paddingHorizontal: scale(1.5),
    borderRadius: moderateScale(6),
  },
  btnContainer: {
    backgroundColor: colors.background,
    paddingVertical: verticalScale(6),
    borderRadius: moderateScale(5),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  viewCardText: {
    fontFamily: "InterSemiBold",
    textAlign: "center",
    paddingHorizontal: scale(15),
    fontSize: moderateScale(14),
  },
});
