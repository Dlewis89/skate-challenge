import { API_BASE } from '@env'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios'
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


export default function LoginScreen<RootStackParamList>(props: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin() {

        try {
            const response = await axios.post(`${API_BASE}/api/v1/auth/login`, {
                email,
                password
            });
    
            // save token to localStorage
            const jwtToken = response.data.user.token
    
            SecureStore.setItemAsync('skate-challenge-token', jwtToken)
            
            props.navigation.push('WelcomeScreen')
        } catch(e) {
            Alert.alert('Login Failed', 'User email or password is incorrect')
        }
        
    }

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
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
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