/*
import React, { useState } from "react";
import Constants from 'expo-constants';
import { google } from "googleapis";
import * as Google from 'expo-auth-session';

const CLIENT_ID = Constants.expoConfig.extra.clientId;

const GetImageFromDrive = (fileID) => {
    const [accessToken, setAccessToken] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    //Function to get the token using the client_email generated from the API :
    async function getAccessToken() {
        const { type, params } = await Google.useIdTokenAuthRequest({
            clientId: CLIENT_ID,
        });

        if (type === 'success') {
            setAccessToken(params.id_token);
        }
    };
    //

    //Function to get the url of the image :
    async function getImageLink(fileId) {
        const accessToken = await getAccessToken();
        if(!accessToken){
            console.log('No access token');
            return;
        };

        const drive = google.drive({version: 'v3', auth: accessToken});

        try {
            const result = await drive.files.get({
                fileId: fileId,
                fields: 'webViewLink',
            });
            console.log("Link for the image : " +result.data.webViewLink);
            setImageUrl(result.data.webViewLink);
        } catch (error) {
            console.error('Error retreiving image : ', error);
        };
    }
};

export default GetImageFromDrive;
*/

/*
const getImages = ({fileID, accessToken}) => {
    const [imageUrl, setImageUrl] = useState(null);

    const fetchFileLink = async () => {
        try{
            const response = await fetch(
                'https://www.googleapis.com/drive/v3/files/${fileId}',
                {
                    headers: {
                        Authorizartion: 'Bearer ${accessToken}',
                    },
                }
            );

            const data = await response.json();

            if(data.webContentLink) {
                setImageUrl(data.webContentLink);
            } else {
                console.error('Error fetching image ', data);
            };

            console.log(data);
            return(data.webContentLink);
        } catch (error) {
            console.error('Error fetching file link : ', error);
        };
    };
};

export default getImages;
*/