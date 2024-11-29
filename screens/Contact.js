import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, TextInput, TouchableOpacity} from 'react-native';
import { useUser } from './UserContext';
import { Color } from './GlobalStyles';

const Contact = () => {
    const {user} = useUser();
    const [message, setMessage] = useState('');

    return (
        <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.mainContainer}>
                <View style={styles.headerContainer}>
                    <Image source={require('../assets/main-logo.png')} style={styles.logo} />
                    <Text style={styles.title}>Contact Us</Text>
                </View>

                <View style={styles.bodyContainer}>
                    <TextInput
                        style={styles.input}
                        value={user.name}
                    />

                    <TextInput
                        style={styles.input}
                        value={user.email}
                    />

                    <TextInput
                        style={styles.input}
                        value={user.phoneNo}
                    />

                    <TextInput
                        style={styles.input}
                        value={message}
                        placeholder='Your message ...'
                        multiline={true}
                        onChangeText={(message) => setMessage(message)}
                    />

                    <TouchableOpacity style={styles.submitButton} onPress={() => Alert.alert("Message submitted !")}>
                        <Text style={styles.subnitText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        backgroundColor: Color.colorWhite,
    },

    mainContainer :{
        flex: 1,
        flexDirection: "column",
        marginVertical: "20%",

        //borderWidth: 2, //Debugging
        //borderColor: "blue", //Debugging
    },

    headerContainer: {
        position: "relative",
        width: "100%",
        height: "auto",
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: "2%",
        alignItems: "center",

        //borderWidth: 2, //Debugging
        //borderColor: "red", //Debugging
    },

    logo: {
        width: 100,
        height: 100,
    },
    
    title: {
        fontFamily: "Raleway-SemiBold",
        color: "black",
        fontSize: 20,
        textAlign: "center",
    },

    bodyContainer: {
        position: "relative",
        width: "100%",
        height: "auto",
        flexDirection: "column",
        justifyContent: "space-between",
        marginVertical: "2%",

        //borderWidth: 2, //Debugging
        //borderColor: "green", //Debugging
    },

    input: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Color.colorGray_200,
        marginHorizontal: "2%",
        padding: 12,
        fontFamily: "Raleway-Regular",
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 10,
        backgroundColor: Color.colorWhite,
        marginVertical: "5%",
    },

    submitButton: {
        height: 50,
        width: "75%",
        justifyContent: "center",
        alignSelf: "center",
        backgroundColor: Color.colorCornflowerblue,

        //borderWidth: 2, //Debugging
        //borderColor: "lime", //Debugging
    },

    subnitText: {
        fontFamily: "Raleway-SemiBold",
        textAlign: "center",
        fontSize: 16,
        color: Color.colorWhite,
    }
});

export default Contact;