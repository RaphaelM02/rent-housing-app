import * as React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions } from "react-native";
import { FontFamily, Color, FontSize, Border } from "./GlobalStyles";
import imageMapping from "./imageMappings";
import { useUser } from "./UserContext";

const {width, height} = Dimensions.get("window");

const Menu = ({ navigation }) => {
    const {user, logout} = useUser();

    const handlePress = () => {
        navigation.navigate('WhitePage');
    };

    const handlePressHome = () => {
        navigation.navigate('Home');
    };


    return (
            <View style={styles.menu}>

                {/*Home Section*/}
                <TouchableOpacity
                    style={[styles.menuSections, styles.homeSection]}
                    onPress={handlePressHome}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={imageMapping.homeLogo}
                    />
                    <Text style={styles.menuText}>Home</Text>
                </TouchableOpacity>

                {/*Bookmark Section*/}
                <TouchableOpacity
                    style={[styles.menuSections, styles.bookmarkSection]}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo8.png")}
                    />
                    <Text style={styles.menuText}>Bookmark</Text>
                </TouchableOpacity>

                {/*Notifications Section*/}
                <TouchableOpacity
                    style={[styles.menuSections, styles.notificationSection]}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo1.png")}
                    />
                    <Text style={styles.menuText}>Notifications</Text>
                </TouchableOpacity>

                {/*Nearby Section*/}
                <TouchableOpacity
                    style={[styles.menuSections, styles.nearbySection]}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/uuu.png")}
                    />
                    <Text style={styles.menuText}>Nearby</Text>
                </TouchableOpacity>

                {/*Messages Section*/}
                <TouchableOpacity
                    style={[styles.menuSections, styles.messagesSection]}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo10.png")}
                    />
                    <Text style={styles.menuText}>Messages</Text>
                </TouchableOpacity>

                {/*Settings Section*/}
                <TouchableOpacity
                    style={[styles.menuSections, styles.settingsSection]}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo13.png")}
                    />
                    <Text style={styles.menuText}>Setting</Text>
                </TouchableOpacity>

                {/*Profile Section*/}
                <TouchableOpacity
                    style={[styles.menuSections, styles.profileSection]}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo16.png")}
                    />
                    <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>

                {/*Help Section*/}
                <TouchableOpacity
                    style={[styles.menuSections, styles.helpSection]}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo14.png")}
                    />
                    <Text style={styles.menuText}>Help</Text>
                </TouchableOpacity>

                {/*Logout Section*/}
                <TouchableOpacity
                    style={[styles.menuSections, styles.logoutSection]}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo15.png")}
                    />
                    <Text style={styles.menuText}>Logout</Text>
                </TouchableOpacity>
            </View>

    );
};

const styles = StyleSheet.create({
    menu: {
        width: width,
        height: height,
        position: "absolute",
        padding: "2%",
        //alignItems: "center",
    },

    menuSections: {
        width: "auto",
        height: "7%",
        flexDirection: "row",
        backgroundColor: "#d9d9d9",
        borderRadius: Border.br_3xs,
        borderWidth: 2,
        borderColor: "#d9d9d9",
    },

    menuIcons: {
        width: "50",
        height: "100%",
        position: "relative",
    },

    menuText: {
        fontFamily: "Raleway-Medium",
        fontSize: FontSize.size_base,
        color: Color.colorBlack,
        position: "relative",
        top: "25%",
        left: "1%",
    },

    homeSection: {
        top: height / 9,
    },

    bookmarkSection: {
        top: (height / 9) + 10,
    },

    notificationSection: {
        top: (height / 9) + 20,
    },

    nearbySection: {
        top: (height / 9) + 30,
    },

    messagesSection: {
        top: (height / 9) + 40,
    },

    settingsSection: {
        top: (height / 9) + 50,
    },

    profileSection: {
        top: (height / 9) + 60,
    },

    helpSection: {
        top: (height / 9) + 70,
    },

    logoutSection: {
        top: (height / 9) + 80,
    },
});

export default Menu;