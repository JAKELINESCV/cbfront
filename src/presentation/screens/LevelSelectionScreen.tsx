import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import LevelBadge from '../components/LevelBadge';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';

type RootStackParamList = {
  Game: { level: string; difficulty: string };
  Home: undefined;
  LevelSelection: { difficulty: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Game'>;
type RoutePropType = RouteProp<RootStackParamList, 'LevelSelection'>;

const LevelSelectionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { difficulty } = route.params;

  const levels = [
    { id: '1', title: 'Nivel 1' },
    { id: '2', title: 'Nivel 2' },
    { id: '3', title: 'Nivel 3' },
  ];

  const handleSelectLevel = (levelId: string) => {
    navigation.navigate('Game', { level: levelId, difficulty });
  };

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <Text style={styles.title}>Selecciona un nivel ({difficulty})</Text>
      {levels.map((level) => (
        <LevelBadge
          key={level.id}
          title={level.title}
          onPress={() => handleSelectLevel(level.id)}
        />
      ))}
    </LinearGradient>
  );
};

export default LevelSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
