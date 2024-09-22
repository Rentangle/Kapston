import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const App = () => {
  const handlePress = () => {
    alert('Button Pressed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HomeViewApp</Text>
      <Text style={styles.subtitle}>This is your home view!</Text>
      <Button title="Press Me" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default App;
