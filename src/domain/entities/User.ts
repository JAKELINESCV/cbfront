/**
 * ENTIDAD: Usuario
 */
export interface User {
  id: string;                 
  email: string;              
  firstName: string;          
  lastName: string;           
  birthDate: string;          
  avatarUrl?: string;         // Foto de perfil (opcional)
  totalScore: number;         // Puntuación total acumulada
  gamesPlayed: number;        // Total de partidas jugadas
  bestScore: number;          // Mejor puntuación en una partida
  currentStreak: number;      // Racha actual de respuestas correctas
  createdAt: Date;            // Fecha de registro
  updatedAt: Date;            // Última actualización
}