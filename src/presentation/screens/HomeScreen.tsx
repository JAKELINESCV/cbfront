import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';
import { User } from '../../domain/entities/User';

type RootStackParamList = {
  Home: undefined;
  LevelSelection: { difficulty: string };
  Profile: undefined;
  Login: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const currentUser = auth().currentUser;
  
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Carga los datos del usuario desde Firestore
   */
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot(
        (doc) => {
          if (doc.exists()) {
            setUserData(doc.data() as User);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error al cargar usuario:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [currentUser]);

  /**
   * Maneja el cierre de sesión
   */
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que quieres salir?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            try {
              await auth().signOut();
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              Alert.alert('Error', 'No se pudo cerrar la sesión');
            }
          },
        },
      ]
    );
  };

  /**
   * Navega a la pantalla de selección de nivel
   */
  const handlePlayGame = () => {
  navigation.navigate('LevelSelection', { difficulty: 'basic' });
};


  if (loading) {
    return (
      <LinearGradient colors={colors.gradients.background} style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>¡Hola! 👋</Text>
            <Text style={styles.username}>{userData?.firstName || 'Jugador'}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Icon name="log-out-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.logoSection}>
          <LinearGradient colors={colors.gradients.primary} style={styles.logoBox}>
            <Icon name="code-slash" size={60} color={colors.white} />
          </LinearGradient>
          <Text style={styles.logoTitle}>32</Text>
          <Text style={styles.logoSubtitle}>¿Listo para el desafío?</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Tus Estadísticas</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Icon name="trophy" size={32} color={colors.primary} />
              <Text style={styles.statValue}>{userData?.totalScore || 0}</Text>
              <Text style={styles.statLabel}>Puntos Totales</Text>
            </View>

            <View style={styles.statItem}>
              <Icon name="game-controller" size={32} color={colors.secondary} />
              <Text style={styles.statValue}>{userData?.gamesPlayed || 0}</Text>
              <Text style={styles.statLabel}>Partidas</Text>
            </View>

            <View style={styles.statItem}>
              <Icon name="star" size={32} color={colors.warning} />
              <Text style={styles.statValue}>{userData?.bestScore || 0}</Text>
              <Text style={styles.statLabel}>Mejor Score</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity onPress={handlePlayGame} activeOpacity={0.8}>
          <LinearGradient colors={colors.gradients.primary} style={styles.playButton}>
            <Icon name="play" size={28} color={colors.white} />
            <Text style={styles.playButtonText}>Jugar  Ahora</Text>
            <Icon name="arrow-forward" size={24} color={colors.white} />
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.quickLevels}>
          <Text style={styles.quickLevelsTitle}>Acceso Rápido</Text>
          
          <View style={styles.levelButtons}>
                  <TouchableOpacity
          style={[styles.levelCard, styles.levelBasic]}
          onPress={() => navigation.navigate('LevelSelection', { difficulty: 'basic' })}
        >
          <Icon name="flower-outline" size={32} color={colors.white} />
          <Text style={styles.levelCardTitle}>Básico</Text>
          <Text style={styles.levelCardDesc}>10 pts c/u</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.levelCard, styles.levelInter]}
          onPress={() => navigation.navigate('LevelSelection', { difficulty: 'intermediate' })}
        >
          <Icon name="fitness-outline" size={32} color={colors.white} />
          <Text style={styles.levelCardTitle}>Intermedio</Text>
          <Text style={styles.levelCardDesc}>15 pts c/u</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.levelCard, styles.levelAdv]}
          onPress={() => navigation.navigate('LevelSelection', { difficulty: 'advanced' })}
        >
          <Icon name="flame-outline" size={32} color={colors.white} />
          <Text style={styles.levelCardTitle}>Avanzado</Text>
          <Text style={styles.levelCardDesc}>20 pts c/u</Text>
        </TouchableOpacity>


          </View>
        </View>

        <View style={styles.decoration}>
          <Text style={styles.decorText}>{'</>'}  {'{ }'}  {'</>'}  </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 40,
  },
  loadingText: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  },
  logoutButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoBox: {
    width: 120,
    height: 120,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  logoTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  logoSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  statsCard: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 20,
    marginBottom: 32,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
    gap: 12,
  },
  playButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  quickLevels: {
    marginBottom: 24,
  },
  quickLevelsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 16,
  },
  levelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  levelCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  levelBasic: {
    backgroundColor: colors.levelBasic,
  },
  levelInter: {
    backgroundColor: colors.levelIntermediate,
  },
  levelAdv: {
    backgroundColor: colors.levelAdvanced,
  },
  levelCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 8,
  },
  levelCardDesc: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  decoration: {
    alignItems: 'center',
    marginTop: 16,
    opacity: 0.3,
  },
  decorText: {
    fontSize: 24,
    color: colors.white,
    fontFamily: 'monospace',
  },
});