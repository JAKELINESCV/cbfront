import { Question } from '../../../domain/entities/Question';

export const advancedQuestions: Question[] = [
  {
    id: 'adv_001',
    question: '¿Qué es el Virtual DOM en React?',
    options: [
      'Una copia del DOM real en memoria',
      'Una base de datos virtual',
      'Un tipo de servidor',
      'Un lenguaje de programación'
    ],
    correctAnswer: 0,
    level: 'advanced',
    category: 'React',
    points: 20,
    timeLimit: 25,
    explanation: 'El Virtual DOM es una representación ligera del DOM en memoria que React usa para optimizar actualizaciones mediante diffing.'
  },

  {
    id: 'adv_002',
    question: '¿Qué patrón de diseño implementa Redux?',
    options: [
      'Factory',
      'Flux',
      'Singleton',
      'Observer'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Arquitectura',
    points: 20,
    timeLimit: 25,
    explanation: 'Redux implementa el patrón Flux, con un store centralizado y flujo de datos unidireccional.'
  },

  {
    id: 'adv_003',
    question: '¿Qué es memoization?',
    options: [
      'Recordar contraseñas',
      'Técnica de optimización que almacena resultados de funciones costosas',
      'Un tipo de memoria RAM',
      'Una base de datos en memoria'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Optimización',
    points: 20,
    timeLimit: 25,
    explanation: 'Memoization es cachear resultados de funciones para evitar cálculos repetidos con los mismos argumentos.'
  },

  {
    id: 'adv_004',
    question: '¿Qué es un "race condition"?',
    options: [
      'Una carrera de coches',
      'Cuando múltiples hilos acceden a datos compartidos simultáneamente',
      'Un tipo de algoritmo',
      'Un método de ordenamiento'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Concurrencia',
    points: 20,
    timeLimit: 25,
    explanation: 'Race condition ocurre cuando el comportamiento del programa depende del orden de ejecución de hilos/procesos concurrentes.'
  },

  {
    id: 'adv_005',
    question: '¿Qué es el "Big O notation"?',
    options: [
      'Una notación musical',
      'Forma de describir la complejidad algorítmica',
      'Un tipo de variable',
      'Un operador matemático'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Algoritmos',
    points: 20,
    timeLimit: 25,
    explanation: 'Big O describe la complejidad temporal o espacial de un algoritmo en el peor caso (ej: O(n), O(log n)).'
  },

  {
    id: 'adv_006',
    question: '¿Qué es "lazy loading"?',
    options: [
      'Cargar perezosamente',
      'Técnica de cargar recursos solo cuando son necesarios',
      'Un tipo de bucle lento',
      'Una librería de JavaScript'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Optimización',
    points: 20,
    timeLimit: 25,
    explanation: 'Lazy loading es diferir la carga de recursos no críticos hasta que sean necesarios, mejorando performance inicial.'
  },

  {
    id: 'adv_007',
    question: '¿Qué es el "tree shaking"?',
    options: [
      'Sacudir árboles',
      'Eliminar código no utilizado del bundle final',
      'Un algoritmo de búsqueda',
      'Un tipo de estructura de datos'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Optimización',
    points: 20,
    timeLimit: 25,
    explanation: 'Tree shaking es el proceso de eliminar código JavaScript no utilizado durante el build, reduciendo el tamaño del bundle.'
  },

  {
    id: 'adv_008',
    question: '¿Qué es un "memory leak"?',
    options: [
      'Una fuga de agua',
      'Cuando un programa no libera memoria que ya no necesita',
      'Un tipo de error de sintaxis',
      'Un virus informático'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Performance',
    points: 20,
    timeLimit: 25,
    explanation: 'Memory leak ocurre cuando un programa reserva memoria pero no la libera, causando consumo creciente de RAM.'
  },

  {
    id: 'adv_009',
    question: '¿Qué es "debouncing"?',
    options: [
      'Un efecto de rebote',
      'Técnica para limitar la frecuencia de ejecución de una función',
      'Un tipo de animación',
      'Un método de validación'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Optimización',
    points: 20,
    timeLimit: 25,
    explanation: 'Debouncing retrasa la ejecución de una función hasta que pase cierto tiempo sin que se invoque, útil en búsquedas.'
  },

  {
    id: 'adv_010',
    question: '¿Qué es el patrón "Singleton"?',
    options: [
      'Una persona soltera',
      'Patrón que asegura que una clase tenga solo una instancia',
      'Un tipo de array',
      'Una función especial'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Patrones de Diseño',
    points: 20,
    timeLimit: 25,
    explanation: 'Singleton garantiza que una clase tenga una única instancia y proporciona un punto de acceso global a ella.'
  },

  {
    id: 'adv_011',
    question: '¿Qué es "immutability" en programación funcional?',
    options: [
      'Datos que nunca cambian',
      'Variables constantes',
      'Funciones puras',
      'Un tipo de error'
    ],
    correctAnswer: 0,
    level: 'advanced',
    category: 'Paradigmas',
    points: 20,
    timeLimit: 25,
    explanation: 'Immutability significa que los datos no pueden modificarse después de crearse; cualquier "cambio" crea una nueva copia.'
  },

  {
    id: 'adv_012',
    question: '¿Qué es el "currying"?',
    options: [
      'Una técnica de cocina',
      'Transformar función de múltiples args en secuencia de funciones',
      'Un tipo de bucle',
      'Un método de array'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Programación Funcional',
    points: 20,
    timeLimit: 25,
    explanation: 'Currying transforma f(a, b, c) en f(a)(b)(c), permitiendo aplicación parcial de argumentos.'
  },

  {
    id: 'adv_013',
    question: '¿Qué es "SOLID" en programación?',
    options: [
      'Un estado de la materia',
      'Cinco principios de diseño orientado a objetos',
      'Un framework',
      'Un lenguaje de programación'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Arquitectura',
    points: 20,
    timeLimit: 25,
    explanation: 'SOLID son 5 principios (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion).'
  },

  {
    id: 'adv_014',
    question: '¿Qué es el "CAP theorem" en bases de datos distribuidas?',
    options: [
      'Un sombrero',
      'Solo puedes garantizar 2 de 3: Consistency, Availability, Partition tolerance',
      'Un tipo de base de datos',
      'Un algoritmo de encriptación'
    ],
    correctAnswer: 1,
    level: 'advanced',
    category: 'Bases de Datos',
    points: 20,
    timeLimit: 25,
    explanation: 'CAP theorem establece que en sistemas distribuidos solo puedes garantizar 2 de 3 propiedades simultáneamente.'
  },

  {
    id: 'adv_015',
    question: '¿Qué es "middleware" en desarrollo web?',
    options: [
      'Software intermedio entre el OS y aplicaciones',
      'Un tipo de base de datos',
      'Una función que procesa requests antes de llegar al handler',
      'Un framework'
    ],
    correctAnswer: 2,
    level: 'advanced',
    category: 'Backend',
    points: 20,
    timeLimit: 25,
    explanation: 'En desarrollo web, middleware son funciones que procesan requests/responses en el pipeline antes del handler final.'
  },
];

/**
 * Función auxiliar para obtener preguntas aleatorias del nivel avanzado
 */
export function getRandomAdvancedQuestions(count: number = 10): Question[] {
  const shuffled = [...advancedQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}