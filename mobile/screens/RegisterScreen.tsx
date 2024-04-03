import { API_BASE } from '@env'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios, { AxiosError } from 'axios'
import React, { useState }  from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, View } from 'react-native'

import { colors } from '../utils/colors'
import { fontSizes, marginSizes, paddingSizes } from '../utils/sizes';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

export type RootStackParamList = {
    RegisterScreen: undefined;
    LoginScreen: undefined;
    WelcomeScreen: undefined;
};
  
type Props = NativeStackScreenProps<RootStackParamList, "RegisterScreen">;

interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

async function handleRegistration(formData: RegisterFormData, props: Props) {
    try {
        const { name, email, password, passwordConfirmation } = formData;

        if (password !== passwordConfirmation) {
            throw new Error('Passwords do not match');
        }

        const response = await axios.post(`${API_BASE}/api/v1/auth/register`, {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation
        });

        if (response.status === 201) {
            Alert.alert('Registration successful');
            // Assuming props is passed as a parameter to the function
            props.navigation.push('LoginScreen');
        } else {
            throw new Error('Unable to register the new user. Please try again later.');
        }
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
            Alert.alert('Registration failed', 'An error occurred during registration. Please try again later.');
        } else {
            Alert.alert('Registration failed', 'An unexpected error occurred. Please try again later.');
        }
    }
}

export default function RegisterScreen<RootStackParamList>(props: Props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.viewContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Skate Challenge</Text>
                </View>
                <ScrollView>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={name => setName(name)}
                            style={styles.input} 
                            placeholder='Name'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={email => setEmail(email)}
                            style={styles.input} 
                            placeholder='Email'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={password => setPassword(password)}
                            secureTextEntry={true}
                            style={styles.input} 
                            placeholder='Password'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            onChangeText={passwordConfirmation => setPasswordConfirmation(passwordConfirmation)}
                            secureTextEntry={true}
                            style={styles.input} 
                            placeholder='Confirm Password'
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => handleRegistration({name, email, password, passwordConfirmation}, props)}>
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Text>Already have an account? <Text style={styles.registerText} onPress={() => props.navigation.push('LoginScreen') }>Log in</Text></Text>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: colors.textPrimary,
        padding: paddingSizes.md
    },
    titleContainer: {
        marginBottom: marginSizes.lg,
        justifyContent: 'center'
    },
    title: {
      fontSize: fontSizes.xxl,
      textAlign: 'center',
      fontWeight: '900',
      color: colors.primary,
      borderBottomWidth: 3,
      borderBottomColor: colors.primary,
      
    },
    inputContainer: {
        elevation: 1,
        backgroundColor: '#fff',
        marginBottom: marginSizes.lg
    },
    input: {
        padding: paddingSizes.md,
    },
    buttonContainer: {
        padding: paddingSizes.lg,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: colors.primary,
        padding: paddingSizes.md,
        borderRadius: 50
    },
    buttonText: {
        fontSize: fontSizes.lg,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700'
    },
    footer: {
        alignItems: 'center',
    },
    registerText: {
        color: colors.primary,
        fontWeight: '700'
    }
  });