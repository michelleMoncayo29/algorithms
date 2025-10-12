module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // ===== CONFIGURACIÓN AMIGABLE PARA ESTUDIANTES =====
    
    // Reglas de estilo - DESACTIVADAS para no molestar a principiantes
    'indent': 'off',           // No importa la indentación
    'quotes': 'off',           // Permite comillas simples y dobles
    'semi': 'off',             // No importa si hay punto y coma o no
    
    // Reglas de console - PERMITIDAS para debugging
    'no-console': 'off',       // Permite console.log para debugging
    
    // Reglas de variables - MÁS PERMISIVAS
    'no-unused-vars': 'warn',  // Solo advertencia, no error
    'prefer-const': 'off',     // Permite usar let y var
    'no-var': 'off',           // Permite usar var
    
    // Reglas de sintaxis - MANTENER para evitar errores reales
    'no-undef': 'error',       // Mantener para detectar errores reales
    'no-redeclare': 'error',   // Mantener para detectar errores reales
    'no-duplicate-case': 'error', // Mantener para detectar errores reales
    
    // Reglas específicas para ejercicios
    'no-empty': 'off',         // Para funciones que lanzan error por defecto
    'no-throw-literal': 'off', // Para throw new Error('Función no implementada')
  },
  plugins: ['jest'],
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
      rules: {
        // En tests, mantener todas las reglas permisivas
        'no-console': 'off',
        'indent': 'off',
        'quotes': 'off',
        'semi': 'off',
      },
    },
    // Configuración específica para archivos de ejercicios
    {
      files: ['levels/**/*.js'],
      rules: {
        // En archivos de ejercicios, ser aún más permisivo
        'no-unused-vars': 'off',
        'no-console': 'off',
        'indent': 'off',
        'quotes': 'off',
        'semi': 'off',
      },
    },
  ],
};
