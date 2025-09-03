import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const TestQuestsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🎯 Daily Quests</Text>
        <Text style={styles.subtitle}>Complete quests to earn rewards</Text>
        
        <View style={styles.questItem}>
          <Text style={styles.questTitle}>Bin Run</Text>
          <Text style={styles.questDescription}>Scan 3 recycling bins</Text>
          <Text style={styles.questReward}>Reward: 50 coins</Text>
        </View>
        
        <View style={styles.questItem}>
          <Text style={styles.questTitle}>Green Weight</Text>
          <Text style={styles.questDescription}>Recycle 2kg of materials</Text>
          <Text style={styles.questReward}>Reward: 100 coins</Text>
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
  questItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  questTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  questDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  questReward: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default TestQuestsScreen;