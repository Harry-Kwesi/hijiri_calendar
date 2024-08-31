import React from 'react';
import { Text, TextProps, StyleSheet, TextStyle } from 'react-native';
import { useTheme } from '../styles/theme';

const CustomText: React.FC<TextProps> = ({ style, children, ...props }) => {
  const { fonts } = useTheme();

  const customStyles = StyleSheet.flatten(style || {}) as TextStyle;


  const fontFamily = customStyles.fontWeight === 'bold' ? fonts.bold : fonts.regular;

  const { fontWeight, ...remainingStyles } = customStyles;

  return (
    <Text {...props} style={[{ fontFamily }, remainingStyles]}>
      {children}
    </Text>
  );
};

export default CustomText;
