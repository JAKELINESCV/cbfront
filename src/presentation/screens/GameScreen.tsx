import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/colors';
import Timer from '../components/Timer';

type RootStackParamList = {
  Game: { level?: string; difficulty?: string };
  Result: { score: number; total: number; difficulty?: string };
};

type GameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Game'>;
type GameScreenRouteProp = RouteProp<RootStackParamList, 'Game'>;

const mockQuestions = [
  { question: '¿Qué significa HTML?', options: ['HyperText Markup Language','HighText Machine Language','HyperTool Multi Language','HomeTool Markup Language'], answer: 0 },
  { question: '¿Cuál es el lenguaje que usa React Native?', options: ['Python','JavaScript','C#','Dart'], answer: 1 },
  { question: '¿Qué comando inicia un proyecto React Native?', options: ['npm start','npx react-native init','expo build','node create'], answer: 1 },
];

export default function GameScreen() {
  const navigation = useNavigation<GameScreenNavigationProp>();
  const route = useRoute<GameScreenRouteProp>();

  const incomingDifficulty = route.params?.difficulty ?? 'básico';
  const incomingLevel = route.params?.level ?? '1';

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [timerKey, setTimerKey] = useState(0);

  const normalize = (s: string) => (s || 'básico').toString().toLowerCase();
  const getMultiplier = (lvl: string) => {
    const l = normalize(lvl);
    if (['intermedio','intermediate','medium'].includes(l)) return 2;
    if (['dificil','difficult','advanced','hard'].includes(l)) return 3;
    return 1;
  };

  const multiplier = getMultiplier(incomingDifficulty);

  const handleNextQuestion = () => {
    if (currentIndex + 1 < mockQuestions.length) {
      setCurrentIndex((p) => p + 1);
      setSelected(null);
      setTimerKey((p) => p + 1);
    } else {
      navigation.replace('Result', {
        score,
        total: mockQuestions.length * 10 * multiplier,
        difficulty: incomingDifficulty,
      });
    }
  };

  const handleAnswer = (index: number) => {
    setSelected(index);
    if (index === mockQuestions[currentIndex].answer) {
      setScore((p) => p + 10 * multiplier);
    }
    setTimeout(() => handleNextQuestion(), 800);
  };

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={26} color={colors.white} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.levelText}>Dificultad: {normalize(incomingDifficulty).toUpperCase()}</Text>
          <Text style={styles.scoreText}>Puntaje: {score}</Text>
        </View>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.timerContainer}>
        <Timer key={timerKey} duration={15} onTimeUp={handleNextQuestion} />
      </View>

      <View style={styles.centerContent}>
        <View style={styles.questionBox}>
          <Text style={styles.questionText}>{mockQuestions[currentIndex].question}</Text>
        </View>
        <View style={styles.optionsBox}>
          {mockQuestions[currentIndex].options.map((option, idx) => {
            const isSelected = selected === idx;
            const isCorrect = selected !== null && idx === mockQuestions[currentIndex].answer;
            const isWrong = selected !== null && isSelected && idx !== mockQuestions[currentIndex].answer;

            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionSelected,
                  isCorrect && styles.optionCorrect,
                  isWrong && styles.optionWrong,
                ]}
                onPress={() => handleAnswer(idx)}
                disabled={selected !== null}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Pregunta {currentIndex + 1} de {mockQuestions.length}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingVertical: 10 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backButton: { padding: 5 },
  headerCenter: { alignItems: 'center', flex: 1 },
  levelText: { color: colors.textSecondary, fontSize: 16, fontWeight: '600' },
  scoreText: { color: colors.white, fontSize: 16, fontWeight: 'bold', marginTop: 4 },
  timerContainer: { alignItems: 'center', marginVertical: 10 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  questionBox: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 20, padding: 24, borderWidth: 1, borderColor: colors.border, marginBottom: 20, width: '100%' },
  questionText: { color: colors.white, fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  optionsBox: { width: '100%' },
  optionButton: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 14, borderRadius: 12, marginVertical: 6 },
  optionSelected: { borderColor: colors.primary, borderWidth: 1 },
  optionCorrect: { backgroundColor: 'rgba(0,255,0,0.2)', borderColor: 'lime' },
  optionWrong: { backgroundColor: 'rgba(255,0,0,0.2)', borderColor: 'red' },
  optionText: { color: colors.white, fontSize: 16, textAlign: 'center' },
  footer: { alignItems: 'center', marginBottom: 10 },
  footerText: { color: colors.textSecondary, fontSize: 14 },
});
