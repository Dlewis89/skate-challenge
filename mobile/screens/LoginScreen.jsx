import axios from 'axios'
import { React, useState }  from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

async function handleLogin(email, password) {

    try {
        const response = await axios.post('https://d9d3-2603-6081-943d-5ac5-00-1569.ngrok-free.app/api/v1/auth/login', {
            email,
            password
        });

        console.log(response.data);
    } catch(e) {
        // Handle failed logins here

        console.log(e.message);
    }
    
}

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.viewContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Skate Challenge</Text>
            </View>
            <View style={styles.formContainer}>
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
                    <TouchableOpacity style={styles.button} onPress={() => handleLogin(email, password)}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? <Text style={styles.registerText} onPress={() => navigation.navigate('RegisterScreen') }>Sign Up</Text></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        padding: 20
    },
    titleContainer: {
        flex: 1,
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
    formContainer: {
        flex: 2,
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
        flex: 1,
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