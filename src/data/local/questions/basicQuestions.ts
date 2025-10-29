import { Question } from "../../../domain/entities/Question";

export const basicQuestions: Question[] = [
  {
    id: 'basic_001',
    question: '¿Qué es una variable en programación?',
    options: [
      'Un espacio en memoria para almacenar datos',
      'Una función matemática',
      'Un tipo de bucle',
      'Un operador lógico'
    ],
    correctAnswer: 0,
    level: 'basic',
    category: 'Fundamentos',
    points: 10,
    timeLimit: 15,
    explanation: 'Una variable es un espacio reservado en la memoria para almacenar un dato que puede cambiar durante la ejecución del programa.'
  },
  
  {
    id: 'basic_002',
    question: '¿Cuál de estos NO es un tipo de dato primitivo en JavaScript?',
    options: [
      'string',
      'number',
      'array',
      'boolean'
    ],
    correctAnswer: 2,
    level: 'basic',
    category: 'JavaScript',
    points: 10,
    timeLimit: 15,
    explanation: 'Array es un tipo de objeto, no un tipo primitivo. Los tipos primitivos son: string, number, boolean, null, undefined, symbol y bigint.'
  },
  
  {
    id: 'basic_003',
    question: '¿Qué símbolo se usa para comentar una línea en JavaScript?',
    options: [
      '/* */',
      '//',
      '#',
      '--'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'JavaScript',
    points: 10,
    timeLimit: 15,
    explanation: '// se usa para comentarios de una línea, mientras que /* */ se usa para comentarios multilínea.'
  },
  
  {
    id: 'basic_004',
    question: '¿Qué hace la función console.log()?',
    options: [
      'Borra datos de la consola',
      'Muestra información en la consola',
      'Guarda datos en un archivo',
      'Crea una variable'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'JavaScript',
    points: 10,
    timeLimit: 15,
    explanation: 'console.log() imprime mensajes en la consola del navegador o terminal, útil para debugging.'
  },
  
  {
    id: 'basic_005',
    question: '¿Qué es un bucle "for"?',
    options: [
      'Una función que se ejecuta una sola vez',
      'Una estructura que repite código varias veces',
      'Una forma de declarar variables',
      'Un tipo de dato'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'Estructuras de Control',
    points: 10,
    timeLimit: 15,
    explanation: 'Un bucle for permite ejecutar un bloque de código múltiples veces, ideal para iterar sobre arrays o repetir acciones.'
  },
  
  {
    id: 'basic_006',
    question: '¿Cuál es el operador de igualdad estricta en JavaScript?',
    options: [
      '=',
      '==',
      '===',
      '!='
    ],
    correctAnswer: 2,
    level: 'basic',
    category: 'JavaScript',
    points: 10,
    timeLimit: 15,
    explanation: '=== compara valor y tipo de dato, mientras que == solo compara valor (con conversión de tipos).'
  },
  
  {
    id: 'basic_007',
    question: '¿Qué hace la palabra clave "const" en JavaScript?',
    options: [
      'Declara una variable que no se puede reasignar',
      'Crea una función constante',
      'Define un número constante',
      'Elimina una variable'
    ],
    correctAnswer: 0,
    level: 'basic',
    category: 'JavaScript',
    points: 10,
    timeLimit: 15,
    explanation: 'const declara una variable cuya referencia no puede cambiar, pero el contenido de objetos/arrays sí puede modificarse.'
  },
  
  {
    id: 'basic_008',
    question: '¿Qué es HTML?',
    options: [
      'Un lenguaje de programación',
      'Un lenguaje de marcado',
      'Una base de datos',
      'Un framework de JavaScript'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'Web',
    points: 10,
    timeLimit: 15,
    explanation: 'HTML (HyperText Markup Language) es un lenguaje de marcado usado para estructurar el contenido web.'
  },
  
  {
    id: 'basic_009',
    question: '¿Qué tipo de dato devuelve typeof "hola"?',
    options: [
      'text',
      'string',
      'char',
      'varchar'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'JavaScript',
    points: 10,
    timeLimit: 15,
    explanation: 'typeof devuelve el tipo de dato. Para cadenas de texto, devuelve "string".'
  },
  
  {
    id: 'basic_010',
    question: '¿Cuál es la forma correcta de declarar una función en JavaScript?',
    options: [
      'function: miFuncion() {}',
      'function miFuncion() {}',
      'func miFuncion() {}',
      'def miFuncion() {}'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'JavaScript',
    points: 10,
    timeLimit: 15,
    explanation: 'La sintaxis correcta es: function nombreFuncion() { código }'
  },
  
  {
    id: 'basic_011',
    question: '¿Qué es CSS?',
    options: [
      'Un lenguaje de programación',
      'Un lenguaje de estilos',
      'Una base de datos',
      'Un servidor web'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'Web',
    points: 10,
    timeLimit: 15,
    explanation: 'CSS (Cascading Style Sheets) se usa para dar estilo y diseño a páginas web.'
  },
  
  {
    id: 'basic_012',
    question: '¿Qué hace el operador + con dos strings?',
    options: [
      'Los suma matemáticamente',
      'Los concatena (une)',
      'Da un error',
      'Los multiplica'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'JavaScript',
    points: 10,
    timeLimit: 15,
    explanation: 'El operador + con strings realiza concatenación: "Hola" + "Mundo" = "HolaMundo"'
  },
  
  {
    id: 'basic_013',
    question: '¿Qué es un array?',
    options: [
      'Una función especial',
      'Una colección ordenada de elementos',
      'Un tipo de bucle',
      'Un operador matemático'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'Estructuras de Datos',
    points: 10,
    timeLimit: 15,
    explanation: 'Un array es una estructura que almacena múltiples valores en una sola variable, accesibles por índice.'
  },
  
  {
    id: 'basic_014',
    question: '¿Cuál es el índice del primer elemento de un array?',
    options: [
      '1',
      '0',
      '-1',
      'Depende del lenguaje'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'Estructuras de Datos',
    points: 10,
    timeLimit: 15,
    explanation: 'En la mayoría de lenguajes (JavaScript, Python, Java, etc.) los arrays empiezan en el índice 0.'
  },
  
  {
    id: 'basic_015',
    question: '¿Qué es Git?',
    options: [
      'Un lenguaje de programación',
      'Un sistema de control de versiones',
      'Una base de datos',
      'Un framework web'
    ],
    correctAnswer: 1,
    level: 'basic',
    category: 'Herramientas',
    points: 10,
    timeLimit: 15,
    explanation: 'Git es un sistema de control de versiones que permite rastrear cambios en el código y colaborar en equipo.'
  },
];

/**
 * Función auxiliar para obtener preguntas aleatorias del nivel intermedio
 */
export function getRandomBasicQuestions(count: number = 10): Question[] {
  const shuffled = [...basicQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}