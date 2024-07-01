## Refme Pro App
Made with expo and react-native

## Generate APK Locally
``npx eas-cli@latest build --platform android --profile genApk --local``

## Generate APK on EAS
``eas build -p android --profile genApk``

## Upload update to EAS
``eas submit --profile genApk``

## UPDATE BRANCH on Expo Go
``eas update --branch dev-branch --message "Update ms time in coetext"``

## TO PUBLISH ON APP STORE
``eas build --platform ios``
- USE APPLE ID drivendlab@gmail.com
- Miguel Ramirez - Individual Account (8ZMPL6P7J2)
- Use existing certs & profiles
``eas submit``
- Go to the App Store Connect and select testers