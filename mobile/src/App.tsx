import React, { useState } from 'react';
import { StatusBar, StyleSheet, View, Alert } from 'react-native';

// Import separate screen components
import HomeScreen from './screens/HomeScreen';
import ScannerScreen from './screens/ScannerScreen';
import QuestsScreen from './screens/QuestsScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import ShopScreen from './screens/ShopScreen';
import FriendsScreen from './screens/FriendsScreen';

type Screen = 'home' | 'scanner' | 'quests' | 'shop' | 'leaderboard' | 'friends';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [userCoins, setUserCoins] = useState(490);
  const [userXP, setUserXP] = useState(10);
  const [userLevel, setUserLevel] = useState(1);

  // Quest tracking state
  const [binsScanned, setBinsScanned] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);

  const handleBinScan = () => {
    const xpGained = 5;
    const coinsGained = 10;

    setUserXP(prev => {
      const newXP = prev + xpGained;
      const newLevel = Math.floor(newXP / 100) + 1;
      setUserLevel(newLevel);
      return newXP;
    });

    setUserCoins(prev => prev + coinsGained);
    setBinsScanned(prev => prev + 1); // Track bin scans for quest

    Alert.alert(
      'Bin Scanned! 🎉',
      `You earned ${xpGained} XP and ${coinsGained} RecycleCoins!`,
      [{ text: 'Great!', style: 'default' }]
    );
  };

  const handleItemScanned = (item: any) => {
    setUserXP(prev => {
      const newXP = prev + item.xp;
      const newLevel = Math.floor(newXP / 100) + 1;
      setUserLevel(newLevel);
      return newXP;
    });

    setUserCoins(prev => prev + item.coins);
    setTotalWeight(prev => prev + (item.weight || 0)); // Track weight for quest
  };

  const handleSpendCoins = (amount: number) => {
    setUserCoins(prev => prev - amount);
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            userCoins={userCoins}
            userXP={userXP}
            userLevel={userLevel}
            onNavigate={handleNavigate}
          />
        );
      case 'scanner':
        return (
          <ScannerScreen
            onBinScan={handleBinScan}
            onItemScanned={handleItemScanned}
            onNavigate={handleNavigate}
          />
        );
      case 'quests':
        return (
          <QuestsScreen
            binsScanned={binsScanned}
            totalWeight={totalWeight}
            onNavigate={handleNavigate}
          />
        );
      case 'leaderboard':
        return (
          <LeaderboardScreen
            userLevel={userLevel}
            userXP={userXP}
            onNavigate={handleNavigate}
          />
        );
      case 'shop':
        return (
          <ShopScreen
            userCoins={userCoins}
            onSpendCoins={handleSpendCoins}
            onNavigate={handleNavigate}
          />
        );
      case 'friends':
        return (
          <FriendsScreen
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
    backgroundColor: '#f5f5f5',
    paddingTop: 40, // Account for status bar
  },
});

export default App;