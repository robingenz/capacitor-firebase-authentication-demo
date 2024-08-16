# capacitor-firebase-authentication-demo

[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/robingenz/capacitor-firebase-authentication-demo/CI/main)](https://github.com/robingenz/capacitor-firebase-authentication-demo/actions)

<!-- [![GitHub tag (latest SemVer)](https://img.shields.io/github/tag/robingenz/capacitor-firebase-authentication-demo?color=brightgreen&label=version)](https://github.com/robingenz/capacitor-firebase-authentication-demo/releases) -->

⚡️ Simple Ionic Angular app to demonstrate the use of the [Capacitor Firebase Authentication plugin](https://github.com/robingenz/capacitor-firebase).

## Plugins

The following plugins are included:

- [capacitor-firebase/authentication](https://github.com/robingenz/capacitor-firebase)

## Development Setup 💻

### Prerequisites

- Install [Node.js](https://nodejs.org) which includes [Node Package Manager](https://www.npmjs.com/get-npm)
- Android development: Install [Android Studio](https://developer.android.com/studio)
- iOS development: Install [XCode](https://apps.apple.com/de/app/xcode/id497799835?mt=12)

### Getting Started

Clone this repository:

```
git clone https://github.com/robingenz/capacitor-firebase-authentication-demo.git
```

Change to the root directory of the project:

```
cd capacitor-firebase-authentication-demo
```

Install all dependencies:

```
npm i
```

### Configure Firebase

To run your own instance of the demo, you will need to create your own instance of a Firebase project and configure Firebase (see [here](https://github.com/capawesome-team/capacitor-firebase/blob/main/docs/firebase-setup.md)). You will need to ensure that each of the desired sign-in methods are enabled.

### Android Keystore

Android requires a keystore to sign the app.

#### Shell Command

You can create a debug keystore with the following command:

```shell
echo -n "Enter keystore password (minimum 6 characters): " >&2
read -s password
echo >&2

keytool -genkey -v \
    -keystore android/debug.keystore \
    -storepass "$password" \
    -alias debug \
    -keypass "$password" \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -dname "CN=Unknown, OU=Unknown, O=Unknown, L=Unknown, ST=Unknown, C=Unknown" \
    -noprompt &&
echo "storePassword=$password" > android/keystore.properties &&
echo "keyPassword=$password" >> android/keystore.properties &&
echo "keyAlias=debug" >> android/keystore.properties &&
echo "storeFile=debug.keystore" >> android/keystore.properties

```

#### Alternative Manual Method

Alternatively, you can create a keystore and `android/keystore.properties` keystore through another means (see [Android docs](https://developer.android.com/studio/publish/app-signing#generate-key)). Create a new file under the following path: `android/keystore.properties`. This file should have the following content:

```kotlin
storePassword=<store-password>
keyPassword=<key-password>
keyAlias=<key-alias>
storeFile=<store-file-path>
```

Of course you have to replace the placeholders, e.g.

```kotlin
storePassword=1234
keyPassword=1234
keyAlias=debug
storeFile=debug.keystore
```

### Prepare and Launch

Prepare and launch the Android app:

```
npx ionic cap sync android
npx ionic cap run android
```

Prepare and launch the iOS app:

```
npx ionic cap sync ios
npx ionic cap run ios
```

This project uses [Ionic](https://ionicframework.com/) as app development platform and the [Ionic CLI](https://ionicframework.com/docs/cli).

<!-- ## Changelog

See [CHANGELOG.md](https://github.com/robingenz/capacitor-firebase-authentication-demo/blob/main/CHANGELOG.md). -->

## License

See [LICENSE](https://github.com/robingenz/capacitor-firebase-authentication-demo/blob/main/LICENSE).
