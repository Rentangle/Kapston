import firestore from "@react-native-firebase/firestore";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const checkUserData = async (email, password, navigation) => {
  try {
    const usersSnapshot = await firestore()
      .collection("users")
      .where("email", "==", email)
      .where("password", "==", password)
      .get();

    if (!usersSnapshot.empty) {
      // If there's a match, user with given email and password exists
      const userDoc = usersSnapshot.docs[0]; // Assuming there's only one user with this email and password
      const user = userDoc.data();
      const uid = userDoc.id; // Get the uid of the user

      // Storing user credentials in AsyncStorage
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);

      ToastAndroid.show(`Welcome ${email}`, ToastAndroid.SHORT);

      // Navigate to the homepage (Main screen) with uid as a parameter
      navigation.navigate("Main", { uid }); // Pass the uid as a parameter

      return true;
    } else if (email === "" || password === "") {
      // Show toast messages for empty fields
      if (password === "") {
        ToastAndroid.show("Please Enter your Password", ToastAndroid.SHORT);
      }
      if (email === "") {
        ToastAndroid.show("Please Enter your Email", ToastAndroid.SHORT);
      }
      return false;
    } else {
      // No user found with the given email and password
      ToastAndroid.show("Email or Password is incorrect!", ToastAndroid.SHORT);
      return false;
    }
  } catch (error) {
    console.error("Error checking user data:", error);
  }
};

export default checkUserData;
