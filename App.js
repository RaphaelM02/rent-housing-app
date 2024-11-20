import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import HomeScreen from './screens/HomeScreen';
import HomeScreenNew from './screens/HomeScreenNew';
import Menu from './screens/Menu';
import WhitePage from './screens/WhitePage';
import DetailProduct from './screens/DetailProduct';
import DetailProductNew from './screens/DetailProductNew';
import { User } from './screens/UserContext';
import * as Font from 'expo-font';

const Stack = createStackNavigator();

const AppNavigator = () => {
    const loadFonts = async () =>{
        await Font.loadAsync({
            'Raleway-Medium': require('./assets/fonts/Raleway-Medium.ttf'),
            'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf'),
            'Raleway-SemiBold': require('./assets/fonts/Raleway-SemiBold.ttf'),
        });
    };
    
    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    useEffect(() => {
        loadFonts().then(() => {
            setFontsLoaded(true);
        });
    });

    if(!fontsLoaded){
        return(
            <Text>Loading ...</Text>
        )
    };

    return(
        <User>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="LogIn" component={LogIn} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="Home" component={HomeScreenNew} />
                    <Stack.Screen name="Menu" component={Menu} />
                    <Stack.Screen name="WhitePage" component={WhitePage} options={{ headerShown: true }} /> 
                    <Stack.Screen name="DetailProduct" component={DetailProductNew} />
                </Stack.Navigator>
            </NavigationContainer>
        </User>
    );
};

export default AppNavigator;