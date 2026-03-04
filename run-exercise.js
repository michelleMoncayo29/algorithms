#!/usr/bin/env node

/**
 * Ejecutor de ejercicios CLI
 * Permite ejecutar cualquier ejercicio desde la raíz del proyecto
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Mapeo de ejercicios disponibles
const EXERCISES = {
  '01-beginner': {
    '01-two-sum': {
      name: 'Two Sum',
      description: 'Encuentra dos números que sumen un objetivo',
      path: 'levels/01-beginner/01-two-sum'
    },
    '02-fizz-buzz': {
      name: 'Fizz Buzz',
      description: 'Clásico juego de Fizz Buzz',
      path: 'levels/01-beginner/02-fizz-buzz'
    },
    '03-palindrome-check': {
      name: 'Palindrome Check',
      description: 'Verifica si una cadena es palíndromo',
      path: 'levels/01-beginner/03-palindrome-check'
    },
    '04-find-maximum': {
      name: 'Find Maximum',
      description: 'Encuentra el valor máximo en un array',
      path: 'levels/01-beginner/04-find-maximum'
    },
    '24-pet-registry': {
      name: 'Pet Registry',
      description: 'Registro de mascotas usando clases y validaciones',
      path: 'levels/01-beginner/24-pet-registry'
    },
    '25-fleet-maintenance': {
      name: 'Fleet Maintenance Manager',
      description: 'Gestor básico de flota usando clases y filtros',
      path: 'levels/01-beginner/25-fleet-maintenance'
    },
    '26-smart-home-monitor': {
      name: 'Smart Home Monitor',
      description: 'Control de dispositivos inteligentes con clases',
      path: 'levels/01-beginner/26-smart-home-monitor'
    },
    '56-api-consumption': {
      name: 'API Consumption',
      description: 'Consumo de API REST con fetch y async/await',
      path: 'levels/01-beginner/56-api-consumption'
    },
    '57-api-todos': {
      name: 'API Todos Management',
      description: 'Gestión de tareas con filtrado y POST',
      path: 'levels/01-beginner/57-api-todos'
    },
    '58-api-comments': {
      name: 'API Comments Analysis',
      description: 'Análisis de comentarios y encadenamiento de peticiones',
      path: 'levels/01-beginner/58-api-comments'
    }
  },
  '02-intermediate': {
    '01-binary-search': {
      name: 'Binary Search',
      description: 'Búsqueda binaria en array ordenado',
      path: 'levels/02-intermediate/01-binary-search'
    },
    '02-linked-list': {
      name: 'Linked List',
      description: 'Implementación de lista enlazada',
      path: 'levels/02-intermediate/02-linked-list'
    },
    '03-quick-sort': {
      name: 'Quick Sort',
      description: 'Algoritmo de ordenamiento rápido',
      path: 'levels/02-intermediate/03-quick-sort'
    }
  },
  '03-advanced': {
    '01-dijkstra': {
      name: 'Dijkstra Algorithm',
      description: 'Algoritmo de camino más corto',
      path: 'levels/03-advanced/01-dijkstra'
    },
    '02-knapsack': {
      name: 'Knapsack Problem',
      description: 'Problema de la mochila',
      path: 'levels/03-advanced/02-knapsack'
    }
  },
  '04-expert': {
    '01-traveling-salesman': {
      name: 'Traveling Salesman',
      description: 'Problema del vendedor viajero',
      path: 'levels/04-expert/01-traveling-salesman'
    }
  }
};

/**
 * Muestra la ayuda del CLI
 */
function showHelp() {
  console.log(`
🔧 Ejecutor de Ejercicios de Algoritmos

USO:
  node run-exercise.js <comando> [opciones]

COMANDOS:
  list                    Lista todos los ejercicios disponibles
  run <ejercicio>         Ejecuta un ejercicio específico
  test <ejercicio>        Ejecuta las pruebas de un ejercicio
  level <nivel>           Lista ejercicios de un nivel específico
  help                    Muestra esta ayuda

EJERCICIOS DISPONIBLES:
  Para ver todos los ejercicios: node run-exercise.js list
  Para ver por nivel: node run-exercise.js level 01-beginner

EJEMPLOS:
  node run-exercise.js run two-sum
  node run-exercise.js test binary-search
  node run-exercise.js level 02-intermediate

NOTA: Puedes usar nombres parciales (ej: 'two' en lugar de 'two-sum')
`);
}

/**
 * Lista todos los ejercicios disponibles
 */
function listExercises() {
  console.log('\n📚 Ejercicios Disponibles:\n');
  
  Object.entries(EXERCISES).forEach(([level, exercises]) => {
    console.log(`🎯 ${level.toUpperCase()}:`);
    Object.entries(exercises).forEach(([key, exercise]) => {
      console.log(`   ${key} - ${exercise.name}`);
      console.log(`       ${exercise.description}`);
    });
    console.log('');
  });
}

/**
 * Lista ejercicios de un nivel específico
 */
function listLevelExercises(level) {
  if (!EXERCISES[level]) {
    console.error(`❌ Nivel '${level}' no encontrado.`);
    console.log('Niveles disponibles:', Object.keys(EXERCISES).join(', '));
    return;
  }

  console.log(`\n🎯 Ejercicios del nivel ${level.toUpperCase()}:\n`);
  Object.entries(EXERCISES[level]).forEach(([key, exercise]) => {
    console.log(`   ${key} - ${exercise.name}`);
    console.log(`       ${exercise.description}`);
  });
  console.log('');
}

/**
 * Busca un ejercicio por nombre parcial
 */
function findExercise(exerciseName) {
  const results = [];
  
  Object.entries(EXERCISES).forEach(([level, exercises]) => {
    Object.entries(exercises).forEach(([key, exercise]) => {
      if (key.includes(exerciseName) || exercise.name.toLowerCase().includes(exerciseName.toLowerCase())) {
        results.push({ level, key, ...exercise });
      }
    });
  });
  
  return results;
}

/**
 * Ejecuta un ejercicio
 */
function runExercise(exerciseName) {
  const exercises = findExercise(exerciseName);
  
  if (exercises.length === 0) {
    console.error(`❌ Ejercicio '${exerciseName}' no encontrado.`);
    console.log('Usa "node run-exercise.js list" para ver ejercicios disponibles.');
    return;
  }
  
  if (exercises.length > 1) {
    console.log(`🔍 Múltiples ejercicios encontrados para '${exerciseName}':`);
    exercises.forEach((ex, index) => {
      console.log(`   ${index + 1}. ${ex.key} - ${ex.name}`);
    });
    console.log('\nEspecifica un nombre más exacto.');
    return;
  }
  
  const exercise = exercises[0];
  const exercisePath = path.join(__dirname, exercise.path);
  
  if (!fs.existsSync(exercisePath)) {
    console.error(`❌ Directorio del ejercicio no encontrado: ${exercisePath}`);
    return;
  }
  
  console.log(`\n🚀 Ejecutando ejercicio: ${exercise.name}`);
  console.log(`📁 Ubicación: ${exercise.path}\n`);
  
  try {
    // Ejecutar el archivo del ejercicio
    const exerciseFile = path.join(exercisePath, 'exercise.js');
    if (fs.existsSync(exerciseFile)) {
      console.log('📝 Cargando ejercicio...');
      require(exerciseFile);
      console.log('✅ Ejercicio cargado correctamente.');
    } else {
      console.error(`❌ Archivo exercise.js no encontrado en ${exercisePath}`);
    }
  } catch (error) {
    console.error(`❌ Error ejecutando ejercicio:`, error.message);
  }
}

/**
 * Ejecuta las pruebas de un ejercicio
 */
function testExercise(exerciseName) {
  const exercises = findExercise(exerciseName);
  
  if (exercises.length === 0) {
    console.error(`❌ Ejercicio '${exerciseName}' no encontrado.`);
    console.log('Usa "node run-exercise.js list" para ver ejercicios disponibles.');
    return;
  }
  
  if (exercises.length > 1) {
    console.log(`🔍 Múltiples ejercicios encontrados para '${exerciseName}':`);
    exercises.forEach((ex, index) => {
      console.log(`   ${index + 1}. ${ex.key} - ${ex.name}`);
    });
    console.log('\nEspecifica un nombre más exacto.');
    return;
  }
  
  const exercise = exercises[0];
  const exercisePath = path.join(__dirname, exercise.path);
  
  if (!fs.existsSync(exercisePath)) {
    console.error(`❌ Directorio del ejercicio no encontrado: ${exercisePath}`);
    return;
  }
  
  console.log(`\n🧪 Ejecutando pruebas para: ${exercise.name}`);
  console.log(`📁 Ubicación: ${exercise.path}\n`);
  
  try {
    // Ejecutar Jest para el archivo de prueba específico
    const testFile = path.join(exercisePath, 'exercise.test.js');
    if (fs.existsSync(testFile)) {
      const testCommand = `npx jest ${exercise.path}/exercise.test.js`;
      execSync(testCommand, { stdio: 'inherit' });
    } else {
      console.error(`❌ Archivo exercise.test.js no encontrado en ${exercisePath}`);
    }
  } catch (error) {
    console.error(`❌ Error ejecutando pruebas:`, error.message);
  }
}

// Función principal
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'list':
      listExercises();
      break;
      
    case 'level':
      if (args.length < 2) {
        console.error('❌ Debes especificar un nivel.');
        console.log('Niveles disponibles:', Object.keys(EXERCISES).join(', '));
        return;
      }
      listLevelExercises(args[1]);
      break;
      
    case 'run':
      if (args.length < 2) {
        console.error('❌ Debes especificar un ejercicio.');
        console.log('Usa "node run-exercise.js list" para ver ejercicios disponibles.');
        return;
      }
      runExercise(args[1]);
      break;
      
    case 'test':
      if (args.length < 2) {
        console.error('❌ Debes especificar un ejercicio.');
        console.log('Usa "node run-exercise.js list" para ver ejercicios disponibles.');
        return;
      }
      testExercise(args[1]);
      break;
      
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
      
    default:
      console.error(`❌ Comando desconocido: ${command}`);
      showHelp();
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = {
  EXERCISES,
  findExercise,
  runExercise,
  testExercise,
  listExercises,
  listLevelExercises
};
