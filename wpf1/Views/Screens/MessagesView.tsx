import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, TouchableOpacity, Animated } from 'react-native';

// Define types for the doctor and message
interface Message {
  id: string;
  text: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

const MessagesView = () => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello!' },
    { id: '2', text: 'How are you?' },
  ]);
  const [doctors] = useState<Doctor[]>([
    { id: '1', name: 'Dr. Smith', specialty: 'General Practitioner' },
    { id: '2', name: 'Dr. Jane', specialty: 'Pediatrician' },
    { id: '3', name: 'Dr. Lee', specialty: 'Dermatologist' },
  ]);

  const slideAnim = useRef(new Animated.Value(-250)).current; // Start hidden to the left
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility

  const handlePress = () => {
    if (message.trim()) {
      setMessages([...messages, { id: String(messages.length + 1), text: message }]);
      setMessage('');
    }
  };

  const toggleDoctors = () => {
    setIsVisible(!isVisible);
    Animated.timing(slideAnim, {
      toValue: isVisible ? -250 : 0, // Toggle between visible and hidden
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const renderDoctorItem = ({ item }: { item: Doctor }) => (
    <TouchableOpacity style={styles.doctorItem}>
      <Text style={styles.doctorName}>{item.name}</Text>
      <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Button title="See Available Doctors" onPress={toggleDoctors} />
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={handlePress} />
      </View>

      <Animated.View style={[styles.doctorContainer, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={styles.doctorTitle}>Available Online Doctors</Text>
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id}
          renderItem={renderDoctorItem}
          style={styles.doctorList}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#19a7c5',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageBubble: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
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
    top: 80, // Adjust this value to position it below the header
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  doctorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
  doctorList: {
    maxHeight: 150,
  },
});

export default MessagesView;
