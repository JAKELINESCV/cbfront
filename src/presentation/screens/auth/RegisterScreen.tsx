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
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setBirthDate('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
  };

  const handleDateChange = (text: string) => {
    const numbers = text.replace(/[^\d]/g, '');
    let formatted = '';
    
    if (numbers.length > 0) {
      formatted = numbers.substring(0, 2);
      if (numbers.length >= 3) formatted += '/' + numbers.substring(2, 4);
      if (numbers.length >= 5) formatted += '/' + numbers.substring(4, 8);
    }
    
    setBirthDate(formatted);
  };

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

    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(birthDate)) {
      Alert.alert('Error', 'La fecha debe estar en formato DD/MM/YYYY (ej: 15/08/2000).');
      return false;
    }

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

  const createUserProfile = async (userId: string) => {
    try {
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

  const handleRegister = async () => {
    if (!validateFields()) return;

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
      style={s.flex}
    >
      <LinearGradient colors={colors.gradients.background} style={s.flex}>
        <View style={s.codeBg}>
          <Text style={s.codeText}>const brain = {'{'}</Text>
          <Text style={s.codeText}>  level: 'expert',</Text>
          <Text style={s.codeText}>  ready: true</Text>
          <Text style={s.codeText}>{'}'}</Text>
          <Text style={s.codeText} />
          <Text style={s.codeText}>function play() {'{'}</Text>
          <Text style={s.codeText}>  return '🎮';</Text>
          <Text style={s.codeText}>{'}'}</Text>
        </View>

        <ScrollView 
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={s.logo}>
            <LinearGradient colors={colors.gradients.primary} style={s.logoBox}>
              <Icon name="person-add" size={40} color={colors.white} />
            </LinearGradient>
            <Text style={s.title}>Crear Cuenta</Text>
          </View>

          <View style={s.card}>
            <View style={s.inputGroup}>
              <Text style={s.label}>Nombres</Text>
              <View style={s.input}>
                <Icon name="person-outline" size={20} color={colors.primaryLight} />
                <TextInput
                  placeholder="Ej: Juan Carlos"
                  placeholderTextColor={colors.textMuted}
                  style={s.textInput}
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>
            </View>

            <View style={s.inputGroup}>
              <Text style={s.label}>Apellidos</Text>
              <View style={s.input}>
                <Icon name="people-outline" size={20} color={colors.primaryLight} />
                <TextInput
                  placeholder="Ej: Pérez García"
                  placeholderTextColor={colors.textMuted}
                  style={s.textInput}
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>
            </View>

            <View style={s.inputGroup}>
              <Text style={s.label}>Fecha de Nacimiento</Text>
              <View style={s.input}>
                <Icon name="calendar-outline" size={20} color={colors.primaryLight} />
                <TextInput
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor={colors.textMuted}
                  style={s.textInput}
                  value={birthDate}
                  onChangeText={handleDateChange}
                  keyboardType="numeric"
                  editable={!loading}
                  maxLength={10}
                />
              </View>
              {birthDate.length > 0 && birthDate.length < 10 && (
                <Text style={s.helper}>Ejemplo: 15/08/2000</Text>
              )}
            </View>

            <View style={s.inputGroup}>
              <Text style={s.label}>Correo Electrónico</Text>
              <View style={s.input}>
                <Icon name="mail-outline" size={20} color={colors.primaryLight} />
                <TextInput
                  placeholder="tu@email.com"
                  placeholderTextColor={colors.textMuted}
                  style={s.textInput}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!loading}
                />
              </View>
            </View>

            <View style={s.inputGroup}>
              <Text style={s.label}>Contraseña</Text>
              <View style={s.input}>
                <Icon name="lock-closed-outline" size={20} color={colors.primaryLight} />
                <TextInput
                  placeholder="Mínimo 6 caracteres"
                  placeholderTextColor={colors.textMuted}
                  style={s.textInput}
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
                style={[s.btn, loading && s.btnDisabled]}
              >
                <Text style={s.btnText}>
                  {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={s.link} disabled={loading}>
              <Text style={s.linkText}>
                ¿Ya tienes cuenta? <Text style={s.linkBold}>Inicia sesión</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1 },
  codeBg: { position: 'absolute', top: 80, right: 20, opacity: 0.05 },
  codeText: { color: colors.white, fontSize: 14, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', lineHeight: 20 },
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 30 },
  logo: { alignItems: 'center', marginBottom: 24 },
  logoBox: { width: 80, height: 80, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.white },
  card: { width: '100%', maxWidth: 400, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(192, 132, 252, 0.3)' },
  inputGroup: { marginBottom: 14 },
  label: { fontSize: 13, color: colors.textSecondary, marginBottom: 6, marginLeft: 4, fontWeight: '500' },
  input: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderWidth: 1.5, borderColor: 'rgba(192, 132, 252, 0.4)', borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, gap: 10 },
  textInput: { flex: 1, color: colors.white, fontSize: 15 },
  btn: { paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: colors.white, fontWeight: 'bold', fontSize: 16 },
  link: { marginTop: 16, paddingVertical: 8 },
  linkText: { color: colors.textSecondary, textAlign: 'center', fontSize: 14 },
  linkBold: { color: colors.primaryLight, fontWeight: '600' },
  helper: { fontSize: 11, color: colors.textMuted, marginTop: 4, marginLeft: 4 },
});