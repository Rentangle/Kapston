import { View, Text, Image, StyleSheet } from "react-native"
import React from "react"
import TopDesign from '../assets/LoginandRegisterAssets/topDesign.png'
import BottomDesign from '../assets/LoginandRegisterAssets/bottomDesign.png'
import shineDesign from '../assets/LoginandRegisterAssets/shineDesign.png'
export default function AddedTopDesign() {
    return (
    <View>
       <View style={styles.TopContainer}>
            <Image source={TopDesign} style={styles.image}  />
       </View>
       <View style={styles.bottomContainer}>
            <Image source={TopDesign} style={styles.image2} />
       </View>
       <View style={styles.bottomContainer}>
            <Image source={shineDesign} style={styles.image3} />
       </View>
    </View>
    )
};

const styles = StyleSheet.create({
    TopContainer:{
        width:0,
        height:10,
        zIndex:1
    },
    bottomContainer:{
        width:0,
        height:0,
    },
    image2:{
        top:650,
        left:200,
    },
    image3:{
        top:600,
    },
    image:{
        bottom:260,
        left:170,
        borderRadius:300,
        height:450,
        width:500
    }
  });
  


