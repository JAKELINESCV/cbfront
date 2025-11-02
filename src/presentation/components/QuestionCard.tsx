// src/components/QuestionCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  question: string;
}

const QuestionCard: React.FC<Props> = ({ question }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{question}</Text>
    </View>
  );
};

export default QuestionCard;
const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',      // centra verticalmente
    alignItems: 'center',          // centra horizontalmente
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
