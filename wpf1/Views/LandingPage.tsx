import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { Bar } from 'react-native-progress';
import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase/app'; // Adjust based on your Firebase setup

interface LandingPageProps {
  navigation: StackNavigationProp<any>;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading process (e.g., checking Firebase and app resources)
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + 0.1, 1); // Cap progress at 1
        if (newProgress >= 1) {
          clearInterval(interval);
          setIsLoaded(true);
        }
        return newProgress;
      });
    }, 500);

    // Check Firebase and resources
    checkResources();

    return () => clearInterval(interval);
  }, []);

  const checkResources = async () => {
    try {
      // Example Firebase check
      await firebase.initializeApp(); // Ensure Firebase is initialized
      // Perform additional checks (e.g., loading config files, assets)
    } catch (error) {
      console.error("Error initializing resources:", error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      navigation.navigate('Login');
    }
  }, [isLoaded, navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../Assets/Animation.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
        <Bar 
          progress={progress} 
          width={null} 
          color="#19a7c5" 
          style={{ height: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {
    width: 300,
    height: 300,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
    alignSelf: 'center',
  },
  progressText: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 16,
    color: '#16247d',
  },
});

export default LandingPage;
