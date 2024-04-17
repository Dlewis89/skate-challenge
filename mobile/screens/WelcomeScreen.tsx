import React from 'react'
import {Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TrickSelectorScreen from './TrickSelectorScreen';

const Tab = createBottomTabNavigator();

export default function WelcomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <Tab.Navigator>
                <Tab.Screen name="Trick Selector" component={TrickSelectorScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    )
} 