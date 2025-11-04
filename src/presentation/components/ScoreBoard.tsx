
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

interface Props {
  score: number;
  total: number; 
}

const ScoreBoard: React.FC<Props> = ({ score, total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Puntaje: {score} / {total}
      </Text>
    </View>
  );
};

export default ScoreBoard;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
