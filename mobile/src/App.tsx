import React, { useState, useEffect, useRef } from "react";
import { StatusBar, StyleSheet, View, Alert, AppState } from "react-native";
import Sound from "react-native-sound";

// Import separate screen components
import HomeScreen from "./screens/HomeScreen";
import ScannerScreen from "./screens/ScannerScreen";
import QuestsScreen from "./screens/QuestsScreen";
import LeaderboardScreen from "./screens/LeaderboardScreen";
import ShopScreen from "./screens/ShopScreen";
import FriendsScreen from "./screens/FriendsScreen";
import ProfileScreen from "./screens/ProfileScreen";

type Screen =
  | "profile"
  | "home"
  | "scanner"
  | "quests"
  | "shop"
  | "leaderboard"
  | "friends";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [userCoins, setUserCoins] = useState(490);
  const [userXP, setUserXP] = useState(10);
  const [userLevel, setUserLevel] = useState(1);

  // Quest tracking state
  const [binsScanned, setBinsScanned] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  Sound.setCategory("Playback", true);

  const bgMusicRef = useRef<Sound | null>(null);

  const startBackgroundMusic = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.play((success) => {
        if (success) {
          console.log("BGM restarted successfully");
        } else {
          console.log("BGM failed to restart");
        }
      });
    }
  };

  useEffect(() => {
    const bgMusic = new Sound("bgm", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Failed to load background music", error);
        return;
      }
      bgMusic.setNumberOfLoops(-1);
      bgMusic.setVolume(0.5);
      bgMusic.play((success) => {
        if (!success) {
          console.log("BGM failed to play");
        }
      });
      bgMusicRef.current = bgMusic;
    });

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.stop();
        bgMusicRef.current.release();
      }
    };
  }, []);

  useEffect(() => {
    if (currentScreen === "home") {
      startBackgroundMusic();
    }
  }, [currentScreen]);

  const handleBinScan = () => {
    const xpGained = 5;
    const coinsGained = 10;

    setUserXP((prev) => {
      const newXP = prev + xpGained;
      const newLevel = Math.floor(newXP / 100) + 1;
      setUserLevel(newLevel);
      return newXP;
    });

    setUserCoins((prev) => prev + coinsGained);
    setBinsScanned((prev) => prev + 1); // Track bin scans for quest

    Alert.alert(
      "Bin Scanned! 🎉",
      `You earned ${xpGained} XP and ${coinsGained} RecycleCoins!`,
      [{ text: "Great!", style: "default" }]
    );
  };

  const handleItemScanned = (item: any) => {
    setUserXP((prev) => {
      const newXP = prev + item.xp;
      const newLevel = Math.floor(newXP / 100) + 1;
      setUserLevel(newLevel);
      return newXP;
    });

    setUserCoins((prev) => prev + item.coins);
    setTotalWeight((prev) => prev + (item.weight || 0)); // Track weight for quest
  };

  const handleSpendCoins = (amount: number) => {
    setUserCoins((prev) => prev - amount);
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            userCoins={userCoins}
            userXP={userXP}
            userLevel={userLevel}
            onNavigate={handleNavigate}
          />
        );
      case "scanner":
        return (
          <ScannerScreen
            onBinScan={handleBinScan}
            onItemScanned={handleItemScanned}
            onNavigate={handleNavigate}
          />
        );
      case "quests":
        return (
          <QuestsScreen
            binsScanned={binsScanned}
            totalWeight={totalWeight}
            onNavigate={handleNavigate}
          />
        );
      case "leaderboard":
        return (
          <LeaderboardScreen
            userLevel={userLevel}
            userXP={userXP}
            onNavigate={handleNavigate}
          />
        );
      case "shop":
        return (
          <ShopScreen
            userCoins={userCoins}
            onSpendCoins={handleSpendCoins}
            onNavigate={handleNavigate}
          />
        );
      case "friends":
        return (
          <FriendsScreen
            userCoins={userCoins}
            userXP={userXP}
            userLevel={userLevel}
            onNavigate={handleNavigate}
          />
        );
      case "profile":
        return (
          <ProfileScreen
            userCoins={userCoins}
            userXP={userXP}
            userLevel={userLevel}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <HomeScreen
            userCoins={userCoins}
            userXP={userXP}
            userLevel={userLevel}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {renderCurrentScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 40, // Account for status bar
  },
});

export default App;
