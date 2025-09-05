import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';

type Screen = 'home' | 'scanner' | 'quests' | 'shop' | 'leaderboard' | 'friends';

interface HomeScreenProps {
  userCoins: number;
  userXP: number;
  userLevel: number;
  onNavigate: (screen: Screen) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  userCoins,
  userXP,
  userLevel,
  onNavigate,
}) => {
  return (
    <ImageBackground 
      source={require('../images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
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
          <Text style={styles.quoteText}>
            "The Earth does not belong to us; we belong to the Earth."
          </Text>
          <Text style={styles.quoteAuthor}>- Chief Seattle</Text>
        </View>

        {/* Navigation Buttons */}
        <Pressable
          style={styles.button}
          onPress={() => onNavigate('scanner')}
        >
          <Text style={styles.buttonText}>📱 Scan Bin</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => onNavigate('quests')}
        >
          <Text style={styles.buttonText}>🎯 Daily Quests</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => onNavigate('leaderboard')}
        >
          <Text style={styles.buttonText}>🏆 Leaderboard</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => onNavigate('shop')}
        >
          <Text style={styles.buttonText}>🛍️ RecycleShop</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={() => onNavigate('friends')}
        >
          <Text style={styles.buttonText}>👥 Friends & Teams</Text>
        </Pressable>
      </View>
    </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;