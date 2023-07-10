import React from "react";
import { View, Text, StyleSheet } from "react-native";

function DiscoverMovie() {
    return(
        <View style={styles.cont}>
            <Text>Hello world</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    cont: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default DiscoverMovie;