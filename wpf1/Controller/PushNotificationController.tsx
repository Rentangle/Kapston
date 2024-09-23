import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const PushNotification: React.FC = () => {
  const requestPermissions = async (): Promise<boolean> => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization Status:', authStatus);
    }
    
    return enabled;
  };

  useEffect(() => {
    const checkPermissions = async () => {
      const hasPermission = await requestPermissions();
      if (hasPermission) {
        messaging().getToken().then((token) => console.log(token));
      } else {
        console.log('Permission not granted');
      }
    };

    checkPermissions();

    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('Notification caused app to open from background state', remoteMessage.notification);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in background', remoteMessage.notification);
    });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View>
    </View>
  );
};

export default PushNotification;
