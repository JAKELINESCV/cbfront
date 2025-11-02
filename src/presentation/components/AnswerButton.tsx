// src/components/AnswerButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  text: string;
  onPress: () => void;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  disabled?: boolean;
}

const AnswerButton: React.FC<Props> = ({ text, onPress, isSelected, isCorrect, isWrong, disabled }) => {
  const bgColor = isCorrect
    ? 'rgba(0,255,0,0.2)'
    : isWrong
    ? 'rgba(255,0,0,0.2)'
    : isSelected
    ? 'rgba(255,255,255,0.2)'
    : 'rgba(255,255,255,0.1)';

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default AnswerButton;

const styles = StyleSheet.create({
  button: {
    width: '90%',                 // ocupa 90% del ancho de la pantalla
    paddingVertical: 14,
    borderRadius: 12,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',      // centra el texto verticalmente
    alignItems: 'center',          // centra el texto horizontalmente
  },
  text: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
  },
});
