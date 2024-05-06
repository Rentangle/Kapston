import { View, Text,Image, Dimensions,StyleSheet } from "react-native"
import React from "react"

const{width, height}  =  Dimensions.get('screen');

export default function SlideItem ({item}) {
    return (
       <View style={styles.container}>
        <View style={styles.secondContainer}>
        <Image source={item.img}
        resizeMode="contain" style={styles.image}
        />
        
       <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
       </View>
       </View>
       </View>
      
    )
};
const styles = StyleSheet.create({
    container:{
        width,
        marginTop:40,
        height: height * .3,
        marginBottom:10,
        alignItems:'center'
    },
    image:{
        width:'50%',
        flex:0.6,
        bottom:100,
    },
    content:{
        flex:0.4,
        alignItems:'center'
        
    },
    title:{
        fontSize:24,
        fontWeight:'bold',
        color:'#333',
    }, 
    description:{
        fontSize:18,
        marginVertical:12,
        color:'#333',
    },
    secondContainer:{
        backgroundColor:"#e8def7",
        padding:50,
        elevation:5,
        borderRadius:20
    }
})

