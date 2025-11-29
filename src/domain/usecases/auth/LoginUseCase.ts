import auth from '@react-native-firebase/auth';
import { userApi } from '../../../services/api';

interface LoginData {
  email: string;
  password: string;
}

export class LoginUseCase {
  async execute(data: LoginData) {
    try {
      // 1. Autenticar con Firebase
      const userCredential = await auth().signInWithEmailAndPassword(
        data.email.toLowerCase().trim(),
        data.password
      );

      // 2. Obtener datos completos desde MySQL
      const response = await userApi.getProfile(userCredential.user.uid);

      if (!response.success) {
        throw new Error('No se pudieron cargar los datos del usuario');
      }

      return {
        success: true,
        user: response.user,
        firebaseUser: userCredential.user,
      };
    } catch (error: any) {
      console.error('Error en LoginUseCase:', error);
      throw error;
    }
  }
}