import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

const googleApiKey = Constants.expoConfig.extra.googleApiKey;

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [locationName, setLocationName] = useState(null);
    const [isLocationFetched, setIsLocationFetched] = useState(false);

    // Function to get the user's coordinates
    const getCurrentLocation = async () => {
        try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Location permissions needed.');
            return;
        }

        let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
        });

        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);

        } catch (error) {
            console.log(error);
            Alert.alert('Unable to fetch location');
        }
    };

    // Function to get the user's city name
    const getCurrentLocationName = async (lat, lon) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleApiKey}`;

        try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            const addressComponents = data.results[0].address_components;
            const cityName = addressComponents.find(component =>
            component.types.includes('locality')
            );
            setLocationName(cityName ? cityName.long_name : 'City not found');
        } else {
            throw new Error('Error fetching the location');
        }
        } catch (error) {
            console.log('Error fetching place name : ' + error);
            setLocationName('Error');
        }
    };

    // Fetch the location data once
    useEffect(() => {
        if (!isLocationFetched) {
        getCurrentLocation();
        setIsLocationFetched(true);
        }
    }, [isLocationFetched]);

    // Update location name once latitude and longitude are set
    useEffect(() => {
        if (latitude && longitude) {
      getCurrentLocationName(latitude, longitude);
        }
    }, [latitude, longitude]);

    return (
        <LocationContext.Provider
            value={{
                latitude,
                longitude,
                locationName,
                setLatitude,
                setLongitude,
                setLocationName,
            }}
        >
            {children}
        </LocationContext.Provider>
    );
};

// Custom hook to use location context
export const useLocation = () => {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};