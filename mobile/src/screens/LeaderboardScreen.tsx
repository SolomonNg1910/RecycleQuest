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

interface LeaderboardScreenProps {
  userLevel: number;
  userXP: number;
  onNavigate: (screen: Screen) => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  userLevel,
  userXP,
  onNavigate,
}) => {
  // Define all players including the user
  const allPlayers = [
    { name: 'GreenHero', level: 15, xp: 3250, isUser: false },
    { name: 'EcoChamp', level: 1, xp: 20, isUser: false },
    { name: 'You', level: userLevel, xp: userXP, isUser: true },
  ];

  // Sort players by level (descending), then by XP (descending)
  const sortedPlayers = allPlayers.sort((a, b) => {
    if (a.level !== b.level) {
      return b.level - a.level; // Higher level first
    }
    return b.xp - a.xp; // Higher XP first if same level
  });

  // Get rank emojis
  const getRankEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}️⃣`;
    }
  };

  return (
    <ImageBackground 
      source={require('../images/background.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
        <Text style={styles.title}>🏆 Leaderboard</Text>
        <Text style={styles.subtitle}>Top recyclers by level & XP</Text>

        {sortedPlayers.map((player, index) => (
          <View 
            key={player.name}
            style={[
              styles.leaderItem, 
              player.isUser && styles.currentUser
            ]}
          >
            <Text style={styles.rank}>{getRankEmoji(index)}</Text>
            <View style={styles.playerInfo}>
              <Text style={styles.name}>{player.name}</Text>
              <Text style={styles.levelText}>Level {player.level}</Text>
            </View>
            <Text style={styles.xpText}>{player.xp.toLocaleString()} XP</Text>
          </View>
        ))}

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
  leaderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    width: '100%',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  currentUser: {
    borderWidth: 3,
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(232, 245, 233, 0.98)',
    transform: [{ scale: 1.02 }],
  },
  rank: {
    fontSize: 32,
    marginRight: 20,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 2,
  },
  levelText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  xpText: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    textAlign: 'center',
    minWidth: 80,
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

export default LeaderboardScreen;