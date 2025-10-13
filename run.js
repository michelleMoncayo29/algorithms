#!/usr/bin/env node

/**
 * Script simplificado para ejecutar ejercicios
 * Uso: node run.js <ejercicio>
 * Ejemplo: node run.js two-sum
 */

const { runExercise, findExercise } = require('./run-exercise.js');

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log(`
🚀 Ejecutor Rápido de Ejercicios

USO:
  node run.js <ejercicio>
  
EJEMPLOS:
  node run.js two-sum
  node run.js binary-search
  node run.js fizz-buzz

Para ver todos los ejercicios: npm run list
Para más opciones: npm run exercise help
`);
    process.exit(1);
}

const exerciseName = args[0];
const exercises = findExercise(exerciseName);

if (exercises.length === 0) {
    console.error(`❌ Ejercicio '${exerciseName}' no encontrado.`);
    console.log('Usa "npm run list" para ver ejercicios disponibles.');
    process.exit(1);
}

if (exercises.length > 1) {
    console.log(`🔍 Múltiples ejercicios encontrados para '${exerciseName}':`);
    exercises.forEach((ex, index) => {
        console.log(`   ${index + 1}. ${ex.key} - ${ex.name}`);
    });
    console.log('\nEspecifica un nombre más exacto.');
    process.exit(1);
}

runExercise(exerciseName);
