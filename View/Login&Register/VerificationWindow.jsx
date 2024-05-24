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

const ModalComponent = ({ visible, onClose, onSubmit }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = () => {
    onSubmit(verificationCode);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalText}>Verify Phone Number</Text>
          <TextInput
            placeholder="Enter Code"
            placeholderTextColor="grey"
            style={modalStyles.input}
            value={verificationCode}
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity>
            <Text style={modalStyles.resend}> Resend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={modalStyles.button} onPress={handleSubmit}>
            <Text style={modalStyles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
            <Text style={modalStyles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 30,
    padding: 50,
    alignItems: "center",
    elevation: 200,
  },
  modalText: {
    paddingBottom: 50,
    textAlign: "center",
    fontSize: 30,
    color: Color.colorMediumpurple_100,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    width: "200%",
    borderColor: Color.colorMediumpurple_200,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 60,
  },
  button: {
    backgroundColor: "#420475",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#420475",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resend: {
    bottom: 10,
    left: 50,
    color: Color.colorMediumpurple_100,
    paddingBottom: 30,
  },
});
