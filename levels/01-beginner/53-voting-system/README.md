# Sistema de Votación Simple

**Dificultad:** BEGINNER  
**Categoría:** Clases, OOP, Gestión de Datos  
**Tiempo estimado:** 45-60 minutos

## 📋 Descripción

Implementa un sistema de votación simple con dos clases: `Candidate` y `VotingSystem`. Este ejercicio te enseñará a trabajar con clases, validación de datos, gestión de colecciones y búsquedas.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender a crear y usar clases en JavaScript
- [ ] Practicar validación de inputs con `instanceof`
- [ ] Entender gestión de colecciones (arrays, Sets)
- [ ] Aplicar búsquedas case-insensitive
- [ ] Implementar lógica de negocio (prevenir votos duplicados)

## 📝 Enunciado

Implementa dos clases:

### Clase `Candidate`

Representa un candidato en el sistema de votación.

**Constructor:**
- `name`: Nombre del candidato (string no vacío, requerido)
- `party`: Partido político o afiliación (string, opcional, por defecto '')

**Métodos:**
- `toString()`: Retorna representación string del candidato ("Name (Party)" o "Name" si no hay partido)

### Clase `VotingSystem`

Gestiona todo el sistema de votación.

**Métodos:**
- `addCandidate(candidate)`: Añade un candidato al sistema
  - Valida que sea instancia de `Candidate`
  - Previene duplicados (nombres case-insensitive)
  - Retorna el número total de candidatos

- `vote(candidateName, voterId)`: Registra un voto
  - Valida que el candidato exista (case-insensitive)
  - Previene que un votante vote dos veces
  - Retorna `true` si el voto fue registrado, `false` en caso contrario

- `getVoteCount(candidateName)`: Obtiene el conteo de votos de un candidato
  - Búsqueda case-insensitive
  - Retorna 0 si el candidato no existe

- `getResults()`: Obtiene todos los resultados
  - Retorna array de objetos `{name, votes}` ordenado por votos (descendente)

- `getTotalVotes()`: Obtiene el total de votos emitidos

- `getWinner()`: Obtiene el/los ganador(es)
  - Retorna array con nombres de candidatos con más votos
  - Puede haber múltiples ganadores si hay empate

## 💡 Ejemplos

### Ejemplo 1
```javascript
const { Candidate, VotingSystem } = require('./exercise');

const system = new VotingSystem();
const candidate1 = new Candidate("Alice", "Party A");
const candidate2 = new Candidate("Bob", "Party B");

system.addCandidate(candidate1);
system.addCandidate(candidate2);

system.vote("Alice", "voter1");
system.vote("Alice", "voter2");
system.vote("Bob", "voter3");

console.log(system.getResults());
// [{name: "Alice", votes: 2}, {name: "Bob", votes: 1}]

console.log(system.getWinner());
// ["Alice"]
```

### Ejemplo 2
```javascript
const system = new VotingSystem();
system.addCandidate(new Candidate("John"));
system.addCandidate(new Candidate("Jane"));

system.vote("john", "voter1"); // Case-insensitive
system.vote("JOHN", "voter2"); // Case-insensitive

console.log(system.getVoteCount("John")); // 2
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| `system.vote("Alice", "voter1")` | `true` | Voto válido registrado |
| `system.vote("Alice", "voter1")` | `false` | Votante ya votó |
| `system.getWinner()` | `["Alice"]` | Candidato con más votos |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Usa un `Set` para rastrear los IDs de votantes que ya votaron:
```javascript
this.voters = new Set();
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para búsquedas case-insensitive, normaliza los nombres:
```javascript
const normalizedName = candidateName.toLowerCase();
```

</details>

<details>
<summary>💡 Pista 3</summary>

Para ordenar resultados por votos descendente:
```javascript
results.sort((a, b) => b.votes - a.votes);
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las clases `Candidate` y `VotingSystem`
3. Ejecuta los tests: `npm test 53-voting-system`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN: Classes](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [MDN: Set](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [MDN: Array.sort()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

---

**💡 Tip:** Usa estructuras de datos apropiadas: arrays para candidatos y votos, y un Set para rastrear votantes únicos eficientemente.

