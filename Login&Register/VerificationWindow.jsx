import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import modalStyles from './modalStyle';

const ModalComponent = ({ visible, onClose, onSubmit }) => {
  const [verificationCode, setVerificationCode] = useState("");

  const handleSubmit = () => {
    // Call onSubmit with the entered verificationCode
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
