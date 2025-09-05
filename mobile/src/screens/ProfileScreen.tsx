import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

type Screen = 'home' | 'scanner' | 'quests' | 'shop' | 'leaderboard' | 'friends' | 'profile';

interface ProfileScreenProps {
  userCoins: number;
  userXP: number;
  userLevel: number;
  onNavigate: (screen: Screen) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userCoins,
  userXP,
  userLevel,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'history' | 'settings'>('overview');
  
  // Animation values
  const avatarScale = useRef(new Animated.Value(1)).current;
  const avatarRotation = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Start animations on mount
  useEffect(() => {
    // Avatar pulse animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    // Slide in animation
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    pulseAnimation.start();

    return () => {
      pulseAnimation.stop();
    };
  }, []);

  // Avatar press animation
  const handleAvatarPress = () => {
    Animated.sequence([
      Animated.timing(avatarScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(avatarScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Rotation animation
    Animated.timing(avatarRotation, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      avatarRotation.setValue(0);
    });
  };

  // Mock user data
  const userData = {
    name: 'EcoChampion',
    joinDate: '2024-01-15',
    totalItems: 127,
    totalWeight: 2.3,
    co2Saved: 15.2,
    waterSaved: 45.6,
    energySaved: 89.3,
    streak: 7,
    efficiency: 94,
    favoriteMaterial: 'Plastic',
    title: 'Recycling Master',
  };

  // Mock achievements
  const achievements = [
    { id: '1', name: 'First Steps', description: 'Recycled your first item', icon: '🌱', unlocked: true, date: '2024-01-15' },
    { id: '2', name: 'Streak Master', description: '7-day recycling streak', icon: '🔥', unlocked: true, date: '2024-01-22' },
    { id: '3', name: 'Material Expert', description: 'Recycled all material types', icon: '♻️', unlocked: true, date: '2024-02-01' },
    { id: '4', name: 'Eco Warrior', description: '100+ items recycled', icon: '🛡️', unlocked: true, date: '2024-02-10' },
    { id: '5', name: 'Team Player', description: 'Completed 5 team challenges', icon: '👥', unlocked: false, date: null },
    { id: '6', name: 'Night Owl', description: 'Recycled after 10 PM', icon: '🦉', unlocked: false, date: null },
  ];

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* User Stats Cards */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData.totalItems}</Text>
          <Text style={styles.statLabel}>Items Recycled</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData.totalWeight}kg</Text>
          <Text style={styles.statLabel}>Weight Saved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData.co2Saved}kg</Text>
          <Text style={styles.statLabel}>CO₂ Saved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userData.efficiency}%</Text>
          <Text style={styles.statLabel}>Efficiency</Text>
        </View>
      </View>

      {/* Environmental Impact */}
      <View style={styles.impactCard}>
        <Text style={styles.cardTitle}>🌍 Environmental Impact</Text>
        <View style={styles.impactItem}>
          <Text style={styles.impactLabel}>Water Saved</Text>
          <Text style={styles.impactValue}>{userData.waterSaved}L</Text>
        </View>
        <View style={styles.impactItem}>
          <Text style={styles.impactLabel}>Energy Saved</Text>
          <Text style={styles.impactValue}>{userData.energySaved}kWh</Text>
        </View>
        <View style={styles.impactItem}>
          <Text style={styles.impactLabel}>Favorite Material</Text>
          <Text style={styles.impactValue}>{userData.favoriteMaterial}</Text>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activityCard}>
        <Text style={styles.cardTitle}>📈 Recent Activity</Text>
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>♻️</Text>
          <View style={styles.activityDetails}>
            <Text style={styles.activityText}>Recycled 3 plastic bottles</Text>
            <Text style={styles.activityTime}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>🏆</Text>
          <View style={styles.activityDetails}>
            <Text style={styles.activityText}>Earned "Eco Warrior" badge</Text>
            <Text style={styles.activityTime}>1 day ago</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <Text style={styles.activityIcon}>👥</Text>
          <View style={styles.activityDetails}>
            <Text style={styles.activityText}>Joined Earth Day Challenge</Text>
            <Text style={styles.activityTime}>3 days ago</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderAchievementsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>🏆 Achievements</Text>
      
      {achievements.map((achievement) => (
        <View 
          key={achievement.id} 
          style={[
            styles.achievementCard, 
            !achievement.unlocked && styles.achievementLocked
          ]}
        >
          <Text style={styles.achievementIcon}>{achievement.icon}</Text>
          <View style={styles.achievementDetails}>
            <Text style={[
              styles.achievementName,
              !achievement.unlocked && styles.achievementNameLocked
            ]}>
              {achievement.name}
            </Text>
            <Text style={[
              styles.achievementDescription,
              !achievement.unlocked && styles.achievementDescriptionLocked
            ]}>
              {achievement.description}
            </Text>
            {achievement.unlocked && achievement.date && (
              <Text style={styles.achievementDate}>
                Unlocked: {new Date(achievement.date).toLocaleDateString()}
              </Text>
            )}
          </View>
          {achievement.unlocked && (
            <Text style={styles.achievementCheck}>✅</Text>
          )}
        </View>
      ))}
    </View>
  );

  const renderHistoryTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>📊 Recycling History</Text>
      
      <View style={styles.historyCard}>
        <Text style={styles.cardTitle}>This Week</Text>
        <View style={styles.weekStats}>
          <View style={styles.weekDay}>
            <Text style={styles.dayName}>Mon</Text>
            <View style={[styles.dayBar, { height: 20 }]} />
            <Text style={styles.dayCount}>5</Text>
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.dayName}>Tue</Text>
            <View style={[styles.dayBar, { height: 35 }]} />
            <Text style={styles.dayCount}>8</Text>
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.dayName}>Wed</Text>
            <View style={[styles.dayBar, { height: 15 }]} />
            <Text style={styles.dayCount}>3</Text>
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.dayName}>Thu</Text>
            <View style={[styles.dayBar, { height: 40 }]} />
            <Text style={styles.dayCount}>10</Text>
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.dayName}>Fri</Text>
            <View style={[styles.dayBar, { height: 25 }]} />
            <Text style={styles.dayCount}>6</Text>
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.dayName}>Sat</Text>
            <View style={[styles.dayBar, { height: 30 }]} />
            <Text style={styles.dayCount}>7</Text>
          </View>
          <View style={styles.weekDay}>
            <Text style={styles.dayName}>Sun</Text>
            <View style={[styles.dayBar, { height: 10 }]} />
            <Text style={styles.dayCount}>2</Text>
          </View>
        </View>
      </View>

      <View style={styles.historyCard}>
        <Text style={styles.cardTitle}>Material Breakdown</Text>
        <View style={styles.materialStats}>
          <View style={styles.materialItem}>
            <Text style={styles.materialIcon}>🥤</Text>
            <Text style={styles.materialName}>Plastic</Text>
            <Text style={styles.materialCount}>45 items</Text>
          </View>
          <View style={styles.materialItem}>
            <Text style={styles.materialIcon}>🥫</Text>
            <Text style={styles.materialName}>Metal</Text>
            <Text style={styles.materialCount}>32 items</Text>
          </View>
          <View style={styles.materialItem}>
            <Text style={styles.materialIcon}>🍶</Text>
            <Text style={styles.materialName}>Glass</Text>
            <Text style={styles.materialCount}>28 items</Text>
          </View>
          <View style={styles.materialItem}>
            <Text style={styles.materialIcon}>📦</Text>
            <Text style={styles.materialName}>Paper</Text>
            <Text style={styles.materialCount}>22 items</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSettingsTab = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>⚙️ Settings</Text>
      
      <View style={styles.settingsCard}>
        <Text style={styles.cardTitle}>Account</Text>
        <Pressable style={styles.settingItem}>
          <Text style={styles.settingLabel}>Edit Profile</Text>
          <Text style={styles.settingArrow}>›</Text>
        </Pressable>
        <Pressable style={styles.settingItem}>
          <Text style={styles.settingLabel}>Change Avatar</Text>
          <Text style={styles.settingArrow}>›</Text>
        </Pressable>
        <Pressable style={styles.settingItem}>
          <Text style={styles.settingLabel}>Privacy Settings</Text>
          <Text style={styles.settingArrow}>›</Text>
        </Pressable>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.cardTitle}>Notifications</Text>
        <Pressable style={styles.settingItem}>
          <Text style={styles.settingLabel}>Quest Reminders</Text>
          <Text style={styles.settingArrow}>›</Text>
        </Pressable>
        <Pressable style={styles.settingItem}>
          <Text style={styles.settingLabel}>Friend Challenges</Text>
          <Text style={styles.settingArrow}>›</Text>
        </Pressable>
        <Pressable style={styles.settingItem}>
          <Text style={styles.settingLabel}>Achievement Alerts</Text>
          <Text style={styles.settingArrow}>›</Text>
        </Pressable>
      </View>

      <View style={styles.settingsCard}>
        <Text style={styles.cardTitle}>Data</Text>
        <Pressable style={styles.settingItem}>
          <Text style={styles.settingLabel}>Export Data</Text>
          <Text style={styles.settingArrow}>›</Text>
        </Pressable>
        <Pressable style={styles.settingItem}>
          <Text style={styles.settingLabel}>Delete Account</Text>
          <Text style={styles.settingArrow}>›</Text>
        </Pressable>
      </View>
    </View>
  );

  const spin = avatarRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const slideTransform = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

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
        <Animated.View style={[styles.content, { transform: [{ translateY: slideTransform }] }]}>
          <Text style={styles.title}>👤 Profile</Text>
          <Text style={styles.subtitle}>Your recycling journey</Text>

          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Pressable onPress={handleAvatarPress}>
              <Animated.View style={[
                styles.avatarContainer,
                {
                  transform: [
                    { scale: Animated.multiply(avatarScale, pulseAnim) },
                    { rotate: spin }
                  ]
                }
              ]}>
                {/* User profile image */}
                <Image 
                  source={require('../images/chibi.png')}
                  style={styles.avatarImage}
                  resizeMode="cover"
                />
              </Animated.View>
            </Pressable>
            
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userTitle}>{userData.title}</Text>
              <View style={styles.levelContainer}>
                <Text style={styles.levelText}>Level {userLevel}</Text>
                <View style={styles.xpBar}>
                  <View style={[styles.xpFill, { width: `${(userXP % 100)}%` }]} />
                </View>
                <Text style={styles.xpText}>{userXP} XP</Text>
              </View>
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.quickStat}>
              <Text style={styles.quickStatNumber}>{userCoins}</Text>
              <Text style={styles.quickStatLabel}>Coins</Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={styles.quickStatNumber}>{userData.streak}</Text>
              <Text style={styles.quickStatLabel}>Day Streak</Text>
            </View>
            <View style={styles.quickStat}>
              <Text style={styles.quickStatNumber}>{userData.totalItems}</Text>
              <Text style={styles.quickStatLabel}>Items</Text>
            </View>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <Pressable
              style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
              onPress={() => setActiveTab('overview')}
            >
              <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
                Overview
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
              onPress={() => setActiveTab('achievements')}
            >
              <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>
                Achievements
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'history' && styles.activeTab]}
              onPress={() => setActiveTab('history')}
            >
              <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
                History
              </Text>
            </Pressable>
            <Pressable
              style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
              onPress={() => setActiveTab('settings')}
            >
              <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
                Settings
              </Text>
            </Pressable>
          </View>

          {/* Tab Content */}
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'achievements' && renderAchievementsTab()}
          {activeTab === 'history' && renderHistoryTab()}
          {activeTab === 'settings' && renderSettingsTab()}

          <Pressable
            style={[styles.button, styles.backButton]}
            onPress={() => onNavigate('home')}
          >
            <Text style={styles.buttonText}>← Back to Home</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </ImageBackground>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollIndicator: {
    backgroundColor: '#4CAF50',
    width: 8,
    borderRadius: 4,
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    width: '100%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 10,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  xpBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
  },
  xpFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  xpText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  quickStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-around',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickStat: {
    alignItems: 'center',
  },
  quickStatNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4CAF50',
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: '#666',
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
    paddingHorizontal: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#4CAF50',
  },
  tabText: {
    fontSize: 14,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  impactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 15,
  },
  impactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  impactLabel: {
    fontSize: 16,
    color: '#666',
  },
  impactValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  activityCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activityIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  activityDetails: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: '#1B5E20',
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  achievementCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  achievementDetails: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 4,
  },
  achievementNameLocked: {
    color: '#999',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  achievementDescriptionLocked: {
    color: '#999',
  },
  achievementDate: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  achievementCheck: {
    fontSize: 20,
  },
  historyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  weekStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 100,
  },
  weekDay: {
    alignItems: 'center',
    flex: 1,
  },
  dayName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  dayBar: {
    width: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
    marginBottom: 8,
  },
  dayCount: {
    fontSize: 10,
    color: '#666',
  },
  materialStats: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  materialItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
  },
  materialIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  materialName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  materialCount: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  settingsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1B5E20',
  },
  settingArrow: {
    fontSize: 20,
    color: '#666',
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

export default ProfileScreen;