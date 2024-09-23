import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Animated, PanResponder, TouchableWithoutFeedback, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  isOnline: boolean;
}

interface Message {
  text: string;
  uid: string;
  doctorUid?: string; // Add doctor UID to the message
}

const MessagesView = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [doctors] = useState<Doctor[]>([
    { id: '1', name: 'Dr. Smith', specialty: 'General Practitioner', isOnline: true },
    { id: '2', name: 'Dr. Jane', specialty: 'Pediatrician', isOnline: false },
    { id: '3', name: 'Dr. Lee', specialty: 'Dermatologist', isOnline: true },
  ]);

  const slideAnim = useRef(new Animated.Value(-250)).current;
  const [isVisible, setIsVisible] = useState(false);

  const currentUser = auth().currentUser;
  const currentUserUid = currentUser ? currentUser.uid : '';

  useEffect(() => {
    if (!currentUserUid) return;

    const unsubscribe = firestore()
      .collection('messages')
      .doc(currentUserUid)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const data = doc.data();
          const messageArray = data?.messages || [];
          setMessages(messageArray);
        }
      });

    return () => unsubscribe();
  }, [currentUserUid]);

  const MAX_DOCUMENT_SIZE = 1000 * 1024; // 1MB in bytes

  const handlePress = async (doctorUid: string) => {
    if (message.trim()) {
      const newMessage = { text: message, uid: currentUserUid, doctorUid }; // Store message with doctor UID
      const updatedMessages = [...messages, newMessage];
  
      const userDocRef = firestore().collection('messages').doc(currentUserUid);
      
      const doc = await userDocRef.get();
      
      if (doc.exists) {
        const data = doc.data();
        const existingMessages = data?.messages || [];
  
        const allMessages = [...existingMessages, newMessage];
        const allMessagesSize = JSON.stringify(allMessages).length;
  
        if (allMessagesSize > MAX_DOCUMENT_SIZE) {
          const newDocRef = firestore().collection('messages').doc(`${currentUserUid}_${Date.now()}`);
          await newDocRef.set({
            messages: [newMessage],
            timestamp: firestore.FieldValue.serverTimestamp(),
          });
        } else {
          await userDocRef.set({
            messages: allMessages,
            timestamp: firestore.FieldValue.serverTimestamp(),
          });
        }
      } else {
        await userDocRef.set({
          messages: [newMessage],
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      }
  
      setMessage('');
    }
  };

  const toggleDoctors = () => {
    setIsVisible((prev) => !prev);
    Animated.timing(slideAnim, {
      toValue: isVisible ? -250 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderMessageItem = (message: Message) => (
    <View style={[styles.messageBubble, message.uid === currentUserUid ? styles.userBubble : styles.doctorBubble]}>
      <Text style={styles.messageText}>{message.text}</Text>
    </View>
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > 20 && gestureState.dx > 0,
      onPanResponderRelease: () => {
        toggleDoctors();
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <ScrollView style={styles.messageList}>
        {messages.map((msg, index) => renderMessageItem(msg))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        {doctors.map((doctor) => (
          <Button key={doctor.id} title={`Send to ${doctor.name}`} onPress={() => handlePress(doctor.id)} />
        ))}
      </View>

      {isVisible && (
        <TouchableWithoutFeedback onPress={toggleDoctors}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}

      <Animated.View style={[styles.doctorContainer, { transform: [{ translateX: slideAnim }] }]}>
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.doctorItem}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
              <Text style={[styles.statusText, item.isOnline ? styles.online : styles.offline]}>
                {item.isOnline ? 'Online' : 'Offline'}
              </Text>
            </TouchableOpacity>
          )}
          style={styles.doctorList}
        />
        <Button title="Close" onPress={toggleDoctors} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#e1ffc7',
    marginLeft: 50, // Add some margin for better spacing
  },
  doctorBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#d7e8fc',
    marginRight: 50, // Add some margin for better spacing
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  doctorContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    height: '100%',
    width: 250, // Adjusted width
  },
  doctorItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#777',
  },
  statusText: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  online: {
    color: 'green',
  },
  offline: {
    color: 'red',
  },
  doctorList: {
    maxHeight: '80%', // Make sure the list takes most of the space
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});

export default MessagesView;
