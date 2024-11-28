import * as React from "react";
import { View, Text, TouchableOpacity, Alert, Linking, Image, ScrollView, Modal, FlatList, StyleSheet, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontSize, Border, Color, FontFamily } from "./GlobalStyles";
import usersData from "../users.json";
import imageMapping from "./imageMappings";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import * as FileSystem from 'expo-file-system';
import { useUser } from "./UserContext";

const LogIn = () => {
    const navigation = useNavigation();

    const {login} = useUser();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const usersFile = FileSystem.documentDirectory + 'users.json';

    const passowrdInputRef = React.useRef(null);
    const handleEmailInputSubmit = () => {passowrdInputRef.current.focus();};
    

    const handleLoginNew = async () => {
        try {
            const fileExists = await FileSystem.getInfoAsync(usersFile);
            if(!fileExists.exists){
                await FileSystem.writeAsStringAsync(usersFile, JSON.stringify([]));
                return;
            };

            //await FileSystem.writeAsStringAsync(usersFile, JSON.stringify([])); //Use this to clear the users.json file when needed
            
            const existingUsersJson = await FileSystem.readAsStringAsync(usersFile);
            const existingUsers = JSON.parse(existingUsersJson);
            console.log(existingUsers);

            const user = existingUsers.find(user => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
            if (!user) {
                Alert.alert('Invalid email or password');
            } else if (user) {
                navigation.navigate("Home");
                login({
                    name: user.name,
                    phoneNo : user.phoneNo,
                    email: user.email,
                    position: user.position,
                    avatar: user.avatar,
                });
                console.log(user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSignUp = () =>{navigation.navigate("SignUp");};

    return(
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image source={imageMapping["../assets/main-logo.png"]} style={styles.mainImage} />

            <TextInput 
                onChangeText={setEmail}
                value={email}
                placeholder="Enter your email"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={handleEmailInputSubmit}
            />

            <TextInput
                ref={passowrdInputRef}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                placeholder="Enter your password"
                style={[styles.input, {marginBottom: 30}]}
                autoCapitalize="none"
                textContentType="password"
            />

            <TouchableOpacity onPress={handleLoginNew} style={styles.buttonsContainer}>
                <Text style={styles.logInText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUp} style={styles.buttonsContainer}>
                <Text style={styles.logInText}>Don't have an account? Sign Up here</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Copyright &copy;</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    //Main scroll view
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 20,
        marginTop: 50,
        paddingBottom: 20,
    },

    //Logo
    mainImage: {
        alignSelf: 'center',
        marginBottom: 30,
    },

    //Input fields
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#D1D1D1',
        borderRadius: 8,
        paddingLeft: 15,
        marginBottom: 20,
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
    },

    //Login and Sign Up buttons container
    buttonsContainer: {
        backgroundColor: '#4A90E2',
        width: '100%',
        height: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginBottom: 20,
    },

    logInText: {
        fontFamily: 'Raleway-SemiBold',
        color: '#fff',
        fontSize: 16,
    },

    signUpContainer: {
        alignSelf: 'center',
    },
    
    signUpText: {
        fontFamily: 'Raleway-Regular',
        color: '#4A90E2',
        fontSize: 14,
        textAlign: 'center',
    },

    //Footer
    footerText: {
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        fontFamily: 'Raleway-Regular',
        fontSize: 12,
        color: '#A1A1A1',
    }
})

export default LogIn;