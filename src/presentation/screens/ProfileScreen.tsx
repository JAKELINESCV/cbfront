import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Modal,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';
import { useUser } from '../../context/UserContext';
import { userApi } from '../../services/api';

// Avatares predefinidos del assets
const AVATARS = [
  { id: 1, source: require('../assets/avatars/avatar1.png') },
  { id: 2, source: require('../assets/avatars/avatar2.png') },
  { id: 3, source: require('../assets/avatars/avatar3.png') },
  { id: 4, source: require('../assets/avatars/avatar4.png') },
  { id: 5, source: require('../assets/avatars/avatar5.png') },
  { id: 6, source: require('../assets/avatars/avatar6.png') },
];

export default function ProfileScreen() {
  const navigation = useNavigation();
  const currentUser = auth().currentUser;

  // MODIFICACIÓN 1: Obtener el estado de carga global (loading) del contexto y renombrarlo a isUserLoading
  const { user, loading: isUserLoading, refreshUser } = useUser();

  // Estado para la carga de los modals (edición, contraseña)
  const [loading, setLoading] = useState(false);

  // Estados para modales
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [isAvatarModalVisible, setIsAvatarModalVisible] = useState(false);

  // Datos del formulario de edición
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',  // formato DD/MM/YYYY para mostrar
  });

  // Datos para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Avatar seleccionado
  const [selectedAvatar, setSelectedAvatar] = useState<number>(1);

  useEffect(() => {
    if (user) {
      // Formatear la fecha para mostrar DD/MM/YYYY
      let formattedDate = '';
      if (user.birthDate && typeof user.birthDate === 'string' && user.birthDate.includes('-')) {
        // manejar formatos tipo 'YYYY-MM-DD' y 'YYYY-MM-DDT...'
        const [year, month, dayTime] = user.birthDate.split('-');
        const day = dayTime.split('T')[0]; // elimina la parte 'T05:00:00.000Z' si existe
        formattedDate = `${day}/${month}/${year}`;
      }

      setEditData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        birthDate: formattedDate,
      });

      // Determinar avatar actual
      if (user.avatarUrl) {
        // Asumiendo que avatarUrl es algo como 'avatar1', 'avatar2', etc.
        const avatarId = parseInt(user.avatarUrl.replace('avatar', ''), 10);
        setSelectedAvatar(avatarId || 1);
      }
    }
  }, [user]);

  // Manejar cambio de fecha con formato DD/MM/YYYY
  const handleDateChange = (text: string) => {
    const numbers = text.replace(/[^\d]/g, '');
    let formatted = '';

    if (numbers.length > 0) {
      formatted = numbers.substring(0, 2);
      if (numbers.length >= 3) formatted += '/' + numbers.substring(2, 4);
      if (numbers.length >= 5) formatted += '/' + numbers.substring(4, 8);
    }

    setEditData({ ...editData, birthDate: formatted });
  };

  // Actualizar perfil
  const handleUpdateProfile = async () => {
    if (!currentUser || !user) return;
    if (!editData.firstName.trim() || !editData.lastName.trim() || !editData.email.trim() || !editData.birthDate.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Validar formato de fecha
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(editData.birthDate)) {
      Alert.alert('Error', 'La fecha debe estar en formato DD/MM/YYYY');
      return;
    }

    setLoading(true);

    try {
      // Convertir fecha de DD/MM/YYYY a YYYY-MM-DD para la API
      const [day, month, year] = editData.birthDate.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      // Llamada a la API para actualizar en MySQL
      const response = await userApi.updateProfile(currentUser.uid, {
        first_name: editData.firstName.trim(),
        last_name: editData.lastName.trim(),
        email: editData.email.trim(),
        birth_date: formattedDate,
        avatar_url: `avatar${selectedAvatar}`,
      });

      if (response.success) {
        // Si el email cambió, actualizar en Firebase Auth (requiere re-autenticación)
        if (editData.email !== currentUser.email) {
          // Nota: Esta parte fallará si la sesión es vieja, pero el catch lo maneja.
          await currentUser.updateEmail(editData.email);
        }

        // Actualizar displayName en Firebase
        await currentUser.updateProfile({
          displayName: `${editData.firstName} ${editData.lastName}`,
        });

        // Actualizar contexto para reflejar los cambios
        await refreshUser();
        Alert.alert('Éxito', 'Perfil actualizado correctamente');
        setIsEditModalVisible(false);
      }
    } catch (error: any) {
      console.error('Error al actualizar perfil:', error);
      // Mensaje específico si Firebase requiere login reciente
      if (error.message.includes('requires-recent-login')) {
        Alert.alert(
          'Sesión expirada',
          'Por seguridad, necesitas volver a iniciar sesión para cambiar tu email o contraseña.'
        );
      } else {
        Alert.alert('Error', error.message || 'No se pudo actualizar el perfil');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cambiar contraseña
  const handleChangePassword = async () => {
    if (!currentUser) return;
    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    setLoading(true);

    try {
      // Re-autenticar usuario (necesario para operaciones sensibles como cambio de contraseña)
      const credential = auth.EmailAuthProvider.credential(
        currentUser.email!,
        currentPassword
      );
      await currentUser.reauthenticateWithCredential(credential);

      // Cambiar contraseña
      await currentUser.updatePassword(newPassword);

      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
      setIsPasswordModalVisible(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      console.error('Error al cambiar contraseña:', error);
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'La contraseña actual es incorrecta');
      } else {
        Alert.alert('Error', 'No se pudo cambiar la contraseña. Revisa si tu sesión es reciente.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Seleccionar avatar y cerrar modal
  const handleSelectAvatar = () => {
    // La selección del avatar ya actualiza el estado `selectedAvatar`.
    // La actualización final en la API se hará en `handleUpdateProfile`.
    setIsAvatarModalVisible(false);
  };

  // Eliminar cuenta
  const handleDeleteAccount = () => {
    Alert.alert(
      ' ⚠️  Eliminar Cuenta',
      '¿Estás seguro? Esta acción no se puede deshacer. Se eliminarán todos tus datos y progreso.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              if (!currentUser) return;

              // 1. Eliminar de MySQL (base de datos de tu aplicación)
              await userApi.deleteUser(currentUser.uid);

              // 2. Eliminar de Firebase Auth
              await currentUser.delete();

              Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada. Serás redirigido al login.');
              navigation.navigate('Login' as never); // Navegar al login
            } catch (error) {
              console.error('Error al eliminar cuenta:', error);
              Alert.alert('Error', 'No se pudo eliminar la cuenta. Intenta cerrar sesión y volver a ingresar.');
            }
          },
        },
      ]
    );
  };

  // MODIFICACIÓN 2: Usar el estado de carga global (isUserLoading) para la pantalla de carga.
  // Esto soluciona el bucle infinito de "Cargando..." cuando el usuario no está autenticado o la carga falla.
  if (isUserLoading) {
    return (
      <LinearGradient colors={colors.gradients.background} style={s.container}>
        <Text style={s.loading}>Cargando...</Text>
      </LinearGradient>
    );
  }

  // MODIFICACIÓN 3: Si la carga terminó (isUserLoading es false) y no hay usuario (!user),
  // mostramos el fondo temático (LinearGradient) y un mensaje de error claro, evitando la pantalla blanca.
  if (!user) {
    return (
      <LinearGradient colors={colors.gradients.background} style={s.container}>
        <View style={s.feedbackView}>
          <Icon name="alert-circle-outline" size={50} color={colors.warning} />
          <Text style={s.feedbackText}>
            No se pudo cargar la información del usuario. Por favor, verifica tu conexión o vuelve a iniciar sesión.
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.retryButton}>
            <Text style={s.retryButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  // Renderizado principal del Perfil
  return (
    <LinearGradient colors={colors.gradients.background} style={s.container}>
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false}>
        { /* Header */}
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Icon name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Mi Perfil</Text>
          <View style={{ width: 48 }} /> {/* Espaciador */}
        </View>

        { /* Avatar */}
        <View style={s.avatarSection}>
          <TouchableOpacity onPress={() => setIsAvatarModalVisible(true)} activeOpacity={0.8}>
            <LinearGradient colors={colors.gradients.primary} style={s.avatarBox}>
              {/* Usamos el avatar seleccionado que se guarda en `selectedAvatar` */}
              <Image
                source={AVATARS.find(a => a.id === selectedAvatar)?.source}
                style={s.avatarImage}
              />
              <View style={s.editAvatarBadge}>
                <Icon name="camera" size={16} color={colors.white} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
          <Text style={s.userName}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={s.userEmail}>{user.email}</Text>
        </View>

        { /* Estadísticas */}
        <View style={s.statsCard}>
          <Text style={s.sectionTitle}>Estadísticas</Text>
          <View style={s.statsGrid}>
            <View style={s.statItem}>
              <Icon name="trophy" size={28} color={colors.primary} />
              <Text style={s.statValue}>{user.totalScore || 0}</Text>
              <Text style={s.statLabel}>Puntos</Text>
            </View>
            <View style={s.statItem}>
              <Icon name="game-controller" size={28} color={colors.secondary} />
              <Text style={s.statValue}>{user.gamesPlayed || 0}</Text>
              <Text style={s.statLabel}>Partidas</Text>
            </View>
            <View style={s.statItem}>
              <Icon name="star" size={28} color={colors.warning} />
              <Text style={s.statValue}>{user.bestScore || 0}</Text>
              <Text style={s.statLabel}>Mejor Score</Text>
            </View>
          </View>
        </View>

        { /* Configuración */}
        <View style={s.optionsCard}>
          <Text style={s.sectionTitle}>Configuración</Text>
          <TouchableOpacity
            style={s.option}
            onPress={() => setIsEditModalVisible(true)}
          >
            <View style={s.optionLeft}>
              <Icon name="person-outline" size={24} color={colors.primary} />
              <Text style={s.optionText}>Editar Perfil</Text>
            </View>
            <Icon name="chevron-forward" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={s.option}
            onPress={() => setIsPasswordModalVisible(true)}
          >
            <View style={s.optionLeft}>
              <Icon name="lock-closed-outline" size={24} color={colors.secondary} />
              <Text style={s.optionText}>Cambiar Contraseña</Text>
            </View>
            <Icon name="chevron-forward" size={24} color={colors.textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={s.option} onPress={handleDeleteAccount}>
            <View style={s.optionLeft}>
              <Icon name="trash-outline" size={24} color={colors.error} />
              <Text style={[s.optionText, { color: colors.error }]}>
                Eliminar Cuenta
              </Text>
            </View>
            <Icon name="chevron-forward" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        { /* Información Adicional (No editable) */}
        <View style={s.infoCard}>
          <Text style={s.sectionTitle}>Información</Text>

          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Nombres:</Text>
            <Text style={s.infoValue}>{user.firstName || ''}</Text>
          </View>

          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Apellidos:</Text>
            <Text style={s.infoValue}>{user.lastName || ''}</Text>
          </View>

          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Email:</Text>
            <Text style={s.infoValue}>{user.email || ''}</Text>
          </View>

          <View style={s.infoRow}>
            <Text style={s.infoLabel}>Fecha de nacimiento:</Text>
            <Text style={s.infoValue}>{editData.birthDate || ''}</Text>
          </View>
        </View>

      </ScrollView>

      { /* Modal: Editar Perfil */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <Text style={s.modalTitle}>Editar Perfil</Text>

            <Text style={s.inputLabel}>Nombre</Text>
            <TextInput
              style={s.input}
              value={editData.firstName}
              onChangeText={(text) => setEditData({ ...editData, firstName: text })}
              placeholder="Tu nombre"
              placeholderTextColor={colors.textSecondary}
              editable={!loading}
            />

            <Text style={s.inputLabel}>Apellido</Text>
            <TextInput
              style={s.input}
              value={editData.lastName}
              onChangeText={(text) => setEditData({ ...editData, lastName: text })}
              placeholder="Tu apellido"
              placeholderTextColor={colors.textSecondary}
              editable={!loading}
            />

            <Text style={s.inputLabel}>Email</Text>
            <TextInput
              style={s.input}
              value={editData.email}
              onChangeText={(text) => setEditData({ ...editData, email: text })}
              placeholder="tu@email.com"
              placeholderTextColor={colors.textSecondary}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />

            <Text style={s.inputLabel}>Fecha de Nacimiento</Text>
            <TextInput
              style={s.input}
              value={editData.birthDate}
              onChangeText={handleDateChange}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
              maxLength={10}
              editable={!loading}
            />

            <View style={s.modalButtons}>
              <TouchableOpacity
                style={[s.modalBtn, s.cancelBtn]}
                onPress={() => setIsEditModalVisible(false)}
                disabled={loading}
              >
                <Text style={s.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.modalBtn, s.saveBtn]}
                onPress={handleUpdateProfile}
                disabled={loading}
              >
                <LinearGradient
                  colors={colors.gradients.primary}
                  style={s.saveBtnGradient}
                >
                  <Text style={s.saveBtnText}>
                    {loading ? 'Guardando...' : 'Guardar'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      { /* Modal: Cambiar Contraseña */}
      <Modal
        visible={isPasswordModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPasswordModalVisible(false)}
      >
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <Text style={s.modalTitle}>Cambiar Contraseña</Text>

            <Text style={s.inputLabel}>Contraseña Actual</Text>
            <TextInput
              style={s.input}
              value={passwordData.currentPassword}
              onChangeText={(text) =>
                setPasswordData({ ...passwordData, currentPassword: text })
              }
              placeholder="Tu contraseña actual"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              editable={!loading}
            />

            <Text style={s.inputLabel}>Nueva Contraseña</Text>
            <TextInput
              style={s.input}
              value={passwordData.newPassword}
              onChangeText={(text) =>
                setPasswordData({ ...passwordData, newPassword: text })
              }
              placeholder="Nueva contraseña (min. 6 caracteres)"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              editable={!loading}
            />

            <Text style={s.inputLabel}>Confirmar Nueva Contraseña</Text>
            <TextInput
              style={s.input}
              value={passwordData.confirmPassword}
              onChangeText={(text) =>
                setPasswordData({ ...passwordData, confirmPassword: text })
              }
              placeholder="Repite la nueva contraseña"
              placeholderTextColor={colors.textSecondary}
              secureTextEntry
              editable={!loading}
            />

            <View style={s.modalButtons}>
              <TouchableOpacity
                style={[s.modalBtn, s.cancelBtn]}
                onPress={() => {
                  setIsPasswordModalVisible(false);
                  setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                }}
                disabled={loading}
              >
                <Text style={s.cancelBtnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.modalBtn, s.saveBtn]}
                onPress={handleChangePassword}
                disabled={loading}
              >
                <LinearGradient
                  colors={colors.gradients.primary}
                  style={s.saveBtnGradient}
                >
                  <Text style={s.saveBtnText}>
                    {loading ? 'Cambiando...' : 'Cambiar'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      { /* Modal: Seleccionar Avatar */}
      <Modal
        visible={isAvatarModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsAvatarModalVisible(false)}
      >
        <View style={s.modalOverlay}>
          <View style={s.modalContent}>
            <Text style={s.modalTitle}>Selecciona tu Avatar</Text>

            <View style={s.avatarGrid}>
              {AVATARS.map((avatar) => (
                <TouchableOpacity
                  key={avatar.id}
                  style={[
                    s.avatarOption,
                    selectedAvatar === avatar.id && s.avatarOptionSelected
                  ]}
                  onPress={() => setSelectedAvatar(avatar.id)}
                >
                  <Image source={avatar.source} style={s.avatarOptionImage} />
                  {selectedAvatar === avatar.id && (
                    <View style={s.avatarCheck}>
                      <Icon name="checkmark-circle" size={24} color={colors.primary} />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[s.modalBtn, s.modalFullBtn]}
              onPress={handleSelectAvatar}
            >
              <LinearGradient
                colors={colors.gradients.primary}
                style={s.saveBtnGradient}
              >
                <Text style={s.saveBtnText}>Confirmar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingTop: 40 },
  loading: { color: colors.white, fontSize: 18, textAlign: 'center', marginTop: 100 },

  // Error / Fallback
  feedbackView: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 30 },
  feedbackText: { color: colors.white, fontSize: 16, textAlign: 'center', marginTop: 20, marginBottom: 30 },
  retryButton: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 25 },
  retryButtonText: { color: colors.white, fontSize: 16, fontWeight: 'bold' },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  backBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: colors.white },

  // Avatar
  avatarSection: { alignItems: 'center', marginBottom: 30 },
  avatarBox: { width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 10 },
  avatarImage: { width: 120, height: 120, borderRadius: 60 },
  editAvatarBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.primary, padding: 8, borderRadius: 18, borderWidth: 3, borderColor: colors.background },

  userName: { fontSize: 26, fontWeight: 'bold', color: colors.white, marginBottom: 4 },
  userEmail: { fontSize: 14, color: colors.textSecondary },

  // Cards base
  statsCard: { backgroundColor: colors.backgroundCard, borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: colors.border },
  optionsCard: { backgroundColor: colors.backgroundCard, borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: colors.border },
  infoCard: { backgroundColor: colors.backgroundCard, borderRadius: 20, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: colors.border },

  // Section titles
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.white, marginBottom: 16 },

  // Stats
  statsGrid: { flexDirection: 'row', justifyContent: 'space-around' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: 'bold', color: colors.white, marginTop: 8 },
  statLabel: { fontSize: 11, color: colors.textSecondary, marginTop: 4 },

  // Options
  option: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  optionText: { fontSize: 16, color: colors.white },

  // Info
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  infoLabel: { fontSize: 14, color: colors.textSecondary },
  infoValue: { fontSize: 14, color: colors.white, fontWeight: '600' },

  // Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.backgroundCard, padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, maxHeight: '80%', borderWidth: 1, borderColor: colors.border },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: colors.white, marginBottom: 20, textAlign: 'center' },
  inputLabel: { fontSize: 14, color: colors.textSecondary, marginBottom: 8, marginTop: 12 },
  input: { backgroundColor: colors.background, borderRadius: 12, padding: 14, fontSize: 16, color: colors.white, borderWidth: 1, borderColor: colors.border },
  modalButtons: { flexDirection: 'row', gap: 12, marginTop: 24 },
  modalBtn: { flex: 1 },
  modalFullBtn: { flex: 0, alignSelf: 'stretch', marginTop: 8 },
  cancelBtn: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  cancelBtnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  saveBtn: { borderRadius: 12, overflow: 'hidden' },
  saveBtnGradient: { padding: 14, alignItems: 'center', justifyContent: 'center' },
  saveBtnText: { color: colors.white, fontSize: 16, fontWeight: '600' },

  // Avatar selector grid
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', gap: 16, marginBottom: 20 },
  avatarOption: { width: 80, height: 80, borderRadius: 40, borderWidth: 3, borderColor: 'transparent', overflow: 'hidden', backgroundColor: colors.background },
  avatarOptionSelected: { borderColor: colors.primary },
  avatarOptionImage: { width: '100%', height: '100%' },
  avatarCheck: { position: 'absolute', top: -5, right: -5, backgroundColor: colors.white, borderRadius: 15 },
});
