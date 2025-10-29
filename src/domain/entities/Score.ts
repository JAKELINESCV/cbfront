import { QuestionLevel } from "./Question";

/**
 * ENTIDAD: Puntuación
 */
export interface Score {
  id: string;                 // ID único del score
  userId: string;             // ID del jugador
  gameId: string;             // ID de la partida
  level: QuestionLevel;       // Nivel jugado
  finalScore: number;         // Puntuación final
  correctAnswers: number;     // Total de respuestas correctas
  totalQuestions: number;     // Total de preguntas
  maxStreak: number;          // Racha máxima alcanzada
  totalTime: number;          // Tiempo total de juego (segundos)
  averageTimePerQuestion: number; // Tiempo promedio por pregunta
  createdAt: Date;            // Fecha de la partida
}

/**
 * Estadísticas generales del jugador
 */
export interface PlayerStats {
  totalGames: number;         // Total de partidas jugadas
  totalScore: number;         // Puntuación acumulada
  bestScore: number;          // Mejor puntuación
  averageScore: number;       // Puntuación promedio
  correctAnswersRate: number; // Porcentaje de aciertos (0-100)
  favoriteLevel: QuestionLevel; // Nivel más jugado
  totalPlayTime: number;      // Tiempo total jugado (minutos)
}