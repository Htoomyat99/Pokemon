import { colors } from "@/constants/Token";
import { useSession } from "@/src/providers/SessionPrvoider";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Redirect, Tabs, usePathname, useSegments } from "expo-router";
import { ActivityIndicator, Platform, StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const TabLayout = () => {
  const { session, isLoading } = useSession();

  const segments: string[] = useSegments();
  const hide = segments.includes("detail") || segments.includes("[id]");

  if (isLoading)
    return <ActivityIndicator size={"small"} color={colors.text} />;

  if (!session) {
    return <Redirect href={"/(auth)/"} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: moderateScale(12),
          fontFamily: "InterSemiBold",
        },
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          borderTopLeftRadius: moderateScale(20),
          borderTopRightRadius: moderateScale(20),
          borderTopWidth: 0,
          paddingTop: moderateScale(8),
          paddingBottom:
            Platform.OS === "android" ? moderateScale(10) : moderateScale(25),
          height: Platform.OS === "ios" ? verticalScale(65) : verticalScale(55),
          display: hide ? "none" : "flex",
        },
        // tabBarBackground: () => (
        //   <BlurView
        //     experimentalBlurMethod="dimezisBlurView"
        //     intensity={80}
        //     style={{
        //       ...StyleSheet.absoluteFillObject,
        //       overflow: "hidden",
        //       borderTopLeftRadius: moderateScale(20),
        //       borderTopRightRadius: moderateScale(20),
        //     }}
        //   />
        // ),
      }}
    >
      <Tabs.Screen
        name="cards"
        options={{
          title: "Cards",
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="catching-pokemon"
              size={moderateScale(22)}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: "Collections",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
