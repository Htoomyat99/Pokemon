import Toast from "react-native-toast-message";

export function toastService() {
  const addFavoriteToast = () => {
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Added to favorite successfully 🎉 🎉",
      visibilityTime: 1500,
    });
  };

  const removeFavoriteToast = () => {
    Toast.show({
      type: "error",
      text1: "Removed",
      text2: "Removed from favorite successfully 🎉 🎉",
      visibilityTime: 1500,
    });
  };

  return { addFavoriteToast, removeFavoriteToast };
}
