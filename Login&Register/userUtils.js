import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';
const checkUserData = async (email, password, navigation) => {
  try {
    const usersSnapshot = await firestore()
      .collection('users')
      .where('email', '==', email)
      .where('password', '==', password)
      .get();

    if (!usersSnapshot.empty) {
      // If there's a match, user with given email and password exists
      navigation.navigate("Main");
      ToastAndroid.show(`Welcome ${email}`, ToastAndroid.SHORT);
      
    } else if (email == "" || password == "") {
      // Show toast messages for empty fields
      if (password == "") {
        ToastAndroid.show("Please Enter your Password", ToastAndroid.SHORT);
      } 
      if (email == "") {
        ToastAndroid.show("Please Enter your Email", ToastAndroid.SHORT);
      }
    } else {
      // No user found with the given email and password
      ToastAndroid.show("Email or Password is incorrect!", ToastAndroid.SHORT);
    }
  } catch (error) {
    console.error('Error checking user data:', error);
  }
};


export default checkUserData;
