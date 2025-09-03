import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const TestShopScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>🛍️ RecycleShop</Text>
        <Text style={styles.subtitle}>Redeem your RecycleCoins</Text>
        
        <View style={styles.coinsDisplay}>
          <Text style={styles.coinsLabel}>Your RecycleCoins</Text>
          <Text style={styles.coinsAmount}>0</Text>
        </View>
        
        <View style={styles.shopItem}>
          <Text style={styles.itemName}>CDC Voucher $5</Text>
          <Text style={styles.itemDescription}>Community Development Council voucher</Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>500 coins</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.shopItem}>
          <Text style={styles.itemName}>CDC Voucher $10</Text>
          <Text style={styles.itemDescription}>Community Development Council voucher</Text>
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>1000 coins</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  coinsDisplay: {
    backgroundColor: '#4CAF50',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  coinsLabel: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  coinsAmount: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  shopItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TestShopScreen;