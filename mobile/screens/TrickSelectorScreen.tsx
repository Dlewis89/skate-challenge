import React from 'react'
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '../utils/colors'
import { fontSizes, marginSizes, paddingSizes } from '../utils/sizes';

export default function TrickSelectorScreen() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.trickContainer}>
                <Text style={styles.trick}>Kickflip</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}>
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
        fontSize: fontSizes.xl
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
