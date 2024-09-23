import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import { ToastAndroid } from 'react-native';

const login = async (email: string, password: string, navigation: any) => {
  try {
    if (!email || !password) {
      if (!email) {
        ToastAndroid.show("Please Enter your Email", ToastAndroid.SHORT);
      }
      if (!password) {
        ToastAndroid.show("Please Enter your Password", ToastAndroid.SHORT);
      }
      return false;
    }

    // Sign in with Firebase Authentication
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Check if the user is verified
    if (!user.emailVerified) {
      ToastAndroid.show("Please verify your email before logging in.", ToastAndroid.SHORT);
      return false;
    }

    // Fetch user data from Firestore
    const userDoc = await firestore().collection('users').doc(user.uid).get();
    
    if (!userDoc.exists) {
      ToastAndroid.show("User not found in the database.", ToastAndroid.SHORT);
      return false;
    }

    const userData = userDoc.data();

    // Check if userData is defined
    if (!userData) {
      ToastAndroid.show("User data is not available.", ToastAndroid.SHORT);
      return false;
    }

    // Check user type
    if (userData.userType && (userData.userType.includes('Doctor') || userData.userType.includes('Patient'))) {
      // Navigate based on user type
     
        navigation.navigate("Main", { uid: user.uid }); // Adjust to your specific screen

    } else {
      ToastAndroid.show("User type not recognized.", ToastAndroid.SHORT);
      return false;
    }

    ToastAndroid.show(`Welcome ${user.displayName || user.email}`, ToastAndroid.SHORT);

    return true;
  } catch (error: any) {
    if (error.code === "auth/wrong-password") {
      ToastAndroid.show("Incorrect password. Please try again.", ToastAndroid.SHORT);
    } else if (error.code === "auth/user-not-found") {
      ToastAndroid.show("No user found with this email.", ToastAndroid.SHORT);
    } else {
      console.error("Error logging in:", error);
      ToastAndroid.show("An error occurred. Please try again later.", ToastAndroid.SHORT);
    }
    return false;
  }
};

export default login;

export const forgotPassword = async (email: string, navigation: any): Promise<void> => {
  try {
    // Send password reset email
    await auth().sendPasswordResetEmail(email);

    const user = await auth().currentUser; // Get the current user

    if (user && user.emailVerified) {
      navigation.navigate('passwordReset'); // Navigate to the reset password screen if verified
    }
  } catch (error) {
    ToastAndroid.show('Error sending verification mail', ToastAndroid.SHORT);
  }
};
