import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../styles/theme';
import CustomTextInput from './CustomTextInput';
import CustomText from './Customtext';



interface SearchBoxProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onSearch }) => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.searchContainer}>
      <View style={[styles.inputContainer, { borderColor: colors.border }]}>
        <Icon name="search" size={20} color={colors.placeholder} style={styles.icon} />
        <CustomTextInput
          style={ { color: colors.surface }}
          placeholder="Search..."
          placeholderTextColor={colors.placeholder}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.tins }]}
        onPress={handleSearch}
      >
        <CustomText style={[styles.buttonText, {color: colors.surface}]}>GO</CustomText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#2C2C2C',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    backgroundColor: '#D502DC',
    width: 80,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default SearchBox;
