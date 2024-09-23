import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Lottie from 'lottie-react-native';

const NotVerified: React.FC = ({}) => {
    return (
        <View style={styles.container}>
            <Lottie 
                source={require('./path/to/your/animation.json')} // Adjust the path to your Lottie animation
                autoPlay
                loop={false}
                style={styles.lottieAnimation}
            />
            <Text style={styles.message}>Please Verify your Email.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    lottieAnimation: {
        width: 200,
        height: 200,
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        color: '#420475',
    },
});

export default NotVerified;
