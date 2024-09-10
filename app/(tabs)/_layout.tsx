import { colors } from "@/constants/Token";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: moderateScale(12),
          fontWeight: "500",
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
            <FontAwesome name="heart" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collections"
        options={{
          title: "Collections",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="playlist-play"
              size={26}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
