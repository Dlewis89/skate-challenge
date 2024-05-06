import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';

import { RootStackParamList } from "../types/rootStackParamList.type";
   
type Props = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export const skateChallengeApi = async (method: string, route: string, data: object = {}, props: Props | null = null) => {
    try {
        const token = await SecureStore.getItemAsync('skate-challenge-token');

        if(!token && props) {
            props.navigation.navigate('LoginScreen')
            return;
        }

        console.log(data)

        const response = await axiosInstance(route, {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            data
        })

        return response
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data)
        }
    }
}