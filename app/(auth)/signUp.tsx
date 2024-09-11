import { colors, fontSize, screenPadding } from "@/constants/Token";
import AuthForm from "@/src/components/AuthForm";
import ErrorAlertModal from "@/src/components/ErrorAlertModal";
import { useSession } from "@/src/providers/SessionPrvoider";
import { useStore } from "@/src/store/store";
import { TAuthError, TUser } from "@/src/utils/type";
import { useRouter } from "expo-router";
import { useState } from "react";
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
  const [errModal, setErrModal] = useState<TAuthError>({ status: false });
  const { signUp } = useSession();

  const goLogin = () => {
    router.navigate("/(auth)/");
  };

  const hideModal = () => {
    setErrModal({ status: false });
  };

  const handleRegister = ({ userName, password }: TUser) => {
    if (!userName || !password) {
      setErrModal({
        status: true,
        errMsg: "Please enter username and password",
      });
      return;
    }

    if (password.length < 6) {
      setErrModal({
        status: true,
        errMsg: "Password must be at least 6 characters",
      });
      return;
    }

    useStore.getState().setUser({ userName, password });
    signUp();
    router.push("/(tabs)/cards");
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
            errModal={{ status: errModal.status, errMsg: errModal.errMsg }}
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
