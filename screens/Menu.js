import * as React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { FontFamily, Color, FontSize, Border } from "./GlobalStyles";

const Menu = ({ navigation }) => {
    const handlePress = () => {
        navigation.navigate('WhitePage');
    };

    const handlePressHome = () => {
        navigation.navigate('Home');
    };


    return (
        <View style={styles.menu}>
            <View style={[styles.menu1, styles.menuLayout1]}>
                <View style={[styles.menuChild, styles.childIconPosition]} />
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handlePressHome}
                >
                    <Image
                        style={[styles.icHomeIcon, styles.bookmarkIconLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo11.png")}
                    />
                    <Text style={styles.home}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.bookmark, styles.bookmarkIconLayout]}
                    onPress={handlePress}
                >
                    <Text style={[styles.bookmark1, styles.bookmark1Typo]}>Bookmark</Text>
                    <Image
                        style={[styles.icBookmarkIcon, styles.bookmarkIconLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo8.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.notification, styles.bookmarkIconLayout]}
                    onPress={handlePress}
                >
                    <Text style={[styles.notification1, styles.bookmark1Typo]}>
                        Notification
                    </Text>
                    <Image
                        style={[styles.icNotificationIcon, styles.notificationIconLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo1.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.nearby, styles.bookmarkIconLayout]}
                    onPress={handlePress}
                >
                    <Text style={[styles.notification1, styles.bookmark1Typo]}>
                        Nearby
                    </Text>
                    <Image
                        style={[styles.icBookmarkIcon, styles.bookmarkIconLayout]}
                        resizeMode="cover"
                        source={require("../assets/uuu.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.message, styles.bookmarkIconLayout]}
                    onPress={handlePress}
                >
                    <Image
                        style={[styles.icBookmarkIcon, styles.bookmarkIconLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo10.png")}
                    />
                    <Text style={[styles.bookmark1, styles.bookmark1Typo]}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.setting, styles.logoutLayout]}
                    onPress={handlePress}
                >
                    <Image
                        style={[styles.icBookmarkIcon, styles.bookmarkIconLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo13.png")}
                    />
                    <Text style={[styles.bookmark1, styles.bookmark1Typo]}>Setting</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.profile, styles.bookmarkIconLayout]}
                    onPress={handlePress}
                >
                    <Text style={[styles.bookmark1, styles.bookmark1Typo]}>Profile</Text>
                    <Image
                        style={[styles.icBookmarkIcon, styles.bookmarkIconLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo16.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.help, styles.bookmarkIconLayout]}
                    onPress={handlePress}
                >
                    <Image
                        style={[styles.icBookmarkIcon, styles.bookmarkIconLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo14.png")}
                    />
                    <Text style={[styles.bookmark1, styles.bookmark1Typo]}>Help</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.logout, styles.logoutLayout]}
                    onPress={handlePress}
                >
                    <Image
                        style={[styles.icBookmarkIcon, styles.bookmarkIconLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo15.png")}
                    />
                    <Text style={[styles.notification1, styles.bookmark1Typo]}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    menuLayout1: {
        width: 192,
        position: "absolute",
    },
    childIconPosition: {
        left: 0,
        top: 0,
    },
    bookmarkIconLayout: {
        height: 20,
        position: "absolute",
    },
    bookmark1Typo: {
        fontFamily: FontFamily.ralewayRegular,
        left: 40,
        color: Color.colorBlack,
        textAlign: "left",
        fontSize: FontSize.size_base,
        position: "absolute",
    },
    notificationIconLayout: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
    },
    logoutLayout: {
        width: 93,
        height: 24,
        left: 38,
        position: "absolute",
    },
    menuLayout: {
        width: 164,
        left: 15,
        maxHeight: "100%",
        position: "absolute",
    },
    icNearPosition: {
        position: "absolute",
        overflow: "hidden",
    },
    seeTypo: {
        height: 12,
        fontSize: FontSize.size_2xs_3,
        fontFamily: FontFamily.ralewayRegular,
        textAlign: "left",
    },
    ascotLayout: {
        height: 233,
        width: 190,
        position: "absolute",
    },
    breezesLayout: {
        height: 60,
        position: "absolute",
    },
    houseTypo: {
        color: Color.colorBlack,
        left: 81,
        height: 16,
        fontSize: FontSize.size_sm_7,
        textAlign: "left",
        fontFamily: FontFamily.ralewayMedium,
        fontWeight: "500",
        top: 0,
        position: "absolute",
    },
    bedroomLayout: {
        height: 21,
        position: "absolute",
    },
    bedroom1Position: {
        left: 27,
        top: 4,
        height: 12,
        color: Color.colorGray_200,
        fontSize: FontSize.size_2xs_3,
        fontFamily: FontFamily.ralewayRegular,
        textAlign: "left",
        position: "absolute",
    },
    bedroom3Position: {
        color: Color.colorGray_100,
        left: 27,
        top: 4,
        height: 12,
        fontSize: FontSize.size_2xs_3,
        fontFamily: FontFamily.ralewayRegular,
        textAlign: "left",
        position: "absolute",
    },
    menuChild: {
        height: 40,
        width: 192,
        position: "absolute",
        borderRadius: Border.br_xl,
    },
    icHomeIcon: {
        top: -160,
        width: 24,
        height: 24,
        overflow: "hidden",
        left: 38,
    },
    home: {
        top: -160,
        left: 78,
        textAlign: "left",
        fontFamily: FontFamily.ralewayMedium,
        fontWeight: "500",
        fontSize: FontSize.size_base,
        color: Color.colorBlack,
        position: "absolute",
    },
    bookmark1: {
        top: 3,
        color: Color.colorWhite,
    },
    icBookmarkIcon: {
        width: 24,
        height: 24,
        overflow: "hidden",
        left: 0,
        top: 0,
    },
    bookmark: {
        top: 219,
        width: 116,
        left: 38,
    },
    notification1: {
        top: 2,
        color: Color.colorWhite,
    },
    icNotificationIcon: {
        height: "100%",
        width: "19.35%",
        top: "0%",
        right: "80.65%",
        bottom: "0%",
        left: "0%",
    },
    notification: {
        top: 275,
        width: 124,
        left: 38,
    },
    nearby: {
        top: 131,
        width: 95,
        left: 38,
    },
    message: {
        top: 331,
        width: 107,
        left: 38,
    },
    setting: {
        top: 419,
    },
    profile: {
        top: 75,
        width: 87,
        left: 38,
    },
    help: {
        top: 475,
        width: 76,
        left: 38,
    },
    logout: {
        top: 531,
    },
    menuItem: {
        top: 187,
    },
    menuInner: {
        top: 387,
    },
    menu1: {
        top: 127,
        left: -14,
        height: 555,
    },
    menu: {
        backgroundColor: Color.colorCornflowerblue,
        flex: 1,
        width: "100%",
        height: 812,
        overflow: "hidden",
        borderRadius: Border.br_xl,
    },
});

export default Menu;