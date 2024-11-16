import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';

const WhitePage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.comingSoonText}>Coming Soon !!!!!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    comingSoonText:{
        textAlign: 'center',
        fontFamily: 'Raleway-SemiBold',
    }
});

export default WhitePage;