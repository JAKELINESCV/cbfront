import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../theme/colors';

interface LevelBadgeProps {
  title: string;
  icon?: string;
  onPress?: () => void;
  locked?: boolean;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({
  title,
  icon = 'school-outline',
  onPress,
  locked = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      disabled={locked}
      onPress={onPress}
      style={styles.wrapper}
    >
      <LinearGradient
        colors={
          locked
            ? ['#3a3a3a', '#2a2a2a']
            : colors.gradients.primary
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.container, locked && styles.lockedContainer]}
      >
        <View style={styles.iconContainer}>
          <Icon
            name={locked ? 'lock-closed-outline' : icon}
            size={32}
            color={locked ? 'rgba(255,255,255,0.4)' : colors.white}
          />
        </View>

        <Text
          style={[
            styles.title,
            locked && { color: 'rgba(255,255,255,0.4)' },
          ]}
        >
          {title}
        </Text>

        {locked && <Text style={styles.lockedText}>Bloqueado</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default LevelBadge;

const styles = StyleSheet.create({
  wrapper: {
    width: 110,
    height: 130,
    borderRadius: 24,
    margin: 10,
  },
  container: {
    flex: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  lockedContainer: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  lockedText: {
    marginTop: 6,
    fontSize: 12,
    color: 'rgba(255,255,255,0.5)',
  },
});
