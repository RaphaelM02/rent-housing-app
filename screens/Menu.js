import * as React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import imageMapping from "./imageMappings";

const Menu = ({ navigation }) => {

    //const handlePress = () => { navigation.navigate('WhitePage'); }; //Removed all components leading to the WhiteScreen.js
    const handlePressHome = () => { navigation.navigate('Home'); };
    const handleLogoutPress = () => { navigation.navigate('LogIn'); };
    const handleHelpPress = () => { navigation.navigate('AddListing'); };
    const handleBookPress = () => { navigation.navigate('SearchListing'); };
    const handleAboutPress = () => { navigation.navigate('About'); };
    const handleContactPress = () => { navigation.navigate('Contact'); };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.menu}>

                {/*Home Section*/}
                <TouchableOpacity
                    style={styles.menuSections}
                    onPress={handlePressHome}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={imageMapping.homeLogo}
                    />
                    <Text style={styles.menuText}>Home</Text>
                </TouchableOpacity>

                {/*Book a listing Section*/}
                <TouchableOpacity
                    style={styles.menuSections}
                    onPress={handleBookPress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo8.png")}
                    />
                    <Text style={styles.menuText}>Book a property</Text>
                </TouchableOpacity>

                {/*Notifications Section*/}
                {/*
                <TouchableOpacity
                    style={styles.menuSections}
                    onPress={handleNotificationsPress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo1.png")}
                    />
                    <Text style={styles.menuText}>Notifications</Text>
                </TouchableOpacity>
                */}

                {/*Nearby Section*/}
                {/*}
                <TouchableOpacity
                    style={styles.menuSections}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/uuu.png")}
                    />
                    <Text style={styles.menuText}>Nearby</Text>
                </TouchableOpacity>
                */}

                {/*Profile Section*/}
                {/*
                <TouchableOpacity
                    style={styles.menuSections}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo16.png")}
                    />
                    <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>
                */}

                {/*Add a listing Section*/}
                <TouchableOpacity
                    style={styles.menuSections}
                    onPress={handleHelpPress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={imageMapping.plusIcon}
                    />
                    <Text style={styles.menuText}>List your property</Text>
                </TouchableOpacity>

                {/*About Section*/}
                <TouchableOpacity
                    style={styles.menuSections}
                    onPress={handleAboutPress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/about-logo.png")}
                    />
                    <Text style={styles.menuText}>About us</Text>
                </TouchableOpacity>

                {/*Contact Section*/}
                <TouchableOpacity
                    style={styles.menuSections}
                    onPress={handleContactPress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo10.png")}
                    />
                    <Text style={styles.menuText}>Contact Us</Text>
                </TouchableOpacity>

                {/*Logout Section*/}
                <TouchableOpacity
                    style={styles.menuSections}
                    onPress={handleLogoutPress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo15.png")}
                    />
                    <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    //Scroll view container :
    scrollViewContainer: {
        flexGrow: 1,
        paddingVertical: 30,
    },

    ///Main container
    menu: {
        flex: 1,
        justifyContent: "space-evenly",
        paddingHorizontal: "5%",
        backgroundColor: "#f9f9f9",
    },
    
    //Each section of the menu
    menuSections: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: "100%",
    },
    
    //Menu icons
    menuIcons: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    
    //Menu text
    menuText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
});

export default Menu;