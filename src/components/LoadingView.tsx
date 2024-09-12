import { colors } from "@/constants/Token";
import { ActivityIndicator } from "react-native";
import { verticalScale } from "react-native-size-matters";

const LoadingView = () => {
  return (
    <ActivityIndicator
      size={"small"}
      style={{ marginTop: verticalScale(15) }}
      color={colors.text}
    />
  );
};

export default LoadingView;
