import axios from 'axios';

const API_URL = 'http://192.168.1.40:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const userApi = {
  syncUser: async (data: SyncUserData) => {
    try {
      const response = await api.post('/users/sync', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al sincronizar usuario');
    }
  },

  getProfile: async (firebaseUid: string) => {
    try {
      const response = await api.get(`/users/${firebaseUid}`);
      console.log("📡 RESPUESTA DEL BACKEND:", response.data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener perfil');
    }
  },

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

  updateStats: async (firebaseUid: string, data: UpdateStatsData) => {
    console.log("📤 Enviando estadísticas:", data);
    try {
      const response = await api.patch(`/users/${firebaseUid}/stats`, data);
      console.log("📥 Respuesta UPDATE STATS:", response.data);
      
      if (response.data?.stats) {
        return response.data.stats;
      }
      
      if (
        response.data?.totalScore !== undefined ||
        response.data?.gamesPlayed !== undefined ||
        response.data?.bestScore !== undefined
      ) {
        return response.data;
      }
      
      return {
        totalScore: data.score,
        gamesPlayed: 1,
        bestScore: data.is_best_score ? data.score : 0,
      };
    } catch (error: any) {
      console.error("❌ Error en updateStats:", error.response?.data);
      throw new Error(error.response?.data?.message || 'Error al actualizar estadísticas');
    }
  },

  deleteUser: async (firebaseUid: string) => {
    try {
      const response = await api.delete(`/users/${firebaseUid}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al eliminar usuario');
    }
  },

  getRanking: async (limit: number = 10) => {
    try {
      const response = await api.get(`/users/ranking/top?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error al obtener ranking');
    }
  },
};

interface FinishGameData {
  difficulty: string;
  totalScore: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeTaken: number;
}

interface GameStats {
  totalScore: number;
  gamesPlayed: number;
  bestScore: number;
}

export const gameApi = {
  finishGame: async (firebaseUid: string, data: FinishGameData): Promise<GameStats> => {
    try {
      console.log('🎮 Enviando partida al backend:', { firebaseUid, data });
      const response = await api.post(`/games/${firebaseUid}/finish`, data);
      console.log('📥 Respuesta del backend:', response.data);
      
      if (response.data.success) {
        return {
          totalScore: response.data.totalScore,
          gamesPlayed: response.data.gamesPlayed,
          bestScore: response.data.bestScore,
        };
      }
      throw new Error('No se pudo finalizar la partida');
    } catch (error: any) {
      console.error('❌ Error en gameApi.finishGame:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Error al finalizar partida');
    }
  },

  getRanking: async (limit: number = 10) => {
    try {
      const response = await api.get(`/users/ranking/top?limit=${limit}`);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error en gameApi.getRanking:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Error al obtener ranking');
    }
  },

  getHistory: async (firebaseUid: string) => {
    try {
      const response = await api.get(`/games/${firebaseUid}/history`);
      return response.data;
    } catch (error: any) {
      console.error('❌ Error en gameApi.getHistory:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Error al obtener historial de partidas');
    }
  },
};

export default api;