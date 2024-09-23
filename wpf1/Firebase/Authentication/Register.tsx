import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { ToastAndroid } from "react-native";
// Define types for user details
interface UserDetails {
  fullname: string;
  age: number | string; // Adjust according to your needs
  address: string;
  phoneNumber: string;
  licenseNumber?: string; // Make this optional
  userType: 'Patient' | 'Doctor'; // Added userType field
}

// Function to create a user with email and password
export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  { fullname, age, address, phoneNumber, licenseNumber, userType }: UserDetails
): Promise<any> => {
  const db = firestore();

  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Prepare user data for Firestore
    const userData: any = {
      fullname,
      phoneNumber,
      age,
      address,
      email,
      uid: user.uid,
      userType: [],
    };

    // Add userType based on the provided userType value
    if (userType === 'Patient') {
      userData.userType.push('Patient');
    } else if (userType === 'Doctor') {
      userData.userType.push('Doctor');
      if (licenseNumber) {
        userData.licenseNumber = licenseNumber;
      }
    }

    // Save user details directly to Firestore
    await db.collection("users").doc(user.uid).set(userData);

    console.log("User registered and details saved.");
    
    // Send email verification
    await user.sendEmailVerification(); // Add this line to send verification email
    ToastAndroid.show("Verification Sended, Please check your Email.", ToastAndroid.SHORT);
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
