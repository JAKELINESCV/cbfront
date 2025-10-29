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

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Por favor ingresa un correo válido.');
      return;
    }

    setLoading(true);
    
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('¡Bienvenido!', 'Inicio de sesión exitoso.');
    } catch (error: any) {
      console.error('Error en login:', error);
      
      switch (error.code) {
        case 'auth/user-not-found':
          Alert.alert('Error', 'No existe una cuenta con este correo.');
          break;
        case 'auth/wrong-password':
          Alert.alert('Error', 'Contraseña incorrecta.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Error', 'El formato del correo es inválido.');
          break;
        case 'auth/invalid-credential':
          Alert.alert('Error', 'Credenciales inválidas. Verifica tu correo y contraseña.');
          break;
        default:
          Alert.alert('Error', 'Ocurrió un problema al iniciar sesión.');
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
          <Text style={styles.codeText}>if (ready) {'{'}</Text>
          <Text style={styles.codeText}>  play();</Text>
          <Text style={styles.codeText}>{'}'}</Text>
          <Text style={styles.codeText}></Text>
          <Text style={styles.codeText}>const score = 100;</Text>
          <Text style={styles.codeText}>return winner;</Text>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.logoContainer}>
            <LinearGradient colors={colors.gradients.primary} style={styles.logoBox}>
              <Icon name="code-slash" size={50} color={colors.white} />
            </LinearGradient>
            <Text style={styles.logoTitle}>CodeBrain</Text>
            <Text style={styles.logoSubtitle}>Desafía tu conocimiento</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Iniciar Sesión</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Correo electrónico</Text>
              <View style={styles.inputContainer}>
                <Icon name="mail-outline" size={22} color={colors.primaryLight} />
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
                <Icon name="lock-closed-outline" size={22} color={colors.primaryLight} />
                <TextInput
                  placeholder="••••••••"
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
                    size={22} 
                    color={colors.primaryLight} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={handleLogin} disabled={loading} activeOpacity={0.8}>
              <LinearGradient
                colors={colors.gradients.primary}
                style={[styles.loginButton, loading && styles.buttonDisabled]}
              >
                <View style={styles.buttonContent}>
                  {loading ? (
                    <Text style={styles.buttonText}>Ingresando...</Text>
                  ) : (
                    <>
                      <Text style={styles.buttonText}>Entrar</Text>
                      <Icon name="arrow-forward" size={20} color={colors.white} />
                    </>
                  )}
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerLink} disabled={loading}>
              <Text style={styles.registerText}>
                ¿No tienes cuenta? <Text style={styles.registerTextBold}>Regístrate</Text>
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
    top: 100,
    left: 20,
    opacity: 0.05,
  },
  codeText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    lineHeight: 24,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  logoSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  formCard: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(192, 132, 252, 0.3)',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    marginLeft: 4,
    fontWeight: '500',
  }, 
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(192, 132, 252, 0.4)',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  textInput: {
    flex: 1,
    color: colors.white,
    fontSize: 16,
  }, 
  loginButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
  }, 
  registerLink: {
    marginTop: 24,
    paddingVertical: 8,
  }, 
  registerText: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: 16,
  }, 
  registerTextBold: {
    color: colors.primaryLight,
    fontWeight: '600',
  },
});