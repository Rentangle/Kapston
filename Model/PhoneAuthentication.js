import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { handleHashedPassword } from "./EncryptModel";
export const signInWithPhoneNumber = async (
  setConfirm,
  setShowFloatingWindow,
  phoneNumber
) => {
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
    setShowFloatingWindow(true);
    console.log("Phone number sent for verification:", phoneNumber);
  } catch (error) {
    console.error("Error sending verification code:", error);
  }
};

export const confirmCode = async (
  code,
  confirm,
  fullname,
  age,
  gender,
  phoneNumber,
  email,
  passwords,
  navigation
) => {
  const password = await handleHashedPassword(passwords);
  try {
    const userCredential = await confirm.confirm(code);
    const user = userCredential.user;
    await firestore().collection("users").doc().set({
      fullname,
      phoneNumber,
      age,
      gender,
      email,
      password,
    });

    console.log(
      "Details are saved: " +
        fullname +
        " " +
        phoneNumber +
        " " +
        email +
        " " +
        newPassword
    );
    navigation.navigate("Login");
  } catch (error) {
    console.error("Error:", error.code, error.message, error.stack);
  }
};
