import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

interface TestScannerScreenProps {
  navigation?: any;
}

const TestScannerScreen: React.FC<TestScannerScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>📱 Scanner</Text>
        <Text style={styles.subtitle}>Scan bins and items here</Text>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={() => alert('Bin scanned! 🎉')}
        >
          <Text style={styles.buttonText}>Simulate Bin Scan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.backButton]}
          onPress={() => navigation?.navigate('Home')}
        >
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
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
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: 200,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestScannerScreen;