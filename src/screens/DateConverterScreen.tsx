import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import moment from 'moment';

const DateConverterScreen: React.FC = () => {
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [conversionType, setConversionType] = useState<'gregorianToHijri' | 'hijriToGregorian'>('gregorianToHijri');
  const navigation = useNavigation();

  const convertDate = () => {
    let date;
    if (conversionType === 'gregorianToHijri') {
      date = moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').format('iYYYY/iMM/iDD');
    } else {
      date = moment(`${year}-${month}-${day}`, 'iYYYY/iMM/iDD').format('YYYY-MM-DD');
    }
    setResult(date);
  };

  const handleBack = () => {
    console.log('Back button pressed');
    navigation.goBack();
  };

  const handleShare = async () => {
    try {
      const message = `Date Conversion Result:\n\nType: ${conversionType === 'gregorianToHijri' ? 'Gregorian to Hijri' : 'Hijri to Gregorian'}\nDate: ${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}\nResult: ${result}`;
      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Error sharing the result:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Date Converter"
        onBack={handleBack}
        onShare={handleShare}
        layout="other"
      />
      <View style={styles.conversionType}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setConversionType('gregorianToHijri')}
        >
          <Text style={styles.radioLabel}>Gregorian to Hijri</Text>
          <View style={conversionType === 'gregorianToHijri' ? styles.selected : styles.unselected} />
        </TouchableOpacity>
        
        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setConversionType('hijriToGregorian')}
        >
          <Text style={styles.radioLabel}>Hijri to Gregorian</Text>
          <View style={conversionType === 'hijriToGregorian' ? styles.selected : styles.unselected} />
        </TouchableOpacity>
      </View>
      
      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Year"
          keyboardType="numeric"
          value={year}
          onChangeText={setYear}
        />
        <Picker
          selectedValue={month}
          style={styles.picker}
          onValueChange={(itemValue) => setMonth(itemValue)}
        >
          <Picker.Item label="Month" value="" />
          {[...Array(12)].map((_, i) => (
            <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>
        <Picker
          selectedValue={day}
          style={styles.picker}
          onValueChange={(itemValue) => setDay(itemValue)}
        >
          <Picker.Item label="Day" value="" />
          {[...Array(31)].map((_, i) => (
            <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
          ))}
        </Picker>
      </View>

      {/* Convert Button */}
      <Button title="GO" onPress={convertDate} color="#007BFF" />

      {/* Result Section */}
      {result && <Text style={styles.result}>Converted Date: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  conversionType: {
    marginBottom: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  radioLabel: {
    color: '#fff',
    fontSize: 16,
  },
  selected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
  },
  unselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007BFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#777',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#000',
    height: 50, // Adjust as needed
    marginRight: 10,
  },
  result: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DateConverterScreen;
