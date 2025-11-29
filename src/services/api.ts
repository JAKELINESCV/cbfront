import axios from 'axios';

// Configurar la URL base de tu API
const API_URL = 'http://192.168.1.40:3000/api'; // Cambiar por tu IP o dominio

// Para desarrollo en dispositivo físico, usa tu IP local:
// const API_URL = 'http:// 192.168.1.40:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interfaces
interface SyncUserData {
  firebase_uid: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
}

interface UpdateProfileData {
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  avatar_url?: string;
}

interface UpdateStatsData {
  score: number;
  is_best_score?: boolean;
}

// API de Usuarios
export const userApi = {
  // Sincronizar/crear usuario al registrarse
  syncUser: async (data: SyncUserData) => {
    try {
      const response = await api.post('/users/sync', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al sincronizar usuario');
    }
  },

  // Obtener perfil del usuario
  getProfile: async (firebaseUid: string) => {
    try {
      const response = await api.get(`/users/${firebaseUid}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener perfil');
    }
  },

  // Actualizar datos del perfil
  updateProfile: async (firebaseUid: string, data: UpdateProfileData) => {
    console.log('📡 API updateProfile llamado');
    console.log('🆔 firebaseUid:', firebaseUid);
    console.log('📦 data:', data);
    
    try {
      const response = await api.put(`/users/${firebaseUid}`, data);
      console.log('✅ Respuesta exitosa:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error en API updateProfile:', error);
      console.error('❌ Error response:', error.response?.data);
      console.error('❌ Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || 'Error al actualizar perfil');
    }
  },

  
  // Actualizar estadísticas después de un juego
  updateStats: async (firebaseUid: string, data: UpdateStatsData) => {
    try {
      const response = await api.patch(`/users/${firebaseUid}/stats`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al actualizar estadísticas');
    }
  },

  // Eliminar cuenta
  deleteUser: async (firebaseUid: string) => {
    try {
      const response = await api.delete(`/users/${firebaseUid}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al eliminar usuario');
    }
  },

  // Obtener ranking de usuarios
  getRanking: async (limit: number = 10) => {
    try {
      const response = await api.get(`/users/ranking/top?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener ranking');
    }
  },
};

export default api;


