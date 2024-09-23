import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
import { ComboBox } from "../Components/Component";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

interface PopupScheduleProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: ScheduleData) => void;
}

interface ScheduleData {
  date: string;
  fullname: string;
  services: string;
  location: string;
  createdAt: string;
  status: string; // Add status to the interface
}

const PopupSchedule: React.FC<PopupScheduleProps> = ({
  visible,
  onClose,
  onSave,
}) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [date, setDate] = useState("");
  const [fullname, setFullname] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("GroveByRockwell");

  const services = [
    { label: "Service 1", value: "service1" },
    { label: "Service 2", value: "service2" },
    { label: "Service 3", value: "service3" },
  ];

  const locations = [
    { label: "ShineResidences", value: "ShineResidences" },
    { label: "GroveByRockwell", value: "GroveByRockwell" },
    { label: "RockwellBusinessCenter", value: "RockwellBusinessCenter" },
  ];

  const handleDateChange = (dateString: string): void => {
    setDate(dateString);
    setIsCalendarVisible(false);
  };

  const addAppointment = async (scheduleData: ScheduleData) => {
    const user = auth().currentUser;
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    try {
      await firestore()
        .collection("appointments")
        .add({
          ...scheduleData,
          uid: user.uid, // Add user ID to the appointment
          status: "PENDING", // Set status to PENDING by default
        });
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  const handleSubmit = async () => {
    const now = new Date();
    const scheduleData: ScheduleData = {
      fullname,
      date,
      services: selectedService,
      location: selectedLocation,
      createdAt: now.toISOString(),
      status: "PENDING", // Ensure status is included
    };

    await addAppointment(scheduleData);
    onSave(scheduleData);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalShow}>
          <Text style={styles.treatmentType}>Add an Appointment</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Fullname"
              value={fullname}
              onChangeText={setFullname}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setIsCalendarVisible(true)}
              style={styles.dateInputContainer}
            >
              <TextInput
                placeholder="Date MM/DD/YY"
                value={date}
                editable={false}
                style={styles.dateInput}
              />
              <AntDesign name="calendar" size={20} color="#000" style={styles.icon} />
            </TouchableOpacity>
            <ComboBox
              selectedValue={selectedService}
              onValueChange={setSelectedService}
              items={services}
              placeholder="Select Service"
            />
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Select Location:</Text>
              <ComboBox
                selectedValue={selectedLocation}
                onValueChange={setSelectedLocation}
                items={locations}
                placeholder="Select Location"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          transparent={true}
          visible={isCalendarVisible}
          onRequestClose={() => setIsCalendarVisible(false)}
        >
          <View style={styles.calendarContainer}>
            <View style={styles.calendarContent}>
              <Calendar
                onDayPress={(day: { dateString: string }) =>
                  handleDateChange(day.dateString)
                }
                markedDates={{ [date]: { selected: true, marked: true } }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalShow: {
    backgroundColor: "#f4f5f7",
    width: 330,
    height: "80%",
    borderRadius: 20,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    width: 120,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#00bbf2",
  },
  buttonText: {
    color: "#fff",
  },
  treatmentType: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 30,
    alignSelf: "center",
    width: 250,
  },
  dateInputContainer: {
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#420475",
    borderRadius: 10,
    alignItems: "center",
  },
  dateInput: {
    width: "85%",
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  pickerContainer: {
    marginTop: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#000",
  },
  calendarContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  calendarContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  input: {
    height: 40,
    borderColor: "#420475",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  comboBox: {
    marginTop: 20,
  },
});

export default PopupSchedule;
