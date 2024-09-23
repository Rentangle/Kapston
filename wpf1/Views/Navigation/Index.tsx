import React, { useState, useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import HomeView from '../Screens/HomeView';
import MessagesView from '../Screens/MessagesView';
import ProfileView from '../Screens/ProfileView';
import SchedulesView from '../Screens/SchedulesView';
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import firestore from '@react-native-firebase/firestore';

const Tab = createBottomTabNavigator();

const Index: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const lottieRef = useRef<LottieView | null>(null);
  const [badgeCount, setBadgeCount] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  // Function to increment badge count and play Lottie animation
  const incrementBadge = () => {
    const newCount = badgeCount + 1;
    setBadgeCount(newCount);
    setAutoPlay(true);

    // Play the Lottie animation
    if (lottieRef.current) {
      console.log('Playing Lottie animation');
      lottieRef.current.play();
    } else {
      console.log('Lottie ref is not defined');
    }

    // Reset autoPlay to false after 1 second
    setTimeout(() => {
      setAutoPlay(false);
    }, 2000);
    console.log('Badge incremented. Current count:', newCount);
  };

  // Listen to Firestore changes
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('appointments')
      .onSnapshot((querySnapshot) => {
        console.log('Snapshot received:', querySnapshot);
        
        // Count how many documents are currently pending
        const pendingDocs = querySnapshot.docs.filter(doc => doc.data().status === "PENDING");
  
        if (!querySnapshot.empty) {
          querySnapshot.docChanges().forEach((change) => {
            if (change.type === "modified") {
              const notificationData = change.doc.data();
              if (notificationData.status === "ACCEPTED") {
                console.log('Notification updated to ACCEPTED:', notificationData);
                incrementBadge();
              }
            }
          });
        } else {
          console.error('No notifications found.');
        }
      }, (error) => {
        console.error("Error listening to Firestore:", error);
      });
  
    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);
  
  // Header right component for notifications
  const HeaderRight = () => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('Notification')} 
      style={styles.headerRight}
    >
      <LottieView
        ref={lottieRef}
        source={{ uri: 'https://lottie.host/52a5bb77-176f-4f16-a03b-7020b4af670d/tYR5J4hmsD.json' }} 
        style={styles.notificationIcon}
        autoPlay={autoPlay}
        loop={false}
      />
      {badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: true,
    headerStyle: {
      backgroundColor: "#19a7c5",
      elevation: 5,
    },
    headerRight: () => <HeaderRight />,
    tabBarStyle: {
      backgroundColor: "white",
      height: 80,
    },
  };

  return (
    <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <Entypo name="home" size={24} color={focused ? "black" : "#00bbf2"} />
              <Text style={styles.tabLabel}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <AntDesign name="user" size={24} color={focused ? "black" : "#00bbf2"} />
              <Text style={styles.tabLabel}>Profile</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Schedules"
        component={SchedulesView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <AntDesign name="calendar" size={24} color={focused ? "black" : "#00bbf2"} />
              <Text style={styles.tabLabel}>Schedule</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesView}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabIconContainer}>
              <AntDesign name="message1" size={24} color={focused ? "black" : "#00bbf2"} />
              <Text style={styles.tabLabel}>Messages</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#16247d",
  },
  headerRight: {
    marginRight: 15,
    position: 'relative',
  },
  notificationIcon: {
    width: 40,
    height: 40,
  },
  badge: {
    position: 'absolute',
    right: 10,
    top: 5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Index;
