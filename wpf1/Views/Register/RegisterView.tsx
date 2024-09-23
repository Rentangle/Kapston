import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { validationSchema, emailValidationSchema } from '../../Controller/RegisterController'; // Ensure these schemas are defined
import { Button, Input, ComboBox } from '../Components/Component';
import { StackNavigationProp } from '@react-navigation/stack';
import { registerWithEmailAndPassword } from '../../Firebase/Authentication/Register';
import VerificationScreens from '../Screens/VerificationScreen';


interface RegisterViewProps {
    navigation: StackNavigationProp<any>; // Adjust 'any' to your specific stack params if defined
}

//#region Patient Credentials
export const RegisterView: React.FC<RegisterViewProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Patient Credentials</Text>
            <Formik
                initialValues={{ name: '', address: '', age: '', phoneNumber: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Form values:', values);
                    navigation.navigate('RegisterEmail', { patientDetails: values });
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, dirty }) => (
                    <View style={styles.inputContainer}>
                        <Input 
                            onChangeText={handleChange('name')} 
                            onBlur={handleBlur('name')} 
                            placeholder={'Name'} 
                            value={values.name} 
                            errorMessage={errors.name} 
                        />
                        <Input 
                            onChangeText={handleChange('address')} 
                            onBlur={handleBlur('address')} 
                            placeholder={'Address'} 
                            value={values.address} 
                            errorMessage={errors.address} 
                        />
                        <Input 
                            onChangeText={handleChange('age')} 
                            onBlur={handleBlur('age')} 
                            placeholder={'Age'} 
                            value={values.age} 
                            errorMessage={errors.age} 
                        />
                        <Input 
                            onChangeText={handleChange('phoneNumber')} 
                            onBlur={handleBlur('phoneNumber')} 
                            placeholder={'Phone Number'} 
                            value={values.phoneNumber} 
                            errorMessage={errors.phoneNumber} 
                        />
                        <View style={styles.buttonContainer}>
                            <Button 
                                onPress={handleSubmit}
                                buttonText={'Next'} 
                                disabled={!(isValid && dirty)} 
                            />
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
};
//#endregion

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
        marginBottom: 20,
        color: '#420475',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '50%',
        alignItems: 'center',
    },
});



interface RegisterEmailProps {
    navigation: StackNavigationProp<any>; // Adjust as needed
    route: any; // Adjust according to your routing setup
}

//#region Email and Password
export const RegisterEmail: React.FC<RegisterEmailProps> = ({ navigation, route }) => {
    const { patientDetails } = route.params; 
    const [selectedValue, setSelectedValue] = useState<'Patient' | 'Doctor'>('Patient');
    const [doctorId, setDoctorId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [verificationText, setVerificationText] = useState('');
    const [animationUrl, setAnimationUrl] = useState('');

    const handleVerify = async (values: any) => {
        if (values.password !== values.confirmPassword) {
            return;
        }

        try {
            await registerWithEmailAndPassword(
                values.email,
                values.password,
                {
                    fullname: patientDetails.name,
                    age: patientDetails.age,
                    address: patientDetails.address,
                    phoneNumber: patientDetails.phoneNumber,
                    licenseNumber: selectedValue === 'Doctor' ? doctorId : undefined,
                    userType: selectedValue,
                }
            );
            setVerificationText('Check your email for verification.');
            setAnimationUrl('https://lottie.host/bace5f65-17e7-4a03-bd52-f4a7c6f23d43/IMbLsIQfBn.json');
            setModalVisible(true);
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const isButtonEnabled = () => {
        return (selectedValue === 'Patient' && doctorId === '') || 
               (selectedValue === 'Doctor' && doctorId.length > 0);
    };

    return (
        <View style={stylesEmail.container}>
            <Text style={stylesEmail.header}>Account Credentials</Text>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '', userType: '' }}
                validationSchema={emailValidationSchema}
                onSubmit={handleVerify}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, dirty }) => (
                    <View style={stylesEmail.inputContainer}>
                        <Input 
                            onChangeText={handleChange('email')} 
                            onBlur={handleBlur('email')} 
                            placeholder={'Email'} 
                            value={values.email} 
                            errorMessage={errors.email} 
                        />
                        <Input 
                            onChangeText={handleChange('password')} 
                            onBlur={handleBlur('password')} 
                            placeholder={'Password'} 
                            value={values.password} 
                            errorMessage={errors.password} 
                            secureTextEntry
                        />
                        <Input 
                            onChangeText={handleChange('confirmPassword')} 
                            onBlur={handleBlur('confirmPassword')} 
                            placeholder={'Re-Enter Password'} 
                            value={values.confirmPassword} 
                            errorMessage={errors.confirmPassword} 
                            secureTextEntry
                        />
                        <ComboBox
                            selectedValue={selectedValue}
                            placeholder={'User Type'}
                            onValueChange={(itemValue) => {
                                setSelectedValue(itemValue as 'Patient' | 'Doctor'); 
                                handleChange('userType')(itemValue as 'Patient' | 'Doctor'); 
                                if (itemValue !== "Doctor") {
                                    setDoctorId('');
                                }
                            }}
                            items={[
                                { label: "Patient", value: "Patient" },
                                { label: "Doctor", value: "Doctor" },
                            ]}
                        />
                        {(selectedValue === 'Doctor' && (
                            <Input 
                                onChangeText={(text) => {
                                    setDoctorId(text);
                                    handleChange('doctorId')(text); 
                                }} 
                                onBlur={handleBlur('doctorId')} 
                                placeholder={'Doctor ID'} 
                                value={doctorId} 
                            />
                        )) || (selectedValue === 'Patient')}
                        <View style={stylesEmail.buttonContainer}>
                            <Button 
                                onPress={handleSubmit} 
                                buttonText={'Verify'} 
                                disabled={!isValid || !dirty || !isButtonEnabled()} 
                            />
                        </View>
                    </View>
                )}
            </Formik>

            {/* Verification Modal */}
            <VerificationScreens 
                text={verificationText} 
                url={animationUrl} 
                visible={modalVisible} 
                onClose={() => {
                    setModalVisible(false);
                    navigation.navigate('Login'); // Navigate to Login when modal is closed
                }} 
            />
        </View>
    );
};

//#endregion

const stylesEmail = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        width: '100%',
        marginBottom: 20,
        color: '#420475',
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '50%',
        alignItems: 'center',
    },
});