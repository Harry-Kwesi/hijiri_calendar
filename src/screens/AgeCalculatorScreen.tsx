import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, Share} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const AgeCalculator = () => {
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const navigation = useNavigation();

  const calculateAge = () => {
    if (year === null || month === null || day === null) {
      setAge('Please fill in all fields.');
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageDays < 0) {
      ageMonths -= 1;
      ageDays += new Date(year, month, 0).getDate();
    }

    if (ageMonths < 0) {
      ageYears -= 1;
      ageMonths += 12;
    }

    setAge(`${ageYears} years, ${ageMonths} months, and ${ageDays} days`);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleShare = async () => {
    if (!age) {
      Alert.alert('No Content to Share', 'Please generate some content to share.');
      return;
    }
  
    try {
      const shareResult = await Share.share({
        message: age,
      });
  
      if (shareResult.action === Share.sharedAction) {
        if (shareResult.activityType) {
          console.log(`Shared with activity type: ${shareResult.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (shareResult.action === Share.dismissedAction) {
        console.log('Share was dismissed');
      }
    } catch (error) {
      Alert.alert('Share Failed', 'An error occurred while sharing. Please try again.');
      console.error('Share failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Age Calculator"
        onBack={handleBack}
        onShare={handleShare}
        layout="other"
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.inputBox}
          placeholder="Year"
          keyboardType="numeric"
          value={year !== null ? year.toString() : ''}
          onChangeText={(value) => setYear(value ? parseInt(value) : null)}
        />
        <Picker
          selectedValue={month}
          style={styles.inputBox}
          onValueChange={(itemValue) => setMonth(itemValue)}
        >
          <Picker.Item label="Month" value={null} />
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <Picker.Item key={month} label={month.toString()} value={month} />
          ))}
        </Picker>
        <Picker
          selectedValue={day}
          style={styles.inputBox}
          onValueChange={(itemValue) => setDay(itemValue)}
        >
          <Picker.Item label="Day" value={null} />
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <Picker.Item key={day} label={day.toString()} value={day} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.goButton} onPress={calculateAge}>
          <Text style={styles.goButtonText}>GO</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instruction}>Enter your Date in Gregorian Format</Text>
      
      {age && (
        <Text style={styles.result}>{age}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    paddingTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  inputBox: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 10,
  },
  goButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  goButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  instruction: {
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  result: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default AgeCalculator;
