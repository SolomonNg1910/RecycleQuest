import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  ImageBackground,
} from 'react-native';

type Screen = 'home' | 'scanner' | 'quests' | 'shop' | 'leaderboard' | 'friends';

interface ShopScreenProps {
  userCoins: number;
  onSpendCoins: (amount: number) => void;
  onNavigate: (screen: Screen) => void;
}

const ShopScreen: React.FC<ShopScreenProps> = ({
  userCoins,
  onSpendCoins,
  onNavigate,
}) => {
  const handlePurchase = (cost: number, item: string) => {
    if (userCoins >= cost) {
      onSpendCoins(cost);
      Alert.alert('Purchase Successful!', `Your ${item} will be sent to your email.`);
    } else {
      Alert.alert('Insufficient Coins', 'You need more RecycleCoins to purchase this item.');
    }
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
        <Text style={styles.title}>🛍️ RecycleShop</Text>
        <Text style={styles.subtitle}>Redeem your RecycleCoins</Text>

        <View style={styles.coinsDisplay}>
          <Text style={styles.coinsLabel}>Your RecycleCoins</Text>
          <Text style={styles.coinsAmount}>{userCoins}</Text>
        </View>

        <View style={styles.shopCard}>
          <Text style={styles.shopTitle}>CDC Voucher $5</Text>
          <Text style={styles.shopDesc}>Community Development Council voucher</Text>
          <Text style={styles.shopPrice}>Cost: 500 RecycleCoins</Text>
          <Pressable
            style={[styles.buyButton, userCoins < 500 && styles.buyButtonDisabled]}
            onPress={() => handlePurchase(500, 'CDC Voucher $5')}
          >
            <Text style={styles.buyButtonText}>
              {userCoins >= 500 ? 'Redeem' : 'Not Enough'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.shopCard}>
          <Text style={styles.shopTitle}>CDC Voucher $10</Text>
          <Text style={styles.shopDesc}>Community Development Council voucher</Text>
          <Text style={styles.shopPrice}>Cost: 1000 RecycleCoins</Text>
          <Pressable
            style={[styles.buyButton, userCoins < 1000 && styles.buyButtonDisabled]}
            onPress={() => handlePurchase(1000, 'CDC Voucher $10')}
          >
            <Text style={styles.buyButtonText}>
              {userCoins >= 1000 ? 'Redeem' : 'Not Enough'}
            </Text>
          </Pressable>
        </View>

        <Pressable
          style={styles.button}
          onPress={() => onNavigate('friends')}
        >
          <Text style={styles.buttonText}>👥 Friends & Teams</Text>
        </Pressable>

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
  coinsDisplay: {
    backgroundColor: 'rgba(76, 175, 80, 0.95)',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  coinsLabel: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '500',
  },
  coinsAmount: {
    color: 'white',
    fontSize: 36,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  shopCard: {
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
    borderLeftColor: '#FF9800',
  },
  shopTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1B5E20',
    marginBottom: 8,
  },
  shopDesc: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 12,
    lineHeight: 22,
  },
  shopPrice: {
    fontSize: 16,
    color: '#F57C00',
    fontWeight: '600',
    marginBottom: 18,
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  buyButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 3,
  },
  buyButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  buyButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
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

export default ShopScreen;