import * as Yup from 'yup';
import { PatientModel } from '../Model/PatientModel';
import { DoctorModel } from '../Model/DoctorModel';
import { registerWithEmailAndPassword } from '../Firebase/Authentication/Register';


// Patient registration validation schema
export const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    address: Yup.string().required('Address is required'),
    age: Yup.number()
        .required('Age is required')
        .positive('Age must be a positive number')
        .integer('Age must be an integer'), // Validate that age is a positive integer
    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^[0-9]+$/, 'Phone number must be digits'), // Ensure phone number is numeric
});



// Email registration validation schema
export const emailValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match') // Ensures passwords match
        .required('Confirm password is required'),
    userType: Yup.string().required('User type is required'),
    doctorId: Yup.string().required('DoctorId is required')
});

//#region 

// PatientController.ts

export class PatientController {
    private patient: PatientModel | null = null;

    // Method to create a new patient model
    createPatient(name: string, address: string, age: number | string, phoneNumber: string) {
        this.patient = new PatientModel(name, address, age, phoneNumber);
    }

    // Method to retrieve patient data
    getPatient() {
        return this.patient;
    }

    // Method to clear patient data (if needed)
    clearPatient() {
        this.patient = null;
    }
}


//#endregion


//#region 

export class DoctorController {
    private doctor: DoctorModel;

    constructor(name: string, address: string, age: number | string, phoneNumber: string, licenseNumber: string) {
        this.doctor = new DoctorModel(name, address, age, phoneNumber, licenseNumber);
    }

    public async registerDoctor(email: string, password: string) {
        try {
            await registerWithEmailAndPassword(email, password, {
                fullname: this.doctor.name,
                age: this.doctor.age,
                phoneNumber: this.doctor.phoneNumber,
                address: this.doctor.address,
                licenseNumber: this.doctor.licenseNumber,
                userType: 'Doctor', // Explicitly set userType
            });
            console.log("Doctor registered successfully!");
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }
}


//#endregion