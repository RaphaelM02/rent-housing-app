import * as React from "react";
import { Text, TouchableOpacity, Alert, Image, ScrollView, StyleSheet, TextInput } from 'react-native';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { useNavigation } from '@react-navigation/native';
import imageMapping from "./imageMappings";
import * as FileSystem from 'expo-file-system';

const SignUp = () => {
    const navigation = useNavigation();

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [phoneNo, setPhoneNo] = React.useState('');
    const [position, setPosition] = React.useState('Owner');
    const [errorMessages, setErrorMessages] = React.useState({
        name: '',
        email: '',
        password: '',
        phoneNo: '',
        position: '',
    });

    const usersFile = FileSystem.documentDirectory + 'users.json'
    
    const emailInputRef = React.useRef(null);
    const passwordInputRef = React.useRef(null);
    const phoneNoInputRef = React.useRef(null);

    const handleNameInputSubmit = () => {emailInputRef.current.focus();};
    const handleEmailInputSubmit = () => {passwordInputRef.current.focus();};
    const handlePassowrdInputSubmit = () => {phoneNoInputRef.current.focus();};


    const validateInputs = (name, email, password, phoneNo, position) => {
        const nameRegex = /^[A-Za-z]+ [A-Za-z]+$/;
        if (name && !nameRegex.test(name)){
            return {valid : false, message: "Name must consists of 2 words.", field: 'name' };
        };

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            return {valid: false, message: "Invalid email format.", field: 'email' };
        };

        if (password && password.length < 6) {
            return {valid: false, message: "Password must be at least 6 characters long.", field: 'password' };
        };

        const phoneNoRegex = /^(03|70|71|76|78|80|81)[0-9]{6}$/;
        if (phoneNo && !phoneNoRegex.test(phoneNo)){
            return {valid: false, message: "Mobile not valid", field: 'phoneNo' };
        };

        if (!position) {
            return {valid: false, message: "Position not selected.", field: 'position' };
        };

        return {valid: true, message:"All inputs are valid"};
    };

    const handleInputChange = (setter, field) => (text) => {
        setter(text);
        let validation;
        switch(field) {
            case 'name' :
                validation = validateInputs(text, email, password, phoneNo, position);
                break;
            case 'email' :
                validation = validateInputs(name, text, password, phoneNo, position);
                break;
            case 'password' : 
                validation = validateInputs(name, email, text, phoneNo, position);
                break;
            case 'phoneNo' :
                validation = validateInputs(name, email, password, text, position);
                break;
            default :
                validation = {valid : true, message : ''};
        }

        if(validation.valid){
            setErrorMessages(prev => ({...prev, [field]: ''}))
        }else {
            setErrorMessages(prev => ({...prev, [validation.field]: validation.message}));
        }
    };

    const handleValidation = () => {
        const finalValidation = validateInputs(name, email, password, phoneNo, position);

        if (!finalValidation.valid){
            setErrorMessages(prev => ({...prev, [finalValidation.field]: finalValidation.message}));
            console.log
                (" Name " +name+  
                "\n Email " +email+ 
                "\n Password " +password+ 
                "\n Phone " +phoneNo+ 
                "\n Position " +position);
            return;
        };

        setErrorMessages({
            name: '',
            email: '',
            password: '',
            phoneNo: '',
            position: '',
        });

        handleSignUpNew();
    };

    const handleSignUpNew = async () => {
        try {
            const fileExists = await FileSystem.getInfoAsync(usersFile);
            if(!fileExists.exists){
                await FileSystem.writeAsStringAsync(usersFile, JSON.stringify([]));
                return;
            };

            const existingUsersJson = await FileSystem.readAsStringAsync(usersFile);
            const existingUsers = JSON.parse(existingUsersJson);

            let isUserExists = existingUsers.some(user => user.email.toLowerCase() === email.toLowerCase());
            if(isUserExists){
                Alert.alert("An account with that email is already created");
                return;
            };

            const newUser = {name, email, password, phoneNo, position};
            existingUsers.push(newUser);

            await FileSystem.writeAsStringAsync(usersFile, JSON.stringify(existingUsers));
            Alert.alert("User registered succesfully !");
        } catch (error) {
            console.log(error);
            Alert.alert("Error !", "An error occured while trying to save");
        }
    };

    const handleLogin = () => { navigation.navigate("LogIn"); };

    return(
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image source={imageMapping["../assets/main-logo.png"]} style={styles.mainImage} />

            <TextInput
                onChangeText={handleInputChange(setName, 'name')}
                value={name}
                placeholder="Enter your full name"
                style={styles.input}
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={handleNameInputSubmit}
            />
            {errorMessages.name ? <Text style={styles.error}> {errorMessages.name} </Text> : null}

            <TextInput
                ref={emailInputRef}
                onChangeText={handleInputChange(setEmail, 'email')}
                value={email}
                placeholder="Enter your email"
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={handleEmailInputSubmit}
            />
            {errorMessages.email ? <Text style={styles.error}>{errorMessages.email}</Text> : null}

            <TextInput
                ref={passwordInputRef}
                onChangeText={handleInputChange(setPassword, 'password')}
                value={password}
                placeholder="Enter your password"
                secureTextEntry={true}
                style={styles.input}
                autoCapitalize="none"
                textContentType="password"
                returnKeyType="next"
                onSubmitEditing={handlePassowrdInputSubmit}
            />
            {errorMessages.password ? <Text style={styles.error}>{errorMessages.password}</Text> : null}

            <TextInput
                ref={phoneNoInputRef}
                onChangeText={handleInputChange(setPhoneNo, 'phoneNo')}
                value={phoneNo}
                placeholder="Enter your mobile number"
                style={styles.input}
                keyboardType="numeric"
            />
            {errorMessages.phoneNo ? <Text style={styles.error}>{errorMessages.phoneNo}</Text> : null}

            <RadioButtonGroup
                selected={position}
                onSelected={(value) => setPosition(value)}
                containerStyle={styles.radioGroup}
                radioBackground={'green'}
            >
                <RadioButtonItem value="Owner" label="" style={styles.radioButton}/>
                <TouchableOpacity onPress={() => setPosition("Owner")}>
                    <Text style={styles.rbLabelText}>Owner</Text>
                </TouchableOpacity>

                <RadioButtonItem value="User" label="" style={styles.radioButton}/>
                <TouchableOpacity onPress={() => setPosition("User")}>
                    <Text style={styles.rbLabelText}>User</Text>
                </TouchableOpacity>

            </RadioButtonGroup>

            <TouchableOpacity onPress={handleValidation} style={styles.buttonsContainer}>
                <Text style={styles.logInText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogin} style={styles.buttonsContainer}>
                <Text style={styles.logInText}>Already have an account? Log in here</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>Copyright &copy;</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow : 1,
        marginBottom: 20,
        marginTop: 50,
    },
    mainImage: {
        alignSelf: 'center',
        marginBottom: 15,
    },
    input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        paddingLeft : 5,
    },
    buttonsContainer: {
        width: '75%',
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    logInText: {
        fontFamily: 'Raleway-SemiBold',
        borderWidth: 1,
        height: '100%',
        width: '100%',
        textAlign: 'center',
    },
    radioGroup:{
        margin: 12,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20,
    },
    radioButton: {
        borderWidth: 1,
        borderRadius: 10,
    },
    rbLabelText:{
        fontFamily: 'Raleway-Regular',
        marginRight: 20,
    },
    footerText:{
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
    error:{
        color:'red',
        fontSize: 12,
        fontFamily: 'Raleway-SemiBold',
        marginBottom: 20,
        textAlign: 'center',
    }
});

export default SignUp;