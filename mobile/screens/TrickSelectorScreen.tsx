import React from 'react'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios'
import * as SecureStore from 'expo-secure-store';
import { API_BASE } from '@env'
import { Alert, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../utils/colors'
import { fontSizes, paddingSizes } from '../utils/sizes';
import { skateChallengeApi } from '../api/skateChallengeApi';

type trickResponseProps = {
    user: object,
    stance: string,
    trick: string
}

async function handleGetTrickPress() {
    try {
        const response= await skateChallengeApi('get', '/tricks');

    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
            // Handle login failure
            Alert.alert('Get Trick Failed', 'An unexpected error occurred. Please try again later.');
        }
    }
}

export default function TrickSelectorScreen() {
    const [trick, setTrick] = ''

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.trickContainer}>
                <Text style={styles.trick}>{trick}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleGetTrickPress}>
                    <Text style={styles.buttonText}>Generate Trick</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    trickContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    trick: {
        color: colors.primary,
        fontWeight: '700',
        fontSize: fontSizes.xxxl
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        padding: paddingSizes.lg
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
})
