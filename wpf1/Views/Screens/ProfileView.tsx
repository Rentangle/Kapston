import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Button, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { uploadImage, getBackgroundImageUrl, getProfileImageUrl } from '../../Firebase/Storage/Profile';
import * as ImagePicker from 'expo-image-picker';
import auth from '@react-native-firebase/auth';

const { width } = Dimensions.get('window');

const ProfilePage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
      loadImages();
    } else {
      Alert.alert('No user is logged in');
    }
  }, []);

  const loadImages = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const backgroundUrl = await getBackgroundImageUrl();
      const profileUrl = await getProfileImageUrl();

      setBackgroundImage(backgroundUrl);
      setProfileImage(profileUrl);
    } catch (error) {
      console.error('Error loading images:', error);
      Alert.alert('Error', 'Failed to load images. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const pickImage = async (type: 'background' | 'profile') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const fileName = type === 'background' ? `${userId}_background.jpg` : `${userId}_profile.jpg`;
      try {
        const uploadedUrl = await uploadImage(result.assets[0].uri, type);
        console.log('Uploaded URL:', uploadedUrl);
        loadImages(); // Reload images after upload
      } catch (error) {
        Alert.alert('Upload Error', 'Failed to upload image. Please try again.');
      }
    }
  };

  const handleEditProfile = (type: 'background' | 'profile') => {
    pickImage(type);
  };

  return (
    <View style={styles.container}>
      {loading ? ( // Show loading indicator while images are being fetched
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* Background Image */}
          <Image source={{ uri: backgroundImage }} style={styles.backgroundImage} />
          
          {/* Profile Picture */}
          <View style={styles.profileContainer}>
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
            <Text style={styles.name}>Your Name</Text>
          </View>

          <Button title="Change Background" onPress={() => handleEditProfile('background')} />
          <Button title="Change Profile Picture" onPress={() => handleEditProfile('profile')} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center', // Center items horizontally
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: 200,
    opacity: 0.7,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProfilePage;
