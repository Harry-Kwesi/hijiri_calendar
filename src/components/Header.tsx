import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  onShare?: () => void;
  onBack?: () => void;
  onMenu?: () => void;
  layout: 'home' | 'other'; 
  showMenuIcon?: boolean; 
}

const Header: React.FC<HeaderProps> = ({ title, onShare, onBack, onMenu, layout, showMenuIcon = true }) => {


  return (
    <View style={styles.header}>
      {layout === 'home' ? (
        <>
          <TouchableOpacity onPress={onShare}>
            <Icon name="share-social-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          {showMenuIcon && (
        <TouchableOpacity onPress={onMenu} style={styles.menuIcon}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
      )}
        </>
      ) : (
        <>
          <TouchableOpacity onPress={onBack}>
            <Icon name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          {onShare && (
            <TouchableOpacity onPress={onShare}>
              <Icon name="share-social-outline" size={24} color="black" />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuIcon: {
    padding: 10,
  },
});

export default Header;
