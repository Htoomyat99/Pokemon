import { moderateScale, scale } from "react-native-size-matters";

export const colors = {
  primary: "#FFFFFF",
  background: "#FFFFFF",
  text: "#000000",
  textMuted: "#BBBBBB",
  icon: "#FFFFFF",
};

export const fontSize = {
  xs: moderateScale(12),
  sm: moderateScale(16),
  base: moderateScale(20),
  lg: moderateScale(24),
};

export const screenPadding = {
  horizontal: scale(20),
};
