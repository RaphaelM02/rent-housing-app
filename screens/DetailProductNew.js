import * as React from "react";
import { View, Text, TouchableOpacity, Alert, Linking, Image, ScrollView, Modal, FlatList, StyleSheet, Dimensions} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FontSize, Border, Color, FontFamily } from "./GlobalStyles";
import imageMapping from "./imageMappings";
import MapView, { Marker } from 'react-native-maps';

const {width, height} = Dimensions.get("window");

const DetailProductNew = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const handlePressHome = () => { navigation.navigate('Home'); };
    const handleBookmarkPress = () => { Alert.alert("This property has been succesfully added to your bookmarks")};
    const handlePress = () => { Alert.alert('You have successfully rented this property'); };
    const handlePhonePress = () => { Linking.openURL(`tel:${phonenumber}`); };
    const handleEmailPress = () => { Linking.openURL(`mailto:${email}`); };

    const {location, propertyName, propertyImage, price, bathrooms, bedrooms, images, description, ownerName, ownerImage, phonenumber, email, position} = route.params;
    const [modalVisible, setModalVisible] = React.useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);

    //Function to render the property main image, name, price, bedrooms, bathrooms, home and bookmark icons
    const RenderPropertyMainImage = () => {
        return (
            <View style={styles.mainImageContainer}>
                {/*Image of the property*/}
                <Image
                    style={styles.mainImage}
                    resizeMode="cover"
                    //source={imageMapping[propertyImage]}
                    source={{uri : propertyImage}}
                />

                {/*Home & Bookmark button*/}
                <View style={styles.homeBookmarkConatiner}>
                    {/*Home button*/}
                    <TouchableOpacity onPress={handlePressHome}>
                        <Image
                            style={styles.homeImage}
                            resizeMode="cover"
                            source={imageMapping.backIcon}
                        />
                    </TouchableOpacity>

                    {/*Bookmark button*/}
                    <TouchableOpacity onPress={handleBookmarkPress}>
                        <Image
                            style={styles.bookmarkImage}
                            resizeMode="cover"
                            source={imageMapping.bookmarkIcon}
                        />
                </TouchableOpacity>
                </View>

                {/*Name and price*/}
                <View style={styles.properyNameAndPriceContainer}>
                    <Text style={styles.propertyName}>{propertyName}</Text>
                    <Text style={styles.propertyPrice}>$ {price} Per month</Text>
                </View>

                {/*Bedrooms and bathrooms container*/}
                <View style={styles.bedroomsAndBathroomsContainer}>
                    <View style={styles.bedroomsContainer}>
                        <Image
                            style={styles.bedroomsImage}
                            resizeMode="cover"
                            source={imageMapping.bedIcon}
                        />
                        <Text style={styles.bedroomsText}>
                            {bedrooms} {bedrooms > 1 ? "Bedrooms" : "Bedroom"}
                        </Text>
                    </View>

                    <View style={styles.bathroomsContainer}>
                        <Image  
                            style={styles.bathroomsImage}
                            resizeMode="cover"
                            source={imageMapping.bathIcon}
                        />
                        <Text style={styles.bathroomsText}>
                            {bathrooms} {bathrooms > 1 ? "Bathrooms" : "Bathroom"}
                        </Text>
                    </View>
                </View>
            </View>
        )
    };

    //Function to render the property description
    const RenderPropertyDescription = () => {
        let slicedDescription;
        if (description.length > 100) {
            slicedDescription = description.slice(0,100)+"...";
        } else {
            slicedDescription = description;
        };

        return(
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>Description</Text>
                <Text style={styles.descriptionText}>
                    {isDescriptionExpanded ? description : slicedDescription}
                </Text>
                <TouchableOpacity onPress={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>
                    <Text style={styles.expandDescriptionText}>
                        {description.length > 100 ?
                            [isDescriptionExpanded ? "Show less" : "Show more"] : ""
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        )
    };

    //Function to render the property's owner's picture and name
    const RenderPropertyOwner = () => {
        return(
            <View style={styles.ownerContainer}>
                {/*Owner image*/}
                <Image
                    style={styles.ownerImageStyle}
                    resizeMode="cover"
                    source={{uri : ownerImage}}
                />
                
                {/*Owner name & postion*/}
                <View style={styles.ownerNameContainer}>
                    <Text style={styles.ownerNameText}>{ownerName}</Text>
                    <Text style={styles.ownerPositionText}>{position}</Text>
                </View>

                {/*Call and email icons*/}
                <View style={styles.contactOwnerContainer}>
                    <TouchableOpacity onPress={handlePhonePress}>
                        <Image
                            style={styles.phoneImage}
                            resizeMode="cover"
                            source={imageMapping.phoneIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleEmailPress}>
                        <Image
                            style={styles.messageImage}
                            resizeMode="cover"
                            source={imageMapping.messageIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    //Function to render the property's gallery
    const RenderPropertyGallery = () => {
        return(
            <View style={styles.galleryContainer}>
                <Text style={styles.galleryText}>Gallery</Text>
                <FlatList
                    horizontal={true}
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderPropertyImages}
                />
            </View>
        )
    };

    //Function to render the property images based on the number of images
    const renderPropertyImages = ({item, index}) => {
        //If the property has less than 3 images
        if(index < 3) {
            return (
                <Image
                    style={styles.galleryImage}
                    resizeMode="cover"
                    source={{ uri: images[index]}}
                />
            );
        }
        
        //If the property has 3 images or more
        else if (index === 3) {
            return (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View>
                        <Image
                            style={styles.galleryImage}
                            resizeMode="cover"
                            source={{ uri: images[index]}}
                        />
                        {images.length > 4 && (
                            <View style={styles.overlay}>
                                <Text style={styles.moreImagesText}>+{images.length - 4}</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            )
        }
    };

    //Function to render the map with the marker
    const RenderMap = () => {
        return(
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.04,
                    }}
                    region={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.04,
                    }}
                    scrollEnabled = {false}
                    zoomEnabled = {false}
                >
                    <Marker
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={propertyName}
                    />
                </MapView>
            </View>
            
        )
    };

    //Function to render the price and the rent button at the bottom of the page
    const RenderPriceAndRentButton = () =>{
        return(
            <View style={styles.priceAndButtonContainer}>
                <View style={styles.priceContainer}>
                    <Text style={styles.priceLabel}>Price</Text>
                    <Text style={styles.priceText}>$ {price} Per month</Text>
                </View>
                
                <View style={styles.rentButtonContainer}>
                    <TouchableOpacity onPress={handlePress} style={styles.rentButton}>
                        <Text style={styles.rentNowText}>Rent Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    //Function to render the modal for properties having more than 3 pictures
    const RenderModal = () => {
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <FlatList
                        style={styles.flatList}
                        showsVerticalScrollIndicator = {false}
                        horizontal={false}
                        data={images}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => (
                            <View style={styles.modalImageContainer}>
                                <Image
                                style={styles.modalImage}
                                resizeMode="cover"
                                source={{uri: images[index]}}
                            />
                            </View>
                        )}
                    />
                    <View style={styles.closeButtonContainer}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButonText}>✖ Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    };

    try {
        return(
            <ScrollView contentConainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.detailProduct}>
                    <RenderPropertyMainImage />
                    <RenderPropertyDescription />
                    <RenderPropertyOwner />
                    <RenderPropertyGallery />
                    <RenderModal />
                    <RenderMap />
                    <RenderPriceAndRentButton />
                </View>
            </ScrollView>
        );
    } catch (error) {
        console.log(error);
        return(
            <Text style={{textAlign: "center", paddingTop: 20}}>Error rendering the deatils of the selected property</Text>
        );
    };
    
};

const styles = StyleSheet.create({
    //Main Container :
    mainContainer: {
        flexGrow: 1,
    },

    detailProduct:{
        backgroundColor: Color.colorWhite,
        flex: 1,
        paddingBottom: 20,
        overflow: "scroll",
        flexDirection: "column",
    },
    //End Main Container


    //Main image container :
    mainImageContainer: {
        width: width,
        height: (0.4 * height),
        position: "relative",
        marginTop: "10%",
        paddingHorizontal: "5%",
        
        //borderWidth: 2, //Debugging
        //borderColor: "blue", //Debugging
    },
        //Main Image :
        mainImage:{
            position: "relative",
            width: "100%",
            height: "100%",
            alignSelf: "center",
            borderRadius: Border.br_3xs,

            //borderWidth: 2, //Debugging
            //borderColor: "green", //Debugging
        },

        //Home and bookmark container :
        homeBookmarkConatiner: {
            width: "auto",
            height: "15%",
            position: "absolute",
            flexDirection: "row",
            marginTop: "2%",
            left: "5.5%",

            //borderWidth: 2, //Debugging
            //borderColor: "green", //Debugging
        },

            //Home image :
            homeImage:{
                position: "relative",
                width: 50,
                height: "100%",
                marginRight: "72.8%",

                //borderWidth: 2, //Debugging
                //borderColor: "green", //Debugging
            },

            //Bookmark image :
            bookmarkImage:{
                position: "relative",
                width: 50,
                height: "100%",

                //borderWidth: 2, //Debugging
                //borderColor: "green", //Debugging
            },

        //Property name and price container :
        properyNameAndPriceContainer: {
            width: width,
            height: "auto",
            position: "absolute",
            top: "65%",
            alignSelf: "center",

            //borderWidth: 5, //Debugging
            //borderColor: "green", //Debugging
        },

            //Property name :
            propertyName: {
                textAlign: "center",
                fontFamily: "Raleway-SemiBold",
                color: Color.colorWhite,
            },

            //Property price :
            propertyPrice: {
                textAlign: "center",
                fontFamily: "Raleway-Regular",
                color: Color.colorWhite,
            },

        //Bedrooms and bathrooms container :
        bedroomsAndBathroomsContainer: {
            width: width,
            height: "20%",
            position: "absolute",
            top: "80%",
            flexDirection: "row",
            alignSelf: "center",

            //borderWidth: 5, //Debugging
            //borderColor: "green", //Debugging
        },

            //Bedroom container :
            bedroomsContainer:{
                position: "relative",
                height: "100%",
                width: "30%",
                flexDirection: "column",
                left: "15%",

                //borderWidth: 5, //Debugging
                //borderColor: "green", //Debugging
            },

                //Bedroom image :
                bedroomsImage:{
                    width: 30,
                    height: 30,
                    position: "relative",
                    left: "40%",
                },

                //Bedroom text :
                bedroomsText:{
                    position: "relative",
                    textAlign: "center",
                    fontFamily: "Raleway-SemiBold",
                },

            //Bathrrom container :
            bathroomsContainer:{
                position: "relative",
                height: "100%",
                width: "30%",
                flexDirection: "column",
                left: "25%",

                //borderWidth: 5, //Debugging
                //borderColor: "green", //Debugging
            },

                //Bathroom image :
                bathroomsImage:{
                    width: 30,
                    height: 30,
                    position: "relative",
                    left: "40%",
                },

                //Bathroom text :
                bathroomsText:{
                    position: "relative",
                    textAlign: "center",
                    fontFamily: "Raleway-SemiBold",
                },
    //End main image container


    //Desctiption container :
    descriptionContainer:{
        position:"relative",
        marginTop: "1%",
        width: "100%",
        height: "auto",
        flexDirection: "column",

        //borderWidth: 2, //Debugging
        //borderColor: "blue", //Debugging
    },

        //Description label :
        descriptionLabel: {
            position: "relative",
            fontFamily: "Raleway-SemiBold",
            textAlign: "center",
            width: "100%",

            //borderWidth: 2, //Debugging
            //borderColor: "blue", //Debugging
        },

        //Description text :
        descriptionText: {
            position: "relative",
            fontFamily: "Raleway-Regular",
            textAlign : "left",
            marginHorizontal: "2%",
            width: "auto",
            height: "auto",

            //borderWidth: 2, //Debugging
            //borderColor: "blue", //Debugging
        },

        //Expand description text :
        expandDescriptionText:{
            fontFamily: "Raleway-SemiBold",
            textAlign: "center",
            marginHorizontal: "2%",
            width: "auto",
            color: Color.colorCornflowerblue,

            //borderWidth: 2, //Debugging
            //borderColor: "blue", //Debugging
        },
    //End description container


    //Owner container :
    ownerContainer: {
        position: "relative",
        marginTop: "1%",
        width: "100%",
        height: "auto",
        flexDirection: "row",

        //borderWidth: 2, //Debugging
        //borderBlockColor: "blue", //Debugging
    },

        //Owner image :
        ownerImageStyle: {
            position: "relative",
            width: 50,
            height: 50,
            alignSelf: "center",
            marginHorizontal: "2%",
            
            //borderWidth: 2, //Debugging
            //borderColor: "blue", //Debugging
        },

        //Owner name and position :
        ownerNameContainer: {
            position: "relative",
            height: "100%",
            width: "auto",
            flexDirection: "column",
            justifyContent: "center",

            //borderWidth: 2, //Debugging
            //borderColor: "blue", //Debugging
        },

            //Owner name :
            ownerNameText: {
                position: "relative",
                fontFamily: "Raleway-Regular",
                width: "100%",
                height: "auto",

                //borderWidth: 2, //Debugging
                //borderColor: "blue", //Debugging
            },

            //Owner position :
            ownerPositionText: {
                position: "relative",
                fontFamily: "Raleway-Regular",
                width: "100%",
                height: "auto",
                textAlign: "center",

                //borderWidth: 2, //Debugging
                //borderColor: "blue", //Debugging
            },
        //End owner name and position

        //Contact owner :
        contactOwnerContainer: {
            position: "relative",
            height: "100%",
            width: "auto",
            flexDirection: "row",
            marginHorizontal: "30%",

            //borderWidth: 2, //Debugging
            //borderColor: "blue", //Debugging
        },

            //Phone image :
            phoneImage: {
                position: "relative",
                width: 50,
                height: 50,

                //borderWidth: 2, //Debugging
                //borderColor: "blue", //Debugging
            },

            //Messgae image :
            messageImage: {
                position: "relative",
                width: 50,
                height: 50,
                
                //borderWidth: 2, //Debugging
                //borderColor: "blue", //Debugging
            },
    //End owner container


    //Galley container :
    galleryContainer: {
        position: "relative",
        marginTop: "1%",
        width: "100%",
        height: "auto",
        flexDirection: "column",

        //borderWidth: 2,  //Debugging
        //borderColor: "blue", //Debugging
    },

        //Gallery text :
        galleryText: {
            position: "relative",
            width: "100%",
            height: "auto",
            textAlign: "center",
            fontFamily: "Raleway-SemiBold",

            //borderWidth: 2,  //Debugging
            //borderColor: "blue", //Debugging
        },

        //Images :
        galleryImage: {
            position: "relative",
            width: 80,
            height: 80,
            marginHorizontal: "4.1%",
            marginTop: "5%",
            alignSelf: "center",
            borderRadius: Border.br_3xs,

            //borderWidth: 2,  //Debugging
            //borderColor: "blue", //Debugging
        },

        //Overlay for more images :
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Border.br_3xs,
            width: 80,
            height: 80,
            marginHorizontal: "4%",
            marginTop: "5%",

            //borderWidth: 2,  //Debugging
            //borderColor: "blue", //Debugging
        },

        //More images text :
        moreImagesText: {
            fontFamily: "Raleway-SemiBold",
            color: Color.colorWhite,

            //borderWidth: 2,  //Debugging
            //borderColor: "blue", //Debugging
        },
    //End gallery container

    
    //Map :
    mapContainer: {
        position: "relative",
        marginTop: "2%",
        height: 250,
        marginHorizontal: "2%",
        borderRadius: Border.br_3xs,

        //borderWidth: 2,  //Debugging
        //borderColor: "blue", //Debugging
    },

        //Map :
        mapStyle: {
            position: "relative",
            width: "100%",
            height: "100%",
        },
    //End map container


    //Price and rent button container :
    priceAndButtonContainer: {
        position: "relative",
        marginTop : "2%",
        flexDirection: "row",
        height: "auto",
        width: "100%",

        //borderWidth: 2,  //Debugging
        //borderColor: "green", //Debugging
    },

        //Price container :
        priceContainer: {
            position: "relative",
            flexDirection: "column",
            width: "40%",
            height: "100%",
            marginLeft: "2%",

            //borderWidth: 2,  //Debugging
            //borderColor: "red", //Debugging
        },

            //Price label :
            priceLabel: {
                fontFamily: "Raleway-SemiBold",
                //textAlign: "center",
                width: "auto",
            },

            //Price text :
            priceText: {
                fontFamily: "Raleway-Regular",
                //textAlign: "center",
                width: "auto",
            },
        //End price container

        //Rent now container :
        rentButtonContainer: {
            position: "relative",
            width: "auto",
            height: "auto",
            marginLeft: "7%",
            
            //borderWidth: 2, //Debugging
            //borderColor: "blue", //Debugging
        },

            //Rent now button :
            rentButton: {
                backgroundColor: Color.colorCornflowerblue,
                width: 200,
                height: "100%",
                justifyContent: "center",
                borderRadius: Border.br_3xs,

                //borderWidth: 2, //Debugging
                //borderColor: "blue", //Debugging
            },

            //Rent now text :
            rentNowText: {
                position: "relative",
                textAlign: "center",
                color: Color.colorWhite,
            },
        //End rent now container
    //End price and rent button container

    //Modal :
    modalContainer: {
        flex: 1,
        flexDirection: "column",
        overflow: "scroll",
        backgroundColor: 'rgba(0,0,0,0.7)',

        //borderWidth: 2, //Debugging
        //borderColor: "blue", //Debugging
    },

        //Flat list :
        flatList: {
            flex: 1,
            position: "relative",
            flexDirection: "column",
            flexWrap: "wrap",
            marginHorizontal: "2%",

            //borderWidth: 2, //Debugging
            //borderColor: "green", //Debugging
        },

            //Modal image container :
            modalImageContainer: {
                position: "relative",
                width: "100%",
                flexDirection: "row",
                marginVertical: "2%",

                //borderWidth: 2, //Debugging
                //borderColor: "green", //Debugging
            },

                //Modal image :
                modalImage: {
                    position: "relative",
                    width: "100%",
                    height: 250,
                    borderRadius: 10,

                    //borderWidth: 2, //Debugging
                    //borderColor: "green", //Debugging
                },
            //End modal image container
        //End flat list

        //Close button container
        closeButtonContainer: {
            position: "relative",
            marginHorizontal: "2%",
            marginVertical: "2%",
            height: "5%",

            //borderWidth: 2, //Debugging
            //borderColor: "blue", //Debugging
        },

            //Close button :
                closeButton: {
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    backgroundColor: Color.colorGray_300,
                    borderRadius: Border.br_3xs,
                    justifyContent: "center",

                    //borderWidth: 2, //Debugging
                    //borderColor: "blue", //Debugging
                },

                //Close text :
                closeButonText: {
                    position: "relative",
                    color: Color.colorWhite,
                    fontFamily: "Raleway-SemiBold",
                    textAlign: "center",
                },
        //End close button container
    //End modal container
});

export default DetailProductNew;