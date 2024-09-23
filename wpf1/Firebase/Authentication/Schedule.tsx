import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

interface Appointment {
  id: string; // Include an id field if you need it
  name: string;
  date: string;
  services: string;
  status: string;
  location: string;
  uid: string; // Assuming you have a uid field in your documents
}

export const fetchAppointments = async (uid: string): Promise<Appointment[]> => {
  try {
    const snapshot = await firestore()
      .collection('appointments')
      .where('uid', '==', uid) // Match appointments to the specified user's UID
      .get();

    const appointments: Appointment[] = snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Appointment, 'id'>), // Exclude id from the spread
    }));

    return appointments;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
};
