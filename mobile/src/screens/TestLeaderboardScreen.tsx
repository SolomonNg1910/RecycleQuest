import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const TestLeaderboardScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
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
        
        <View style={styles.leaderItem}>
          <Text style={styles.rank}>🥉</Text>
          <Text style={styles.name}>EcoWarrior (You)</Text>
          <Text style={styles.coins}>0 coins</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
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
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  leaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
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
});

export default TestLeaderboardScreen;