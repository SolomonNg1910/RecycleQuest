import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ProgressBarAndroid,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface QuestsScreenProps {
  navigation: any;
}

const QuestsScreen: React.FC<QuestsScreenProps> = ({ navigation }) => {
  const quests = useSelector((state: RootState) => state.quests.dailyQuests);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const getProgressPercentage = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  const getQuestIcon = (type: string) => {
    switch (type) {
      case 'scan': return '📱';
      case 'weight': return '⚖️';
      case 'recycle': return '♻️';
      default: return '🎯';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Quests</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Progress Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Today's Progress</Text>
          <View style={styles.overviewStats}>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewNumber}>
                {quests.filter(q => q.completed).length}
              </Text>
              <Text style={styles.overviewLabel}>Completed</Text>
            </View>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewNumber}>{quests.length}</Text>
              <Text style={styles.overviewLabel}>Total Quests</Text>
            </View>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewNumber}>
                {quests.reduce((sum, q) => sum + (q.completed ? q.reward : 0), 0)}
              </Text>
              <Text style={styles.overviewLabel}>Coins Earned</Text>
            </View>
          </View>
        </View>

        {/* Quest List */}
        <View style={styles.questsContainer}>
          <Text style={styles.sectionTitle}>Available Quests</Text>
          
          {quests.map((quest) => (
            <View key={quest.id} style={styles.questCard}>
              <View style={styles.questHeader}>
                <View style={styles.questTitleRow}>
                  <Text style={styles.questIcon}>{getQuestIcon(quest.type)}</Text>
                  <View style={styles.questTitleContainer}>
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <Text style={styles.questDescription}>{quest.description}</Text>
                  </View>
                  <View style={styles.questReward}>
                    <Text style={styles.rewardAmount}>{quest.reward}</Text>
                    <Text style={styles.rewardLabel}>coins</Text>
                  </View>
                </View>
              </View>

              <View style={styles.questProgress}>
                <View style={styles.progressInfo}>
                  <Text style={styles.progressText}>
                    {quest.progress} / {quest.target}
                  </Text>
                  <Text style={styles.progressPercentage}>
                    {Math.round(getProgressPercentage(quest.progress, quest.target))}%
                  </Text>
                </View>
                
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarBackground}>
                    <View 
                      style={[
                        styles.progressBarFill,
                        { 
                          width: `${getProgressPercentage(quest.progress, quest.target)}%`,
                          backgroundColor: quest.completed ? '#4CAF50' : '#2196F3'
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>

              {quest.completed && (
                <View style={styles.completedBadge}>
                  <Text style={styles.completedText}>✓ Completed!</Text>
                </View>
              )}

              {!quest.completed && (
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => {
                    if (quest.type === 'scan') {
                      navigation.navigate('Scanner');
                    }
                  }}
                >
                  <Text style={styles.actionButtonText}>
                    {quest.type === 'scan' ? 'Start Scanning' : 'Continue Quest'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        {/* Weekly Challenges Preview */}
        <View style={styles.weeklyContainer}>
          <Text style={styles.sectionTitle}>Weekly Challenges</Text>
          
          <View style={styles.weeklyCard}>
            <Text style={styles.weeklyTitle}>🏆 Community Drive</Text>
            <Text style={styles.weeklyDescription}>
              Join your neighborhood in recycling 1000kg this week!
            </Text>
            <View style={styles.weeklyProgress}>
              <Text style={styles.weeklyProgressText}>Progress: 650kg / 1000kg</Text>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBarFill, { width: '65%', backgroundColor: '#FF9800' }]} />
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.weeklyButton}>
              <Text style={styles.weeklyButtonText}>Join Challenge</Text>
            </TouchableOpacity>
          </View>
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
  scrollView: {
    flex: 1,
  },
  overviewCard: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  overviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  overviewStat: {
    alignItems: 'center',
  },
  overviewNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  overviewLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  questsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  questCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questHeader: {
    marginBottom: 15,
  },
  questTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  questIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  questTitleContainer: {
    flex: 1,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  questDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  questReward: {
    alignItems: 'center',
  },
  rewardAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  rewardLabel: {
    fontSize: 12,
    color: '#666',
  },
  questProgress: {
    marginBottom: 15,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  progressPercentage: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    height: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  completedBadge: {
    backgroundColor: '#E8F5E8',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  completedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  weeklyContainer: {
    padding: 20,
  },
  weeklyCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weeklyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  weeklyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  weeklyProgress: {
    marginBottom: 15,
  },
  weeklyProgressText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  weeklyButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  weeklyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default QuestsScreen;