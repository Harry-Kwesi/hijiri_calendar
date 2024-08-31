import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../styles/theme';

type LayoutType = 'home' | 'search' | 'phases' | 'events' | 'eclipse' ;

interface HeaderProps {
  layout: LayoutType;
  title: string;
  onShare?: () => void;
  onBack?: () => void;
  onMenu?: () => void;
  showMenuIcon?: boolean; 
}

const Header: React.FC<HeaderProps> = ({ title, onShare, onBack, onMenu, layout, showMenuIcon = true }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.background }]}>
      {layout === 'home' ? (
        <>
          <TouchableOpacity onPress={onShare}>
            <Icon name="share-social-outline" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          {showMenuIcon && (
        <TouchableOpacity onPress={onMenu} style={styles.menuIcon}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
      )}
        </>
      ) : (
        <>
          {layout !== 'search' &&
            layout !== 'phases' &&
            layout !== 'events' &&
            layout !== 'eclipse' && (
              <TouchableOpacity onPress={onBack}>
                <Icon name="arrow-back-outline" size={24} color="white" />
              </TouchableOpacity>
            )}
          <Text style={[styles.title, { color: colors.surface }]}>{title}</Text>
          {onShare && (
            <TouchableOpacity onPress={onShare}>
              <Icon name="share-social-outline" size={24} color="white" />
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'SourceSansPro-Regular'
  },
});

export default Header;
