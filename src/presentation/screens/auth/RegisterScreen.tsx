import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme/colors';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  
  // Estados del formulario
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  /**
   * Limpia todos los campos del formulario
   */
  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setBirthDate('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  /**
   * Formatea automáticamente la fecha mientras el usuario escribe
   * Añade "/" después del día y mes automáticamente
   */
  const handleDateChange = (text: string) => {
    const numbers = text.replace(/[^\d]/g, '');
    
    let formatted = '';
    
    // Formatear DD/MM/YYYY automáticamente
    if (numbers.length > 0) {
      formatted = numbers.substring(0, 2);
      
      if (numbers.length >= 3) {
        formatted += '/' + numbers.substring(2, 4);
      }
      
      if (numbers.length >= 5) {
        formatted += '/' + numbers.substring(4, 8);
      }
    }
    
    setBirthDate(formatted);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Valida que todos los campos cumplan con los requisitos
   */
  const validateFields = (): boolean => {
    if (!firstName || !lastName || !birthDate || !email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return false;
    }

    if (firstName.length < 2) {
      Alert.alert('Error', 'El nombre debe tener al menos 2 caracteres.');
      return false;
    }

    if (lastName.length < 2) {
      Alert.alert('Error', 'Los apellidos deben tener al menos 2 caracteres.');
      return false;
    }

    // Validar formato de fecha (DD/MM/YYYY)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(birthDate)) {
      Alert.alert('Error', 'La fecha debe estar en formato DD/MM/YYYY (ej: 15/08/2000).');
      return false;
    }

    // Validar que sea mayor de 18 años
    const [day, month, year] = birthDate.split('/').map(Number);
    const birth = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    if (age < 18) {
      Alert.alert('Error', 'Debes tener al menos 18 años para registrarte.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo válido.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return false;
    }

    return true;
  };

  /**
   * Crea el perfil del usuario en Firestore
   */
  const createUserProfile = async (userId: string) => {
    try {
      // Convertir fecha a formato YYYY-MM-DD para almacenar
      const [day, month, year] = birthDate.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      await firestore().collection('users').doc(userId).set({
        id: userId,
        email: email.toLowerCase(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        birthDate: formattedDate,
        totalScore: 0,
        gamesPlayed: 0,
        bestScore: 0,
        currentStreak: 0,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error al crear perfil:', error);
      throw error;
    }
  };

  /**
   * Maneja el proceso completo de registro
   */
  const handleRegister = async () => {
    if (!validateFields()) {
      return;
    }

    setLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email.toLowerCase().trim(),
        password
      );

      await userCredential.user.updateProfile({
        displayName: `${firstName} ${lastName}`,
      });

      await createUserProfile(userCredential.user.uid);

      clearForm();

      Alert.alert(
        '🎉 ¡Bienvenido!', 
        `Hola ${firstName}, tu cuenta ha sido creada exitosamente.\n\n¡Prepárate para desafiar tu mente!`,
        [
          {
            text: 'Comenzar a Jugar',
            onPress: () => navigation.navigate('Home'),
          }
        ]
      );

    } catch (error: any) {
      console.error('Error en registro:', error);

      switch (error.code) {
        case 'auth/email-already-in-use':
          Alert.alert('Error', 'Este correo ya está registrado.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Error', 'El formato del correo es inválido.');
          break;
        case 'auth/weak-password':
          Alert.alert('Error', 'La contraseña es muy débil.');
          break;
        default:
          Alert.alert('Error', 'No se pudo crear la cuenta.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}
    >
      <LinearGradient
        colors={colors.gradients.background}
        style={styles.gradient}
      >
        <View style={styles.codeBackground}>
          <Text style={styles.codeText}>const brain = {'{'}</Text>
          <Text style={styles.codeText}>  level: 'expert',</Text>
          <Text style={styles.codeText}>  ready: true</Text>
          <Text style={styles.codeText}>{'}'}</Text>
          <Text style={styles.codeText}></Text>
          <Text style={styles.codeText}>function play() {'{'}</Text>
          <Text style={styles.codeText}>  return '🎮';</Text>
          <Text style={styles.codeText}>{'}'}</Text>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <LinearGradient colors={colors.gradients.primary} style={styles.logoBox}>
              <Icon name="person-add" size={40} color={colors.white} />
            </LinearGradient>
            <Text style={styles.logoTitle}>Crear Cuenta</Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nombres</Text>
              <View style={styles.inputContainer}>
                <Icon name="person-outline" size={20} color={colors.primaryLight} />
                <TextInput
                  placeholder="Ej: Juan Carlos"
                  placeholderTextColor={colors.textMuted}
                  style={styles.textInput}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Apellidos</Text>
              <View style={styles.inputContainer}>
                <Icon name="people-outline" size={20} color={colors.primaryLight} />
                <TextInput
                  placeholder="Ej: Pérez García"
                  placeholderTextColor={colors.textMuted}
                  style={styles.textInput}
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Fecha de Nacimiento</Text>
              <View style={styles.inputContainer}>
                <Icon name="calendar-outline" size={20} color={colors.primaryLight} />
                <TextInput
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor={colors.textMuted}
                  style={styles.textInput}
                  value={birthDate}
                  onChangeText={handleDateChange}
                  keyboardType="numeric"
                  editable={!loading}
                  maxLength={10}
                />
              </View>
              {birthDate.length > 0 && birthDate.length < 10 && (
                <Text style={styles.helperText}>Ejemplo: 15/08/2000</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Correo Electrónico</Text>
              <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={20} color={colors.primaryLight} />
                <TextInput
                  placeholder="tu@email.com"
                  placeholderTextColor={colors.textMuted}
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Contraseña</Text>
              <View style={styles.inputContainer}>
                <Icon name="lock-closed-outline" size={20} color={colors.primaryLight} />
                <TextInput
                  placeholder="Mínimo 6 caracteres"
                  placeholderTextColor={colors.textMuted}
                  style={styles.textInput}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={loading}>
                  <Icon 
                    name={showPassword ? "eye-outline" : "eye-off-outline"} 
                    size={20} 
                    color={colors.primaryLight} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={handleRegister} disabled={loading} activeOpacity={0.8}>
              <LinearGradient
                colors={colors.gradients.primary}
                style={[styles.registerButton, loading && styles.buttonDisabled]}
              >
                <Text style={styles.buttonText}>
                  {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink} disabled={loading}>
              <Text style={styles.loginText}>
                ¿Ya tienes cuenta? <Text style={styles.loginTextBold}>Inicia sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: { flex: 1 },
  gradient: { flex: 1 },
  codeBackground: {
    position: 'absolute',
    top: 80,
    right: 20,
    opacity: 0.05,
  },
  codeText: {
    color: colors.white,
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    lineHeight: 20,
  }, 
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  }, 
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },  
  logoTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  }, 
  formCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(192, 132, 252, 0.3)',
  },  
  inputGroup: {
    marginBottom: 14,
  }, 
  inputLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(192, 132, 252, 0.4)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  textInput: {
    flex: 1,
    color: colors.white,
    fontSize: 15,
  }, 
  registerButton: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  }, 
  buttonDisabled: {
    opacity: 0.6,
  }, 
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  }, 
  loginLink: {
    marginTop: 16,
    paddingVertical: 8,
  }, 
  loginText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 14,
  },  
  loginTextBold: {
    color: colors.primaryLight,
    fontWeight: '600',
  },
  helperText: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 4,
    marginLeft: 4,
  },
});