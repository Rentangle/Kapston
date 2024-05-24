import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { Color } from "../../GlobalStyles";
import Button from "./Button";
import Texts from "./Text";
export default function PopupSchedule({ visible, onClose, onSubmit }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.ModalShow}>
          <View style={styles.TreatmentTypeContainer}>
            <Text style={styles.TreatmentType}>Treatment Type</Text>
          </View>
          <View style={styles.Buttons}>
            <TouchableOpacity style={styles.Button}>
              <Text>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.Button}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ModalShow: {
    backgroundColor: "#f4f5f7",
  },
  Button: {
    width: 120,
    height: 35,
    marginTop: 20,
    paddingTop: 5,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#00bbf2",
  },
  TreatmentType: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  TreatmentTypeContainer: {},
});
