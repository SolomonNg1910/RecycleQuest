import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { spendCoins } from '../store/userSlice';

interface ShopScreenProps {
  navigation: any;
}

const ShopScreen: React.FC<ShopScreenProps> = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState<'voucher' | 'discount' | 'merchandise'>('voucher');
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch();

  const shopItems = {
    voucher: [
      {
        id: '1',
        name: 'CDC Voucher $5',
        description: 'Community Development Council voucher for local spending',
        cost: 500,
        category: 'voucher' as const,
        icon: '🎫',
      },
      {
        id: '2',
        name: 'CDC Voucher $10',
        description: 'Community Development Council voucher for local spending',
        cost: 1000,
        category: 'voucher' as const,
        icon: '🎫',
      },
      {
        id: '3',
        name: 'CDC Voucher $20',
        description: 'Community Development Council voucher for local spending',
        cost: 2000,
        category: 'voucher' as const,
        icon: '🎫',
      },
    ],
    discount: [
      {
        id: '4',
        name: 'FairPrice 10% Off',
        description: 'Get 10% discount on your next FairPrice purchase',
        cost: 300,
        category: 'discount' as const,
        icon: '🛒',
      },
      {
        id: '5',
        name: 'Grab Food 15% Off',
        description: 'Save 15% on your next food delivery order',
        cost: 400,
        category: 'discount' as const,
        icon: '🍔',
      },
      {
        id: '6',
        name: 'Shopee 20% Off',
        description: 'Exclusive discount for eco-friendly products',
        cost: 600,
        category: 'discount' as const,
        icon: '📦',
      },
    ],
    merchandise: [
      {
        id: '7',
        name: 'RecycleQuest Tote Bag',
        description: 'Eco-friendly canvas tote bag with RecycleQuest logo',
        cost: 800,
        category: 'merchandise' as const,
        icon: '👜',
      },
      {
        id: '8',
        name: 'Bamboo Water Bottle',
        description: 'Sustainable bamboo fiber water bottle',
        cost: 1200,
        category: 'merchandise' as const,
        icon: '🍶',
      },
      {
        id: '9',
        name: 'Eco Warrior Badge',
        description: 'Limited edition digital badge for your profile',
        cost: 250,
        category: 'merchandise' as const,
        icon: '🏅',
      },
    ],
  };

  const handlePurchase = (item: any) => {
    if (!user || user.recycleCoins < item.cost) {
      Alert.alert(
        'Insufficient Coins',
        `You need ${item.cost} RecycleCoins to purchase this item. You currently have ${user?.recycleCoins || 0} coins.`,
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Confirm Purchase',
      `Are you sure you want to purchase ${item.name} for ${item.cost} RecycleCoins?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Purchase',
          onPress: () => {
            dispatch(spendCoins(item.cost));
            Alert.alert(
              'Purchase Successful! 🎉',
              `You have successfully purchased ${item.name}. ${
                item.category === 'voucher' 
                  ? 'Your voucher code will be sent to your registered email.' 
                  : item.category === 'discount'
                  ? 'Your discount code is ready to use!'
                  : 'Your item will be delivered within 5-7 business days.'
              }`,
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'voucher': return '🎫';
      case 'discount': return '💰';
      case 'merchandise': return '🛍️';
      default: return '🏪';
    }
  };

  const currentItems = shopItems[activeCategory];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RecycleShop</Text>
      </View>

      {/* User Coins Display */}
      <View style={styles.coinsContainer}>
        <Text style={styles.coinsLabel}>Your RecycleCoins</Text>
        <Text style={styles.coinsAmount}>{user?.recycleCoins || 0}</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        {(['voucher', 'discount', 'merchandise'] as const).map((category) => (
          <TouchableOpacity
            key={category}
            style={[styles.categoryTab, activeCategory === category && styles.activeCategoryTab]}
            onPress={() => setActiveCategory(category)}
          >
            <Text style={styles.categoryIcon}>{getCategoryIcon(category)}</Text>
            <Text style={[
              styles.categoryText,
              activeCategory === category && styles.activeCategoryText
            ]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Featured Item */}
        {activeCategory === 'voucher' && (
          <View style={styles.featuredContainer}>
            <Text style={styles.featuredTitle}>🌟 Featured Offer</Text>
            <View style={styles.featuredCard}>
              <Text style={styles.featuredItemTitle}>CDC Voucher Bundle</Text>
              <Text style={styles.featuredItemDescription}>
                Get $50 worth of CDC vouchers for only 4000 coins (Save 1000 coins!)
              </Text>
              <View style={styles.featuredPricing}>
                <Text style={styles.originalPrice}>5000 coins</Text>
                <Text style={styles.salePrice}>4000 coins</Text>
              </View>
              <TouchableOpacity style={styles.featuredButton}>
                <Text style={styles.featuredButtonText}>Limited Time Offer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Items Grid */}
        <View style={styles.itemsContainer}>
          <Text style={styles.sectionTitle}>
            {activeCategory === 'voucher' && 'CDC Vouchers'}
            {activeCategory === 'discount' && 'Retail Discounts'}
            {activeCategory === 'merchandise' && 'Eco Merchandise'}
          </Text>
          
          <View style={styles.itemsGrid}>
            {currentItems.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Text style={styles.itemIcon}>{item.icon}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                
                <View style={styles.itemFooter}>
                  <View style={styles.priceContainer}>
                    <Text style={styles.priceAmount}>{item.cost}</Text>
                    <Text style={styles.priceLabel}>coins</Text>
                  </View>
                  
                  <TouchableOpacity
                    style={[
                      styles.purchaseButton,
                      (!user || user.recycleCoins < item.cost) && styles.purchaseButtonDisabled
                    ]}
                    onPress={() => handlePurchase(item)}
                    disabled={!user || user.recycleCoins < item.cost}
                  >
                    <Text style={[
                      styles.purchaseButtonText,
                      (!user || user.recycleCoins < item.cost) && styles.purchaseButtonTextDisabled
                    ]}>
                      {(!user || user.recycleCoins < item.cost) ? 'Not Enough' : 'Redeem'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Earning Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 How to Earn More Coins</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>♻️</Text>
            <Text style={styles.tipText}>Recycle regularly to earn 10-50 coins per kg</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🎯</Text>
            <Text style={styles.tipText}>Complete daily quests for bonus rewards</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>🏆</Text>
            <Text style={styles.tipText}>Join team battles and community challenges</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipIcon}>📱</Text>
            <Text style={styles.tipText}>Scan bins daily to maintain your streak</Text>
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
  coinsContainer: {
    backgroundColor: '#4CAF50',
    padding: 20,
    alignItems: 'center',
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
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryTab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeCategoryTab: {
    backgroundColor: '#2E7D32',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'bold',
  },
  activeCategoryText: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  featuredContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featuredCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  featuredItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 10,
  },
  featuredItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  featuredPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  originalPrice: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  salePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E65100',
  },
  featuredButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  featuredButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemsContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  itemCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    minHeight: 32,
  },
  itemFooter: {
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  priceLabel: {
    fontSize: 12,
    color: '#666',
  },
  purchaseButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
  },
  purchaseButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  purchaseButtonTextDisabled: {
    color: '#999',
  },
  tipsContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 15,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipIcon: {
    fontSize: 16,
    marginRight: 10,
    width: 20,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});

export default ShopScreen;