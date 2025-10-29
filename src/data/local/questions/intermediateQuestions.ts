import { Question } from '../../../domain/entities/Question';

export const intermediateQuestions: Question[] = [
  {
    id: 'inter_001',
    question: '¿Qué es el hoisting en JavaScript?',
    options: [
      'Elevación de declaraciones al inicio del scope',
      'Un tipo de bucle',
      'Una función de orden superior',
      'Un método de array'
    ],
    correctAnswer: 0,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'Hoisting es el comportamiento de JavaScript de mover declaraciones (var, function) al inicio de su scope durante la compilación.'
  },

  {
    id: 'inter_002',
    question: '¿Cuál es la diferencia entre "let" y "var"?',
    options: [
      'No hay diferencia',
      'let tiene scope de bloque, var tiene scope de función',
      'var es más moderno',
      'let solo funciona en navegadores'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'let tiene scope de bloque (limitado por {}), mientras que var tiene scope de función y sufre hoisting.'
  },

  {
    id: 'inter_003',
    question: '¿Qué es una closure en JavaScript?',
    options: [
      'Una función que cierra el navegador',
      'Una función que recuerda el scope donde fue creada',
      'Un tipo de clase',
      'Un método de objeto'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'Una closure es una función que tiene acceso a variables de su scope exterior, incluso después de que esa función exterior haya terminado.'
  },

  {
    id: 'inter_004',
    question: '¿Qué devuelve typeof null en JavaScript?',
    options: [
      '"null"',
      '"undefined"',
      '"object"',
      '"error"'
    ],
    correctAnswer: 2,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'Es un bug histórico de JavaScript. typeof null devuelve "object" aunque null es un tipo primitivo.'
  },

  {
    id: 'inter_005',
    question: '¿Qué es el "event loop" en JavaScript?',
    options: [
      'Un bucle infinito',
      'El mecanismo que gestiona código asíncrono',
      'Un tipo de evento del DOM',
      'Una librería externa'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'El event loop es el mecanismo que permite a JavaScript ejecutar código asíncrono de manera no bloqueante.'
  },

  {
    id: 'inter_006',
    question: '¿Qué es la destructuración en JavaScript?',
    options: [
      'Eliminar variables',
      'Extraer valores de arrays/objetos en variables distintas',
      'Romper el código',
      'Un tipo de error'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'La destructuración permite extraer valores de arrays u objetos y asignarlos a variables: const {name, age} = user;'
  },

  {
    id: 'inter_007',
    question: '¿Qué hace el método map() en un array?',
    options: [
      'Crea un mapa geográfico',
      'Transforma cada elemento y devuelve un nuevo array',
      'Elimina elementos',
      'Ordena el array'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'map() itera sobre un array, aplica una función a cada elemento y retorna un nuevo array con los resultados.'
  },

  {
    id: 'inter_008',
    question: '¿Qué es async/await?',
    options: [
      'Una forma de manejar promesas de manera síncrona',
      'Un tipo de función',
      'Una librería de JavaScript',
      'Un operador matemático'
    ],
    correctAnswer: 0,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'async/await es sintaxis que permite escribir código asíncrono de forma más legible, similar al código síncrono.'
  },

  {
    id: 'inter_009',
    question: '¿Qué es REST API?',
    options: [
      'Una API para descansar',
      'Una arquitectura de servicios web basada en HTTP',
      'Un lenguaje de programación',
      'Un tipo de base de datos'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'Backend',
    points: 15,
    timeLimit: 20,
    explanation: 'REST (Representational State Transfer) es un estilo arquitectónico para diseñar servicios web usando métodos HTTP estándar.'
  },

  {
    id: 'inter_010',
    question: '¿Qué es JSON?',
    options: [
      'Un lenguaje de programación',
      'Un formato de intercambio de datos',
      'Una base de datos',
      'Un framework'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'Fundamentos',
    points: 15,
    timeLimit: 20,
    explanation: 'JSON (JavaScript Object Notation) es un formato ligero de intercambio de datos, fácil de leer y escribir.'
  },

  {
    id: 'inter_011',
    question: '¿Qué hace el método filter() en un array?',
    options: [
      'Filtra agua',
      'Crea un nuevo array con elementos que cumplan una condición',
      'Ordena elementos',
      'Elimina todos los elementos'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'filter() crea un nuevo array con todos los elementos que pasen la prueba implementada por la función proporcionada.'
  },

  {
    id: 'inter_012',
    question: '¿Qué es un callback en programación?',
    options: [
      'Una llamada telefónica',
      'Una función pasada como argumento a otra función',
      'Un tipo de variable',
      'Un error de código'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'Fundamentos',
    points: 15,
    timeLimit: 20,
    explanation: 'Un callback es una función que se pasa como argumento a otra función y se ejecuta después de que termine alguna operación.'
  },

  {
    id: 'inter_013',
    question: '¿Qué significa OOP?',
    options: [
      'Object Oriented Programming',
      'Only One Person',
      'Open Operating Protocol',
      'Original Output Program'
    ],
    correctAnswer: 0,
    level: 'intermediate',
    category: 'Paradigmas',
    points: 15,
    timeLimit: 20,
    explanation: 'OOP (Programación Orientada a Objetos) es un paradigma que organiza código en objetos que contienen datos y métodos.'
  },

  {
    id: 'inter_014',
    question: '¿Qué es el spread operator (...) en JavaScript?',
    options: [
      'Un operador para dividir',
      'Expande elementos de un array u objeto',
      'Un tipo de bucle',
      'Un método de string'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'El spread operator (...) expande elementos de un iterable (array, string, objeto) en lugares donde se esperan múltiples elementos.'
  },

  {
    id: 'inter_015',
    question: '¿Qué es una Promise en JavaScript?',
    options: [
      'Una promesa personal',
      'Un objeto que representa la eventual finalización de una operación asíncrona',
      'Un tipo de variable',
      'Una función síncrona'
    ],
    correctAnswer: 1,
    level: 'intermediate',
    category: 'JavaScript',
    points: 15,
    timeLimit: 20,
    explanation: 'Una Promise es un objeto que representa el resultado eventual de una operación asíncrona (pendiente, resuelta o rechazada).'
  },
];

/**
 * Función auxiliar para obtener preguntas aleatorias del nivel intermedio
 */
export function getRandomIntermediateQuestions(count: number = 10): Question[] {
  const shuffled = [...intermediateQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}