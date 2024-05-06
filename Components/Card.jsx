import React from "react";
import { Text, StyleSheet } from "react-native";
import { Card as PaperCard } from "react-native-paper";

const MyCard = ({ item }) => {
    return (
        <PaperCard style={styles.carouselItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.description}</Text>
        </PaperCard>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
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
});

export default MyCard;
