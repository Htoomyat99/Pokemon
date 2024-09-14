import { colors, fontSize } from "@/constants/Token";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { BlurView } from "expo-blur";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Props {
  hideModal: () => void;
  visible: boolean;
  confirmAction: () => void;
}

const ConfirmLogout = ({ hideModal, visible, confirmAction }: Props) => {
  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      transparent={true}
      animationType="fade"
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={hideModal}>
        <BlurView
          style={styles.blurContainer}
          tint="dark"
          intensity={40}
          experimentalBlurMethod="dimezisBlurView"
        >
          <View style={styles.container}>
            <View style={styles.errorContainer}>
              <MaterialIcons
                name="report-gmailerrorred"
                size={moderateScale(30)}
                color={colors.primary}
              />

              <Text style={styles.errHeaderText}>Logout</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.errText}>Are you sure you want to Logout?</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable style={styles.btnContainer} onPress={hideModal}>
                <Text style={{ ...styles.btnText, color: colors.background }}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable style={styles.btnContainer} onPress={confirmAction}>
                <Text style={styles.btnText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </BlurView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmLogout;

const styles = StyleSheet.create({
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#49454FAA",
    borderRadius: moderateScale(10),
    width: "90%",
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(15),
  },
  errorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: scale(10),
  },
  errHeaderText: {
    color: colors.primary,
    fontFamily: "InterSemiBold",
    fontSize: fontSize.base,
  },
  errText: {
    color: colors.background,
    fontFamily: "InterMedium",
    paddingHorizontal: scale(5),
    fontSize: moderateScale(14),
  },
  divider: {
    backgroundColor: "#DDDDDD",
    width: "100%",
    height: StyleSheet.hairlineWidth,
    marginVertical: verticalScale(10),
  },
  btnContainer: {
    marginTop: verticalScale(20),
    alignSelf: "flex-end",
  },
  btnText: {
    color: colors.primary,
    fontFamily: "InterSemiBold",
    textAlign: "right",
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(5),
    fontSize: moderateScale(16),
  },
});
