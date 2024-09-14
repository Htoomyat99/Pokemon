import SkeletonLoader from "expo-skeleton-loader";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export default function Skeleton() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.container}>
        <SkeletonLoader boneColor="#DDDDDD" highlightColor="#FFFFFF">
          <SkeletonLoader.Container style={{ alignItems: "center" }}>
            <SkeletonLoader.Item
              style={{
                width: scale(260),
                height: verticalScale(350),
                marginVertical: 10,
                borderRadius: moderateScale(10),
              }}
            />

            <SkeletonLoader.Item
              style={{
                width: scale(320),
                height: verticalScale(30),
                marginTop: verticalScale(15),
                borderRadius: moderateScale(5),
              }}
            />

            <SkeletonLoader.Item
              style={{
                width: scale(320),
                height: verticalScale(150),
                marginTop: verticalScale(15),
                borderRadius: moderateScale(5),
              }}
            />

            <SkeletonLoader.Item
              style={{
                width: scale(320),
                height: verticalScale(50),
                marginTop: verticalScale(15),
                borderRadius: moderateScale(5),
              }}
            />
          </SkeletonLoader.Container>
        </SkeletonLoader>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
});
