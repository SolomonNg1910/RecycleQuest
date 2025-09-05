// BACKUP: ScannerScreen with Enhanced Camera Simulation
// This version includes realistic camera-like interface with animations
// Created as backup before implementing real camera feed

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
  ActivityIndicator,
  Animated,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Screen = 'home' | 'scanner' | 'quests' | 'shop' | 'leaderboard';

interface ScannerScreenProps {
  onBinScan: () => void;
  onNavigate: (screen: Screen) => void;
  onItemScanned: (item: RecycledItem) => void;
}

interface RecycledItem {
  type: 'paper' | 'plastic' | 'glass' | 'metal' | 'electronics';
  name: string;
  weight: number;
  coins: number;
  xp: number;
}

type ScanMode = 'menu' | 'qr' | 'item';

const ScannerScreen: React.FC<ScannerScreenProps> = ({
  onBinScan,
  onNavigate,
  onItemScanned,
}) => {
  const [scanMode, setScanMode] = useState<ScanMode>('menu');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [detectedItem, setDetectedItem] = useState<RecycledItem | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  
  // Animated values for scanning effects
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Request camera permission
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'RecycleQuest needs camera access to scan recycling items',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      } catch (err) {
        console.warn(err);
        setHasPermission(false);
      }
    } else {
      setHasPermission(true);
    }
  };

  // Initialize camera permission on mount
  useEffect(() => {
    requestCameraPermission();
  }, []);

  // Start scanning animations
  useEffect(() => {
    if (isScanning) {
      const scanAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
      
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );

      scanAnimation.start();
      pulseAnimation.start();

      return () => {
        scanAnimation.stop();
        pulseAnimation.stop();
      };
    }
  }, [isScanning]);

  // Simulated recyclable items database
  const recyclableItems: RecycledItem[] = [
    { type: 'metal', name: 'Aluminum Can', weight: 15, coins: 25, xp: 10 },
    { type: 'plastic', name: 'Plastic Bottle', weight: 30, coins: 20, xp: 8 },
    { type: 'glass', name: 'Glass Bottle', weight: 200, coins: 40, xp: 15 },
    { type: 'paper', name: 'Cardboard Box', weight: 50, coins: 15, xp: 6 },
    { type: 'electronics', name: 'Old Phone', weight: 150, coins: 100, xp: 25 },
    { type: 'metal', name: 'Tin Can', weight: 45, coins: 30, xp: 12 },
    { type: 'plastic', name: 'Food Container', weight: 25, coins: 18, xp: 7 },
  ];

  const simulateQRScan = () => {
    setIsScanning(true);
    setScanResult('');
    
    // Simulate 2-3 second scan delay
    setTimeout(() => {
      const binIds = ['BIN-001', 'BIN-002', 'BIN-003', 'BIN-004'];
      const randomBin = binIds[Math.floor(Math.random() * binIds.length)];
      setScanResult(`✅ Bin ${randomBin} detected!`);
      setIsScanning(false);
      
      // Auto proceed to item scanning after 1.5s
      setTimeout(() => {
        setScanMode('item');
        setScanResult('');
      }, 1500);
    }, 2500);
  };

  const simulateItemScan = () => {
    setIsScanning(true);
    setDetectedItem(null);
    
    // Simulate AI processing delay (3 seconds)
    setTimeout(() => {
      const randomItem = recyclableItems[Math.floor(Math.random() * recyclableItems.length)];
      // Add some weight variation (±20%)
      const weightVariation = 0.8 + Math.random() * 0.4;
      const finalItem = {
        ...randomItem,
        weight: Math.round(randomItem.weight * weightVariation),
        coins: Math.round(randomItem.coins * weightVariation),
        xp: Math.round(randomItem.xp * weightVariation),
      };
      
      setDetectedItem(finalItem);
      setIsScanning(false);
      
      // Show success and update user stats
      setTimeout(() => {
        onItemScanned(finalItem);
        Alert.alert(
          '🎉 Item Recycled!',
          `${finalItem.name} (${finalItem.weight}g)\n+${finalItem.coins} RecycleCoins\n+${finalItem.xp} XP`,
          [
            {
              text: 'Scan Another',
              onPress: () => {
                setScanMode('menu');
                setDetectedItem(null);
              }
            },
            {
              text: 'Done',
              onPress: () => onNavigate('home')
            }
          ]
        );
      }, 2000);
    }, 3000);
  };

  const renderMenu = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📱 RecycleQuest Scanner</Text>
        <Text style={styles.subtitle}>Choose scanning mode</Text>

        <View style={styles.modeContainer}>
          <Pressable
            style={[styles.modeButton, styles.qrButton]}
            onPress={() => setScanMode('qr')}
          >
            <Text style={styles.modeIcon}>🔍</Text>
            <Text style={styles.modeTitle}>Scan QR Code</Text>
            <Text style={styles.modeDesc}>Scan recycling bin QR code</Text>
          </Pressable>

          <Pressable
            style={[styles.modeButton, styles.itemButton]}
            onPress={() => setScanMode('item')}
          >
            <Text style={styles.modeIcon}>📷</Text>
            <Text style={styles.modeTitle}>Scan Item</Text>
            <Text style={styles.modeDesc}>AI-powered item recognition</Text>
          </Pressable>
        </View>

        <Pressable
          style={[styles.button, styles.backButton]}
          onPress={() => onNavigate('home')}
        >
          <Text style={styles.buttonText}>← Back to Home</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );

  // Enhanced camera component with better compatibility
  const CameraView = ({ children, isQRMode = false }: { children: React.ReactNode; isQRMode?: boolean }) => {
    if (hasPermission === null) {
      return (
        <View style={styles.permissionContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.permissionText}>Requesting camera permission...</Text>
        </View>
      );
    }
    
    if (hasPermission === false) {
      return (
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionText}>📷 Camera access required</Text>
          <Text style={styles.permissionSubtext}>
            RecycleQuest needs camera access to scan QR codes and identify recyclable items
          </Text>
          <Pressable style={styles.button} onPress={requestCameraPermission}>
            <Text style={styles.buttonText}>Grant Camera Permission</Text>
          </Pressable>
        </View>
      );
    }

    // Create a realistic live camera experience
    return (
      <View style={styles.cameraView}>
        <View style={styles.liveCameraFeed}>
          <View style={styles.cameraBackground}>
            {/* Camera status indicator */}
            <View style={styles.cameraStatus}>
              <View style={styles.recordingDot} />
              <Text style={styles.cameraStatusText}>LIVE</Text>
            </View>
            
            {/* Simulated camera noise/grain for realism */}
            <View style={styles.cameraGrain} />
            
            {/* Dynamic elements that simulate real camera feed */}
            <Animated.View 
              style={[
                styles.dynamicElement1,
                {
                  opacity: scanLineAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 0.7],
                  })
                }
              ]} 
            />
            <Animated.View 
              style={[
                styles.dynamicElement2,
                {
                  transform: [{
                    translateX: scanLineAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 20],
                    })
                  }]
                }
              ]} 
            />
          </View>
          {children}
        </View>
      </View>
    );
  };

  const renderQRScanner = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.scannerContainer}>
        <Text style={styles.scannerTitle}>🔍 Scan Bin QR Code</Text>
        
        <CameraView isQRMode={true}>
          <View style={styles.cameraOverlay}>
            <Animated.View 
              style={[
                styles.qrFrame,
                { transform: [{ scale: pulseAnim }] }
              ]} 
            />
            
            {/* Scanning line animation */}
            {isScanning && (
              <Animated.View
                style={[
                  styles.scanLine,
                  {
                    transform: [{
                      translateY: scanLineAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-125, 125],
                      })
                    }]
                  }
                ]}
              />
            )}
            
            {isScanning && (
              <View style={styles.scanningIndicator}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.scanningText}>Scanning QR Code...</Text>
              </View>
            )}
            {scanResult && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>{scanResult}</Text>
              </View>
            )}
          </View>
        </CameraView>

        <View style={styles.controlsContainer}>
          <Pressable
            style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
            onPress={simulateQRScan}
            disabled={isScanning}
          >
            <Text style={styles.scanButtonText}>
              {isScanning ? 'Scanning...' : 'Start QR Scan'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.backButton}
            onPress={() => setScanMode('menu')}
          >
            <Text style={styles.buttonText}>← Back</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );

  const renderItemScanner = () => (
    <SafeAreaView style={styles.container}>
      <View style={styles.scannerContainer}>
        <Text style={styles.scannerTitle}>📷 AI Item Recognition</Text>
        
        <CameraView isQRMode={false}>
          <View style={styles.cameraOverlay}>
            <Animated.View 
              style={[
                styles.itemFrame,
                { transform: [{ scale: pulseAnim }] }
              ]} 
            />
            
            {/* AI scanning grid animation */}
            {isScanning && (
              <>
                <View style={styles.aiGrid} />
                <Animated.View
                  style={[
                    styles.scanLine,
                    {
                      transform: [{
                        translateY: scanLineAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-150, 150],
                        })
                      }]
                    }
                  ]}
                />
              </>
            )}
            
            {isScanning && (
              <View style={styles.scanningIndicator}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.scanningText}>AI Analyzing Item...</Text>
                <Text style={styles.scanningSubtext}>Please hold steady</Text>
              </View>
            )}
            {detectedItem && (
              <View style={styles.resultContainer}>
                <Text style={styles.itemName}>{detectedItem.name}</Text>
                <Text style={styles.itemDetails}>
                  {detectedItem.type.toUpperCase()} • {detectedItem.weight}g
                </Text>
                <Text style={styles.itemRewards}>
                  +{detectedItem.coins} coins • +{detectedItem.xp} XP
                </Text>
              </View>
            )}
          </View>
        </CameraView>

        <View style={styles.controlsContainer}>
          <Pressable
            style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
            onPress={simulateItemScan}
            disabled={isScanning}
          >
            <Text style={styles.scanButtonText}>
              {isScanning ? 'Analyzing...' : 'Scan Item'}
            </Text>
          </Pressable>

          <Pressable
            style={styles.backButton}
            onPress={() => setScanMode('menu')}
          >
            <Text style={styles.buttonText}>← Back</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );

  switch (scanMode) {
    case 'qr':
      return renderQRScanner();
    case 'item':
      return renderItemScanner();
    default:
      return renderMenu();
  }
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
  },
  modeContainer: {
    width: '100%',
    marginBottom: 40,
  },
  modeButton: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  qrButton: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  itemButton: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  modeIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  modeDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  scannerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingVertical: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  cameraView: {
    flex: 1,
    position: 'relative',
  },
  liveCameraFeed: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  cameraBackground: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    position: 'relative',
  },
  cameraStatus: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4444',
    marginRight: 8,
  },
  cameraStatusText: {
    color: '#ff4444',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cameraGrain: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    opacity: 0.5,
  },
  dynamicElement1: {
    position: 'absolute',
    top: '25%',
    left: '15%',
    width: 100,
    height: 60,
    backgroundColor: 'rgba(80, 80, 80, 0.4)',
    borderRadius: 8,
  },
  dynamicElement2: {
    position: 'absolute',
    bottom: '35%',
    right: '20%',
    width: 70,
    height: 70,
    backgroundColor: 'rgba(120, 120, 120, 0.3)',
    borderRadius: 35,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 30,
  },
  permissionText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  permissionSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  aiGrid: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
    borderStyle: 'dashed',
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  qrFrame: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: '#4CAF50',
    borderRadius: 20,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  itemFrame: {
    width: width * 0.8,
    height: width * 0.8,
    borderWidth: 3,
    borderColor: '#4CAF50',
    borderRadius: 20,
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
  },
  scanningIndicator: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    borderRadius: 15,
  },
  scanningText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  scanningSubtext: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 5,
  },
  resultContainer: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 250,
  },
  resultText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  itemDetails: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
  itemRewards: {
    color: '#E8F5E8',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  controlsContainer: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 20,
    alignItems: 'center',
  },
  scanButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    minWidth: 200,
    alignItems: 'center',
  },
  scanButtonDisabled: {
    backgroundColor: '#666',
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: 250,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#666',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ScannerScreen;