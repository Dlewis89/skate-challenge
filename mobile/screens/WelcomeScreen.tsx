import React from 'react'
import {Text, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSnowboarding } from '@fortawesome/free-solid-svg-icons/faSnowboarding';
import { colors } from '../utils/colors';
import { fontSizes, iconSizes } from '../utils/sizes';

import TrickSelectorScreen from './TrickSelectorScreen';

const Tab = createBottomTabNavigator();

export default function WelcomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: (focused) => {
                        return <FontAwesomeIcon icon={faSnowboarding} size={iconSizes.lg} color={focused ? colors.primary : colors.secondary} />;
                    },
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.textPrimary,
                    tabBarLabelStyle: {
                        fontSize: fontSizes.md,
                    },
                })}
            >
            <Tab.Screen name="Trick Selector" component={TrickSelectorScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    )
} 