import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import Calendars, { ActionButton } from "../Components/Calendars";
import PopupSchedule from "../Components/PopupSchedule";
import { fetchAppointments } from '../../Firebase/Authentication/Schedule';
import auth from "@react-native-firebase/auth";

interface ScheduleData {
  id: string;
  date: string;
  fullname: string;
  services: string;
  location: string;
  status: string; // Added status to the interface
  createdAt: string;
  uid: string;
}

const SchedulesView: React.FC = () => {
  const [appointments, setAppointments] = useState<ScheduleData[]>([]);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const user = auth().currentUser;
        if (user) {
          const fetchedAppointments = await fetchAppointments(user.uid);
          const formattedAppointments = fetchedAppointments.map((appointment: any) => ({
            id: appointment.id,
            date: appointment.date,
            fullname: appointment.name,
            services: appointment.services,
            location: appointment.location,
            status: appointment.status, // Ensure status is fetched properly
            createdAt: appointment.createdAt, // Fetch the correct createdAt value
            uid: appointment.uid,
          }));
          setAppointments(formattedAppointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to load appointments. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getAppointments();
  }, []);

  const handleSave = (data: Omit<ScheduleData, 'id'>) => {
    const newAppointment = {
      ...data,
      id: `${Date.now()}`, // Generating a unique ID
      status: 'PENDING', // Default status for a new appointment
      createdAt: new Date().toISOString(), // Assign the current date/time as createdAt
    };
    setAppointments([...appointments, newAppointment]);
    setPopupVisible(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00bbf2" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Map ScheduleData to the Appointment type before passing to Calendars
  const appointmentDataForCalendar = appointments.map(appointment => ({
    id: appointment.id,
    name: appointment.fullname, // Converting fullname to name
    date: appointment.date,
    services: appointment.services,
    status: appointment.status, // Pass the actual status from the data
    location: appointment.location,
  }));

  return (
    <View style={styles.container}>
      <Calendars appointments={appointmentDataForCalendar} />
      <ActionButton onPress={() => setPopupVisible(true)} />
      <PopupSchedule
        visible={isPopupVisible}
        onClose={() => setPopupVisible(false)}
        onSave={(data) =>
          handleSave({ ...data, uid: auth().currentUser?.uid || '' })
        } // Ensure uid is added and passing the data correctly
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default SchedulesView;
