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
import { getAllLocalScores } from '../../utils/AsyncStorageHelper';

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
  const [localScores, setLocalScores] = useState({ basic: 0, intermediate: 0, advanced: 0 });

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot(
        async (doc) => {
          if (doc.exists()) {
            const data = doc.data() as User;
            setUserData(data);
            const scores = await getAllLocalScores(currentUser.uid);
            setLocalScores(scores);
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

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: () => logoutAsync() },
      ]
    );
  };

  const logoutAsync = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'No se pudo cerrar la sesión');
    }
  };

  const handlePlayGame = () => {
    navigation.navigate('LevelSelection', { difficulty: 'basic' });
  };

  if (loading) {
    return (
      <LinearGradient colors={colors.gradients.background} style={s.container}>
        <Text style={s.loading}>Cargando...</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={colors.gradients.background} style={s.container}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>¡Hola! 👋</Text>
            <Text style={s.username}>{userData?.firstName || 'Jugador'}</Text>
          </View>
          <TouchableOpacity onPress={handleLogout} style={s.logoutBtn}>
            <Icon name="log-out-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>

        <View style={s.logo}>
          <LinearGradient colors={colors.gradients.primary} style={s.logoBox}>
            <Icon name="code-slash" size={60} color={colors.white} />
          </LinearGradient>
          <Text style={s.title}>CodeBrain</Text>
          <Text style={s.subtitle}>¿Listo para el desafío?</Text>
        </View>

        <View style={s.statsCard}>
          <Text style={s.statsTitle}>Tus Estadísticas</Text>
          
          <View style={s.statsGrid}>
            <View style={s.statItem}>
              <Icon name="trophy" size={32} color={colors.primary} />
              <Text style={s.statValue}>{userData?.totalScore || 0}</Text>
              <Text style={s.statLabel}>Puntos Totales</Text>
            </View>

            <View style={s.statItem}>
              <Icon name="game-controller" size={32} color={colors.secondary} />
              <Text style={s.statValue}>{userData?.gamesPlayed || 0}</Text>
              <Text style={s.statLabel}>Partidas</Text>
            </View>

            <View style={s.statItem}>
              <Icon name="star" size={32} color={colors.warning} />
              <Text style={s.statValue}>{userData?.bestScore || 0}</Text>
              <Text style={s.statLabel}>Mejor Score</Text>
            </View>
          </View>

          <View style={s.localScores}>
            <Text style={s.localTitle}>Puntajes Locales:</Text>
            <Text style={s.localText}>Básico: {localScores.basic} pts</Text>
            <Text style={s.localText}>Intermedio: {localScores.intermediate} pts</Text>
            <Text style={s.localText}>Avanzado: {localScores.advanced} pts</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handlePlayGame} activeOpacity={0.8}>
          <LinearGradient colors={colors.gradients.primary} style={s.playBtn}>
            <Icon name="play" size={28} color={colors.white} />
            <Text style={s.playText}>Jugar Ahora</Text>
            <Icon name="arrow-forward" size={24} color={colors.white} />
          </LinearGradient>
        </TouchableOpacity>

        <View style={s.quick}>
          <Text style={s.quickTitle}>Acceso Rápido</Text>
          
          <View style={s.levelBtns}>
            <TouchableOpacity
              style={[s.levelCard, s.levelBasic]}
              onPress={() => navigation.navigate('LevelSelection', { difficulty: 'basic' })}
            >
              <Icon name="flower-outline" size={32} color={colors.white} />
              <Text style={s.levelTitle}>Básico</Text>
              <Text style={s.levelDesc}>10 pts c/u</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.levelCard, s.levelInter]}
              onPress={() => navigation.navigate('LevelSelection', { difficulty: 'intermediate' })}
            >
              <Icon name="fitness-outline" size={32} color={colors.white} />
              <Text style={s.levelTitle}>Intermedio</Text>
              <Text style={s.levelDesc}>15 pts c/u</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[s.levelCard, s.levelAdv]}
              onPress={() => navigation.navigate('LevelSelection', { difficulty: 'advanced' })}
            >
              <Icon name="flame-outline" size={32} color={colors.white} />
              <Text style={s.levelTitle}>Avanzado</Text>
              <Text style={s.levelDesc}>20 pts c/u</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={s.decoration}>
          <Text style={s.decorText}>{'</>'}  {'{ }'}  {'</>'}  </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingTop: 40 },
  loading: { color: colors.white, fontSize: 18, textAlign: 'center', marginTop: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  greeting: { fontSize: 16, color: colors.textSecondary },
  username: { fontSize: 28, fontWeight: 'bold', color: colors.white },
  logoutBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255, 255, 255, 0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  logo: { alignItems: 'center', marginBottom: 30 },
  logoBox: { width: 120, height: 120, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 10 },
  title: { fontSize: 36, fontWeight: 'bold', color: colors.white, marginBottom: 8 },
  subtitle: { fontSize: 16, color: colors.textSecondary },
  statsCard: { backgroundColor: colors.backgroundCard, borderRadius: 20, padding: 20, marginBottom: 24, borderWidth: 1, borderColor: colors.border },
  statsTitle: { fontSize: 20, fontWeight: 'bold', color: colors.white, marginBottom: 16, textAlign: 'center' },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: colors.white, marginTop: 8 },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  localScores: { marginTop: 16, alignItems: 'center' },
  localTitle: { color: colors.white, fontSize: 14 },
  localText: { color: colors.textSecondary },
  playBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 18, borderRadius: 20, marginBottom: 32, shadowColor: colors.primary, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.6, shadowRadius: 12, elevation: 8, gap: 12 },
  playText: { fontSize: 22, fontWeight: 'bold', color: colors.white },
  quick: { marginBottom: 24 },
  quickTitle: { fontSize: 18, fontWeight: '600', color: colors.white, marginBottom: 16 },
  levelBtns: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  levelCard: { flex: 1, padding: 16, borderRadius: 16, alignItems: 'center', minHeight: 120, justifyContent: 'center' },
  levelBasic: { backgroundColor: colors.levelBasic },
  levelInter: { backgroundColor: colors.levelIntermediate },
  levelAdv: { backgroundColor: colors.levelAdvanced },
  levelTitle: { fontSize: 14, fontWeight: 'bold', color: colors.white, marginTop: 8 },
  levelDesc: { fontSize: 11, color: 'rgba(255, 255, 255, 0.8)', marginTop: 4 },
  decoration: { alignItems: 'center', marginTop: 16, opacity: 0.3 },
  decorText: { fontSize: 24, color: colors.white, fontFamily: 'monospace' },
});