import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
} from 'react-native';

type Screen = 'home' | 'scanner' | 'quests' | 'shop' | 'leaderboard';

interface QuestsScreenProps {
  binsScanned: number;
  totalWeight: number;
  onNavigate: (screen: Screen) => void;
}

const QuestsScreen: React.FC<QuestsScreenProps> = ({ 
  binsScanned, 
  totalWeight, 
  onNavigate 
}) => {
  // Quest completion logic
  const binQuestComplete = binsScanned >= 3;
  const weightQuestComplete = totalWeight >= 2000; // 2kg = 2000g
  
  const formatWeight = (grams: number) => {
    if (grams >= 1000) {
      return `${(grams / 1000).toFixed(1)}kg`;
    }
    return `${grams}g`;
  };
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
        <Text style={styles.title}>🎯 Daily Quests</Text>
        <Text style={styles.subtitle}>Complete quests to earn rewards</Text>

        <View style={[styles.questCard, binQuestComplete && styles.questCompleted]}>
          <Text style={styles.questTitle}>
            {binQuestComplete ? '✅ ' : '🎯 '}Bin Run
          </Text>
          <Text style={styles.questDesc}>Scan 3 recycling bins today</Text>
          <Text style={[styles.questReward, binQuestComplete && styles.questRewardCompleted]}>
            {binQuestComplete ? '🎉 Completed!' : 'Reward: 50 RecycleCoins'}
          </Text>
          <Text style={[styles.questProgress, binQuestComplete && styles.questProgressCompleted]}>
            Progress: {Math.min(binsScanned, 3)}/3
          </Text>
        </View>

        <View style={[styles.questCard, weightQuestComplete && styles.questCompleted]}>
          <Text style={styles.questTitle}>
            {weightQuestComplete ? '✅ ' : '🎯 '}Green Weight
          </Text>
          <Text style={styles.questDesc}>Recycle 2kg of materials</Text>
          <Text style={[styles.questReward, weightQuestComplete && styles.questRewardCompleted]}>
            {weightQuestComplete ? '🎉 Completed!' : 'Reward: 100 RecycleCoins'}
          </Text>
          <Text style={[styles.questProgress, weightQuestComplete && styles.questProgressCompleted]}>
            Progress: {formatWeight(Math.min(totalWeight, 2000))}/2kg
          </Text>
        </View>

        <Pressable
          style={[styles.button, styles.backButton]}
          onPress={() => onNavigate('home')}
        >
          <Text style={styles.buttonText}>← Back to Home</Text>
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
  questCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    width: '100%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  questTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 8,
  },
  questDesc: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 12,
    lineHeight: 22,
  },
  questReward: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
    marginBottom: 8,
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  questProgress: {
    fontSize: 14,
    color: '#757575',
    fontWeight: '500',
  },
  questCompleted: {
    borderLeftColor: '#4CAF50',
    backgroundColor: 'rgba(232, 245, 233, 0.98)',
  },
  questRewardCompleted: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  questProgressCompleted: {
    color: '#2E7D32',
    fontWeight: '600',
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
});

export default QuestsScreen;