import { Question, QuestionLevel } from "./Question";

/**
 * ENTIDAD: Partida
 */
export interface Game {
  id: string;                 // ID único de la partida
  userId: string;             // ID del jugador
  level: QuestionLevel;       // Nivel seleccionado
  questions: Question[];      // Preguntas de esta partida (10-15)
  currentQuestionIndex: number; // Índice de la pregunta actual
  score: number;              // Puntuación acumulada en esta partida
  streak: number;             // Racha actual de respuestas correctas
  maxStreak: number;          // Racha máxima alcanzada en esta partida
  answers: Answer[];          // Respuestas del jugador
  startedAt: Date;            // Hora de inicio
  finishedAt?: Date;          // Hora de finalización (null si está en curso)
  status: GameStatus;         // Estado actual del juego
}

/**
 * Estados posibles de una partida
 */
export type GameStatus = 'playing' | 'finished' | 'abandoned';

/**
 * Respuesta del jugador a una pregunta
 */
export interface Answer {
  questionId: string;         // ID de la pregunta respondida
  selectedOption: number;     // Opción seleccionada por el jugador (0-3)
  isCorrect: boolean;         // Si la respuesta fue correcta
  timeSpent: number;          // Tiempo que tardó en responder (segundos)
  pointsEarned: number;       // Puntos ganados en esta pregunta
}