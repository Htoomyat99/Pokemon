import { colors, fontSize, screenPadding } from "@/constants/Token";
import AuthForm from "@/src/components/AuthForm";
import ErrorAlertModal from "@/src/components/ErrorAlertModal";
import { TAuth } from "@/src/utils/type";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const SignUp = () => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const goLogin = () => {
    router.navigate("/(auth)/");
  };

  const hideModal = () => {
    setVisible(false);
  };

  const handleRegister = ({ userName, password }: TAuth) => {
    if (!userName || !password) {
      setVisible(true);
      return;
    }

    router.replace("/(tabs)/cards");
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: verticalScale(20) }}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              // source={require("@/assets/images/pokemon.png")}
              source={require("@/assets/images/error.png")}
              style={styles.image}
            />
          </View>

          <Text style={styles.headerText}>Register Now</Text>

          <Text style={styles.descText}>
            Please enter the details below to continue
          </Text>

          <AuthForm btnAction={handleRegister} buttonText="SignUp" />

          <Text style={styles.footerText}>
            Already have an account!{" "}
            <Text onPress={goLogin} style={{ color: "#C8A20E" }}>
              Login
            </Text>
          </Text>

          <ErrorAlertModal
            visible={visible}
            errorText="Please enter username and password"
            hideModal={hideModal}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: colors.background,
  },
  image: {
    width: scale(280),
    height: scale(280),
  },
  headerText: {
    fontFamily: "InterSemiBold",
    fontSize: fontSize.lg,
    textAlign: "center",
  },
  descText: {
    fontFamily: "InterMedium",
    fontSize: fontSize.sm,
    textAlign: "center",
    color: colors.textMuted,
    marginTop: verticalScale(5),
    marginHorizontal: screenPadding.horizontal,
  },
  footerText: {
    marginHorizontal: screenPadding.horizontal,
    textAlign: "center",
    marginTop: verticalScale(50),
    fontSize: fontSize.sm,
    color: colors.text,
  },
});
