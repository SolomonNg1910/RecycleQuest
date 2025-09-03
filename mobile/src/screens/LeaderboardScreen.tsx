import React, { useState } from 'react';
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

interface LeaderboardScreenProps {
  navigation: any;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<'global' | 'local'>('global');
  const globalLeaderboard = useSelector((state: RootState) => state.leaderboard.globalLeaderboard);
  const localLeaderboard = useSelector((state: RootState) => state.leaderboard.localLeaderboard);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const currentLeaderboard = activeTab === 'global' ? globalLeaderboard : localLeaderboard;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getLevelTitle = (level: number) => {
    if (level < 3) return 'Recycler';
    if (level < 6) return 'EcoHero';
    return 'GreenChampion';
  };

  const getLevelColor = (level: number) => {
    if (level < 3) return '#81C784';
    if (level < 6) return '#4CAF50';
    return '#2E7D32';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Leaderboard</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'global' && styles.activeTab]}
          onPress={() => setActiveTab('global')}
        >
          <Text style={[styles.tabText, activeTab === 'global' && styles.activeTabText]}>
            🌍 Global
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'local' && styles.activeTab]}
          onPress={() => setActiveTab('local')}
        >
          <Text style={[styles.tabText, activeTab === 'local' && styles.activeTabText]}>
            🏘️ Local
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Current User Stats */}
        <View style={styles.userStatsCard}>
          <Text style={styles.userStatsTitle}>Your Ranking</Text>
          <View style={styles.userStatsContent}>
            <View style={styles.userRank}>
              <Text style={styles.userRankNumber}>
                #{currentLeaderboard.find(entry => entry.userId === currentUser?.id)?.rank || 'N/A'}
              </Text>
              <Text style={styles.userRankLabel}>Your Rank</Text>
            </View>
            <View style={styles.userStats}>
              <Text style={styles.userCoins}>{currentUser?.recycleCoins} coins</Text>
              <Text style={[styles.userLevel, { color: getLevelColor(currentUser?.level || 1) }]}>
                {getLevelTitle(currentUser?.level || 1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Leaderboard List */}
        <View style={styles.leaderboardContainer}>
          <Text style={styles.sectionTitle}>
            {activeTab === 'global' ? 'Global Rankings' : 'Your Neighborhood'}
          </Text>
          
          {currentLeaderboard.map((entry, index) => (
            <View 
              key={entry.userId} 
              style={[
                styles.leaderboardItem,
                entry.userId === currentUser?.id && styles.currentUserItem
              ]}
            >
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>{getRankIcon(entry.rank)}</Text>
              </View>
              
              <View style={styles.userInfo}>
                <Text style={[
                  styles.userName,
                  entry.userId === currentUser?.id && styles.currentUserName
                ]}>
                  {entry.name}
                  {entry.userId === currentUser?.id && ' (You)'}
                </Text>
                <Text style={[
                  styles.userTitle,
                  { color: getLevelColor(entry.level) }
                ]}>
                  {getLevelTitle(entry.level)} • Level {entry.level}
                </Text>
              </View>
              
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>{entry.coins}</Text>
                <Text style={styles.scoreLabel}>coins</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Team Battles Section */}
        <View style={styles.teamBattlesContainer}>
          <Text style={styles.sectionTitle}>Team Battles</Text>
          
          <View style={styles.teamBattleCard}>
            <Text style={styles.teamBattleTitle}>🏆 Monthly Challenge</Text>
            <Text style={styles.teamBattleDescription}>
              Join a team and compete for the top spot this month!
            </Text>
            
            <View style={styles.teamBattleStats}>
              <View style={styles.teamStat}>
                <Text style={styles.teamStatNumber}>12</Text>
                <Text style={styles.teamStatLabel}>Teams</Text>
              </View>
              <View style={styles.teamStat}>
                <Text style={styles.teamStatNumber}>156</Text>
                <Text style={styles.teamStatLabel}>Players</Text>
              </View>
              <View style={styles.teamStat}>
                <Text style={styles.teamStatNumber}>15d</Text>
                <Text style={styles.teamStatLabel}>Remaining</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.joinTeamButton}>
              <Text style={styles.joinTeamButtonText}>Join Team Battle</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Friends Section */}
        <View style={styles.friendsContainer}>
          <Text style={styles.sectionTitle}>Friends & Social</Text>
          
          <TouchableOpacity style={styles.friendsAction}>
            <Text style={styles.friendsActionIcon}>👥</Text>
            <View style={styles.friendsActionContent}>
              <Text style={styles.friendsActionTitle}>Invite Friends</Text>
              <Text style={styles.friendsActionDescription}>
                Earn bonus coins when friends join RecycleQuest
              </Text>
            </View>
            <Text style={styles.friendsActionArrow}>→</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.friendsAction}>
            <Text style={styles.friendsActionIcon}>📱</Text>
            <View style={styles.friendsActionContent}>
              <Text style={styles.friendsActionTitle}>Share Achievement</Text>
              <Text style={styles.friendsActionDescription}>
                Show off your recycling progress on social media
              </Text>
            </View>
            <Text style={styles.friendsActionArrow}>→</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2E7D32',
  },
  backButton: {
    color: 'white',
    fontSize: 16,
    marginRight: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#2E7D32',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  userStatsCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userStatsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  userStatsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userRank: {
    alignItems: 'center',
    marginRight: 30,
  },
  userRankNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  userRankLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  userStats: {
    flex: 1,
  },
  userCoins: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  userLevel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
  leaderboardContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  currentUserItem: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8E9',
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  currentUserName: {
    color: '#2E7D32',
  },
  userTitle: {
    fontSize: 12,
    marginTop: 3,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#666',
  },
  teamBattlesContainer: {
    padding: 20,
  },
  teamBattleCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  teamBattleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  teamBattleDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  teamBattleStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  teamStat: {
    alignItems: 'center',
  },
  teamStatNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  teamStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  joinTeamButton: {
    backgroundColor: '#FF9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  joinTeamButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  friendsContainer: {
    padding: 20,
  },
  friendsAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  friendsActionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  friendsActionContent: {
    flex: 1,
  },
  friendsActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  friendsActionDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  friendsActionArrow: {
    fontSize: 18,
    color: '#666',
  },
});

export default LeaderboardScreen;