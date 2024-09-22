import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Button, Input, ClickableText, ComboBox, LoadingModal } from '../Components/Component';
import { validationSchema } from '../../Controller/LoginController';
import { StackNavigationProp } from '@react-navigation/stack';
import { login } from '../../Firebase/Authentication/Login';

interface LoginViewProps {
    navigation: StackNavigationProp<any>;
}

export const LoginView: React.FC<LoginViewProps> = ({ navigation }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (values: { email: string; password: string; userType: string }) => {
        const { email, password } = values;
        setLoading(true); // Show loading
        console.log("Login attempt..."); // Debug log

        try {
            const result = await login(email, password);
            console.log("Login result:", result); // Debug log
            console.error(result.message);
            alert(result.message); // Alert user
            setLoading(false); // Hide loading

            if (result.success) {
                navigation.navigate("Main");
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error("Login error:", error); // Log any errors
            setLoading(false); // Hide loading in case of error
           
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <LoadingModal visible={loading} />
            <Formik
                initialValues={{ email: '', password: '', userType: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, dirty }) => (
                    <>
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
                            secureTextEntry
                            errorMessage={errors.password}
                        />
                        <ComboBox
                            selectedValue={selectedValue}
                            placeholder={'User Type'}
                            onValueChange={(itemValue) => {
                                setSelectedValue(itemValue);
                                handleChange('userType')(itemValue);
                            }}
                            items={[
                                { label: "Option 1", value: "option1" },
                                { label: "Option 2", value: "option2" },
                                { label: "Option 3", value: "option3" },
                            ]}
                        />
                        {errors.userType && <Text style={styles.errorText}>{errors.userType}</Text>}
                        <View style={styles.forgotPassword}>
                            <ClickableText
                                text="Forgot Password?"
                                onPress={() => console.log('Forgot Password clicked!')}
                                style={styles.clickableText}
                            />
                        </View>
                        <View style={styles.loginButton}>
                            <Button
                                buttonText='Login'
                                onPress={handleSubmit}
                                disabled={!(isValid && dirty && selectedValue)}
                            />
                        </View>
                        <View style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>Doesn't have an account?</Text>
                            <ClickableText
                                text={'Sign Up'}
                                onPress={() => navigation.navigate('RegisterView')}
                                style={styles.signUpLink}
                            />
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#420475',
    },
    loginButton: {
        width: '50%',
        height: 100,
        justifyContent: 'center',
    },
    clickableText: {
        marginTop: 10,
        color: '#420475',
    },
    forgotPassword: {
        alignItems: 'center',
        bottom: 10,
        marginLeft: 120,
    },
    signUpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    signUpText: {
        fontSize: 16,
        color: '#666',
        marginRight: 5,
    },
    signUpLink: {
        color: '#420475',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});
