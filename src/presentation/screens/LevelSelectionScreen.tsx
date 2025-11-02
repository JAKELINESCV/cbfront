import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import LevelBadge from '../components/LevelBadge';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';

type RootStackParamList = {
  LevelSelection: { difficulty?: string };
  Game: { level: string; difficulty?: string };
  Home: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LevelSelection'>;
type RoutePropType = RouteProp<RootStackParamList, 'LevelSelection'>;

const LevelSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const difficulty = route.params?.difficulty;

  const difficulties = [
    { id: 'basic', title: 'Básico' },
    { id: 'intermediate', title: 'Intermedio' },
    { id: 'advanced', title: 'Avanzado' },
  ];

  const levels = [
    { id: '1', title: 'Nivel 1' },
    { id: '2', title: 'Nivel 2' },
    { id: '3', title: 'Nivel 3' },
  ];

  const handleSelectDifficulty = (diff: string) => {
    navigation.navigate('LevelSelection', { difficulty: diff });
  };

  const handleSelectLevel = (levelId: string) => {
    navigation.navigate('Game', { level: levelId, difficulty });
  };

  if (!difficulty) {
    return (
      <LinearGradient colors={colors.gradients.background} style={styles.container}>
        <View style={styles.centerBox}>
          <Text style={styles.title}>Elige dificultad</Text>
          <View style={styles.buttonsContainer}>
            {difficulties.map((d) => (
              <TouchableOpacity
                key={d.id}
                style={[
                  styles.diffButton,
                  d.id === 'basic'
                    ? styles.basic
                    : d.id === 'intermediate'
                    ? styles.intermediate
                    : styles.advanced,
                ]}
                onPress={() => handleSelectDifficulty(d.id)}
              >
                <Text style={styles.diffText}>{d.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <View style={styles.centerBox}>
        <Text style={styles.title}>Niveles — {difficulty.toUpperCase()}</Text>
        <FlatList
          data={levels}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.levelsList}
          renderItem={({ item }) => (
            <LevelBadge title={item.title} onPress={() => handleSelectLevel(item.id)} />
          )}
        />
      </View>
    </LinearGradient>
  );
};

export default LevelSelectionScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', alignItems: 'center' },
  centerBox: { width: '100%', alignItems: 'center' },
  title: { color: colors.white, fontSize: 24, fontWeight: '700', marginBottom: 30, textAlign: 'center' },
  buttonsContainer: { width: '100%', gap: 15, alignItems: 'center' },
  diffButton: { paddingVertical: 18, paddingHorizontal: 25, borderRadius: 14, minWidth: 180, alignItems: 'center' },
  diffText: { color: colors.white, fontWeight: '700', fontSize: 16 },
  basic: { backgroundColor: colors.levelBasic },
  intermediate: { backgroundColor: colors.levelIntermediate },
  advanced: { backgroundColor: colors.levelAdvanced },
  levelsList: { width: '100%', alignItems: 'center', justifyContent: 'center', gap: 15 },
});
