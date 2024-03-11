import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function LoginScreen({ navigation }) {

    return (
        <View style={styles.viewContainer}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Skate Challenge</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Email'></TextInput>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input} placeholder='Password'></TextInput>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
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