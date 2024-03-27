import { API_BASE } from '@env'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import React, { useState }  from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

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
        <View style={styles.viewContainer}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-evenly'
    },
    titleContainer: {
        justifyContent: 'center'
    },
    title: {
      fontSize: 45,
      textAlign: 'center',
      fontWeight: '900',
      color: '#fda53e',
      borderBottomWidth: 3,
      borderBottomColor: '#fda53e'
    },
    inputContainer: {
        elevation: 1,
        backgroundColor: '#fff',
        marginBottom: 20
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
    },
    buttonContainer: {
        padding: 20,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#fda53e',
        padding: 15,
        borderRadius: 50
    },
    buttonText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '700'
    },
    footer: {
        paddingBottom: 30,
        alignItems: 'center',
    },
    registerText: {
        color: '#fda53e',
        fontWeight: '700'
    }
  });