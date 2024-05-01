import React from 'react'
import {Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSnowboarding } from '@fortawesome/free-solid-svg-icons/faSnowboarding'

import TrickSelectorScreen from './TrickSelectorScreen';

const Tab = createBottomTabNavigator();

export default function WelcomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Trick') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                        } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list' : 'ios-list-outline';
                        }

                        // You can return any component that you like here!
                        return <FontAwesomeIcon icon={faSnowboarding} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
            <Tab.Screen name="Trick Selector" component={TrickSelectorScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    )
} 