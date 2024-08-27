import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';

const MoonArticleScreen = () => {
  const navigation = useNavigation();


  const handleBack = () => {
    // Implement your back navigation functionality here
    console.log('Back button pressed');
    navigation.goBack();
  };

  const handleShare = () => {
    // Implement your share functionality here
    console.log('Share icon pressed');
  };


  return (
    <View style={styles.container}>
     
      <Header
        title="Article"
        onBack={handleBack}
        onShare={handleShare}
        layout="other"
      />
   

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>
          ISLAM HAS SOLUTIONS FOR EVERYTHING, EVEN HAS AN ERROR-FREE CALENDAR
        </Text>

        {['TOTAL LUNAR ECLIPSE', 'PENUMBRAL LUNAR ECLIPSE', 'PARTIAL LUNAR ECLIPSE', 'ANNULAR SOLAR ECLIPSE', 'TOTAL SOLAR ECLIPSE', 'PARTIAL SOLAR ECLIPSE'].map((item, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Background color
  },
  backButton: {
    padding: 8,
  },
  shareButton: {
    padding: 8,
  },
  content: {
    padding: 16,
  },
  title: {
    color: '#FFD700', 
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2B2B2B', // Dark background for the buttons
    padding: 16,
    marginBottom: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff', // White text
    fontSize: 16,
  },
});

export default MoonArticleScreen;
