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

  const { signIn } = useSession();
  const existingUser = useStore.getState().user;

  const [errModal, setErrModal] = useState<TAuthError>({ status: false });

  const goRegister = () => {
    router.navigate("/(auth)/signUp");
  };

  const hideModal = () => {
    setErrModal({
      status: false,
    });
  };

  const handleLogin = ({ userName, password }: TUser) => {
    if (!userName || !password) {
      setErrModal({
        status: true,
        errMsg: "Please enter username and password",
      });
      return;
    }

    if (existingUser.userName === "" && existingUser.password === "") {
      setErrModal({
        status: true,
        errMsg: "Please register first",
      });
      return;
    }

    if (
      userName !== existingUser.userName ||
      password !== existingUser.password
    ) {
      setErrModal({
        status: true,
        errMsg: "Please enter correct username and password",
      });
      return;
    }

    signIn();
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

          <Text style={styles.headerText}>Login Now</Text>

          <Text style={styles.descText}>
            Please enter the details below to continue
          </Text>

          <AuthForm btnAction={handleLogin} buttonText="LOGIN" />

          <Text style={styles.footerText}>
            Don't have an account!{" "}
            <Text onPress={goRegister} style={{ color: "#C8A20E" }}>
              Register
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
    marginTop: verticalScale(8),
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
