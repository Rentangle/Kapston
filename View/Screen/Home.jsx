import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { Text, Card } from "react-native-paper";
import MyCarousel from "../Components/Carousel";
import { useNavigation } from "@react-navigation/native";
import Texts from "../Components/Text";
const { width, height } = Dimensions.get("screen");
const Home = () => {
  const navigation = useNavigation();

  const [index, setIndex] = React.useState(0);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Texts HeaderTextInput={"Our Services"} />
        </View>
        <View>
          <MyCarousel />
        </View>
        <View style={[styles.header, styles.secondHeader]}>
          <Texts HeaderTextInput={"Your Schedule"} />
        </View>
        <View style={styles.scheduleContainer}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "white",
  },
  header: {
    marginLeft: 10,
    left: 30,
    marginTop: 0,
  },
  secondHeader: {
    marginTop: 20,
  },
  scheduleContainer: {
    width: width * 0.8,
    height: height * 0.07,
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: "#d7d7d7",
    opacity: 50,
    elevation: 5,
  },
});

export default Home;
