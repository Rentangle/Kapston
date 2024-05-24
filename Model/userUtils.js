import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const checkUserData = async (email, password, navigation) => {
  try {
    if (!email || !password) {
      // Show toast messages for empty fields
      if (!email) {
        ToastAndroid.show("Please Enter your Email", ToastAndroid.SHORT);
      }
      if (!password) {
        ToastAndroid.show("Please Enter your Password", ToastAndroid.SHORT);
      }
      return false;
    }

    const usersSnapshot = await firestore()
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!usersSnapshot.empty) {
      let userDoc = null;

      // Check each document to find the one with the matching password
      usersSnapshot.forEach((doc) => {
        if (doc.data().password === password) {
          userDoc = doc;
        }
      });

      if (userDoc) {
        const user = userDoc.data();
        const uid = userDoc.id; // Get the uid of the user
        const fullname = user.fullname;
        const userEmail = user.email;

        ToastAndroid.show(`Welcome ${fullname}`, ToastAndroid.SHORT);

        // Navigate to the homepage (Main screen) with uid as a parameter
        navigation.navigate("Main", { uid }); // Pass the uid as a parameter

        const currentUser = auth().currentUser;
        console.log(user);
        usersSnapshot.forEach((doc) => {
          currentUser.updateProfile({
            displayName: fullname,
          });
          currentUser.updateEmail(email);
        }); // Add a closing parenthesis here
        console.log(currentUser);
        return true;
      } else {
        // Password does not match for the found email
        ToastAndroid.show(
          "Email or Password is incorrect!",
          ToastAndroid.SHORT
        );
        return false;
      }
    } else {
      // No user found with the given email
      ToastAndroid.show("Email or Password is incorrect!", ToastAndroid.SHORT);
      return false;
    }
  } catch (error) {
    console.error("Error checking user data:", error);
    ToastAndroid.show(
      "An error occurred. Please try again later.",
      ToastAndroid.SHORT
    );
    return false;
  }
};

export default checkUserData;
