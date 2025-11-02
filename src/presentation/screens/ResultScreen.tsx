import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteProp, useNavigation, useRoute, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../theme/colors';

// Tipado local (asegúrate que coincide con tu AppNavigator)
type RootStackParamList = {
  LevelSelection: undefined;
  Game: { difficulty: string };
  Result: { score: number; total: number; difficulty: string };
};

type ResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Result'>;
type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

export default function ResultScreen() {
  const navigation = useNavigation<ResultScreenNavigationProp>();
  const route = useRoute<ResultScreenRouteProp>();
  const params = route.params ?? { score: 0, total: 1, difficulty: 'desconocido' };
  const { score, total, difficulty } = params;

  const percentage = Math.round((score / total) * 100);
  const getMessage = () => {
    if (percentage === 100) return '¡Perfecto! Eres un crack 🎯';
    if (percentage >= 80) return '¡Excelente trabajo! 🌟';
    if (percentage >= 60) return '¡Muy bien! Sigue practicando 💪';
    if (percentage >= 40) return 'Vas por buen camino 👏';
    return 'No te rindas, inténtalo otra vez 🔁';
  };

  // Lleva al usuario al LevelSelection — intenta en parent primero (por si hay stacks anidados)
  const goToLevelSelection = () => {
    // si la pantalla está registrada en un navigator superior, usar getParent
    const parent = navigation.getParent?.();
    if (parent) {
      // navegamos por el parent para evitar problemas si Result está en un stack anidado
      parent.navigate('LevelSelection' as any);
      return;
    }
    navigation.navigate('LevelSelection' as any);
  };

  // Repetir el juego con la misma dificultad
  const replaySameDifficulty = () => {
    const parent = navigation.getParent?.();
    if (parent) {
      // Si Game está en el parent, navegar ahí
      parent.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'App' as any }, { name: 'Game' as any, params: { difficulty } }],
        })
      );
      // fallback simple si el parent no tiene 'Game'
      parent.navigate('Game' as any, { difficulty });
      return;
    }

    // fallback directo (puede funcionar si Result y Game están en el mismo navigator)
    navigation.replace('Game' as any, { difficulty });
  };

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <View style={styles.content}>
        <Icon name="trophy" size={80} color={colors.primary} style={styles.icon} />
        <Text style={styles.title}>¡Juego Completado!</Text>

        <Text style={styles.scoreText}>
          {score} / {total}
        </Text>

        <Text style={styles.message}>{getMessage()}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, styles.playAgain]} onPress={goToLevelSelection}>
            <Icon name="home" size={20} color={colors.white} />
            <Text style={styles.buttonText}>Volver al menú</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.retry]} onPress={replaySameDifficulty}>
            <Icon name="refresh" size={20} color={colors.white} />
            <Text style={styles.buttonText}>Jugar de nuevo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.levelText}>Nivel jugado: {(difficulty || 'Desconocido').toUpperCase()}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  content: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: colors.border,
  },
  icon: { marginBottom: 20 },
  title: { fontSize: 26, color: colors.white, fontWeight: 'bold', marginBottom: 10 },
  scoreText: { fontSize: 40, color: colors.primary, fontWeight: 'bold', marginVertical: 10 },
  message: { fontSize: 18, color: colors.textSecondary, textAlign: 'center', marginTop: 10 },
  buttonsContainer: { flexDirection: 'row', marginTop: 30, gap: 12 },
  button: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 18, paddingVertical: 10, borderRadius: 12, gap: 8 },
  playAgain: { backgroundColor: colors.primary },
  retry: { backgroundColor: '#FF6B6B' },
  buttonText: { color: colors.white, fontWeight: '600', fontSize: 16 },
  levelText: { color: colors.textSecondary, marginTop: 20, fontSize: 14 },
});
