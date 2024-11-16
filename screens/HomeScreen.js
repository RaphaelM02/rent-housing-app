import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import propertiesData from "../info.json";
import { Border, FontFamily, FontSize, Color } from "./GlobalStyles";
import imageMapping from './imageMappings';
import { useFonts } from "expo-font";

const locations = ["Jakarta", "Bali", "Surabaya"];

const HomeScreen = () => {
    let [fontsLoaded] = useFonts({
        'Raleway-Regular': require('../assets/fonts/Raleway-Regular.ttf'),
        'Raleway-Medium': require('../assets/fonts/Raleway-Medium.ttf'),
        'Raleway-SemiBold': require('../assets/fonts/Raleway-SemiBold.ttf'),
    })

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
    const navigation = useNavigation();
    const handlePress = () => {
        navigation.navigate('Menu');
    };

    const getFilteredProperties = () => {
        return propertiesData.filter(property => {
            const matchesCategory = selectedCategory ? property.type.toLowerCase() === selectedCategory.toLowerCase() : true;
            const matchesSearchText = property.name.toLowerCase().includes(searchText.toLowerCase().trim()) || property.location.toLowerCase().includes(searchText.toLowerCase().trim());
            return matchesCategory && matchesSearchText;
        });
    };

    const getBestProperty = () => {
        const filteredProperties = propertiesData.filter(property =>
            property.location.toLowerCase().includes(locations[currentLocationIndex].toLowerCase())
        );
        return filteredProperties.sort((a, b) => a.price - b.price)[0];
    };



    const renderImages = () => {
        let filteredProperties = getFilteredProperties();

        if (!selectedCategory && !searchText) {
            filteredProperties = propertiesData.sort((a, b) => a.price - b.price).slice(0, 2);
        }

        return (
            <ScrollView horizontal style={styles.imageContainer}>
                {filteredProperties.map(property => (
                    <TouchableOpacity
                        key={property.name}
                        style={styles.propertyContainer}
                        onPress={() => navigation.navigate('DetailProduct', {
                            photo_url: property.photo_url,
                            bedroom: property.bedroom,
                            bathroom: property.bathroom,
                            description: property.description,
                            images: property.images,
                            name: property.person.name,
                            location: property.coordinates,
                            item_name: property.name,
                            price: property.price,
                            phonenumber: property.person.phonenumber,
                            email: property.person.email,
                            position: property.person.position,
                            photoo: property.person.image_url,
                        })}
                    >
                        <View style={styles.imageWrapper}>
                            <Image
                                style={styles.propertyImage}
                                resizeMode="cover"
                                source={imageMapping[property.photo_url]}
                            />
                            <View style={styles.distanceContainer}>
                                <View style={styles.circularContainer}>
                                    <Image
                                        style={styles.distanceIcon}
                                        resizeMode="cover"
                                        source={imageMapping["../assets/logo12.png"]}
                                    />
                                    <Text style={styles.propertyDistanceOnImage}>
                                        {property.distances[locations[currentLocationIndex]]} km
                                    </Text>
                                </View>
                            </View>
                            <Text style={styles.propertyName}>{property.name}</Text>
                            <Text style={styles.propertyPrice}>{property.price}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    };

    

    const changeLocation = () => {
        setCurrentLocationIndex((currentLocationIndex + 1) % locations.length);
    };

    const bestProperty = getBestProperty();

    return (
        <ScrollView>
            <View style={styles.homeScreen}>
                <View style={[styles.searchBar, styles.searchBarLayout]}>
                    <TextInput
                        style={[styles.searchAddressOr, styles.bedroom1Typo]}
                        placeholder="Search address, or near you"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <Image
                        style={[styles.icSearchIcon, styles.iconLayout1]}
                        resizeMode="cover"
                        source={require("../assets/logo3.png")}
                    />
                </View>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={handlePress}>
                    <Image
                        style={[styles.icFilterIcon, styles.searchBarLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo4.png")}
                    />
                </TouchableOpacity>
                <Image
                    style={[styles.icNotificationIcon, styles.iconLayout1]}
                    resizeMode="cover"
                    source={require("../assets/logo1.png")}
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === "Cottage" ? styles.selectedButton : styles.unselectedButton
                        ]}
                        onPress={() => setSelectedCategory("Cottage")}
                    >
                        <Text style={[
                            styles.buttonText,
                            selectedCategory === "Cottage" ? { color: 'white' } : {}
                        ]}>Cottage</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === "Villa" ? styles.selectedButton : styles.unselectedButton
                        ]}
                        onPress={() => setSelectedCategory("Villa")}
                    >
                        <Text style={[
                            styles.buttonText,
                            selectedCategory === "Villa" ? { color: 'white' } : {}
                        ]}>Villa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === "Apartment" ? styles.selectedButton : styles.unselectedButton
                        ]}
                        onPress={() => setSelectedCategory("Apartment")}
                    >
                        <Text style={[
                            styles.buttonText,
                            selectedCategory === "Apartment" ? { color: 'white' } : {}
                        ]}>Apartment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === "Hotel" ? styles.selectedButton : styles.unselectedButton
                        ]}
                        onPress={() => setSelectedCategory("Hotel")}
                    >
                        <Text style={[
                            styles.buttonText,
                            selectedCategory === "Hotel" ? { color: 'white' } : {}
                        ]}>Hotel</Text>
                    </TouchableOpacity>
                </View>

                {renderImages()}
                <Text style={[styles.nearFromYou, styles.youTypo]}>Near from you</Text>
                <View style={styles.location}>
                    <Text style={[styles.jakarta, styles.youTypo]}>{locations[currentLocationIndex]}</Text>
                    <Text style={[styles.location1, styles.bedroom1Typo]}>Location</Text>
                    <TouchableOpacity onPress={changeLocation}>
                        <Image
                            style={[styles.icArrowDownIcon, styles.iconLayout]}
                            resizeMode="cover"
                            source={require("../assets/logo2.png")}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.bestForYou, styles.youTypo]}>Best for you</Text>
                {bestProperty && (
                    <View key={bestProperty.name} style={[styles.littleCopseHouse, styles.imageIconLayout]}>
                        <Text style={[styles.littleCopseHouse1, styles.youTypo]}>
                            {bestProperty.name}
                        </Text>
                        <Text style={[styles.rp900000000, styles.bedroom1Typo]}>
                            {bestProperty.price} / Year
                        </Text>
                        <View style={[styles.bedroom, styles.bedroomPosition]}>
                            <Image
                                style={[styles.icBedIcon, styles.iconLayout]}
                                resizeMode="cover"
                                source={require("../assets/logo5.png")}
                            />
                            <Text style={[styles.bedroom1, styles.bedroom1Typo]}>{bestProperty.bedroom} Bedroom</Text>
                        </View>
                        <View style={[styles.bathroom, styles.bedroomPosition]}>
                            <Image
                                style={[styles.icBathIcon, styles.iconLayout]}
                                resizeMode="cover"
                                source={require("../assets/logo6.png")}
                            />
                            <Text style={[styles.bedroom1, styles.bedroom1Typo]}>{bestProperty.bathroom} Bathroom</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('DetailProduct', {
                            photo_url: bestProperty.photo_url,
                            bedroom: bestProperty.bedroom,
                            bathroom: bestProperty.bathroom,
                            description: bestProperty.description,
                            image_url: bestProperty.photo_url,
                            images: bestProperty.images,
                            name: bestProperty.person.name,
                            location: bestProperty.coordinates,
                            item_name: bestProperty.name,
                            price: bestProperty.price,
                            phonenumber: bestProperty.person.phonenumber,
                            email: bestProperty.person.email,
                            position: bestProperty.person.position,
                            photoo: bestProperty.person.image_url,

                        })}>
                            <Image
                                style={[styles.imageIcon, styles.imageIconLayout]}
                                resizeMode="cover"
                                source={imageMapping[bestProperty.photo_url]}
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    searchBarLayout: {
        height: 48,
        borderRadius: Border.br_3xs,
        top: 93,
        position: "absolute",
        overflow: "hidden",
    },
    propertyDistanceOnImage: {
        color: Color.colorWhite,
        fontSize: 12,
    },
    distanceContainer: {
        position: "absolute",
        bottom: 235,
        left: 165,
        flexDirection: "row",
        alignItems: "center",
    },
    circularContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 5,
    },
    distanceIcon: {
        width: 25,
        height: 20,
        marginRight: 4,
    },
    propertyImage: {
        width: '100%',
        height: 200,
    },
    icFilterIcon: {
        left: 310,
        width: 48,
    },
    bedroom1Typo: {
        textAlign: "left",
        fontFamily: FontFamily.ralewayRegular,
        fontSize: FontSize.size_xs,
        position: "absolute",
    },
    iconLayout1: {
        maxHeight: "100%",
        maxWidth: "100%",
        position: "absolute",
        overflow: "hidden",
    },
    youTypo: {
        color: Color.colorBlack,
        fontFamily: FontFamily.ralewayMedium,
        fontWeight: "500",
        textAlign: "left",
        position: "absolute",
    },
    iconLayout: {
        height: 24,
        width: 24,
        position: "absolute",
        overflow: "hidden",
    },
    imageIconLayout: {
        height: 70,
        position: "absolute",
        borderRadius: 10,
    },
    bedroomPosition: {
        top: 46,
        height: 24,
        position: "absolute",
    },
    searchAddressOr: {
        top: 0,
        left: 52,
        color: Color.colorGray_200,
        textAlign: "left",
        fontFamily: FontFamily.ralewayRegular,
        fontSize: FontSize.size_xs,
    },
    icSearchIcon: {
        height: "50%",
        width: "8.85%",
        top: "25%",
        right: "85.23%",
        bottom: "25%",
        left: "5.91%",
    },
    searchBar: {
        backgroundColor: "#f7f7f7",
        width: 279,
        left: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 165,
        paddingHorizontal: 0,
        borderRadius: Border.br_3xs,
        width:110,
        height: 40,
    },
    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 2,
        borderRadius: 5,
        borderRadius: Border.br_3xs,
    },
    selectedButton: {
        backgroundColor: "#A0DAFB",
        borderRadius: 15, 
        backgroundColor: "#0A8ED9",
    },
    unselectedButton: {
        backgroundColor: "#F7F7F7",
        borderRadius: Border.br_3xs, // Apply the borderRadius style here
    },
    buttonText: {
        color: "#858585",
        fontFamily: FontFamily.ralewayRegular,
        fontSize: FontSize.size_base,
    
    },
    imageContainer: {
        marginTop: 60,
        paddingHorizontal: 15,
        borderRadius: 10, 
    },
    propertyImage: {
        width: 250,
        height: 300,
        marginRight: 20,
        borderRadius: 25, 
    },
    propertyContainer: {
        marginRight: 10,
    },
    propertyName: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.ralewayMedium,
        fontWeight: "500",
        color: "#fff",
        marginTop: -45,
        marginLeft: 40, 
        
        

    },
    propertyPrice: {
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.ralewayRegular,
        color: "#D4D4D4",
        marginLeft: 40, // Adjust this value as needed

    },
    propertyDetails: {
        marginTop: 5,
    },
    propertyLocation: {
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.ralewayRegular,
        color: Color.colorGray_200,
    },
    propertyType: {
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.ralewayRegular,
        color: Color.colorGray_200,
    },
    nearFromYou: {
        top: 227,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.ralewayMedium,
        fontWeight: "500",
        left: 20,
    },
    jakarta: {
        top: 22,
        fontSize: 20,
        left: 0,
    },
    location1: {
        color: "#838383",
        top: 0,
        left: 0,
        fontFamily: FontFamily.ralewayRegular,
        fontSize: FontSize.size_xs,
        textAlign: "left",
    },
    icArrowDownIcon: {
        top: 25,
        left: 85,
    },
    location: {
        top: 24,
        width: 96,
        height: 47,
        left: 20,
        position: "absolute",
    },
    bestForYou: {
        top: 574,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.ralewayMedium,
        fontWeight: "500",
        left: 20,
    },
    littleCopseHouse1: {
        left: 94,
        top: 0,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.ralewayMedium,
        fontWeight: "500",
    },
    rp900000000: {
        top: 27,
        color: "#0a8ed9",
        left: 94,
        fontFamily: FontFamily.ralewayRegular,
        fontSize: FontSize.size_xs,
        textAlign: "left",
    },
    icBedIcon: {
        top: 0,
        left: 0,
    },
    bedroom1: {
        top: 5,
        left: 32,
        color: Color.colorGray_100,
        fontFamily: FontFamily.ralewayRegular,
        fontSize: FontSize.size_xs,
        textAlign: "left",
    },
    bedroom: {
        width: 94,
        left: 94,
    },
    bathroom: {
        left: 208,
        width: 97,
    },
    imageIcon: {
        top: 0,
        left: 0,
        width: 70,
    },
    littleCopseHouse: {
        top: 617,
        left: 20,
        width: 327,
    },
    homeScreen: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        height: 812,
        overflow: "hidden",
        width: "100%",
    },
    icNotificationIcon: {
        height: "2.96%",
        width: "6.4%",
        top: "3.94%",
        right: "5.33%",
        bottom: "93.1%",
        left: "88.27%",
    },
});

export default HomeScreen;