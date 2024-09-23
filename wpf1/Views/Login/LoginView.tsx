// LoginView.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import { Button, Input, ClickableText, LoadingModal } from '../Components/Component';
import { validationSchema, forgotPasswordSchema } from '../../Controller/LoginController';
import { StackNavigationProp } from '@react-navigation/stack';
import login, { forgotPassword } from '../../Firebase/Authentication/Login';


interface LoginViewProps {
  navigation: StackNavigationProp<any>;
}

export const LoginView: React.FC<LoginViewProps> = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    setLoading(true);

    try {
      await login(email, password, navigation);
    } catch (error) {
      console.error("Login error:", error);
      ToastAndroid.show("Login failed. Please try again.", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <LoadingModal visible={loading} />
      <Formik
        initialValues={{ email: '', password: '' }}
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
            <View style={styles.loginButton}>
              <Button
                buttonText='Login'
                onPress={handleSubmit}
                disabled={!(isValid && dirty)}
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




  
  export const ForgotPassword: React.FC<LoginViewProps> = ({ navigation }) => {
    const handleForgotPassword = async (values: { email: string }) => {
      try {
        // Call your forgotPassword function here
        await forgotPassword(values.email, navigation); // Ensure you implement this function
        ToastAndroid.show("Password reset link sent!", ToastAndroid.SHORT);
      } catch (error) {
        ToastAndroid.show("Failed to send password reset link.", ToastAndroid.SHORT);
      }
    };
  
    return (
      <View style={stylesForgot.Container}>
        <Formik
          initialValues={{ email: '' }}
          validationSchema={forgotPasswordSchema}
          onSubmit={handleForgotPassword}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, dirty }) => (
            <>
              <View style={{ alignItems: "center", paddingBottom: 30 }}>
                <Text style={{ fontSize: 17, textAlignVertical: "center" }}>
                  Don't worry, enter your registered email
                </Text>
                <Text style={{ fontSize: 17, textAlignVertical: "center" }}>
                  to receive a password reset link.
                </Text>
              </View>
              <Input
                placeholder={"Email Address"}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={errors.email}
              />
              <Button
                buttonText={"Send"}
                onPress={handleSubmit}
                disabled={!(isValid && dirty)} // Disable button if not valid
              />
            </>
          )}
        </Formik>
      </View>
    );
  };
  
  const stylesForgot = StyleSheet.create({
    Container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

