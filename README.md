# Recycle Quest

A gamified recycling application that transforms everyday recycling tasks into engaging game-like experiences.

https://github.com/SolomonNg1910/RecycleQuest.git

## Authors

- **Lew Jing Xuan** - e1249208@u.nus.edu
- **Calvin Soe Frederick** - e1121935@u.nus.edu
- **Te Ming Xian** - e1121623@u.nus.edu
- **Chong Le Tong, Trix** - tchong009@e.ntu.edu.sg
- **Ng Xing Zhi, Solomon** - 2200713@sit.singaporetech.edu.sg

## Prerequisites

- Node.js and npm installed
- Android Studio
- For macOS users: Terminal access

## Build Instructions

### 1. Install Node Dependencies

```bash
npm install
```

### 2. Download and Setup Android Studio

1. Download and install [Android Studio](https://developer.android.com/studio)
2. Open Android Studio and complete the initial setup

### 3. Configure Android SDK

1. In Android Studio, go to **Settings** (or **Preferences** on macOS)
2. Search for "Android SDK" in the settings
3. Under **SDK Platforms** tab:
   - Select **Android 16.0 Baklava API Level 36.0**
4. Under **SDK Tools** tab, select the following:
   - Android SDK Build-Tools
   - NDK (Side by side)
   - Android SDK Command-line Tools (latest)
   - CMake
   - Android Emulator
   - Android SDK Platform-Tools
5. Click **Apply** and wait for the components to download
6. **Important**: Note down the Android SDK location shown at the top of the Android SDK settings page

### 4. Environment Setup (macOS and windows)

For macOS users, you need to configure environment variables:

1. Open Terminal and edit your shell profile:

   ```bash
   code ~/.zshrc
   ```

2. Add the following lines to the file (replace `YOUR_SDK_PATH` with the actual path from step 3.6):

   ```bash
   export ANDROID_HOME=YOUR_SDK_PATH
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   export PATH=$PATH:$ANDROID_HOME/tools
   export PATH=$PATH:$ANDROID_HOME/tools/bin
   ```

3. Save the file (`Ctrl+S` or `Cmd+S`)

4. Reload your shell configuration:
   ```bash
   source ~/.zshrc
   ```
For windows users, you need to configure mobile\android\local.properties:
1. sdk.dir=YOUR_SDK_PATH
### 5. Build and Run the Application

1. Navigate to the mobile directory:

   ```bash
   cd mobile
   ```

2. Start the React Native Metro bundler:

   ```bash
   npx react-native start
   ```

3. In a new terminal window/tab, run the Android application:

   ```bash
   npx react-native run-android
   ```

4. Wait for dependencies to download and the Android app should appear on your emulator or connected device.

## Troubleshooting

- Make sure you have an Android emulator running or a physical device connected via USB with USB debugging enabled
- If you encounter permission issues on macOS, you may need to restart your terminal after setting up environment variables
- Ensure all Android SDK components are properly downloaded and installed

## Additional Notes

- The first build may take longer as it downloads and caches dependencies
- Make sure your Android emulator is running before executing the run-android command
