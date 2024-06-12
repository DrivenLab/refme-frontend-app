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
