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

### Quirks

If [Capacitor Firebase Authentication](https://github.com/capawesome-team/capacitor-firebase/tree/main/packages/authentication) is installed locally instead of using an already published version from the npm registry, then the following `paths` must be added to `tsconfig.json` of your project to test the web implementation:

```json
{
  "compilerOptions": {
    "paths": {
      "firebase/*": ["../capacitor-firebase/node_modules/firebase/*"]
    }
  }
}
```

> Note: You may need to adjust the path to your environment.

<!-- ## Changelog

See [CHANGELOG.md](https://github.com/robingenz/capacitor-firebase-authentication-demo/blob/main/CHANGELOG.md). -->

## License

See [LICENSE](https://github.com/robingenz/capacitor-firebase-authentication-demo/blob/main/LICENSE).
