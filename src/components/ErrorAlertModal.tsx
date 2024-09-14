import { colors, fontSize } from "@/constants/Token";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { TAuthError } from "@/src/type/StausAuth";

interface Props {
  hideModal: () => void;
  errModal: TAuthError;
  btnText?: string;
}

const ErrorAlertModal = ({
  hideModal,
  errModal,
  btnText = "Got it",
}: Props) => {
  return (
    <Modal
      visible={errModal.status}
      onDismiss={hideModal}
      transparent={true}
      animationType="fade"
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={hideModal}>
        <View style={styles.mainContainer}>
          <View style={styles.container}>
            <View style={styles.errorContainer}>
              <MaterialIcons
                name="report-gmailerrorred"
                size={moderateScale(30)}
                color={colors.primary}
              />

              <Text style={styles.errHeaderText}>Error</Text>
            </View>

            <View style={styles.divider} />

            <Text style={styles.errText}>{errModal.errMsg}</Text>

            <Pressable style={styles.btnContainer} onPress={hideModal}>
              <Text style={styles.btnText}>{btnText}</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ErrorAlertModal;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#49454F99",
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
