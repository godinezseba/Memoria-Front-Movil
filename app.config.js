import { env } from 'process';

export default {
  "name": "Memoria App",
  "slug": "memoria-app",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/icon.png",
  "splash": {
    "image": "./assets/splash.png",
    "resizeMode": "contain",
    "backgroundColor": "#ffffff"
  },
  "updates": {
    "fallbackToCacheTimeout": 0
  },
  "assetBundlePatterns": [
    "**/*"
  ],
  "ios": {
    "supportsTablet": true
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png",
      "backgroundColor": "#FFFFFF"
    },
    "package": "com.memoria.movilapp",
    "versionCode": 1
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  extra: {
    'API_URL': env.API_URL || 'https://memoria-back-end.herokuapp.com/v2/graphql',
  }
}
