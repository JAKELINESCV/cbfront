import auth from '@react-native-firebase/auth';
import { userApi } from '../../../services/api';

interface RegisterData {
  firstName: string;
  lastName: string;
  birthDate: string; 
  email: string;
  password: string;
}

export class RegisterUseCase {
  async execute(data: RegisterData) {
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await auth().createUserWithEmailAndPassword(
        data.email.toLowerCase().trim(),
        data.password
      );

      // 2. Actualizar displayName en Firebase
      await userCredential.user.updateProfile({
        displayName: `${data.firstName} ${data.lastName}`,
      });

      // 3. Guardar datos completos en MySQL
      const response = await userApi.syncUser({
        firebase_uid: userCredential.user.uid,
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        email: data.email.toLowerCase().trim(),
        birth_date: data.birthDate, 
      });

      if (!response.success) {
        throw new Error('Error al guardar datos en el servidor');
      }

      return {
        success: true,
        user: response.user,
        firebaseUser: userCredential.user,
      };
    } catch (error: any) {
      console.error('Error en RegisterUseCase:', error);

      if (error.message.includes('servidor') && auth().currentUser) {
        await auth().currentUser?.delete();
      }

      throw error;
    }
  }
}