import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

export default function SettingsScreen() {
  const logout = () => {
    auth().signOut();
  };

  return (
    <LinearGradient colors={['#1e1e2f', '#2a2a40']} style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <TouchableOpacity style={styles.option}>
        <Icon name="color-palette-outline" size={28} color="#fff" />
        <Text style={styles.optionText}>Cambiar Tema</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Icon name="notifications-outline" size={28} color="#fff" />
        <Text style={styles.optionText}>Notificaciones</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Icon name="information-circle-outline" size={28} color="#fff" />
        <Text style={styles.optionText}>Información de la App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Icon name="log-out-outline" size={26} color="#fff" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
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
  option: {
    backgroundColor: '#ffffff15',
    padding: 15,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 15,
  },
  logoutBtn: {
    marginTop: 40,
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
