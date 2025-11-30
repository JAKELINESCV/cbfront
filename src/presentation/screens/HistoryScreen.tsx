import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HistoryScreen() {

  return (
    <LinearGradient colors={['#1e1e2f', '#2a2a40']} style={styles.container}>
      <Text style={styles.title}>Historial de Partidas</Text>

      <ScrollView style={styles.list}>
        <View style={styles.card}>
          <Icon name="trophy-outline" size={32} color="#ffcc00" />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Puntaje: 85</Text>
            <Text style={styles.cardSubtitle}>Nivel: Intermedio</Text>
          </View>
          <Text style={styles.cardDate}>15/02/2025</Text>
        </View>

        <View style={styles.card}>
          <Icon name="trophy-outline" size={32} color="#ffcc00" />
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Puntaje: 60</Text>
            <Text style={styles.cardSubtitle}>Nivel: Básico</Text>
          </View>
          <Text style={styles.cardDate}>13/02/2025</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: { marginTop: 10 },
  card: {
    backgroundColor: '#ffffff15',
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#ccc',
    fontSize: 14,
  },
  cardDate: {
    color: '#aaa',
    fontSize: 12,
  },
});
