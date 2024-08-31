import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../styles/theme';
import Header from '../components/Header';
import moment from 'moment-hijri';
import CustomTextInput from '../components/CustomTextInput';
import CustomText from '../components/Customtext';


const DateConverterScreen: React.FC = () => {
  const { colors } = useTheme();
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [conversionType, setConversionType] = useState<'gregorianToHijri' | 'hijriToGregorian'>('gregorianToHijri');
  const navigation = useNavigation();

  
  const convertDate = () => {
    let date;
    if (conversionType === 'gregorianToHijri') {
        date = moment(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`, 'YYYY-MM-DD')
            .format('iYYYY/iMM/iDD');
    } else {
        date = moment(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`, 'iYYYY/iMM/iDD')
            .format('YYYY-MM-DD');
        console.log("Converted to Gregorian:", date);
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
    <View style={[styles.container, { backgroundColor: colors.darkgray }]}>
      <Header
        title="Date Converter"
        onBack={handleBack}
        onShare={handleShare}
        layout="other"
      />
      <View style={[styles.conversionType, {backgroundColor: colors.background}]}>
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setConversionType('gregorianToHijri')}
        >
          <Text style={[styles.radioLabel, {color: colors.surface}]}>Gregorian to Hijri</Text>
          <View style={conversionType === 'gregorianToHijri' ? styles.selected : styles.unselected} />
        </TouchableOpacity>
        
        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => setConversionType('hijriToGregorian')}
        >
          <Text style={[styles.radioLabel, {color: colors.surface}]}>Hijri to Gregorian</Text>
          <View style={conversionType === 'hijriToGregorian' ? styles.selected : styles.unselected} />
        </TouchableOpacity>
      </View>
      
      
      <View style={styles.inputContainer}>
        <CustomTextInput
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

      
      <TouchableOpacity style={styles.button} onPress={convertDate}>
      <CustomText style={[styles.buttonText, {color: colors.surface}]}>GO</CustomText>
      </TouchableOpacity>
    
      {result && <CustomText style={[styles.result, {color: colors.surface}]}>Converted Date: {result}</CustomText>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conversionType: {
    marginBottom: 20,
    borderRadius: 10,
    padding: 5,
    marginTop: 30,
    marginHorizontal: 5
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  radioLabel: {
    fontSize: 16,
  },
  selected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D502DC',
    backgroundColor: '#D502DC',
  },
  unselected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D502DC',
  },
  divider: {
    height: 1,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal:5,
    paddingVertical:10
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#161616',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginRight: 5,
    fontSize: 18,
  },
  picker: {
    flex: 1,
    backgroundColor: '#fff',
    color: '#161616',
    height: 50, // Adjust as needed
    marginRight: 10,
    fontSize: 16,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#D502DC',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
  },
  result: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#2C2C2C',
    borderRadius: 25,
    padding: 20,
    alignSelf: 'center', 
  },
});

export default DateConverterScreen;
