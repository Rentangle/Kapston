import { StyleSheet } from "react-native";

const styles =StyleSheet.create({
    mainContainer:{
        backgroundColor:'white',
        flex:1
    },
    
    logoContainer: {
        justifyContent:'center',
        alignItems: 'center',
        paddingVertical:40
    },
    logo: {
        height: 260,
        width: 260,
        marginTop: 0,
    },
    text_footer: {
        color:'#05375a',
        fontSize: 18,
    },
    loginContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,     
    },
    header: {
        justifyContent:'flex-end',
        paddingHorizontal:20,
    },
    text_header: {
        color: '#420275',
        fontWeight:'bold',
        fontSize: 30,
    },
    inBut2: {
        backgroundColor:'#420475',
        height:40,
        width:150,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    bottomButton: {
        width:'50%',
        flexDirection: 'row',
        justifyContent:'space-between',
        
    },
    smallIcon2: {
        fontSize:40,
    },
    bottomText: {
        color: 'black',
        fontSize: 12,
        fontWeight:'600',
        marginTop: 5
    },
    forgotPassword: {
        justifyContent:'flex-end',
        alignItems: 'flex-end',
        marginTop:8,
        marginRight:10,
    },
    KeyboardAdjust: {
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
});

export default styles;
