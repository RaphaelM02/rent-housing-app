import * as React from "react";
import { View, Text, TouchableOpacity, Alert, Linking, Image, ScrollView, Modal, FlatList, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontSize, Border, Color, FontFamily } from "./GlobalStyles";
import imageMapping from "./imageMappings";
import MapView, { Marker } from 'react-native-maps';


const DetailProduct = () => {
    const navigation = useNavigation();

    const handlePressHome = () => { navigation.navigate('Home'); };
    const handlePress = () => { Alert.alert('You have successfully rented this property'); };
    const handlePhonePress = () => { Linking.openURL(`tel:${phonenumber}`); };
    const handleEmailPress = () => { Linking.openURL(`mailto:${email}`); };

    const route = useRoute();
    const { photo_url, bedroom, bathroom, description, photoo, images, name, location, item_name, price, phonenumber,email } = route.params;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);


    const renderGalleryItem = ({ item, index }) => {
        if (index < 3) {
            return (
                <Image
                    style={styles.galleryImage}
                    resizeMode="cover"
                    source={imageMapping[item]}
                />
            );
        } else if (index === 3) {
            return (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={styles.moreImagesContainer}>
                        <Image
                            style={styles.galleryImage}
                            resizeMode="cover"
                            source={imageMapping[item]}
                        />
                        {images.length > 4 && (
                            <View style={styles.overlay}>
                                <Text style={styles.moreImagesText}>+{images.length - 4}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            );
        } else {
            return null;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>

            {/*Main property image*/}
            <View style={styles.detailProduct}>
                <Image
                    style={styles.mainImage}
                    resizeMode="cover"
                    source={imageMapping[photo_url]}
                />

                {/*Home and bookmark buttons*/}
                <TouchableOpacity onPress={handlePressHome}>
                    <Image
                        style={[styles.icBackIcon, styles.iconLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo7.png")}
                    />
                </TouchableOpacity>
                <Image
                    style={[styles.icBookmarkIcon, styles.iconLayout]}
                    resizeMode="cover"
                    source={require("../assets/logo8.png")}
                />

                {/*Property name and price*/}
                <View style={styles.overlayContainer}>
                    <Text style={styles.itemName}>{item_name}</Text>
                    <Text style={styles.itemPrice}>{price}</Text>
                </View>

                {/*Property bedrooms*/}
                <View style={[styles.bedroom, styles.iconLayout2]}>
                    <Text style={styles.bedroom1Typo}>{bedroom} Bedroom</Text>
                    <Image
                        style={[styles.icPhoneIcon1, styles.iconLayout3]}
                        resizeMode="cover"
                        source={require("../assets/logo5.png")}
                    />
                </View>

                {/*Property bathrooms*/}
                <View style={[styles.bathroom, styles.bathroomLayout]}>
                    <Text style={[styles.bathroom1, styles.bedroom1Typo]}>{bathroom} Bathroom</Text>
                    <Image
                        style={[styles.icBathroomIcon, styles.bathroomLayout]}
                        resizeMode="cover"
                        source={require("../assets/logo6.png")}
                    />
                </View>

                {/*Property description*/}
                <View style={[styles.description, styles.galleryPosition]}>
                    <Text style={styles.descriptionLabel}>Description</Text>
                    <Text style={styles.descriptionText}>
                        {isDescriptionExpanded ? description : `${description.slice(0, 100)}...`}
                    </Text>
                    <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                        <Text style={styles.seeMoreText}>
                            {isDescriptionExpanded ? "Show Less" : "Show More"}
                        </Text>
                    </TouchableOpacity>

                    {/*Owner section*/}
                    <View style={styles.imageNameContainer}>
                        <Image
                            style={styles.smallImage}
                            resizeMode="cover"
                            source={imageMapping[photoo]}
                        />
                        <View style={[styles.A]}>
                            <Text style={styles.propertyName}>{name}</Text>
                            <Text style={styles.owner}>Owner </Text>
                        </View>
                    </View>

                </View>

                {/*Contact buttons*/}
                <View style={[styles.contact, styles.iconLayout2]}>
                    <TouchableOpacity onPress={handlePhonePress}>
                    <Image
                        style={[styles.icPhoneIcon, styles.iconLayout1]}
                        resizeMode="cover"
                        source={require("../assets/logo9.png")}
                    />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEmailPress}>
                    <Image
                        style={[styles.icMessageIcon, styles.iconLayout1]}
                        resizeMode="cover"
                        source={require("../assets/logo10.png")}
                    />
                    </TouchableOpacity>
                </View>
                
                {/*Property gallery*/}
                <View style={[styles.gallery, styles.galleryPosition]}>
                    <Text style={[styles.gallery1, styles.rentNowTypo]}>Gallery</Text>
                    <FlatList
                        horizontal={true}
                        data={images}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderGalleryItem}
                    />
                </View>

                {/*Map*/}
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={name}
                    />
                </MapView>

                {/*Property price at the bottom*/}
                <Text style={[styles.priceText, styles.rentNowTypo]}>
                    Price
                </Text>
                <Text style={styles.propertyprice}>{price}</Text>

                {/*Rent Now button*/}
                <TouchableOpacity onPress={handlePress}>
                    <LinearGradient
                        style={[styles.btnRent, styles.shadowBg]}
                        locations={[0.14, 1]}
                        colors={["#a0dafb", "#0a8ed9"]}
                        useAngle={true}
                        angle={180}
                    >
                        <Text style={[styles.rentNow, styles.rentNowTypo]}>Rent Now</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            
            {/*Modal for properties having more than 4 pictures*/}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <FlatList
                        horizontal={true}
                        data={images}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <Image
                                style={styles.modalImage}
                                resizeMode="cover"
                                source={imageMapping[item]}
                            />
                        )}
                    />
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </ScrollView>
    );
};

    const styles = StyleSheet.create({
        scrollContainer: {
            flexGrow: 1,
            paddingBottom: 20,
            paddingTop: 20,
        },
        priceText: {
            fontSize: FontSize.size_base,
            fontFamily: FontFamily.ralewayMedium,
            color: "#858585",
            top: 769,
            left: 20,
        },
        seeMoreText: {
            color: "#0a8ed9",
            left: 250,
        },
        overlayContainer: {
            position: "absolute",
            top: 20,
            left: 23,
            height: 319,
            width: 350,
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            borderRadius: 20,
        },
    
        itemName: {
            color: "#fff",
            fontSize: 24,
            fontWeight: "bold",
            top: 78,
            left: 30,
        },
        itemPrice: {
            color: "#D4D4D4",
            fontSize: 15,
            top: 78,
            left: 30,
        },
        mainImage: {
            top: 20,
            height: 319,
            width: 350,
            left: 23,
            position: "absolute",
            borderRadius: 20,
        },
        iconLayout2: {
            height: 28,
            position: "absolute",
        },
        iconLayout3: {
            width: 28,
            top: 4,
        },
        iconLayout1: {
            width: 28,
            top: 10,
        },
        descriptionLabel: {
            fontWeight: "500",
            fontFamily: FontFamily.ralewayMedium,
            color: Color.colorBlack,
            fontSize: 17,
            textAlign: "left",
        },

        descriptionText: {
            fontFamily: FontFamily.ralewayRegular,
            color: "#858585",
            fontSize: FontSize.size_base,
            textAlign: "left",
            marginTop: 4,
            
        },
        galleryPosition: {
            left: 20,
            position: "absolute",
        },
        rentNowTypo: {
            textAlign: "left",
            fontSize: FontSize.size_base,
        },
        shadowBg: {
            backgroundColor: "transparent",
            borderRadius: Border.br_3xs,
            position: "absolute",
        },
        bathroomLayout: {
            height: 26,
            position: "absolute",
        },
        propertyprice: {
            fontSize: FontSize.size_base,
            fontFamily: FontFamily.ralewayMedium,
            color: Color.colorBlack,
            left: 20,
            top: 769,
        },
        bedroom1Typo: {
            color: Color.colorLightgray,
            fontFamily: FontFamily.ralewayRegular,
            fontSize: FontSize.size_xs,
            left: 40,
            top: 7,
            textAlign: "left",
            position: "absolute",
        },
        iconLayout: {
            height: 34,
            width: 34,
            position: "absolute",
        },
        icPhoneIcon1: {
            left: 0,
            height: 28,
            position: "absolute",
        },
        icPhoneIcon: {
            left: 0,
            height: 28,
            position: "absolute",
        },
        icMessageIcon: {
            left: 44,
            height: 28,
            position: "absolute",
        },
        contact: {
            top: 449,
            left: 279,
            width: 72,
        },
        gallery1: {
            fontWeight: "500",
            fontFamily: FontFamily.ralewayMedium,
            color: Color.colorBlack,
            left: 0,
            top: 0,
            fontSize: FontSize.size_base,
            position: "absolute",
        },
        gallery: {
            top: 515,
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingVertical: 10,
        },
        shadow: {
            top: 769,
            left: 250,
            width: 92,
            height: 20,
            opacity: 0.24,
        },
        container: {
            flex: 1,
            padding: 10,
        },
        image: {
            width: '100%',
            height: 200,
        },
        text: {
            fontSize: 16,
            marginVertical: 5,
        },
        map: {
            top: 640,
            width: 380,
            height: 115,
            left: 9,
            position: "absolute",
        },
        rentNow: {
            fontWeight: "600",
            fontFamily: FontFamily.ralewaySemiBold,
            color: "#fff",
        },
        btnRent: {
            top: 760,
            left: 233,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 24,
            paddingVertical: 12,
            overflow: "hidden",
            height: 50,
        },
        description: {
            top: 344,
            width: "96%",
            left: 20,
        },
        descriptionText: {
            fontWeight: "500",
            top  : 20,
            fontFamily: FontFamily.ralewayMedium,
            color: "#858585",
            textAlign: "left",
        },
        imageNameContainer: {
            flexDirection: "row",
            alignItems: "center",
            top: -10,
        },
        smallImage: {
            width: 50,
            height: 50,
            marginRight: 10,
            borderRadius: 40,
            top: 37,

        },
    A: {
            fontSize: FontSize.size_base,
            fontFamily: FontFamily.ralewayMedium,
            color: Color.colorBlack,
            top: 30,
            left: 0

        },
        propertyName: {
            fontSize: FontSize.size_base,
            fontFamily: FontFamily.ralewayMedium,
            color: Color.colorBlack,
            top: 10,
            left: 5,

        },
        owner: {
            fontSize: FontSize.size_base,
            fontFamily: FontFamily.ralewayMedium,
            color: "#858585",
            top: 8,
            left: 5,
        },
        bedroom: {
            left:52,
            width: 103,
            top: 300,
        },
        bathroom1: {
            width: 65,
            height: 13,
        },
        icBathroomIcon: {
            width: 28,
            top: 0,
            left: 0,
        },
        bathroom: {
            left: 200,
            width: 105,
            top: 300,
        },
        icBackIcon: {
            top: 40,
            left: 50,
        },
        icBookmarkIcon: {
            top: 40,
            left: 300,
        },
        detailProduct: {
            borderRadius: 20,
            backgroundColor: "#fafafa",
            flex: 1,
            width: "100%",
            minHeight: 812,
            overflow: "hidden",
        },
        galleryImage: {
            width: 70,
            height: 70,
            marginHorizontal: 10,
            borderRadius: 10,
            left: -10,
            marginTop: 30,
        },
        moreImagesText: {
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
        },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            width: 70,
            height: 70,
            top: 30,
        },
        modalImage: {
            width: 70,
            height: 70,
            marginHorizontal: 10,
            borderRadius: 10,
            left: 10,
            marginTop: 555,
        },

    });

    export default DetailProduct;