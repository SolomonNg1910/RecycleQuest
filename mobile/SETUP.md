# RecycleQuest Mobile Setup Guide

## Prerequisites
- **Node.js** (v16 or newer)
- **Android Studio** with Android SDK (for Android development)
- **Xcode** (for iOS development - Mac only)
- **Java Development Kit (JDK)** 11 or newer

## Android Setup
1. Install Android Studio
2. Install Android SDK (API level 33+)
3. Create an Android Virtual Device (AVD) or connect a physical device
4. Ensure `ANDROID_HOME` environment variable is set

## Installation Steps

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd RecycleQuest/mobile
   npm install
   ```

2. **Android setup:**
   ```bash
   # Check if everything is configured correctly
   npx react-native doctor
   
   # Start Metro bundler
   npx react-native start
   
   # In a new terminal, run the app
   npx react-native run-android
   ```

## Development

- **Hot Reload:** Save any file and see changes instantly
- **Developer Menu:** Shake device or press `Ctrl+M` (Windows/Linux) / `Cmd+M` (Mac)
- **Reload:** `Ctrl+R` or `Cmd+R` in the emulator

## Common Issues

1. **NDK Version Error:** App automatically uses NDK 27.0.12077973
2. **Port 8081 in use:** Kill Metro with `Ctrl+C` and restart
3. **App not connecting:** Check emulator network settings or run `adb reverse tcp:8081 tcp:8081`

## iOS Setup (Mac only)

### Prerequisites
1. **Install Xcode** from Mac App Store
2. **Install CocoaPods:** `brew install cocoapods`

### Setup Steps
1. **Install iOS dependencies:**
   ```bash
   cd ios && pod install
   ```

2. **Configure for your device:**
   - Open `mobile/ios/TempProject.xcworkspace` (not .xcodeproj!)
   - Select "TempProject" in navigator (blue folder icon at top left)
   - Go to "Signing & Capabilities" tab
   - **In the "Bundle Identifier" field:** Change from `com.solomonng.recyclequest` to something unique like `com.yourname.recyclequest`
   - **In the "Team" dropdown:** Select your team (sign in with Apple ID if needed - free account is fine)

3. **Run on device:**
   - Connect iPhone via USB
   - Select your device in Xcode toolbar
   - Click play button ▶️ or press `Cmd+R`

### First Time Setup
- On your iPhone: Settings → General → VPN & Device Management
- Trust your developer certificate when prompted

### Alternative - iOS Simulator
```bash
npx react-native run-ios
```

## Build Info
- React Native 0.81
- Target SDK: 36 (Android)
- Min SDK: 24 (Android)
- iOS: 13.0+