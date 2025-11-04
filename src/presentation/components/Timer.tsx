import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { colors } from '../theme/colors';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  isRunning?: boolean;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp, isRunning = true }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isRunning) return;
    if (timeLeft === 0) {
      onTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ color: colors.white, fontSize: 18, fontWeight: 'bold' }}>
        ⏱️ {timeLeft}s
      </Text>
    </View>
  );
};

export default Timer;
