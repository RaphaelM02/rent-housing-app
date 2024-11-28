import React, { createContext, useState, useEffect, useContext } from 'react';
import * as FileSystem from 'expo-file-system';

export const ListingsContext = createContext();

export const ListingsProvider = ({ children }) => {
    const [existingListings, setExistingListings] = useState([]);
    const [isListingsLoaded, setIsListingsLoaded] = useState(false);
    const propertiesFile = FileSystem.documentDirectory + 'properties.json';

    const viewListings = async () => {
        try {
            const fileExists = await FileSystem.getInfoAsync(propertiesFile);
            if (!fileExists.exists) {
                await FileSystem.writeAsStringAsync(propertiesFile, JSON.stringify([]));
                return;
            }

            const existingListingsJSON = await FileSystem.readAsStringAsync(propertiesFile);
            setExistingListings(JSON.parse(existingListingsJSON));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        viewListings();
    }, []);

    return (
        <ListingsContext.Provider value={{existingListings, viewListings}}>
            {children}
        </ListingsContext.Provider>
    );
};

// Custom hook to use listings context
export const useListings = () => {
    const context = useContext(ListingsContext);
    if (!context) {
        throw new Error('useListings must be used within a ListingsProvider');
    }
    return context;
};