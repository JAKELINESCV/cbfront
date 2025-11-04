// src/usecases/saveLocalScoreCase.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLocalScoreCase = async (score: number, difficulty: string) => {
  try {
    const key = `score_${difficulty}`;
    await AsyncStorage.setItem(key, score.toString());
    console.log(`Score guardado: ${score} para dificultad ${difficulty}`);
  } catch (err) {
    console.log('Error guardando puntaje local:', err);
  }
};
