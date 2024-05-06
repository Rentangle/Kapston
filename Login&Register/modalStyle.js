import { StyleSheet } from "react-native";

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 50,
        alignItems: 'center',
        elevation: 200,
    },
    modalText: {
        paddingBottom:50,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        width: '200%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius:10,
        marginBottom: 20,
        paddingHorizontal: 60,
    },
    button: {
        backgroundColor: '#420475',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        width: '100%',
        borderRadius:10,
        paddingHorizontal:30,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#420475',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
        width: '100%',
        borderRadius:10,
        paddingHorizontal:30,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resend: {
        bottom:10,
        left:50,
        color:"blue",
        paddingBottom:30,
    },
});

export default modalStyles;