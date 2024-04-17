import { API_BASE } from '@env'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import React, { useState }  from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, View } from 'react-native'

import { colors } from '../utils/colors'
import { fontSizes, marginSizes, paddingSizes } from '../utils/sizes';

export type RootStackParamList = {
    RegisterScreen: undefined;
    LoginScreen: undefined;
    WelcomeScreen: undefined;
};
  
type Props = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE
  });

async function handleLogin(email: string, password: string, props: Props) {
    try {
        const response = await axios.post(`${API_BASE}/auth/login`, {
            email,
            password
        });

        // Save token to SecureStore
        const jwtToken: string = response.data.user.token;
        await SecureStore.setItemAsync('skate-challenge-token', jwtToken);

        // Add a request interceptor
        axiosInstance.interceptors.request.use(
            async (config: InternalAxiosRequestConfig<any>) => {
                // Retrieve the JWT token from SecureStore
                const token: string | null = await SecureStore.getItemAsync('skate-challenge-token');
            
                if (token) {
                    // Attach the token to the request headers
                    config.headers.Authorization = `Bearer ${token}`;
                }
            
                return config;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        );

        // Navigate to WelcomeScreen
        props.navigation.push('WelcomeScreen');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
            // Handle login failure
            Alert.alert('Login Failed', 'Email or password is incorrect. Please try again.');
        } else {
            Alert.alert('Login Failed', 'An unexpected error occurred. Please try again later.');
        }
    }
}


export default function LoginScreen<RootStackParamList>(props: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView style={styles.viewContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Skate Challenge</Text>
            </View>
            <View>
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => handleLogin(email, password, props)}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <Text>Don't have an account? <Text style={styles.registerText} onPress={() => props.navigation.push('RegisterScreen') }>Sign Up</Text></Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: colors.textPrimary,
        padding: paddingSizes.md,
        justifyContent: 'space-evenly'
    },
    titleContainer: {
        justifyContent: 'center'
    },
    title: {
      fontSize: fontSizes.xxl,
      textAlign: 'center',
      fontWeight: '900',
      color: colors.primary,
      borderBottomWidth: 3,
      borderBottomColor: colors.primary
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