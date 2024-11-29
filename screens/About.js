import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const About = () => {
    return (
        <ScrollView contentContainerStyle={styles.mainScrollConatiner}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/main-logo.png')} // Replace with your logo image
                    style={styles.logo}
                />
                <Text style={styles.title}>About Our App</Text>
            </View>

            <View style={styles.bodyContainer}>
                <Text style={styles.bodyText}>
                    Our app is designed to make renting properties easier and more accessible than ever before. 
                    Whether you're a property owner looking to rent out your space or someone searching for the perfect 
                    place to stay, we've got you covered.
                </Text>
                <Text style={styles.bodyText}>
                    With our easy-to-use platform, property owners can quickly post listings with all the necessary details, 
                    photos, and rental terms. Renters can browse a wide variety of properties, contact owners directly, and find 
                    the ideal home or apartment to suit their needs.
                </Text>
                <Text style={styles.bodyText}>
                    We aim to create a seamless experience for both property owners and renters, providing a trusted space 
                    to connect and make renting simpler. Start browsing today or list your property to join our growing community!
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainScrollConatiner: {
        flexGrow: 1,
        //padding: 20,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: "2%",
        paddingVertical: "10%",
    },

    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },

    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },

    bodyContainer: {
        marginTop: 20,
    },

    bodyText: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 10,
    },
});

export default About;
