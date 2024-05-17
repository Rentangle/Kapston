import checkUserData from "./userUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
const handleUserData = async (email, password, navigation) => {
  try {
    const userData = await checkUserData(email, password, navigation);
    if (userData) {
      // Save email and password to AsyncStorage upon successful login
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);
      console.log("saved user data");
    }
  } catch (error) {
    console.error("Error handling user data:", error);
  }
};

export default handleUserData;
