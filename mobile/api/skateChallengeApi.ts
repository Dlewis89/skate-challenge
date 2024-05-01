import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';

import { RootStackParamList } from "../types/rootStackParamList.type";
   
type Props = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export const skateChallengeApi = async (route: string, data: object = {}, props: Props | null) => {
    try {
        const token = SecureStore.getItem('skate-challenge-token');

        if(!token && props) {
            props.navigation.navigate('LoginScreen')
        }

        const response = await axiosInstance.post(route, {
            headers: {
                'Content-Type': 'application/json'
            },
            ...data
        })

        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data)
            // Handle login failure
            Alert.alert('Login Failed', 'Email or password is incorrect. Please try again.');
        } else {
            Alert.alert('Login Failed', 'An unexpected error occurred. Please try again later.');
        }
    }
}