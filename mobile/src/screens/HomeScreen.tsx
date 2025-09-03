import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const quests = useSelector((state: RootState) => state.quests.dailyQuests);
  const quote = useSelector((state: RootState) => state.quests.quoteOfTheDay);

  const getLevelTitle = (level: number) => {
    if (level < 3) return 'Recycler';
    if (level < 6) return 'EcoHero';
    return 'GreenChampion';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {user?.name}!</Text>
          <Text style={styles.levelTitle}>{getLevelTitle(user?.level || 1)}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user?.recycleCoins}</Text>
            <Text style={styles.statLabel}>RecycleCoins</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>Level {user?.level}</Text>
            <Text style={styles.statLabel}>{user?.xp} XP</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user?.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Quote of the Day */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteTitle}>💡 Quote of the Day</Text>
          <Text style={styles.quoteText}>"{quote.text}"</Text>
          <Text style={styles.quoteAuthor}>- {quote.author}</Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.scanButton]}
            onPress={() => navigation.navigate('Scanner')}
          >
            <Text style={styles.actionIcon}>📱</Text>
            <Text style={styles.actionText}>Scan Bin</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.questButton]}
            onPress={() => navigation.navigate('Quests')}
          >
            <Text style={styles.actionIcon}>🎯</Text>
            <Text style={styles.actionText}>Daily Quests</Text>
          </TouchableOpacity>
        </View>

        {/* Today's Quests Preview */}
        <View style={styles.questsPreview}>
          <Text style={styles.sectionTitle}>Today's Quests</Text>
          {quests.slice(0, 2).map((quest) => (
            <View key={quest.id} style={styles.questItem}>
              <View style={styles.questInfo}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.questProgress}>
                  {quest.progress}/{quest.target} • {quest.reward} coins
                </Text>
              </View>
              <View style={[
                styles.questStatus,
                quest.completed ? styles.questCompleted : styles.questPending
              ]}>
                <Text style={styles.questStatusText}>
                  {quest.completed ? '✓' : '○'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#2E7D32',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  levelTitle: {
    fontSize: 16,
    color: '#C8E6C9',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  scanButton: {
    backgroundColor: '#4CAF50',
  },
  questButton: {
    backgroundColor: '#FF9800',
  },
  actionIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  questsPreview: {
    margin: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  questItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  questInfo: {
    flex: 1,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  questProgress: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  questStatus: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  questCompleted: {
    backgroundColor: '#4CAF50',
  },
  questPending: {
    backgroundColor: '#E0E0E0',
  },
  questStatusText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;