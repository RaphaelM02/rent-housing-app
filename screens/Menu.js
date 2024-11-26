import * as React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import { FontFamily, Color, FontSize, Border } from "./GlobalStyles";
import imageMapping from "./imageMappings";
import { useUser } from "./UserContext";

const {width, height} = Dimensions.get("window");

const Menu = ({ navigation }) => {
    const {user, logout} = useUser();

    const handlePress = () => { navigation.navigate('WhitePage'); };
    const handlePressHome = () => { navigation.navigate('Home'); };
    const handleLogoutPress = () => { navigation.navigate('LogIn'); };
    const handleHelpPress = () => { navigation.navigate('AddListing'); };
    const handleBookPress = () => { navigation.navigate('SearchListing'); };

    //Testing :
    const handleNotificationsPress = () => { navigation.navigate('GoogleDrive'); };

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
                    <Text style={styles.menuText}>Book your property</Text>
                </TouchableOpacity>

                {/*Notifications Section*/}
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

                {/*Nearby Section*/}
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

                {/*Messages Section*/}
                <TouchableOpacity
                    style={styles.menuSections}
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
                    style={styles.menuSections}
                    onPress={handlePress}
                >
                    <Image
                        style={styles.menuIcons}
                        resizeMode="cover"
                        source={require("../assets/logo13.png")}
                    />
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>

                {/*Profile Section*/}
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

                {/*Help Section*/}
                <TouchableOpacity
                    style={styles.menuSections}
                    onPress={handleHelpPress}
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
    scrollViewContainer: {
        flexGrow: 1,
        paddingVertical: 30,
    },

    menu: {
        flex: 1,
        justifyContent: "space-evenly",
        paddingHorizontal: "5%",
        backgroundColor: "#f9f9f9",
    },
      
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
      
    menuIcons: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
      
    menuText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
});

export default Menu;