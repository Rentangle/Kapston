import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

/**
 * Uploads an image to Firebase Storage and returns the download URL.
 * @param uri - The local URI of the image to upload.
 * @param type - The type of image ('background' or 'profile').
 * @returns The download URL of the uploaded image.
 */
export const uploadImage = async (uri: string, type: 'background' | 'profile') => {
  const currentUser = auth().currentUser;

  if (!currentUser) {
    throw new Error('No user is logged in');
  }

  const fileName = `${currentUser.uid}_${type}.jpg`; // Generate filename based on UID and type

  try {
    const reference = storage().ref(fileName);
    await reference.putFile(uri); // Upload the image
    const url = await reference.getDownloadURL(); // Get the download URL
    return url; // Return the download URL
  } catch (error) {
    console.error('Error uploading image:', error);
    Alert.alert('Upload Error', 'Failed to upload image. Please try again.');
    throw error; // Rethrow the error for handling in the calling component
  }
};

/**
 * Fetches the download URL for a specific background image.
 * @returns The download URL for the background image.
 */
export const getBackgroundImageUrl = async () => {
  const currentUser = auth().currentUser;

  if (!currentUser) {
    throw new Error('No user is logged in');
  }

  const path = `${currentUser.uid}_background.jpg`;

  try {
    return await storage().ref(path).getDownloadURL();
  } catch (error) {
    console.error('Error fetching background image URL:', error);
    throw error;
  }
};

/**
 * Fetches the download URL for a specific profile image.
 * @returns The download URL for the profile image.
 */
export const getProfileImageUrl = async () => {
  const currentUser = auth().currentUser;

  if (!currentUser) {
    throw new Error('No user is logged in');
  }

  const path = `${currentUser.uid}_profile.jpg`;

  try {
    return await storage().ref(path).getDownloadURL();
  } catch (error) {
    console.error('Error fetching profile image URL:', error);
    throw error;
  }
};
