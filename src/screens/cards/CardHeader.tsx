import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSession } from "@/src/providers/SessionPrvoider";
import { colors, fontSize } from "@/constants/Token";
import { moderateScale, verticalScale, scale } from "react-native-size-matters";
import ConfirmLogout from "@/src/components/ConfirmLogout";
import { BlurView } from "expo-blur";
import GradientText from "@/src/components/GradientText";

const CardHeader = () => {
  const [logoutModalVisible, setlogoutModalVisible] = useState(false);

  const { signOut } = useSession();

  const handleLogout = () => {
    setlogoutModalVisible(true);
  };

  return (
    <View style={styles.headerContainer}>
      <GradientText
        colors={["#FFCC33", "#FF7F00", "#FFB347"]}
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
  },
  headerText: {
    fontFamily: "InterSemiBold",
    fontSize: fontSize.lg,
    color: colors.text,
    marginTop: verticalScale(15),
  },
  iconContainer: {
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(7),
  },
});
