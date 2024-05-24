import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { ToastAndroid } from "react-native";
import bcrypt from "react-native-bcrypt";
export const signInWithPhoneNumberAndPassword = async (phone, password) => {
  try {
    const userSnapShot = await firestore().collection("users").doc(phone).get();
    if (!userSnapShot.exists) {
      ToastAndroid.show("Phone Number Does not Exist", ToastAndroid.SHORT);
    }
    const UserData = userSnapShot.data();
    const isPasswordValid = bcrypt.compareSync();
  } catch (error) {
    console.log("error in SignInModel.js " + error);
  }
};
