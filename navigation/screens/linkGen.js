import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

function LinkGen({ route }) {
    const { params2 } = route.params;

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.header}>
                <Ionicons name="infinite" size={30} color="red" style={styles.headerIcon} />
            </View>
            <View style={styles.content}>
                <Text style={styles.heading}>Make sure you have downloaded VLC media player</Text>
                <Text style={styles.subheading}>or any suitable converter</Text>
                <Text style={styles.params}>{params2}</Text>
            </View>
            <View style={styles.instructionsContainer}>
                <Text style={styles.instructionText}>1. Download VLC media player</Text>
                <Text style={styles.instructionText}>2. Click Play from network stream and paste the URL into it</Text>
                <Text style={styles.instructionText}>3. Click convert and set properties</Text>
                <Text style={styles.instructionText}>4. Wait for conversion to finish and save</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    headerIcon: {
        marginBottom: 0,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        textAlign: 'center',
    },
    subheading: {
        fontSize: 18,
        color: '#FFF',
        textAlign: 'center',
    },
    params: {
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 60,
    },
    button: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
    instructionsContainer: {
        paddingHorizontal: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    instructionText: {
        fontSize: 16,
        color: '#FFF',
        marginBottom: 10,
    },
});

export default LinkGen;
