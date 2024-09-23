import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, Animated, TouchableOpacity } from 'react-native';
import Lottie from 'lottie-react-native';

interface VerificationScreenProps {
    text: string;
    url: string;
    visible: boolean;
    onClose: () => void; // Function to close the modal
}

const VerificationScreens: React.FC<VerificationScreenProps> = ({ text, url, visible, onClose }) => {
    const slideAnim = useRef(new Animated.Value(-300)).current; // Start position off-screen

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: -300,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onClose(); // Call the onClose function after the animation
        });
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="none" // Disable default modal animation
        >
            <View style={styles.overlay}>
                <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]}>
                    <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                        <Text style={styles.closeText}>✖</Text>
                    </TouchableOpacity>
                    <Lottie 
                        source={{ uri: url }} // Adjust the path to your Lottie animation
                        autoPlay
                        loop={false}
                        style={styles.lottieAnimation}
                    />
                    <Text style={styles.message}>{text}</Text>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
        elevation: 5,
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
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        zIndex: 1,
    },
    closeText: {
        fontSize: 30,
        color: '#420475',
    },
});

export default VerificationScreens;
