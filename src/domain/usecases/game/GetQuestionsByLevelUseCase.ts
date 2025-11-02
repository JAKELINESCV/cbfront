export const getQuestionsByLevelUseCase = async (difficulty: string, level: string) => {
  const questionsMap: Record<string, Record<string, any[]>> = {
    basic: {
      '1': [
        { question: '¿Qué es HTML?', options: ['Lenguaje de marcas', 'Lenguaje de programación', 'Framework', 'API'], answer: 0 },
        { question: '¿Qué significa CSS?', options: ['Hoja de estilo', 'Lenguaje', 'Servidor', 'Framework'], answer: 0 },
      ],
      '2': [
        { question: '¿Qué etiqueta se usa para enlaces en HTML?', options: ['<a>', '<div>', '<p>', '<span>'], answer: 0 },
        { question: '¿Qué propiedad de CSS cambia el color?', options: ['color', 'background', 'font', 'border'], answer: 0 },
      ],
      '3': [
        { question: '¿Qué es un atributo alt en HTML?', options: ['Texto alternativo', 'Estilo', 'Link', 'ID'], answer: 0 },
        { question: '¿Qué hace display:flex?', options: ['Organiza elementos', 'Cambia color', 'Agrega animación', 'Ninguna'], answer: 0 },
      ],
    },
    intermediate: {
      '1': [
        { question: '¿Qué hook de React Native sirve para estado?', options: ['useState', 'useEffect', 'useContext', 'useMemo'], answer: 0 },
        { question: '¿Qué hace Flexbox en RN?', options: ['Diseño flexible', 'Animaciones', 'Routing', 'Base de datos'], answer: 0 },
      ],
      '2': [
        { question: '¿Qué hook sirve para efectos secundarios?', options: ['useEffect', 'useState', 'useReducer', 'useRef'], answer: 0 },
        { question: '¿Qué propiedad flexDirection hace?', options: ['Fila o columna', 'Color', 'Tamaño', 'Margen'], answer: 0 },
      ],
      '3': [
        { question: '¿Qué hace useContext?', options: ['Compartir estado', 'Actualizar UI', 'Renderizar', 'Routing'], answer: 0 },
        { question: '¿Qué es un Provider?', options: ['Componente de contexto', 'Hook', 'Estilo', 'API'], answer: 0 },
      ],
    },
    advanced: {
      '1': [
        { question: '¿Qué es Redux?', options: ['Gestor de estado', 'API', 'Componente', 'Hook'], answer: 0 },
        { question: '¿Qué hace React Navigation?', options: ['Navegación entre pantallas', 'Renderizar UI', 'Almacenar datos', 'None'], answer: 0 },
      ],
      '2': [
        { question: '¿Qué hace combineReducers?', options: ['Combina reducers', 'Renderiza componentes', 'Crea hooks', 'Gestiona estilos'], answer: 0 },
        { question: '¿Qué hace applyMiddleware?', options: ['Agrega middlewares', 'Cambia estado', 'Estiliza', 'Ninguna'], answer: 0 },
      ],
      '3': [
        { question: '¿Qué es thunk en Redux?', options: ['Middleware para async', 'Hook', 'Componente', 'Estilo'], answer: 0 },
        { question: '¿Qué es un selector en Redux?', options: ['Obtiene estado', 'Hace render', 'Almacena datos', 'None'], answer: 0 },
      ],
    },
  };

  const diff = difficulty.toLowerCase();
  return questionsMap[diff]?.[level] || questionsMap.basic['1'];
};
