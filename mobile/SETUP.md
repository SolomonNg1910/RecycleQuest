# RecycleQuest Mobile Setup Guide

## Prerequisites
- **Node.js** (v16 or newer)
- **Android Studio** with Android SDK
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

## Build Info
- React Native 0.81
- Target SDK: 36
- Min SDK: 24