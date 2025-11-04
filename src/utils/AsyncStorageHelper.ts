import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Guarda el puntaje local por nivel para un usuario
 */
export const saveLocalScoreCase = async (
  uid: string,
  level: 'basic' | 'intermediate' | 'advanced',
  score: number
) => {
  try {
    await AsyncStorage.setItem(`score_${uid}_${level}`, score.toString());
  } catch (e) {
    console.error('Error guardando puntaje en AsyncStorage:', e);
  }
};

/**
 * Obtiene el puntaje local por nivel para un usuario
 */
export const getLocalScoreCase = async (
  uid: string,
  level: 'basic' | 'intermediate' | 'advanced'
) => {
  try {
    const value = await AsyncStorage.getItem(`score_${uid}_${level}`);
    return value ? parseInt(value, 10) : 0;
  } catch (e) {
    console.error('Error leyendo puntaje de AsyncStorage:', e);
    return 0;
  }
};

/**
 * Obtiene todos los puntajes locales de una vez para un usuario
 */
export const getAllLocalScores = async (uid: string) => {
  try {
    const basic = await getLocalScoreCase(uid, 'basic');
    const intermediate = await getLocalScoreCase(uid, 'intermediate');
    const advanced = await getLocalScoreCase(uid, 'advanced');
    return { basic, intermediate, advanced };
  } catch (e) {
    console.error('Error leyendo todos los puntajes de AsyncStorage:', e);
    return { basic: 0, intermediate: 0, advanced: 0 };
  }
};
