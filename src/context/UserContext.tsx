import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import auth from '@react-native-firebase/auth';
import { User } from '../domain/entities/User';
import { userApi } from '../services/api';

interface UserContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  updateUserData: (data: Partial<User>) => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const normalizeUser = (rawUser: any): User => {
    let avatarUrl = rawUser.avatar_url || rawUser.avatar || rawUser.avatarUrl || 'avatar1';

    if (!avatarUrl.startsWith('avatar')) {
      avatarUrl = 'avatar1';
    }

    return {
      ...rawUser,
      firstName: rawUser.firstName || rawUser.first_name || '',
      lastName: rawUser.lastName || rawUser.last_name || '',
      totalScore: rawUser.totalScore ?? rawUser.total_score ?? 0,
      gamesPlayed: rawUser.gamesPlayed ?? rawUser.games_played ?? 0,
      bestScore: rawUser.bestScore ?? rawUser.best_score ?? 0,
      birthDate: rawUser.birthDate || rawUser.birth_date || '',
      avatarUrl: avatarUrl,
    };
  };

  // ================================
  //  CARGA INICIAL DE USUARIO
  // ================================
  useEffect(() => {
    const loadUserData = async () => {
      const firebaseUser = auth().currentUser;

      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      try {
        const response = await userApi.getProfile(firebaseUser.uid);
        console.log('🔍 API User Data:', response.user);

        if (response.success) {
          setUser(normalizeUser(response.user));
        }
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // ============================================
  //  LISTENER QUE ACTUALIZA AL CAMBIAR AUTENTICACIÓN
  // ============================================
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const response = await userApi.getProfile(firebaseUser.uid);

          if (response.success) {
            setUser(normalizeUser(response.user));
          }
        } catch (error) {
          console.error('Error al cargar usuario:', error);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ============================================
  //  REFRESCA EL USUARIO (LLAMAR DESDE EL GAME)
  // ============================================
  const refreshUser = async () => {
    const firebaseUser = auth().currentUser;
    if (!firebaseUser) return;

    try {
      const response = await userApi.getProfile(firebaseUser.uid);
      console.log('🔄 Refrescando usuario:', response.user);

      if (response.success) {
        setUser(normalizeUser(response.user));
      }
    } catch (error) {
      console.error('Error al refrescar usuario:', error);
    }
  };

  // ============================================
  //  ACTUALIZA LOCALMENTE SIN ROMPER NADA
  // ============================================
  const updateUserData = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }

    // ACTUALIZA INMEDIATAMENTE SIN ESPERAR GAME O RELOAD
    refreshUser();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        updateUserData,
        isAuthenticated: !!auth().currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de UserProvider');
  }
  return context;
};
