import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addCoins, addXP } from '../store/userSlice';
import { updateQuestProgress } from '../store/questsSlice';

interface ScannerScreenProps {
  navigation: any;
}

const ScannerScreen: React.FC<ScannerScreenProps> = ({ navigation }) => {
  const [scanStep, setScanStep] = useState<'bin' | 'item' | 'weight'>('bin');
  const [scannedBin, setScannedBin] = useState<string>('');
  const [itemType, setItemType] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [showWeightModal, setShowWeightModal] = useState(false);
  
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.currentUser);

  const itemTypes = [
    { type: 'paper', emoji: '📄', coinsPerKg: 10 },
    { type: 'plastic', emoji: '🥤', coinsPerKg: 15 },
    { type: 'glass', emoji: '🍶', coinsPerKg: 20 },
    { type: 'metal', emoji: '🥫', coinsPerKg: 25 },
    { type: 'electronics', emoji: '📱', coinsPerKg: 50 },
  ];

  const simulateBinScan = () => {
    // Simulate QR code scan
    const binId = `BIN-${Math.random().toString(36).substr(2, 9)}`;
    setScannedBin(binId);
    setScanStep('item');
    
    // Update scan quest progress
    dispatch(updateQuestProgress({ questId: '1', progress: 1 }));
    
    Alert.alert('Bin Scanned!', `Successfully scanned bin: ${binId}`);
  };

  const selectItemType = (type: string) => {
    setItemType(type);
    setShowWeightModal(true);
  };

  const submitWeight = () => {
    const weightNum = parseFloat(weight);
    if (!weightNum || weightNum <= 0) {
      Alert.alert('Invalid Weight', 'Please enter a valid weight');
      return;
    }

    const selectedItem = itemTypes.find(item => item.type === itemType);
    if (!selectedItem) return;

    const coinsEarned = Math.floor(weightNum * selectedItem.coinsPerKg);
    const xpEarned = Math.floor(weightNum * 10); // 10 XP per kg

    // Update user stats
    dispatch(addCoins(coinsEarned));
    dispatch(addXP(xpEarned));

    // Update weight quest progress
    dispatch(updateQuestProgress({ questId: '2', progress: weightNum }));

    setShowWeightModal(false);
    
    Alert.alert(
      'Recycling Complete! 🎉',
      `You earned ${coinsEarned} RecycleCoins and ${xpEarned} XP for recycling ${weightNum}kg of ${itemType}!`,
      [
        {
          text: 'Continue Recycling',
          onPress: () => {
            setScanStep('bin');
            setScannedBin('');
            setItemType('');
            setWeight('');
          }
        },
        {
          text: 'Go Home',
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };

  const renderBinScanStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 1: Scan Recycling Bin</Text>
      <Text style={styles.stepDescription}>
        Point your camera at the QR code on the recycling bin
      </Text>
      
      <View style={styles.scanArea}>
        <Text style={styles.scanIcon}>📱</Text>
        <Text style={styles.scanText}>Tap to simulate bin scan</Text>
      </View>
      
      <TouchableOpacity style={styles.scanButton} onPress={simulateBinScan}>
        <Text style={styles.scanButtonText}>Simulate Bin Scan</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItemScanStep = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Step 2: Select Item Type</Text>
      <Text style={styles.stepDescription}>
        Bin: {scannedBin}
      </Text>
      <Text style={styles.stepSubDescription}>
        What type of item are you recycling?
      </Text>
      
      <View style={styles.itemGrid}>
        {itemTypes.map((item) => (
          <TouchableOpacity
            key={item.type}
            style={styles.itemButton}
            onPress={() => selectItemType(item.type)}
          >
            <Text style={styles.itemEmoji}>{item.emoji}</Text>
            <Text style={styles.itemType}>{item.type}</Text>
            <Text style={styles.itemReward}>{item.coinsPerKg} coins/kg</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderWeightModal = () => (
    <Modal visible={showWeightModal} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Enter Weight</Text>
          <Text style={styles.modalDescription}>
            How much {itemType} are you recycling? (in kg)
          </Text>
          
          <TextInput
            style={styles.weightInput}
            value={weight}
            onChangeText={setWeight}
            placeholder="0.0"
            keyboardType="numeric"
            autoFocus
          />
          
          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setShowWeightModal(false);
                setWeight('');
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.modalButton, styles.confirmButton]}
              onPress={submitWeight}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recycle Scanner</Text>
      </View>

      {scanStep === 'bin' && renderBinScanStep()}
      {scanStep === 'item' && renderItemScanStep()}
      {renderWeightModal()}
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
  stepContainer: {
    flex: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  stepSubDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  scanArea: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 40,
    alignItems: 'center',
    marginVertical: 30,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  scanIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  scanText: {
    fontSize: 16,
    color: '#666',
  },
  scanButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  scanButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  itemButton: {
    width: '45%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  itemType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  itemReward: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  weightInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    textAlign: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#E0E0E0',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ScannerScreen;