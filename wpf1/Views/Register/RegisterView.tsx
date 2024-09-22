import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { validationSchema, emailValidationSchema } from '../../Controller/RegisterController'; // Ensure these schemas are defined
import { Button, Input, ComboBox } from '../Components/Component';
import { StackNavigationProp } from '@react-navigation/stack';

interface RegisterViewProps {
    navigation: StackNavigationProp<any>; // Adjust 'any' to your specific stack params if defined
}

interface RegisterEmailProps {
    navigation: StackNavigationProp<any>; // Adjust as needed
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
                    navigation.navigate('RegisterEmail');
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

//#region Email and Password
export const RegisterEmail: React.FC<RegisterEmailProps> = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [doctorId, setDoctorId] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Account Credentials</Text>
            <Formik
                initialValues={{ email: '', password: '', confirmPassword: '', userType: '', doctorId: '' }}
                validationSchema={emailValidationSchema}
                onSubmit={(values) => {
                    console.log('Account values:', values);
                    navigation.replace('LoginView'); // Navigate to Login
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, dirty }) => (
                    <View style={styles.inputContainer}>
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
                                setSelectedValue(itemValue);
                                handleChange('userType')(itemValue); 
                                if (itemValue !== "Doctor") {
                                    setDoctorId('');
                                }
                            }}
                            items={[
                                { label: "Patient", value: "Patient" },
                                { label: "Doctor", value: "Doctor" },
                            ]}
                        />
                        {selectedValue === 'Doctor' && (
                            <Input 
                                onChangeText={(text) => {
                                    setDoctorId(text);
                                    handleChange('doctorId')(text); 
                                }} 
                                onBlur={handleBlur('doctorId')} 
                                placeholder={'Doctor ID'} 
                                value={doctorId} 
                                errorMessage={errors.doctorId} 
                            />
                        )}
                        <View style={styles.buttonContainer}>
                            <Button 
                                onPress={()=> navigation.navigate('LoginView')} 
                                buttonText={'Register'} 
                                disabled={!(isValid && dirty || values.userType === 'Patient')} 
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
