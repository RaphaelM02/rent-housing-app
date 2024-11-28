export default {
  "expo": {
    "name": "rent-housing-app",
    "slug": "rent-housing-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "newArchEnabled": true,
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "com.raphael.renthousingapp",
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-font"
    ],
    "extra": {
      "eas": {
        "projectId": "1c083e0b-44b2-4eea-8e45-1176a4f66299",
      },
      "googleApiKey": process.env.GOOGLE_PLACES_API,
      "clientId": process.env.GOOGLE_DRIVE_EMAIL
    }
  }
}
