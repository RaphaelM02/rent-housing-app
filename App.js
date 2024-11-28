import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNavigationContainerRef } from '@react-navigation/native';
import { Text, BackHandler } from 'react-native';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import SearchListing from './screens/SearchListing';
import Menu from './screens/Menu';
import WhitePage from './screens/WhitePage';
import DetailProductNew from './screens/DetailProductNew';
import { User } from './screens/UserContext';
import AddListing from './screens/AddListing';
import { LocationProvider } from './functions/LocationContext';
import { ListingsProvider } from './functions/LoadListings';
import * as Font from 'expo-font';
import 'react-native-get-random-values';
import * as FileSystem from 'expo-file-system';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const navigationRef = useNavigationContainerRef();
    const loadFonts = async () =>{
        await Font.loadAsync({
            'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
            'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
            'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
        });
    };
    
    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'properties.json', JSON.stringify([])); //Use this to clear the properties.json file when needed
    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'users.json', JSON.stringify([])); //Use this to clear the users.json file when needed

    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });
    });

    useEffect(() => {
        const handleBackPress = () => {
            const currentRoute = navigationRef.current?.getCurrentRoute()?.name;

            if(currentRoute && currentRoute !== 'Home' && currentRoute !== 'LogIn'){
                navigationRef.current?.navigate('Home');
                return true;
            }
            return false;
        };

        const backButtonHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => backButtonHandler.remove();
    }, [navigationRef]);

    if(!fontsLoaded){
        return(
            <Text>Loading ...</Text>
        )
    };

    return(
        <User>
            <ListingsProvider>
                <LocationProvider>
                    <NavigationContainer ref={navigationRef}>
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="LogIn" component={LogIn} />
                            <Stack.Screen name="SignUp" component={SignUp} />
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="SearchListing" component={SearchListing} />
                            <Stack.Screen name="Menu" component={Menu} />
                            <Stack.Screen name="WhitePage" component={WhitePage} options={{ headerShown: true }} /> 
                            <Stack.Screen name="DetailProduct" component={DetailProductNew} />
                            <Stack.Screen name="AddListing" component={AddListing} />
                        </Stack.Navigator>
                    </NavigationContainer>
            </LocationProvider>
            </ListingsProvider>
        </User>
    );
};

export default AppNavigator;