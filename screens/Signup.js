import React, { useState } from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import {
  ButtonText,
  ExtraText,
  ExtraView,
  InnerContainer,
  LeftIcon,
  Line,
  MsgBox,
  RightIcon,
  StyledButton,
  StyledContainer,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  SubTitle,
  PageTitle,
  TextLinkContent,
  colors,
  TextLink,
} from '../components/styles';

import { createTable, insertUserData } from './DatabaseHelper';

const { brand, darkLight, primary } = colors;

const Signup = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState(null); 

  const handleValidation = (values) => {
    const errors = {};

    if (!values.FullName) {
      errors.FullName = 'Full Name is required';
    }
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!values.ConfirmPassword) {
      errors.ConfirmPassword = 'Confirm Password is required';
    } else if (values.ConfirmPassword !== values.password) {
      errors.ConfirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <PageTitle>Window</PageTitle>
          <SubTitle>Account Signup</SubTitle>
          <Formik
            initialValues={{ FullName: '', email: '', password: '', ConfirmPassword: '' }}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
                try {
                  console.log('Before inserting data');
                
                    console.log(values);
                    // Set loading state
                    setSubmitting(true);
            
                    // Create table if not exists
                    await createTable();
                    
                    
                    // Insert user data
                     insertUserData(
                        values.FullName,
                        values.email,
                        values.password,
                        () => {
                            setMessage({ type: 'success', text: 'User registered successfully!' });
                            resetForm(); // Reset form after successful registration
                        },
                        (error) => {
                            setMessage({ type: 'error', text: `Error registering user: ${error.message}` });
                        }
                    );
                    console.log('Before after');
                } catch (error) {
                    console.error('Error in handleSubmit:', error);
                } finally {
                    // Reset loading state
                    setSubmitting(false);
                }
            }}
                  

            validate={handleValidation}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Full Name"
                  placeholder="Pierre"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('FullName')}
                  onBlur={handleBlur('FullName')}
                  value={values.FullName}
                  icon="person"
                />
                {errors.FullName && touched.FullName && <MsgBox>{errors.FullName}</MsgBox>}

                <MyTextInput
                  label="Email address"
                  placeholder="pierre@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  icon="mail"
                />
                {errors.email && touched.email && <MsgBox>{errors.email}</MsgBox>}

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {errors.password && touched.password && <MsgBox>{errors.password}</MsgBox>}

                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="********"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('ConfirmPassword')}
                  onBlur={handleBlur('ConfirmPassword')}
                  value={values.ConfirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                {errors.ConfirmPassword && touched.ConfirmPassword && (
                  <MsgBox>{errors.ConfirmPassword}</MsgBox>
                )}

                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Register</ButtonText>
                </StyledButton>
                <Line />
                <StyledButton google={true}>
                  <Fontisto name="google" color={primary} size={20} />
                  <ButtonText google={true}>Sign in with google</ButtonText>
                </StyledButton>

                <ExtraView>
                  <ExtraText>Already have an account?</ExtraText>
                  <TextLink onPress={() => navigation.navigate('Login')}>
                    <TextLinkContent>Sign In</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

// MyTextInput component remains unchanged
const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    );
};

export default Signup;