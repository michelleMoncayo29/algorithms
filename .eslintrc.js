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
    // Reglas básicas
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    
    // Reglas de estilo
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    
    // Reglas específicas para ejercicios
    'no-undef': 'error',
    'no-redeclare': 'error',
    'no-duplicate-case': 'error',
    
    // Permitir algunos casos específicos para ejercicios
    'no-empty': 'off', // Para funciones que lanzan error por defecto
  },
  plugins: ['jest'],
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off', // Permitir console en tests
      },
    },
  ],
};
