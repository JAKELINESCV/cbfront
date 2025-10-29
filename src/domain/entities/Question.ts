/**
 * ENTIDAD: Pregunta
 */
export interface Question {
  id: string;                 // ID único de la pregunta
  question: string;           // Texto de la pregunta
  options: string[];          // Array de 4 opciones de respuesta
  correctAnswer: number;      // Índice de la respuesta correcta (0-3)
  level: QuestionLevel;       // Nivel de dificultad
  category: string;           // Categoría (ej: "JavaScript", "Python", "Algoritmos")
  points: number;             // Puntos base que otorga (10, 15, 20)
  timeLimit: number;          // Tiempo límite en segundos (15-30)
  explanation?: string;       // Explicación de la respuesta (opcional)
}

export type QuestionLevel = 'basic' | 'intermediate' | 'advanced';
