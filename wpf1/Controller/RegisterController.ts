import * as Yup from 'yup';

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
