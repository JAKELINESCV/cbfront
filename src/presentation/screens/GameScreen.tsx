import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';
import Timer from '../components/Timer';
import QuestionCard from '../components/QuestionCard';
import AnswerButton from '../components/AnswerButton';
import ScoreBoard from '../components/ScoreBoard';
import { getQuestionsByLevelUseCase } from '../../domain/usecases/game/GetQuestionsByLevelUseCase';
import { calculateScoreUseCase } from '../../domain/usecases/game/CalculateScoreUseCase';
import { saveLocalScoreCase } from '../../utils/AsyncStorageHelper'; // <-- IMPORT
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { WebView } from 'react-native-webview';

export default function GameScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const difficulty = route.params?.difficulty ?? 'basic';
  const level = route.params?.level ?? '1';

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timerKey, setTimerKey] = useState(0);
  const [pointsPerQuestion, setPointsPerQuestion] = useState(10);
  const [totalPoints, setTotalPoints] = useState(0);

  const { width } = Dimensions.get('window');
  const currentUser = auth().currentUser;

  const getPointsForDifficultyAndLevel = (diff: string, lvl: string) => {
    const base = diff === 'intermediate' ? 15 : diff === 'advanced' ? 20 : 10;
    // eslint-disable-next-line radix
    return base + (parseInt(lvl) - 1) * 5;
  };

  useEffect(() => {
    const loadQuestions = async () => {
      const pts = getPointsForDifficultyAndLevel(difficulty, level);
      setPointsPerQuestion(pts);

      const fetchedQuestions = await getQuestionsByLevelUseCase(difficulty, level);
      setQuestions(fetchedQuestions.sort(() => Math.random() - 0.5));
      setTotalPoints(fetchedQuestions.length * pts);
    };
    loadQuestions();
  }, [difficulty, level]);

  const handleAnswer = (index: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(index);
    const currentQuestion = questions[currentIndex];
    const isCorrect = index === currentQuestion.answer;

    let newScore = score;
    if (isCorrect) newScore = calculateScoreUseCase(score, pointsPerQuestion);
    setScore(newScore);

    setTimeout(() => handleNextQuestion(newScore), 800);
  };

  const handleNextQuestion = async (currentScore: number) => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setTimerKey(prev => prev + 1);
    } else {
      // Guardar puntaje local por usuario y dificultad
      if (currentUser) {
        await saveLocalScoreCase(currentUser.uid, difficulty as any, currentScore);

        // Actualizar estadísticas en Firestore
        const userDoc = firestore().collection('users').doc(currentUser.uid);
        const docSnap = await userDoc.get();
if (docSnap.exists()) {
  const data = docSnap.data();
  const newTotal = (data?.totalScore || 0) + currentScore;
  const newGames = (data?.gamesPlayed || 0) + 1;
  const newBest = Math.max(data?.bestScore || 0, currentScore);

  await userDoc.update({
    totalScore: newTotal,
    gamesPlayed: newGames,
    bestScore: newBest,
  });
}

      }

      navigation.replace('Result', {
        score: currentScore,
        total: totalPoints,
        difficulty,
      });
    }
  };

  if (questions.length === 0)
    return <LinearGradient colors={colors.gradients.background} style={styles.container} />;

  const currentQuestion = questions[currentIndex];

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <View style={styles.topContainer}>
        <ScoreBoard score={score} total={totalPoints} />
        <Timer key={timerKey} duration={15} onTimeUp={() => handleNextQuestion(score)} />
        <View style={[styles.gifContainer, { width: width * 0.7, height: width * 0.7 }]}>
          <WebView
            style={styles.gif}
            originWhitelist={['*']}
            source={{
              html: `<html><body style="margin:0;background:transparent">
                      <img src="https://media.tenor.com/y2JXkY1pXkwAAAAM/cat-computer.gif" style="width:100%;height:100%;border-radius:15px"/>
                    </body></html>`,
            }}
            scrollEnabled={false}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <QuestionCard question={currentQuestion.question} />
        {currentQuestion.options.map((option: string, idx: number) => {
          const isSelected = selectedOption === idx;
          const isCorrect = selectedOption !== null && idx === currentQuestion.answer;
          const isWrong = selectedOption !== null && isSelected && idx !== currentQuestion.answer;
          return (
            <AnswerButton
              key={idx}
              text={option}
              onPress={() => handleAnswer(idx)}
              isSelected={isSelected}
              isCorrect={isCorrect}
              isWrong={isWrong}
            />
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  topContainer: { marginTop: 40, width: '100%', alignItems: 'center', gap: 12, marginBottom: 15 },
  gifContainer: { overflow: 'hidden', borderRadius: 15, marginTop: 10, backgroundColor: 'transparent' },
  gif: { flex: 1, backgroundColor: 'transparent' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', gap: 12, paddingBottom: 20 },
});
