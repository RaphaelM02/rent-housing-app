import React, { useEffect, useState, useCallback, useRef } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView, TextInput, Dimensions, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Color , Border } from './GlobalStyles'
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { Picker } from "@react-native-picker/picker";
import { useLocation } from "../functions/LocationContext";
import { useUser } from "./UserContext";
import { useListings } from "../functions/LoadListings";
import { useNavigation } from "@react-navigation/native";

const MemoizedGooglePlacesAutoComplete = React.memo(GooglePlacesAutocomplete);
const MemoizedMapView = React.memo(MapView);
const {width, height} = Dimensions.get("screen");
const googleApiKey = Constants.expoConfig.extra.googleApiKey;

const AddListing = () => {
    const navigation = useNavigation();
    const [inputHidden, setInputHidden] = useState(false);
    const [isFechingLocation, setIsFetchingLocation] = useState(false);
    const {latitude , longitude, locationName} = useLocation();
    const {user, login, logout} = useUser();
    const {viewListings} = useListings();

    const descriptionRef = useRef(null);
    const priceRef = useRef(null);
    const bathroomsRef = useRef(null);
    const bedroomsRef = useRef(null);
    const typeRef = useRef(null);


    //Fields and function to update them :
    const [apartment, setApartment] = useState({
        location: "", //Location Selecter Done
        name: "", //Input Fields Done
        photo_url: "", //Input Fields //Done// Image Selector
        price: "", //Input Fields Done
        type: "", //Input Fields //Done// TypeSelection
        bathroom: 0, //Input Fields Done
        bedroom: 0, //Input Fields Done
        images: [], //Input Fields //Done// Image Selector
        distances: {},
        description: "", //Input Fields Done
        person: {
            name: user.name,
            image_url: user.avatar,
            phonenumber: user.phoneNo,
            email: user.email,
            position: user.position,
        },
        coordinates: { //Location Selecter //Done// markerPosition
            latitude: null,
            longitude: null,
        },
    });

    //Default marker position for the map :
    const [markerPosition, setMarkerPosition] = useState({
        latitude: latitude,
        longitude: longitude,
    });

    //Default region for the map based on the marker position :
    const [region, setRegion] = useState({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.04,
    });

    //Functions to update fields
    const updateField = (key, value) => {
        setApartment((prev) => ({...prev, [key]:value}));
    };

    const updateNestedField = (parentKey, childKey, value) => {
        setApartment((prev) => ({
            ...prev,
            [parentKey]: {
                ...prev[parentKey],
                [childKey]: value,
            },
        }));
    };
    //End function to update fields
    //End fields and functions to update them


    //Function to upload the images :
    const uploadImages = async () => {
        try {
            let images = [];
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: true,
                multiple: true,
            });
            const document = result.assets;

            const propertyImagesDir = FileSystem.cacheDirectory+'property_images/';
            const propertyImagesDirInfo = await FileSystem.getInfoAsync(propertyImagesDir);

            if(!propertyImagesDirInfo.exists){
                await FileSystem.makeDirectoryAsync(propertyImagesDir, {intermediates: true});
            }
            
            for (let index = 0; index < document.length; index++) {
                const element = document[index];
                const fileName = element.uri.split('/').pop();
                const newImagesPath = propertyImagesDir+fileName;

                await FileSystem.copyAsync({
                    from: element.uri,
                    to: newImagesPath,
                });

                images.push(newImagesPath);

                await FileSystem.deleteAsync(element.uri, {idempotent: true});
            };
            updateField("photo_url", images[0]);
            updateField("images",images);
        } catch (error) {
            console.log(error);
        }
    };
    //End function to upload the images


    //Function to save the location based on the marker postion :
    const savePosition = () => {
        updateField("location", locationName);
        updateNestedField("coordinates", "longitude", markerPosition.longitude);
        updateNestedField("coordinates", "latitude", markerPosition.latitude);
    };
    //End function to save the location based on the marker postion


    //Function to render the map :
    const LocationSelector = (useCallback(() => {
        try {
            return (
                <View style={styles.locationSelectorContainer}>
                    
                    <MemoizedGooglePlacesAutoComplete
                        styles={{
                            container: inputHidden ? styles.googleMapsContainer : {display: "none"},
                            textInput: styles.googleMapsInput,
                        }}
                        placeholder="Search"
                        fetchDetails={true}
                        onPress={(data, details = null)  => {
                            if (data.description.startsWith("Current location")) {
                                setMarkerPosition({latitude, longitude});
                                setRegion({ latitude, longitude, latitudeDelta: 0, longitudeDelta: 0.04});
                                updateField("location", locationName);
                                return;
                            }
                            if (details) {
                                try {
                                    const { lat, lng } = details.geometry.location;
                                    setMarkerPosition({ latitude: lat, longitude: lng });
                                    setRegion({ latitude: lat, longitude: lng, latitudeDelta: 0, longitudeDelta: 0.04 });
                                    updateField("location",details.address_components[0].long_name);
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        }}
                        query={{
                            key: googleApiKey,
                            language: "en",
                        }}
                        predefinedPlaces={[{
                            description: "Current location : " +locationName,
                            geometry: { location: { lat: latitude, lng: longitude } },
                        },]}
                    />

                    <View style={inputHidden ? {height: 0.7 * height} : styles.mapContainer}>
                        <MemoizedMapView
                            googleMapId="321bc25d25ff09c0"
                            provider="google"
                            style={styles.mapStyle}
                            initialRegion={region}
                            onPress={(e) => {
                                const { latitude, longitude } = e.nativeEvent.coordinate;
                                setMarkerPosition({ latitude, longitude });
                                setRegion({ latitude, longitude, latitudeDelta: 0, longitudeDelta: 0.04});
                                getLocationName(latitude, longitude);
                            }}
                        >
                            {markerPosition.latitude && markerPosition.longitude && (
                                <Marker coordinate= {markerPosition} title="You're here" />
                            )}
                        </MemoizedMapView>

                        {/*Overlay text*/}
                        <TouchableOpacity style={inputHidden? {display:"none"} : styles.overlayButton} onPress={() => setInputHidden(true)}>
                            <Text style={styles.overlayText}>Press here to select your location</Text>
                        </TouchableOpacity>

                        {/*Save posistion button*/}
                        <View style={ inputHidden ? styles.saveLocationContainer : { height: 0 } } >
                            <TouchableOpacity 
                                style={ inputHidden ? styles.saveLocationButton : { height: 0 } }
                                onPress={() => {
                                    setInputHidden(false);
                                    savePosition();
                                }}
                            >
                                <Text style={ inputHidden ? styles.saveLocationText : { height: 0 } }>Save postion</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            console.log(error);
            return(
                <Text>Error rendering the map</Text>
            )
        }
    }, [markerPosition, region, inputHidden]));
    //End function to render the map


    //Function to get the location name based on the marker position :
    const getLocationName = async (lat, lon) => {
        setIsFetchingLocation(true);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`;

        try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            const addressComponents = data.results[0].address_components;
            let cityName = addressComponents.find(component => component.types.includes('locality'));
            if (!cityName){
                cityName = addressComponents.find(component => component.types.includes('administrative_area_level_1'));
            }
            console.log(cityName.long_name);
            updateField("location", cityName ? cityName.long_name : 'City not found');
        } else {
            throw new Error('Error fetching the location');
        }
        } catch (error) {
            console.log('Error fetching place name : ' + error);
            updateField("location", "Error");
        } finally {
            setIsFetchingLocation(false);
        }
    };
    //End function to get the location name based on the marker position


    //Function to check if the properties.json file exists and update it :
    const propertiesFile = FileSystem.documentDirectory + 'properties.json';
    const addListing = async () => {
        try {
            const fileExists = await FileSystem.getInfoAsync(propertiesFile);
            if(!fileExists.exists){
                await FileSystem.writeAsStringAsync(propertiesFile, JSON.stringify([]));
                return;
            };

            //await FileSystem.writeAsStringAsync(propertiesFile, JSON.stringify([])); //Use this to clear the properties.json file when needed

            const existingListingsJSON = await FileSystem.readAsStringAsync(propertiesFile);
            const existingListings = JSON.parse(existingListingsJSON);

            const newListing = {
                location: apartment.location,
                name: apartment.name,
                photo_url: apartment.photo_url,
                price: apartment.price,
                type: apartment.type,
                bathroom: apartment.bathroom,
                bedroom: apartment.bedroom,
                images: apartment.images,
                distances: apartment.distances,
                description: apartment.description,
                person: apartment.person,
                coordinates: apartment.coordinates,
            };

            existingListings.push(newListing);
            console.log(existingListings); //Checking if the data was entered correctly

            await FileSystem.writeAsStringAsync(propertiesFile, JSON.stringify(existingListings));
            await viewListings();
            Alert.alert("Property registered succesfully");
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            Alert.alert("Error while uploading property, please try again later. If the issue persists please contact us.");
        }
    };
    //End function to check if the properties.json file exists and update it


    //Return based on the inputHidden state :
    return !inputHidden ? (
        <ScrollView style={styles.mainContainer}>
            <View style= {styles.allContainer}>
                {/*Title*/}
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Add your listing</Text>
                </View>

                {/*Inputs*/}
                <View style={styles.inputsContainer}>
                    {/*Name*/}
                    <TextInput
                        style={styles.input}
                        placeholder="Property Name"
                        value={apartment.name}
                        onChangeText={(name) => updateField("name", name)}
                        autoCapitalize="words"
                        returnKeyType="next"
                        onSubmitEditing={() => descriptionRef.current.focus()}
                    />

                    {/*Description*/}
                    <TextInput
                        ref={descriptionRef}
                        style={styles.input}
                        placeholder="Description"
                        value={apartment.description}
                        onChangeText={(description) => updateField("description", description)}
                        autoCapitalize= "sentences"
                        multiline={true}
                        returnKeyType="next"
                        onSubmitEditing={() => priceRef.current.focus()}
                    />

                    {/*Price*/}
                    <TextInput
                        ref={priceRef}
                        style={styles.input}
                        placeholder="Price"
                        value={apartment.price}
                        onChangeText={(price) => updateField("price", price)}
                        keyboardType="numeric"
                        returnKeyType="next"
                        onSubmitEditing={() => bathroomsRef.current.focus()}
                    />

                    {/*Bathrooms*/}
                    <TextInput
                        ref={bathroomsRef}
                        style={styles.input}
                        placeholder="Bathrooms"
                        value={apartment.bathroom}
                        onChangeText={(bathroom) => updateField("bathroom",bathroom)}
                        keyboardType="numeric"
                        returnKeyType="next"
                        onSubmitEditing={() => bedroomsRef.current.focus()}
                    />

                    {/*Bedrooms*/}
                    <TextInput
                        ref={bedroomsRef}
                        style={styles.input}
                        placeholder="Bedrooms"
                        value={apartment.bedroom}
                        onChangeText={(bedroom) => updateField("bedroom",bedroom)}
                        keyboardType="numeric"
                        returnKeyType="next"
                        onSubmitEditing={() => typeRef.current.focus()}
                    />

                    {/*Type*/}
                    <View style={styles.typeSelectorContainer}>
                        <Picker
                            ref={typeRef}
                            selectedValue={apartment.type}
                            onValueChange={(type) => updateField("type", type)}
                            style= {styles.typeSelector}
                            placeholder="Select your property type"
                        >
                            <Picker.Item label="Select your property type" value="" />
                            <Picker.Item label="Cottage" value="Cottage" />
                            <Picker.Item label="Villa" value="Villa" />
                            <Picker.Item label="Apartment" value="Apartment" />
                            <Picker.Item label="Hotel" value="Hotel" />
                        </Picker>
                    </View>

                    {/*Images*/}
                    <TouchableOpacity 
                        style={styles.input}
                        onPress={uploadImages}
                    >
                        <Text style={styles.uploadImagesText}>Upload Images (First image will be the main)</Text>
                    </TouchableOpacity>
                </View>

                <LocationSelector />

                {/*Save Button*/}
                <View style={inputHidden ? {display: "none"} : styles.savePropertyContainer}>
                    <TouchableOpacity style={styles.savePropertyButton} onPress={addListing}>
                        <Text style={styles.savePropertyText}>Add your listing</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    ) : (
        <View style={styles.inputHiddenMapContainer}>
            <LocationSelector />
        </View>
    );
};

const styles = StyleSheet.create({
    //Main container :
    mainContainer: {
        flexGrow: 1,
        //overflow:"scroll",
    },

    allContainer: {
        marginVertical : "10%",
        flex: 1,
        flexDirection: "column",
        //overflow: "scroll",

        //borderWidth: 2, //Debugging
        //borderColor: "blue", //Debugging
    },

    titleContainer: {
        position: "relative",
        backgroundColor: "rgba(0,0,0,0.1)",
        height: "7%",
        justifyContent: "center",

        //borderWidth: 2, //Debugging
        //borderColor: "green", //Debugging
    },

    titleText: {
        color: Color.colorBlack,
        fontFamily: "Raleway-SemiBold",
        fontSize: 25,
        textAlign: "center",
    },

        //Container for all the inputs :
        inputsContainer: {
            height: "auto",
            flexDirection: "column",
            position: "relative",
            marginVertical: "2%",
            borderColor: Color.colorGray_200,
            borderRadius: Border.br_3xs,
            borderWidth: 1,
            marginHorizontal: "2%",
            shadowColor: Color.colorWhite,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
            backgroundColor: "rgba(0,0,0,0.1)",

            //borderWidth: 2, //Debugging
            //borderColor: "green", //Debugging
        },

            //Inputs :
            input:{
                position: "relative",
                borderWidth: 1,
                borderRadius: Border.br_3xs,
                borderColor: Color.colorGray_200,
                marginVertical: "3%",
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
            },

            //Type selector
            typeSelectorContainer: {
                position: "relative",
                borderWidth: 1,
                borderRadius: Border.br_3xs,
                borderColor: Color.colorGray_200,
                marginVertical: "3%",
                marginHorizontal: "2%",
                fontFamily: "Raleway-Regular",
                fontSize: 16,
                shadowColor: "#000",
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 10,
                backgroundColor: Color.colorWhite,
                
                // borderWidth: 2, //Debugging
                // borderColor: "green", //Debugging
            },

            typeSelector: {
                position: "relative",
                height: "auto",
            },

            uploadImagesText: {
                marginLeft: "1%",
                position: "relative",
                fontFamily: "Raleway-Regular",
            },
        //End container for all the inputs

        //Map & search container
        locationSelectorContainer: {
            height: "auto",
            position: "relative",
            flexDirection: "column",
            marginHorizontal: "1%",

            //borderWidth: 2, //Debugging
            //borderColor: "purple", //Debugging
        },
        
            //Google Maps:
            googleMapsContainer: {
                width: "100%",
                height: "auto",
                position: "relative",
                marginBottom: "1%",

                //borderWidth: 2, //Debugging
                //borderColor: "green", //Debugging
            },

            googleMapsInput: {
                position: "relative",
                textAlign: "center",
                marginHorizontal: "2%",
                marginVertical: "2%",
                height: "auto",
                borderWidth: 1,
                borderRadius: Border.br_3xs,

                //borderWidth: 2, //Debugging
                //borderColor: "red", //Debugging
            },
            //End google maps

            //Map container :
            mapContainer: {
                position: "relative",
                height: 250,
                marginHorizontal: "2%",

                //borderWidth: 2, //Debugging
                //borderColor: "red", //Debugging
            },

                //Map :
                mapStyle: {
                    ...StyleSheet.absoluteFillObject,
                    position: "relative",
                    flex: 1,
                },

                saveLocationContainer:{
                    position: "relative",
                    marginVertical: "2%",
                    marginHorizontal: "1%",
                    height: 50,
        
                    //borderWidth: 2, //Debugging
                    //borderColor: "orange", //Debugging
                },

                saveLocationButton: {
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    backgroundColor: Color.colorCornflowerblue,
                    justifyContent: "center",
                    borderRadius: Border.br_3xs,
        
                    //borderWidth: 2, //Debugging
                    //borderColor: "lime", //Debugging
                },
        
                saveLocationText: {
                    fontFamily: "Raleway-SemiBold",
                    textAlign: "center",
                    color: Color.colorWhite,
                },

                //Overlay :
                overlayButton: {
                    ...StyleSheet.absoluteFillObject,
                    position: 'absolute',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: 5,
                    zIndex: 2,
                    justifyContent: "center",

                    //borderWidth: 2, //Debugging
                    //borderColor: "blue", //Debugging
                },

                overlayText: {
                    color: 'white',
                    fontSize: 16,
                    textAlign: 'center',
                },
                //End overlay
            //End map container
        
        //Input hidden map :
        inputHiddenMapContainer: {
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            marginVertical: "10%",

            //borderWidth: 2,
            //borderColor: "blue",
        },
        //End map & search container

        //Save property section :
        savePropertyContainer:{
            position: "relative",
            marginVertical: "2%",
            marginHorizontal: "1%",
            height: 50,

            //borderWidth: 2, //Debugging
            //borderColor: "orange", //Debugging
        },

        savePropertyButton: {
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: Color.colorCornflowerblue,
            justifyContent: "center",
            borderRadius: Border.br_3xs,

            //borderWidth: 2, //Debugging
            //borderColor: "lime", //Debugging
        },

        savePropertyText: {
            fontFamily: "Raleway-SemiBold",
            textAlign: "center",
            color: Color.colorWhite,
        },
});

export default AddListing;