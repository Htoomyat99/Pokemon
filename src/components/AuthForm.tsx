import { colors, fontSize, screenPadding } from "@/constants/Token";
import { TUser } from "@/src/type/StausAuth";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface Props {
  buttonText: string;
  btnAction: ({ userName, password }: TUser) => void;
}

const AuthForm = ({ buttonText, btnAction }: Props) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [borderColor, setBorderColor] = useState(colors.background);
  const [passBorderColor, setPassBorderColor] = useState(colors.background);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View
      style={{
        marginTop: verticalScale(30),
        paddingHorizontal: screenPadding.horizontal,
      }}
    >
      <View style={{ ...styles.textInputContainer, borderColor: borderColor }}>
        <TextInput
          placeholder="Enter username"
          value={userName}
          onChangeText={setUserName}
          style={styles.textInput}
          placeholderTextColor={colors.text}
          cursorColor={colors.text}
          onFocus={() => setBorderColor(colors.text)}
          onBlur={() => setBorderColor(colors.background)}
          autoCapitalize="none"
        />
      </View>

      <View
        style={{
          ...styles.textInputContainer,
          ...styles.iconContainer,
          borderColor: passBorderColor,
        }}
      >
        <TextInput
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          placeholderTextColor={colors.text}
          cursorColor={colors.text}
          secureTextEntry={hidePassword}
          onFocus={() => setPassBorderColor(colors.text)}
          onBlur={() => setPassBorderColor(colors.background)}
        />

        <Pressable
          onPress={toggleHidePassword}
          style={{ padding: moderateScale(5) }}
        >
          <FontAwesome5
            name={hidePassword ? "eye-slash" : "eye"}
            size={moderateScale(20)}
            color="black"
          />
        </Pressable>
      </View>

      <Pressable
        onPress={() => btnAction({ userName, password })}
        style={styles.btnContainer}
      >
        <Text style={styles.btnText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: colors.secondary,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(15),
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    fontFamily: "InterMedium",
    fontSize: fontSize.xs,
    paddingVertical: verticalScale(12),
  },
  iconContainer: {
    marginTop: verticalScale(15),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnContainer: {
    backgroundColor: colors.primary,
    borderRadius: moderateScale(30),
    alignItems: "center",
    marginTop: verticalScale(35),
  },
  btnText: {
    fontFamily: "InterSemiBold",
    fontSize: fontSize.sm,
    paddingVertical: verticalScale(12),
    color: colors.text,
  },
});
