import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import TestHomeScreen from '../screens/TestHomeScreen';
import TestScannerScreen from '../screens/TestScannerScreen';
import TestQuestsScreen from '../screens/TestQuestsScreen';
import TestLeaderboardScreen from '../screens/TestLeaderboardScreen';
import TestShopScreen from '../screens/TestShopScreen';

const Tab = createBottomTabNavigator();

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
          component={TestHomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={TestScannerScreen}
          options={{
            tabBarLabel: 'Scan',
          }}
        />
        <Tab.Screen
          name="Quests"
          component={TestQuestsScreen}
          options={{
            tabBarLabel: 'Quests',
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={TestLeaderboardScreen}
          options={{
            tabBarLabel: 'Ranking',
          }}
        />
        <Tab.Screen
          name="Shop"
          component={TestShopScreen}
          options={{
            tabBarLabel: 'Shop',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;