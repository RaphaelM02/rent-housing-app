import React, { useState } from "react";
import { Text, StyleSheet, Image, View, TouchableOpacity, ScrollView, TextInput, Dimensions, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { Color , Border } from './GlobalStyles'
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Constants from "expo-constants";
import * as DocumentPicker from 'expo-document-picker';
import * as Location from 'expo-location';
import { Picker } from "@react-native-picker/picker";

const {width, height} = Dimensions.get("screen");
const googleApiKey = Constants.expoConfig.extra.googleApiKey;

const AddListing = () => {
    //Fields and function to update them :
    const [apartment, setApartment] = useState({
        location: "", //Location Selecter Done
        name: "", //Input Fields Done
        photo_url: "",
        price: "", //Input Fields Done
        type: "", //Input Fields //Done// TypeSelection
        bathroom: 0, //Input Fields Done
        bedroom: 0, //Input Fields Done
        images: [], //Input Fields Done
        distances: {},
        description: "", //Input Fields Done
        person: {
            name: "",
            image_url: "",
            phonenumber: "",
            email: "",
            position: "",
        },
        coordinates: { //Location Selecter //Done// markerPosition
            latitude: null,
            longitude: null,
        },
    });

    const [isMapLoaded, setIsMapLoaded] = React.useState(false);

    const [inputHidden, setInputHidden] = useState(false);
    const [location, setLocation] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [bathroom, setBathroom] = useState(0);
    const [bedroom, setBedroom] = useState(0);
    const [type, setType] = useState("");

    //Default marker position for the map :
    const [markerPosition, setMarkerPosition] = useState({
        latitude: 33.888630,
        longitude: 35.495480,
    });

    //Default region for the map based on the marker position :
    const [region, setRegion] = useState({
        latitude: 33.888630,
        longitude: 35.495480,
        latitudeDelta: 0.02,
        longitudeDelta: 0.04,
    });

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
    //End fields and functions to update them

    //Function to upload the images :
    const uploadImages = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                copyToCacheDirectory: true,
                multiple: true,
            });
            const document = result.assets;
            for (let index = 0; index < document.length; index++) {
                const element = document[index];
                updateField("images",apartment.images.push(element.uri));
            };
        } catch (error) {
            console.log(error);
        }
    };

    //Function to save the location based on the marker postion :
    const savePosition = () => {
        updateNestedField("coordinates", "latitude", markerPosition.latitude);
        updateNestedField("coordinates", "longitude", markerPosition.longitude);
        console.log(apartment.coordinates.latitude +"\n"+ apartment.coordinates.longitude
        );
    };

    //Function to get the user's currnet location :
    const getCurrentLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if(status != "granted"){
                Alert.alert("Location permissions are required to use this feature.");
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Highest,   
            });

            const { latitude, longitude} = location.coords;

            setMarkerPosition({latitude, longitude});
            setRegion({latitude, longitude, latitudeDelta: 0, longitudeDelta: 0.02});

            return(latitude, longitude);

        } catch (error) {
            console.log(error);
            Alert.alert("Unable to fetch location, please set it manually");
        }
    };

    //Screen
    const TypeSelection = () => {
        return(
            <View style={inputHidden ? {height: 0} : styles.typeSelectorContainer}>
                <Picker
                    selectedValue={type}
                    onValueChange={(item, index) => setType(item)}
                    style= {inputHidden ? {height: 0} : styles.typeSelector}
                    placeholder="Select your property type"
                >
                    <Picker.Item label="Select your property type" value="" />
                    <Picker.Item label="Cottage" value="Cottage" />
                    <Picker.Item label="Villa" value="Villa" />
                    <Picker.Item label="Apartment" value="Apartment" />
                    <Picker.Item label="Hotel" value="Hotel" />
                </Picker>
            </View>
        );
    };

    const InputFields = () => {
        return(
            <View style={inputHidden ? {height: 0} : styles.inputsContainer}>
                {/*Name*/}
                <TextInput
                    style={inputHidden ? {height: 0} : styles.input}
                    placeholder="Property Name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

                {/*Description*/}
                <TextInput
                    style={inputHidden ? {height: 0} : styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />

                {/*Price*/}
                <TextInput
                    style={inputHidden ? {height: 0} : styles.input}
                    placeholder="Price"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                />

                {/*Bathrooms*/}
                <TextInput
                    style={inputHidden ? {height: 0} : styles.input}
                    placeholder="Bathrooms"
                    value={bathroom}
                    onChangeText={setBathroom}
                    keyboardType="numeric"
                />

                {/*Bedrooms*/}
                <TextInput
                    style={inputHidden ? {height: 0} : styles.input}
                    placeholder="Bedrooms"
                    value={bedroom}
                    onChangeText={setBedroom}
                    keyboardType="numeric"
                />

                {/*Type*/}
                <TypeSelection />

                {/*Images*/}
                <TouchableOpacity 
                    style={inputHidden ? {height: 0} : styles.input}
                    onPress={uploadImages}
                >
                        <Text style={inputHidden ? {height: 0} : styles.uploadImagesText}>Upload Images</Text>
                </TouchableOpacity>
                    
            </View>
        );
    };

    const LocationSelector = () => {
        try {
            return (
                <View style={styles.locationSelectorContainer}>
                    <GooglePlacesAutocomplete
                        styles={{
                            container: styles.googleMapsContainer,
                            textInput: styles.googleMapsInput,
                        }}
                        placeholder="Search"
                        fetchDetails={true}
                        onPress={(data, details = null) => {
                            if (data.description === "Current Location") {
                                getCurrentLocation();
                                console.log(data.description);
                                return;
                            }
                            if (details) {
                                try {
                                    const { lat, lng } = details.geometry.location;
                                    console.log(data);
                                    setMarkerPosition({ latitude: lat, longitude: lng });
                                    setRegion({ latitude: lat, longitude: lng, latitudeDelta: 0, longitudeDelta: 0.04 });
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
                            description: "Current Location",
                            geometry: { location: { lat: 0, lng: 0 } },
                        },]}
                    />

                    <View style={inputHidden ? {height: 0.7 * height} : styles.mapContainer}>
                        <MapView
                            provider="google"
                            style={styles.mapStyle}
                            initialRegion={{
                                latitude: 33.888630,
                                longitude: 35.495480,
                                latitudeDelta: 0.02,
                                longitudeDelta: 0.04,
                            }}
                            region={region}
                            //loadingEnabled= {true}
                            //onMapLoaded={() => {setIsMapLoaded(true); console.log(isMapLoaded)}}
                            onPress={(e) => {
                                e.preventDefault();
                                if (!inputHidden) { setInputHidden(true); }
                                else {
                                    const { latitude, longitude } = e.nativeEvent.coordinate;
                                    setMarkerPosition({ latitude, longitude });
                                    setRegion({latitude, longitude, latitudeDelta: 0, longitudeDelta: 0.04});
                                }
                            }}
                            /*
                            onRegionChangeComplete={(newRegion) => {
                                setRegion(newRegion);
                                setMarkerPosition({latitude: newRegion.latitude, longitude: newRegion.longitude});
                            }}
                            */
                        >
                            <Marker coordinate= {!markerPosition ? {latitude: 33.888630, longitude: 35.495480} : markerPosition} />
                        </MapView>

                        {/*Save posistion button*/}
                        <View style={ inputHidden ? styles.saveLocationContainer : { height: 0 } } >
                            <TouchableOpacity 
                                style={ inputHidden ? styles.saveLocationButton : { height: 0 } }
                                onPress={() => setInputHidden(false)}
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
    };

    const SaveButton = () => {
        return(
            <View style={inputHidden ? {height: 0} : styles.savePropertyContainer}>
                <TouchableOpacity style={styles.savePropertyButton}>
                    <Text style={styles.savePropertyText}>Add your listing</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return(
        <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS === "ios" ? "padding" : "height"} >
            <View style= {styles.allContainer}>
                <InputFields />
                <LocationSelector />
                <SaveButton />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    //Main container :
    mainContainer: {
        flexGrow: 1,
    },

    allContainer: {
        marginVertical: "10%",
        flex: 1,
        flexDirection: "column",
        overflow: "scroll",

        //borderWidth: 2, //Debugging
        //borderColor: "blue", //Debugging
    },

        //Container for all the inputs :
        inputsContainer: {
            height: "auto",
            width: "100%",
            flexDirection: "column",
            position: "relative",
            marginVertical: "2%",

            //borderWidth: 2, //Debugging
            //borderColor: "green", //Debugging
        },

            //Inputs :
            input:{
                position: "relative",
                borderWidth: 1,
                borderRadius: Border.br_3xs,
                marginVertical: "1%",
                marginHorizontal: "1%",
                height: "40",
                fontFamily: "Raleway-Regular",
                justifyContent: "center",
            },

            //Type selector
            typeSelectorContainer: {
                position: "relative",
                marginHorizontal: "1%",
                borderWidth: 1,
                borderRadius: Border.br_3xs,
                height: "auto",
                
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
            //width: "100%",
            height: "auto",
            position: "relative",
            flexDirection: "column",
            borderWidth: 1,
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
                width: "100%",
                height: 250,

                //borderWidth: 2, //Debugging
                //borderColor: "red", //Debugging
            },

                //Map :
                mapStyle: {
                    ...StyleSheet.absoluteFillObject,
                    position: "relative",
                    height: "100%",
                    marginHorizontal: "2%",
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
            //End map container
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