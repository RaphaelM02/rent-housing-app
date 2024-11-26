import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView, TextInput, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import propertiesData from "../info.json";
import { Border, FontFamily, FontSize, Color } from "./GlobalStyles";
import imageMapping from './imageMappings';
import * as Location from 'expo-location';
import Constants from "expo-constants";
import getImageLink from "../functions/Google_Drive";
import { useLocation } from "../functions/LocationContext";

const {width, height} = Dimensions.get("window");
const googleApiKey = Constants.expoConfig.extra.googleApiKey;

const SearchListing = () => {
    const { latitude, longitude, locationName } = useLocation(); 
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchText, setSearchText] = useState("");
    const navigation = useNavigation();

    //Function to navigate to the menu
    const handlePress = () => { navigation.navigate('Menu'); };

    //Function to get the location between the user's current location and each property :
    const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
    };
    const harvesine = (lat1, lon1, lat2, lon2) => {
        const earthRadius = 6371;

        const lat1Rad = toRadians(lat1);
        const lon1Rad = toRadians(lon1);
        const lat2Rad = toRadians(lat2);
        const lon2Rad = toRadians(lon2);

        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;

        const harvesineFormula = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon/2) * Math.sin(dLon/2);

        const c = 2 * Math.atan2(Math.sqrt(harvesineFormula), Math.sqrt(1 - harvesineFormula));

        const distance = earthRadius * c;

        return distance.toFixed(0);
    };
    //End function to get the location between the user's current location and each property

    //Function to filter properties using the search bar
    const getFilteredProperties = () => {
        return propertiesData.filter(property => {
            const matchesCategory = selectedCategory ? property.type.toLowerCase() === selectedCategory.toLowerCase() : true;
            const matchesSearchText = property.name.toLowerCase().includes(searchText.toLowerCase().trim()) || property.location.toLowerCase().includes(searchText.toLowerCase().trim());
            return matchesCategory && matchesSearchText;
        });
    };

    //Function to filter the properties based on the distance betweent the property and the user
    const filterPropertiesByDistance = () => {
        return propertiesData.sort((a,b) => {
            const distanceA = harvesine(latitude, longitude, a.coordinates.latitude, a.coordinates.longitude);
            const distanceB = harvesine(latitude, longitude, b.coordinates.latitude, b.coordinates.longitude);
            return distanceA - distanceB;
        });
    };

    //Function to render the properties images
    const renderImagesByLocation = (location) => {
        let sortedProperties = getFilteredProperties();

        if (!selectedCategory && !searchText){
            sortedProperties = filterPropertiesByDistance();
        };

        return (
            <ScrollView horizontal style={styles.imageContainer} showsHorizontalScrollIndicator={false}>
                {sortedProperties.map(property => (
                    <TouchableOpacity
                        key={property.name}
                        style={styles.propertyContainer}
                        onPress={() => {
                            navigation.navigate('DetailProduct', {
                                location: property.coordinates,
                                propertyName: property.name,
                                propertyImage: property.photo_url,
                                price: property.price,
                                bathrooms: property.bathroom,
                                bedrooms: property.bedroom,
                                images: property.images,
                                description: property.description,
                                ownerName: property.person.name,
                                ownerImage: property.person.image_url,
                                phonenumber: property.person.phonenumber,
                                email: property.person.email,
                            });
                            
                        }}
                    >
                        <View>
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
                                        {harvesine(latitude, longitude, property.coordinates.latitude, property.coordinates.longitude)} km
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

    //Function to get the best property (closest and cheapest)
    const getBestProperty = (location) => {
        const filteredPropertiesByDistance = filterPropertiesByDistance();
        return filteredPropertiesByDistance.sort((a, b) => a.price - b.price)[0];
    };
    const bestProperty = getBestProperty(locationName);

    return (
        <ScrollView contentContainerStyle={[styles.scrollViewContainer]}>
            <View style={styles.homeScreen}>

                {/*Location and location changer*/}
                <View style={styles.location}>
                    <Text style={styles.locationText}>Location</Text>
                    <Text style={styles.locationName}>{locationName} </Text>
                    <Image
                        style={styles.icNotificationIcon}
                        resizeMode="cover"
                        source={imageMapping.notificationsIcon}
                    />
                </View>

                {/*Search Bar*/}
                <View style={styles.searchBar}>
                    <Image
                        style={styles.icSearchIcon}
                        resizeMode="resize"
                        source={require("../assets/logo3.png")}
                    />
                    <TextInput
                        style={styles.searchAddressBar}
                        placeholder="Search property name or location"
                        value={searchText}
                        onChangeText={setSearchText}
                    />

                    {/*Menu Button*/}
                    <TouchableOpacity onPress={handlePress}>
                        <Image
                            style={[styles.icFilterIcon]}
                            resizeMode="cover"
                            source={require("../assets/logo4.png")}
                        />
                    </TouchableOpacity>
                </View>

                {/*Properties types buttons*/}
                <View style={styles.buttonContainer}>

                    {/*Cottage category*/}
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === "Cottage" ? styles.selectedButton : styles.unselectedButton
                        ]}
                        onPress={
                            selectedCategory != "Cottage" ? () => setSelectedCategory("Cottage") : () => setSelectedCategory("")
                        }
                    >
                        <Text 
                            style={[
                                styles.buttonText,
                                selectedCategory === "Cottage" ? { color: 'white' } : {}
                            ]}
                        >
                            Cottage
                        </Text>
                    </TouchableOpacity>

                    {/*Villa Category*/}
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === "Villa" ? styles.selectedButton : styles.unselectedButton
                        ]}
                        onPress={
                            selectedCategory != "Villa" ? () => setSelectedCategory("Villa") : () => setSelectedCategory("")
                        }
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                selectedCategory === "Villa" ? { color: 'white' } : {}
                            ]}
                        >
                            Villa
                        </Text>
                    </TouchableOpacity>

                    {/*Apartment Category*/}
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === "Apartment" ? styles.selectedButton : styles.unselectedButton
                        ]}
                        onPress={
                            selectedCategory != "Apartment" ? () => setSelectedCategory("Apartment") : () => setSelectedCategory("")
                        }
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                selectedCategory === "Apartment" ? { color: 'white' } : {}
                            ]}
                        >
                            Apartment
                        </Text>
                    </TouchableOpacity>

                    {/*Hotel category*/}
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            selectedCategory === "Hotel" ? styles.selectedButton : styles.unselectedButton
                        ]}
                        onPress={
                            selectedCategory != "Hotel" ? () => setSelectedCategory("Hotel") : () => setSelectedCategory("")
                        }
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                selectedCategory === "Hotel" ? { color: 'white' } : {}
                            ]}
                        >
                            Hotel
                        </Text>
                    </TouchableOpacity>
                </View>

                {/*Get the filtered properties by the distance from the selected location*/}
                <Text style={styles.nearFromYou}>Near you</Text>
                {renderImagesByLocation(locationName)}

                {/*Best property*/}
                <Text style={styles.bestForYouText}>Best for you</Text>
                {bestProperty && (
                    <View key={bestProperty.name} style={styles.bestPropertyContainer}>

                        {/*Best property name*/}
                        <Text style={styles.bestHouseText}>
                            {bestProperty.name}
                        </Text>

                        {/*Best property price*/}
                        <Text style={styles.bestHousePrice}>
                            {bestProperty.price}
                        </Text>

                        {/*Best property bedrooms and bathrooms*/}
                        <View style={styles.bedroomWrapper}>
                            <Image
                                style={styles.iconLayout}
                                resizeMode="cover"
                                source={imageMapping.bedIcon}
                            />
                            <Text style={styles.bedroomAndBathroomText}>{bestProperty.bedroom} Bedroom</Text>
                        </View>

                        <View style={styles.bathroomWrapper}>
                            <Image
                                style={styles.iconLayout}
                                resizeMode="cover"
                                source={imageMapping.bathIcon}
                            />
                            <Text style={styles.bedroomAndBathroomText}>{bestProperty.bathroom} Bathroom</Text>
                        </View>


                        <TouchableOpacity onPress={() => navigation.navigate('DetailProduct', {
                            location: bestProperty.coordinates,
                            propertyName: bestProperty.name,
                            propertyImage: bestProperty.photo_url,
                            price: bestProperty.price,
                            bathrooms: bestProperty.bathroom,
                            bedrooms: bestProperty.bedroom,
                            images: bestProperty.images,
                            description: bestProperty.description,
                            ownerName: bestProperty.person.name,
                            ownerImage: bestProperty.person.image_url,
                            phonenumber: bestProperty.person.phonenumber,
                            email: bestProperty.person.email,
                        })}>
                            <Image
                                style={styles.bestPropertyIcon}
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
    //Main :
    scrollViewContainer: {
        flexGrow: 1,
        paddingBottom: 20,
        backgroundColor: Color.colorWhite,
    },

    homeScreen: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        paddingBottom : 20,
        overflow: "scroll",
        flexDirection: "column",
        justifyContent: "flex-start",
    },
    //End Main



    //Top : Location + Name + Arrow + Notifications icon:
    location: {
        flexDirection: "column",
        marginTop: (0.04 * height),
        marginLeft: (0.05 * width),
        width: width,
        height: "auto",
        position: "absolute",
    },

    locationName: {
        fontSize: 20,
        color: Color.colorBlack,
        fontFamily: "Raleway-Medium",
        textAlign: "left",
    },

    locationText: {
        color: Color.colorGray_300,
        fontFamily: "Raleway-Regular",
        fontSize: FontSize.size_xs,
        textAlign: "left",
    },

    icNotificationIcon: {
        height: "30",
        width: "30",
        marginTop: (0.01 * height),
        marginLeft: (0.82 * width),
        position: "absolute",
    },
    //End Top : Location + Name + Arrow + Notifications icon



    //Search Bar + Menu Button :
    searchBar: {
        backgroundColor: Color.colorWhitesmoke,
        flexDirection: "row",
        top: (0.12 * height),
        left: (0.02 * width),
        width: (0.8 * width),
        height: 50,
        position: "absolute",
        borderRadius: Border.br_3xs,
        borderWidth: 2,
    },

    icSearchIcon: {
        height: "90%",
        width: "12%",
        top: "5%",
        marginHorizontal: "2%",
        position: "relative",
    },

    searchAddressBar: {
        width: "88%",
        height: "100%",
        color: Color.colorGray_200,
        textAlign: "left",
        fontFamily: FontFamily.ralewayRegular,
        fontSize: FontSize.size_xs,
        position: "relative",
    },

    icFilterIcon: {
        width: 50,
        height: "100%",
        position: "relative",
    },
    //End Search Bar + Menu



    //Category Types Buttons:
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        top: (0.20 * height),
        //position : "absolute",
        //paddingHorizontal: 20,
    },

    categoryButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: "1%",
        //width: "auto",
        borderRadius: Border.br_3xs,
    },

    selectedButton: {
        backgroundColor: "#0A8ED9",
    },

    unselectedButton: {
        backgroundColor: Color.colorWhitesmoke,
    },

    buttonText: {
        color: Color.colorGray_200,
        fontFamily: "Raleway-Regular",
        fontSize: FontSize.size_sm_7,
    },
    //End category types buttons



    //Near from you text & Properties and their images under the near from you text :
    nearFromYou: {
        top: (0.26 * height),
        fontSize: FontSize.size_base,
        fontFamily: "Raleway-SemiBold",
        marginHorizontal: (0.05 * width),
        textAlign: "left",
        position: "absolute",
    },

    propertiesImagesContainer: {
        top:(0.30 * height),
        position: "absolute",
        height: "70%",

        //borderWidth: 2, //Debugging
        //borderColor: "blue", //Debugging
    },

    imageContainer: {
        flexDirection: "row",
        position: "absolute",
        height: (0.4 * height),
        top: (0.30 * height),
        width: width,
    },

    propertyContainer: {
        width: 300,
        height: "100%",
        paddingHorizontal: 2,
        overflow: "hidden",
    },

    propertyImage: {
        width: "100%",
        height: "100%",
        borderRadius: 25, 
    },

    distanceContainer: {
        position: "absolute",
        top: 10,
        right: 10,
        //flexDirection: "row",
        //alignItems: "center",
        //borderWidth: 2,
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

    propertyDistanceOnImage: {
        color: Color.colorWhite,
        fontSize: 12,
    },

    propertyName: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.ralewayMedium,
        color: "#fff",
        marginTop: -45,
        marginLeft: 20,
    },

    propertyPrice: {
        fontSize: FontSize.size_xs,
        fontFamily: FontFamily.ralewayRegular,
        color: "#D4D4D4",
        marginLeft: 20, 

    },
    //End Properties and their images under the near from you text :



    //Best for you text & best property :
    bestForYouText: {
        top: (0.71 * height),
        fontSize: FontSize.size_base,
        fontFamily: "Raleway-SemiBold",
        marginHorizontal: "5%",
        textAlign: "left",
        position: "absolute",
    },

    bestPropertyContainer: {
        top: (0.72 * height),
        marginHorizontal: "5%",
        width: width,
        borderRadius: 10,
        position: "relative",
    },

    bestHouseText: {
        marginHorizontal: "23%",
        fontSize: FontSize.size_base,
        fontFamily: "Raleway-Medium",
        position: "absolute",
    },

    bestHousePrice: {
        top: 27,
        color: "#0a8ed9",
        marginHorizontal: 94,
        fontFamily: FontFamily.ralewayRegular,
        fontSize: FontSize.size_xs,
        textAlign: "left",
        position: "absolute",
    },

    bedroomWrapper: {
        width: 94,
        left: 94,
        top: 46,
        height: 24,
        position: "absolute",
    },

    iconLayout: {
        height: 24,
        width: 24,
        position: "absolute",
        overflow: "hidden",
    },

    bedroomAndBathroomText: {
        top: 5,
        left: 32,
        color: Color.colorGray_100,
        fontFamily: "Raleway-Regular",
        fontSize: FontSize.size_xs,
        textAlign: "left",
        position: "absolute",
    },

    bathroomWrapper: {
        left: 208,
        width: 97,
        top: 46,
        height: 24,
        position: "absolute",
    },

    bestPropertyIcon: {
        top: 0,
        left: 0,
        width: 70,
        height: 70,
        position: "absolute",
        borderRadius: 10,
    },
    //End Best for you text & best property
});

export default SearchListing;