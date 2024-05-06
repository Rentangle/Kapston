import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import { Text, Card} from 'react-native-paper';
import MyCarousel from '../Components/Carousel';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const Home = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook

  const [index, setIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <View>
        <Text> Our Services</Text>
      </View>
      <View>
        <MyCarousel />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3eef5",
  },
  welcomeContainer: {
    paddingLeft: 50,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  welcomeTextContainer: {
    flexDirection: 'column',
  },
  welcomeText: {
    fontSize: 20,
    color: 'black', // text color
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
  },
  carouselItem: {
    backgroundColor: "#e8def7",
    width: 280,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Home;
