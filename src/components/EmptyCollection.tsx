import { colors, fontSize } from "@/constants/Token";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

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

      <Pressable style={styles.btnContainer} onPress={goCards}>
        <Text style={{ ...styles.noCollectionText, color: "#888888" }}>
          View Cards
        </Text>
      </Pressable>
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
  btnContainer: {
    backgroundColor: colors.background,
    marginTop: verticalScale(50),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(7),
    borderWidth: 1,
    borderColor: "#DDDDDD",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
});
