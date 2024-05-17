import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles =StyleSheet.create({
    mainContainer:{
        backgroundColor:'white',
        flex:1,
    },
    schedView:{
        top:10,
        height: windowHeight * .27,
        paddingHorizontal: windowWidth * 0,
        borderRadius:7,
        marginLeft:windowWidth * .09,
        marginRight:windowWidth * .09,
        marginTop:windowHeight * .06,
        backgroundColor:"#5569f0",
       
    },
    SchedText: {
        fontSize:20,
        color:"white",
        paddingTop:windowHeight * .04,
        fontWeight:"bold",
        paddingLeft: windowWidth * .17,
    },
    openHour:{
        fontSize:15,
        color:"white",
        paddingTop:windowHeight * .02,
        fontWeight:"bold",
        paddingLeft: windowWidth * .04,
    },
    bookButton: {
        backgroundColor:"#596fff",
        borderRadius:10,
        width: windowWidth * .3,
        height: windowHeight * .06,
        alignItems:"center",
        marginTop: windowHeight * .05,
        left:windowWidth * .1,
    },
    textBookButton:{
        fontSize:18,
        color:"white",
        paddingTop:windowHeight * .01,
        fontWeight:"bold"
    }
});

export default styles;