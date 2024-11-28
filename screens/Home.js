import React from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import { FontAwesome5 } from "@expo/vector-icons";
import imageMapping from "./imageMappings";

const { width, height } = Dimensions.get("window");

const Home = () => {
    const navigation = useNavigation();

    const handleSearchListingPress = () => navigation.navigate("SearchListing");
    const handleMenuPress = () => navigation.navigate("Menu");

    const Welcome = () => (
        <LinearGradient
            colors={["#4facfe", "#00f2fe"]}
            style={styles.welcomeContainer}
        >
            <Text style={styles.title}>Welcome to Safe Shelter</Text>
            <Text style={styles.subtitle}>
                A platform for finding refuge and rebuilding lives.
            </Text>
        </LinearGradient>
    );

    const NavBar = () => (
        <View style={styles.navBarContainer}>
            <TouchableOpacity
                style={styles.searchListingButton}
                onPress={handleSearchListingPress}
            >
                <Text style={styles.searchListingText}>
                    Find Your Next Property 🚪
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleMenuPress}>
                <Image
                style={styles.icFilterIcon}
                resizeMode="cover"
                source={require("../assets/logo4.png")}
            />
            </TouchableOpacity>
        </View>
    );

    const Mission = () => (
        <View style={styles.missionContainer}>
            <FontAwesome5
                name="hands-helping"
                size={40}
                color="#ff6b6b"
                style={styles.missionIcon}
            />
            <Text style={styles.missionText}>
                Our mission is to connect individuals and families with safe, temporary homes during times of crisis.
            </Text>
        </View>
    );

    const Slideshow = () => (
        <View style={styles.slideshowContainer}>
            <Swiper
                style={styles.slideshowWrapper}
                autoplay
                autoplayTimeout={3}
                loop
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
            >
                <View style={styles.slideshowSlide}>
                    <Image
                        source={imageMapping["../assets/images/hall.jpg"]}
                        style={styles.slideshowImage}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.slideshowSlide}>
                    <Image
                        source={imageMapping["../assets/images/bathroom-1.jpg"]}
                        style={styles.slideshowImage}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.slideshowSlide}>
                    <Image
                        source={imageMapping["../assets/images/bathroom-2.jpg"]}
                        style={styles.slideshowImage}
                        resizeMode="cover"
                    />
                </View>
            </Swiper>
        </View>
    );

    const Services = () => {
        return (
            <View style={styles.servicesContainer}>
                <Text style={styles.servicesTitle}>Our Services</Text>
                <View style={styles.servicesList}>
                    <View style={styles.serviceItem}>
                        <FontAwesome5 name="search" size={30} color="#4caf50" />
                        <Text style={styles.serviceText}>Property Search</Text>
                        <Text style={styles.serviceDescription}>
                            Easily browse and filter through properties to find the perfect match for your needs.
                        </Text>
                    </View>
      
                    <View style={styles.serviceItem}>
                        <FontAwesome5 name="home" size={30} color="#ff9800" />
                        <Text style={styles.serviceText}>Emergency Housing</Text>
                        <Text style={styles.serviceDescription}>
                            Access safe and secure housing options during times of crisis.
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
      
    return (
        <ScrollView style={styles.mainScrollViewContainer}>
            <View style={styles.homeContainer}>
                <Welcome />
                <NavBar />
                <Mission />
                <Slideshow />
                <Services />
            </View>
        </ScrollView>
    ); 
};

const styles = StyleSheet.create({
    mainScrollViewContainer: {
        flexGrow: 1,
    },

    homeContainer: {
        backgroundColor: "#f9f9f9",
        flex: 1,
        width: width,
    },
    
    // Welcome Section
    welcomeContainer: {
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
        height: 200,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },

    subtitle: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
        marginTop: 10,
    },
    //End welcome section

    // Navigation Bar
    navBarContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        marginVertical: 10,
    },

    searchListingButton: {
        backgroundColor: "#4facfe",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },

    searchListingText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },

    icFilterIcon: {
        width: 50,
        height: 50,
    },
    //End navigation bar

    // Mission Section
    missionContainer: {
        flexDirection: "row",
        alignItems: "center",
        margin: 20,
        padding: 15,
        backgroundColor: "white",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },

    missionIcon: {
        marginRight: 10,
    },

    missionText: {
        flex: 1,
        fontSize: 16,
        color: "#555",
    },
    //End mission section

    // Slideshow
    slideshowContainer: {
        height: 300,
        marginTop: 10,
        marginHorizontal: 5,
    },

    slideshowWrapper: {
        borderRadius: 15,
    },

    slideshowSlide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    slideshowImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },

    dot: {
        backgroundColor: "rgba(255,255,255,0.5)",
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },

    activeDot: {
        backgroundColor: "#4facfe",
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 3,
    },
    //End slideshow

    // Services Section
    servicesContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },

    servicesTitle: {
        fontSize: 24,
        fontFamily: "Raleway-SemiBold",
        textAlign: "center",
        color: "#333",
        marginBottom: 10,
    },

    servicesList: {
        marginTop: 10,
    },

    serviceItem: {
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: "#e0e0e0",
        borderRadius: 10,
        backgroundColor: "#fff",
    },

    serviceText: {
        fontSize: 18,
        fontFamily: "Raleway-SemiBold",
        color: "#333",
        marginTop: 8,
    },

    serviceDescription: {
        fontSize: 14,
        fontFamily: "Raleway-Regular",
        color: "#666",
        textAlign: "center",
        marginTop: 5,
        lineHeight: 20,
    },
    //End services section
});

export default Home;
