import { moderateScale, scale } from "react-native-size-matters";

export const colors = {
  primary: "#F5CF3E",
  background: "#FFFFFF",
  text: "#000000",
  textMuted: "#BBBBBB",
  icon: "#FFFFFF",
  secondary: "#f0f1f0",
  error: "#C0101F",
};

export const fontSize = {
  xs: moderateScale(12),
  sm: moderateScale(15),
  base: moderateScale(20),
  lg: moderateScale(24),
};

export const screenPadding = {
  horizontal: scale(20),
};
