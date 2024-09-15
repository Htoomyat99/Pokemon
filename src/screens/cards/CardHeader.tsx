import { colors, fontSize } from "@/constants/Token";
import ConfirmLogout from "@/src/components/ConfirmLogout";
import GradientText from "@/src/components/GradientText";
import { useSession } from "@/src/providers/SessionPrvoider";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from "expo-blur";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const CardHeader = () => {
  const [logoutModalVisible, setlogoutModalVisible] = useState(false);

  const { signOut } = useSession();

  const handleLogout = () => {
    setlogoutModalVisible(true);
  };

  return (
    <View style={styles.headerContainer}>
      <GradientText
        colors={["#FF512F", "#F09819", "#FF7F00"]}
        style={styles.headerText}
      >
        Pokémon
      </GradientText>

      <AntDesign
        onPress={handleLogout}
        name="logout"
        size={moderateScale(22)}
        color={colors.text}
        style={styles.iconContainer}
      />

      {logoutModalVisible && (
        <BlurView
          intensity={40}
          tint="dark"
          experimentalBlurMethod="dimezisBlurView"
          style={StyleSheet.absoluteFill}
        >
          <ConfirmLogout
            visible={logoutModalVisible}
            hideModal={() => setlogoutModalVisible(false)}
            confirmAction={signOut}
          />
        </BlurView>
      )}
    </View>
  );
};

export default CardHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: verticalScale(15),
  },
  headerText: {
    fontFamily: "InterSemiBold",
    fontSize: fontSize.lg,
    color: colors.text,
  },
  iconContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(7),
  },
});
