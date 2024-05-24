import React from "react";
import { View, StyleSheet } from "react-native";
import { Provider as PaperProvider, FAB } from "react-native-paper";
import { SafeAreaView } from "react-native";
const ActionButton = ({ onPress }) => {
  return <FAB icon="plus" style={styles.fab} onPress={onPress} />;
};

const styles = StyleSheet.create({
  fab: {
    width: 60,
    backgroundColor: "#00bbf2",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    marginLeft: 280,
    marginTop: 510,
  },
});

export default ActionButton;
