import AsyncStorage from "@react-native-async-storage/async-storage";
export const Logout = async (navigation) => {
  try {
    await AsyncStorage.clear();
    console.log("AsyncStorage cleared successfully.");
    navigation.navigate("Login");
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};
