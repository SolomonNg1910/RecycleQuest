import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ImageBackground,
  Animated,
} from "react-native";

type Screen =
  | "home"
  | "scanner"
  | "quests"
  | "shop"
  | "leaderboard"
  | "friends"
  | "profile";

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
  // Array of daily quotes
  const quotes = [
    {
      text: "The Earth does not belong to us; we belong to the Earth.",
      author: "Chief Seattle",
    },
    {
      text: "We do not inherit the Earth from our ancestors; we borrow it from our children.",
      author: "Native American Proverb",
    },
    {
      text: "The greatest threat to our planet is the belief that someone else will save it.",
      author: "Robert Swan",
    },
    {
      text: "What we are doing to the forests of the world is but a mirror reflection of what we are doing to ourselves.",
      author: "Mahatma Gandhi",
    },
    {
      text: "The environment is where we all meet; where we all have a mutual interest.",
      author: "Lady Bird Johnson",
    },
    {
      text: "Every day is Earth Day, and I vote we start investing in a secure climate future right now.",
      author: "Jackie Speier",
    },
    {
      text: "Recycling is only one of the three R's: Reduce, Reuse, Recycle. Don't forget the other two!",
      author: "EcoWarrior",
    },
  ];

  // Get today's quote based on the day of the year
  const getTodaysQuote = () => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const dayOfYear = Math.floor(
      (today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
    );
    return quotes[dayOfYear % quotes.length];
  };

  const todaysQuote = getTodaysQuote();

  // Animation refs for each button
  const profileButtonScale = useRef(new Animated.Value(1)).current;
  const scannerButtonScale = useRef(new Animated.Value(1)).current;
  const questsButtonScale = useRef(new Animated.Value(1)).current;
  const leaderboardButtonScale = useRef(new Animated.Value(1)).current;
  const shopButtonScale = useRef(new Animated.Value(1)).current;
  const friendsButtonScale = useRef(new Animated.Value(1)).current;

  // Animation function for button press
  const animateButton = (scaleValue: Animated.Value, callback: () => void) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Call the navigation after a slight delay
    setTimeout(callback, 150);
  };
  return (
    <ImageBackground
      source={require("../images/background.png")}
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
            <Text style={styles.quoteText}>"{todaysQuote.text}"</Text>
            <Text style={styles.quoteAuthor}>- {todaysQuote.author}</Text>
          </View>

          {/* Navigation Buttons */}
          <Pressable
            onPress={() =>
              animateButton(profileButtonScale, () => onNavigate("profile"))
            }
          >
            <Animated.View
              style={[
                styles.button,
                { transform: [{ scale: profileButtonScale }] },
              ]}
            >
              <Text style={styles.buttonText}>👤 My Profile</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPress={() =>
              animateButton(scannerButtonScale, () => onNavigate("scanner"))
            }
          >
            <Animated.View
              style={[
                styles.button,
                { transform: [{ scale: scannerButtonScale }] },
              ]}
            >
              <Text style={styles.buttonText}>📱 Scan Bin</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPress={() =>
              animateButton(questsButtonScale, () => onNavigate("quests"))
            }
          >
            <Animated.View
              style={[
                styles.button,
                { transform: [{ scale: questsButtonScale }] },
              ]}
            >
              <Text style={styles.buttonText}>🎯 Daily Quests</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPress={() =>
              animateButton(leaderboardButtonScale, () =>
                onNavigate("leaderboard")
              )
            }
          >
            <Animated.View
              style={[
                styles.button,
                { transform: [{ scale: leaderboardButtonScale }] },
              ]}
            >
              <Text style={styles.buttonText}>🏆 Leaderboard</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPress={() =>
              animateButton(shopButtonScale, () => onNavigate("shop"))
            }
          >
            <Animated.View
              style={[
                styles.button,
                { transform: [{ scale: shopButtonScale }] },
              ]}
            >
              <Text style={styles.buttonText}>🛍️ RecycleShop</Text>
            </Animated.View>
          </Pressable>

          <Pressable
            onPress={() =>
              animateButton(friendsButtonScale, () => onNavigate("friends"))
            }
          >
            <Animated.View
              style={[
                styles.button,
                { transform: [{ scale: friendsButtonScale }] },
              ]}
            >
              <Text style={styles.buttonText}>👥 Friends & Teams</Text>
            </Animated.View>
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
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    marginBottom: 30,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 30,
    gap: 15,
  },
  statCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
    minWidth: 100,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  quoteCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    width: "100%",
    elevation: 2,
  },
  quoteTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 14,
    color: "#666",
    textAlign: "right",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: 250,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
