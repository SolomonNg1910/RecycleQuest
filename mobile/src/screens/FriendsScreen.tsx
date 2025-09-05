import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
  Alert,
  TextInput,
  Modal,
} from 'react-native';

type Screen = 'home' | 'scanner' | 'quests' | 'shop' | 'leaderboard' | 'friends';

interface FriendsScreenProps {
  userCoins: number;
  userXP: number;
  userLevel: number;
  onNavigate: (screen: Screen) => void;
}

interface Friend {
  id: string;
  name: string;
  level: number;
  xp: number;
  coins: number;
  avatar: string;
  isOnline: boolean;
  lastActive: string;
  streak: number;
}

interface TeamChallenge {
  id: string;
  title: string;
  description: string;
  target: number;
  progress: number;
  reward: number;
  deadline: string;
  participants: string[];
  isActive: boolean;
}

const FriendsScreen: React.FC<FriendsScreenProps> = ({
  userCoins,
  userXP,
  userLevel,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'friends' | 'teams' | 'challenges'>('friends');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendCode, setFriendCode] = useState('');

  // Mock friends data
  const [friends] = useState<Friend[]>([
    {
      id: '1',
      name: 'EcoEmma',
      level: 12,
      xp: 2450,
      coins: 320,
      avatar: '🌱',
      isOnline: true,
      lastActive: '2 min ago',
      streak: 7,
    },
    {
      id: '2',
      name: 'GreenGuru',
      level: 8,
      xp: 1800,
      coins: 150,
      avatar: '♻️',
      isOnline: false,
      lastActive: '1 hour ago',
      streak: 3,
    },
    {
      id: '3',
      name: 'RecycleRex',
      level: 15,
      xp: 3200,
      coins: 500,
      avatar: '🦕',
      isOnline: true,
      lastActive: '5 min ago',
      streak: 12,
    },
  ]);

  // Mock team challenges
  const [teamChallenges] = useState<TeamChallenge[]>([
    {
      id: '1',
      title: '🌍 Earth Day Challenge',
      description: 'Recycle 100 items as a team this week',
      target: 100,
      progress: 67,
      reward: 500,
      deadline: '3 days left',
      participants: ['You', 'EcoEmma', 'GreenGuru'],
      isActive: true,
    },
    {
      id: '2',
      title: '🏆 Plastic-Free Week',
      description: 'Collect 50kg of plastic for recycling',
      target: 50,
      progress: 23,
      reward: 300,
      deadline: '5 days left',
      participants: ['You', 'RecycleRex'],
      isActive: true,
    },
  ]);

  const handleAddFriend = () => {
    if (friendCode.trim()) {
      Alert.alert('Friend Request Sent!', `Invitation sent to ${friendCode}`);
      setFriendCode('');
      setShowAddFriend(false);
    }
  };

  const handleJoinTeam = (challengeId: string) => {
    Alert.alert('Joined Team!', 'You are now part of this team challenge!');
  };

  const renderFriendsTab = () => (
    <View style={styles.tabContent}>
      <View style={styles.friendsHeader}>
        <Text style={styles.sectionTitle}>Your Friends ({friends.length})</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => setShowAddFriend(true)}
        >
          <Text style={styles.addButtonText}>+ Add Friend</Text>
        </Pressable>
      </View>

      {friends.map((friend) => (
        <View key={friend.id} style={styles.friendCard}>
          <View style={styles.friendInfo}>
            <Text style={styles.friendAvatar}>{friend.avatar}</Text>
            <View style={styles.friendDetails}>
              <View style={styles.friendNameRow}>
                <Text style={styles.friendName}>{friend.name}</Text>
                <View style={[styles.onlineIndicator, friend.isOnline && styles.onlineActive]} />
              </View>
              <Text style={styles.friendStats}>
                Level {friend.level} • {friend.xp} XP • {friend.coins} coins
              </Text>
              <Text style={styles.friendStreak}>
                🔥 {friend.streak} day streak • {friend.lastActive}
              </Text>
            </View>
          </View>
          <Pressable style={styles.challengeButton}>
            <Text style={styles.challengeButtonText}>Challenge</Text>
          </Pressable>
        </View>
      ))}

      <View style={styles.socialStats}>
        <Text style={styles.sectionTitle}>Social Impact</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Team Challenges</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>127</Text>
            <Text style={styles.statLabel}>Items Recycled</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2.3kg</Text>
            <Text style={styles.statLabel}>CO₂ Saved</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTeamsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Team Challenges</Text>
      
      {teamChallenges.map((challenge) => (
        <View key={challenge.id} style={styles.challengeCard}>
          <View style={styles.challengeHeader}>
            <Text style={styles.challengeTitle}>{challenge.title}</Text>
            <Text style={styles.challengeDeadline}>{challenge.deadline}</Text>
          </View>
          
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(challenge.progress / challenge.target) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {challenge.progress}/{challenge.target} ({Math.round((challenge.progress / challenge.target) * 100)}%)
            </Text>
          </View>

          <View style={styles.challengeFooter}>
            <View style={styles.participantsContainer}>
              <Text style={styles.participantsLabel}>Team:</Text>
              <Text style={styles.participantsText}>
                {challenge.participants.join(', ')}
              </Text>
            </View>
            <Text style={styles.rewardText}>🎁 {challenge.reward} coins</Text>
          </View>

          <Pressable 
            style={styles.joinButton}
            onPress={() => handleJoinTeam(challenge.id)}
          >
            <Text style={styles.joinButtonText}>
              {challenge.participants.includes('You') ? 'View Progress' : 'Join Team'}
            </Text>
          </Pressable>
        </View>
      ))}

      <Pressable style={styles.createTeamButton}>
        <Text style={styles.createTeamButtonText}>+ Create New Team Challenge</Text>
      </Pressable>
    </View>
  );

  const renderChallengesTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Friend Challenges</Text>
      
      <View style={styles.challengeCard}>
        <Text style={styles.challengeTitle}>🏃‍♂️ Weekly Race</Text>
        <Text style={styles.challengeDescription}>
          Compete with EcoEmma to see who can recycle more this week
        </Text>
        <View style={styles.raceStats}>
          <View style={styles.racePlayer}>
            <Text style={styles.racePlayerName}>You</Text>
            <Text style={styles.racePlayerScore}>23 items</Text>
          </View>
          <Text style={styles.vsText}>VS</Text>
          <View style={styles.racePlayer}>
            <Text style={styles.racePlayerName}>EcoEmma</Text>
            <Text style={styles.racePlayerScore}>18 items</Text>
          </View>
        </View>
        <Text style={styles.raceTimeLeft}>2 days left</Text>
      </View>

      <View style={styles.challengeCard}>
        <Text style={styles.challengeTitle}>🎯 Streak Battle</Text>
        <Text style={styles.challengeDescription}>
          See who can maintain the longest recycling streak
        </Text>
        <View style={styles.streakComparison}>
          <View style={styles.streakItem}>
            <Text style={styles.streakName}>You</Text>
            <Text style={styles.streakCount}>🔥 5 days</Text>
          </View>
          <View style={styles.streakItem}>
            <Text style={styles.streakName}>RecycleRex</Text>
            <Text style={styles.streakCount}>🔥 12 days</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ImageBackground 
      source={require('../images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
        indicatorStyle="black"
        scrollIndicatorInsets={{ right: 1 }}
        persistentScrollbar={true}
      >
        <View style={styles.content}>
          <Text style={styles.title}>👥 Friends & Teams</Text>
          <Text style={styles.subtitle}>Collaborate and compete with friends</Text>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'friends' && styles.activeTab]}
              onPress={() => setActiveTab('friends')}
            >
              <Text style={[styles.tabText, activeTab === 'friends' && styles.activeTabText]}>
                Friends
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'teams' && styles.activeTab]}
              onPress={() => setActiveTab('teams')}
            >
              <Text style={[styles.tabText, activeTab === 'teams' && styles.activeTabText]}>
                Teams
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'challenges' && styles.activeTab]}
              onPress={() => setActiveTab('challenges')}
            >
              <Text style={[styles.tabText, activeTab === 'challenges' && styles.activeTabText]}>
                Challenges
              </Text>
            </Pressable>
          </View>

          {/* Tab Content */}
          {activeTab === 'friends' && renderFriendsTab()}
          {activeTab === 'teams' && renderTeamsTab()}
          {activeTab === 'challenges' && renderChallengesTab()}

          <Pressable
            style={[styles.button, styles.backButton]}
            onPress={() => onNavigate('home')}
          >
            <Text style={styles.buttonText}>← Back to Home</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Add Friend Modal */}
      <Modal
        visible={showAddFriend}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Friend</Text>
            <Text style={styles.modalDescription}>
              Enter your friend's RecycleQuest code to send them a friend request
            </Text>
            <TextInput
              style={styles.friendCodeInput}
              placeholder="Enter friend code (e.g., RQ123456)"
              value={friendCode}
              onChangeText={setFriendCode}
              autoCapitalize="characters"
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowAddFriend(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleAddFriend}
              >
                <Text style={styles.confirmButtonText}>Send Request</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1B5E20',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 20,
    color: '#2E7D32',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: 'rgba(255, 255, 255, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginBottom: 20,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  tabContent: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 15,
    textAlign: 'center',
  },
  friendsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  friendCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  friendAvatar: {
    fontSize: 32,
    marginRight: 15,
  },
  friendDetails: {
    flex: 1,
  },
  friendNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  friendName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B5E20',
    marginRight: 8,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  onlineActive: {
    backgroundColor: '#4CAF50',
  },
  friendStats: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  friendStreak: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '500',
  },
  challengeButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  challengeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  socialStats: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  challengeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B5E20',
    flex: 1,
  },
  challengeDeadline: {
    fontSize: 12,
    color: '#FF9800',
    fontWeight: '600',
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  challengeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  participantsContainer: {
    flex: 1,
  },
  participantsLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  participantsText: {
    fontSize: 14,
    color: '#1B5E20',
    fontWeight: '500',
  },
  rewardText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  createTeamButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  createTeamButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  raceStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  racePlayer: {
    alignItems: 'center',
  },
  racePlayerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 4,
  },
  racePlayerScore: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4CAF50',
  },
  vsText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#666',
  },
  raceTimeLeft: {
    fontSize: 12,
    color: '#FF9800',
    textAlign: 'center',
    fontWeight: '600',
  },
  streakComparison: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  streakItem: {
    alignItems: 'center',
  },
  streakName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  streakCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF9800',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    width: 250,
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  backButton: {
    backgroundColor: '#757575',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E20',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  friendCodeInput: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FriendsScreen;