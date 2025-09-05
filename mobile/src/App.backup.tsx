// BACKUP: Working single-screen App component
// This is the backup of the working version before switching to AppNavigator
// To revert: copy this content back to App.tsx

import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';

type Screen = 'home' | 'scanner' | 'quests' | 'shop' | 'leaderboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [userCoins, setUserCoins] = useState(20);
  const [userXP, setUserXP] = useState(10);
  const [userLevel, setUserLevel] = useState(1);

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

    Alert.alert(
      'Bin Scanned! 🎉',
      `You earned ${xpGained} XP and ${coinsGained} RecycleCoins!`,
      [{ text: 'Great!', style: 'default' }]
    );
  };

  const renderHomeScreen = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
        <Text style={styles.title}>RecycleQuest</Text>
        <Text style={styles.subtitle}>Gamified Recycling MVP</Text>

        {/* User Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userCoins}</Text>
            <Text style={styles.statLabel}>RecycleCoins</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>Level {userLevel}</Text>
            <Text style={styles.statLabel}>{userXP} XP</Text>
          </View>
        </View>

        {/* Quote of the Day */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteTitle}>💡 Quote of the Day</Text>
          <Text style={styles.quoteText}>"The Earth does not belong to us; we belong to the Earth."</Text>
          <Text style={styles.quoteAuthor}>- Chief Seattle</Text>
        </View>

        {/* Navigation Buttons */}
        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen('scanner')}
        >
          <Text style={styles.buttonText}>📱 Scan Bin</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen('quests')}
        >
          <Text style={styles.buttonText}>🎯 Daily Quests</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen('leaderboard')}
        >
          <Text style={styles.buttonText}>🏆 Leaderboard</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => setCurrentScreen('shop')}
        >
          <Text style={styles.buttonText}>🛍️ RecycleShop</Text>
        </Pressable>
      </View>
    </ScrollView>
  );

  const renderScannerScreen = () => (
    <View style={styles.content}>
      <Text style={styles.title}>📱 Scanner</Text>
      <Text style={styles.subtitle}>Scan bins and items</Text>

      <View style={styles.scanArea}>
        <Text style={styles.scanIcon}>📱</Text>
        <Text style={styles.scanText}>Tap to simulate bin scan</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={handleBinScan}
      >
        <Text style={styles.buttonText}>Simulate Bin Scan</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.backButton]}
        onPress={() => setCurrentScreen('home')}
      >
        <Text style={styles.buttonText}>← Back to Home</Text>
      </Pressable>
    </View>
  );

  const renderQuestsScreen = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
        <Text style={styles.title}>🎯 Daily Quests</Text>
        <Text style={styles.subtitle}>Complete quests to earn rewards</Text>

        <View style={styles.questCard}>
          <Text style={styles.questTitle}>Bin Run</Text>
          <Text style={styles.questDesc}>Scan 3 recycling bins today</Text>
          <Text style={styles.questReward}>Reward: 50 RecycleCoins</Text>
          <Text style={styles.questProgress}>Progress: 0/3</Text>
        </View>

        <View style={styles.questCard}>
          <Text style={styles.questTitle}>Green Weight</Text>
          <Text style={styles.questDesc}>Recycle 2kg of materials</Text>
          <Text style={styles.questReward}>Reward: 100 RecycleCoins</Text>
          <Text style={styles.questProgress}>Progress: 0/2 kg</Text>
        </View>

        <Pressable
          style={[styles.button, styles.backButton]}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.buttonText}>← Back to Home</Text>
        </Pressable>
      </View>
    </ScrollView>
  );

  const renderLeaderboardScreen = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
        <Text style={styles.title}>🏆 Leaderboard</Text>
        <Text style={styles.subtitle}>Top recyclers in your area</Text>

        <View style={styles.leaderItem}>
          <Text style={styles.rank}>🥇</Text>
          <Text style={styles.name}>GreenHero</Text>
          <Text style={styles.coins}>2500 coins</Text>
        </View>

        <View style={styles.leaderItem}>
          <Text style={styles.rank}>🥈</Text>
          <Text style={styles.name}>EcoChamp</Text>
          <Text style={styles.coins}>2200 coins</Text>
        </View>

        <View style={[styles.leaderItem, styles.currentUser]}>
          <Text style={styles.rank}>🥉</Text>
          <Text style={styles.name}>You</Text>
          <Text style={styles.coins}>{userCoins} coins</Text>
        </View>

        <Pressable
          style={[styles.button, styles.backButton]}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.buttonText}>← Back to Home</Text>
        </Pressable>
      </View>
    </ScrollView>
  );

  const renderShopScreen = () => (
    <ScrollView style={styles.scrollView}>
      <View style={styles.content}>
        <Text style={styles.title}>🛍️ RecycleShop</Text>
        <Text style={styles.subtitle}>Redeem your RecycleCoins</Text>

        <View style={styles.coinsDisplay}>
          <Text style={styles.coinsLabel}>Your RecycleCoins</Text>
          <Text style={styles.coinsAmount}>{userCoins}</Text>
        </View>

        <View style={styles.shopCard}>
          <Text style={styles.shopTitle}>CDC Voucher $5</Text>
          <Text style={styles.shopDesc}>Community Development Council voucher</Text>
          <Text style={styles.shopPrice}>Cost: 500 RecycleCoins</Text>
          <Pressable
            style={[styles.buyButton, userCoins < 500 && styles.buyButtonDisabled]}
            onPress={() => {
              if (userCoins >= 500) {
                setUserCoins(prev => prev - 500);
                Alert.alert('Purchase Successful!', 'Your CDC voucher will be sent to your email.');
              } else {
                Alert.alert('Insufficient Coins', 'You need more RecycleCoins to purchase this item.');
              }
            }}
          >
            <Text style={styles.buyButtonText}>
              {userCoins >= 500 ? 'Redeem' : 'Not Enough'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.shopCard}>
          <Text style={styles.shopTitle}>CDC Voucher $10</Text>
          <Text style={styles.shopDesc}>Community Development Council voucher</Text>
          <Text style={styles.shopPrice}>Cost: 1000 RecycleCoins</Text>
          <Pressable
            style={[styles.buyButton, userCoins < 1000 && styles.buyButtonDisabled]}
            onPress={() => {
              if (userCoins >= 1000) {
                setUserCoins(prev => prev - 1000);
                Alert.alert('Purchase Successful!', 'Your CDC voucher will be sent to your email.');
              } else {
                Alert.alert('Insufficient Coins', 'You need more RecycleCoins to purchase this item.');
              }
            }}
          >
            <Text style={styles.buyButtonText}>
              {userCoins >= 1000 ? 'Redeem' : 'Not Enough'}
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.button, styles.backButton]}
          onPress={() => setCurrentScreen('home')}
        >
          <Text style={styles.buttonText}>← Back to Home</Text>
        </Pressable>
      </View>
    </ScrollView>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home': return renderHomeScreen();
      case 'scanner': return renderScannerScreen();
      case 'quests': return renderQuestsScreen();
      case 'leaderboard': return renderLeaderboardScreen();
      case 'shop': return renderShopScreen();
      default: return renderHomeScreen();
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 30,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    gap: 15,
  },
  statCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    minWidth: 100,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  quoteCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    width: '100%',
    elevation: 2,
  },
  quoteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: 250,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#666',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scanArea: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    marginVertical: 30,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    width: 250,
  },
  scanIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  scanText: {
    fontSize: 16,
    color: '#666',
  },
  questCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    elevation: 2,
  },
  questTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  questDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  questReward: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  questProgress: {
    fontSize: 12,
    color: '#999',
  },
  leaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    elevation: 2,
  },
  currentUser: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8E9',
  },
  rank: {
    fontSize: 24,
    marginRight: 15,
  },
  name: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  coins: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  coinsDisplay: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  coinsLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  coinsAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  shopCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    elevation: 2,
  },
  shopTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  shopDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  shopPrice: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;