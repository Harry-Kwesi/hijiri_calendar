import React from 'react';
import { TextInput, StyleSheet, View, TextStyle, ViewStyle } from 'react-native';
import CustomText from './Customtext';

interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  style?: TextStyle;
  fontFamily?: string;
  [key: string]: any; 
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = '#6e6e6e',
  style,
  fontFamily = 'SourceSansPro-Regular',
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style, { fontFamily }]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  } as ViewStyle,
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    fontFamily:'SourceSansPro-Regular'
  } as TextStyle,
});

export default CustomTextInput;
