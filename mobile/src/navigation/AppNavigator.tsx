import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Simple test screens
const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>🏠 Home</Text>
      <Text style={styles.subtitle}>Welcome to RecycleQuest!</Text>
    </View>
  </SafeAreaView>
);

const ScannerScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>📱 Scanner</Text>
      <Text style={styles.subtitle}>Scan bins and items</Text>
    </View>
  </SafeAreaView>
);

const QuestsScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>🎯 Quests</Text>
      <Text style={styles.subtitle}>Daily challenges</Text>
    </View>
  </SafeAreaView>
);

const LeaderboardScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>🏆 Leaderboard</Text>
      <Text style={styles.subtitle}>Top recyclers</Text>
    </View>
  </SafeAreaView>
);

const ShopScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>🛍️ Shop</Text>
      <Text style={styles.subtitle}>Redeem rewards</Text>
    </View>
  </SafeAreaView>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#2E7D32',
          tabBarInactiveTintColor: '#666',
          tabBarStyle: {
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#E0E0E0',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{
            tabBarLabel: 'Scan',
          }}
        />
        <Tab.Screen
          name="Quests"
          component={QuestsScreen}
          options={{
            tabBarLabel: 'Quests',
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={LeaderboardScreen}
          options={{
            tabBarLabel: 'Ranking',
          }}
        />
        <Tab.Screen
          name="Shop"
          component={ShopScreen}
          options={{
            tabBarLabel: 'Shop',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default AppNavigator;