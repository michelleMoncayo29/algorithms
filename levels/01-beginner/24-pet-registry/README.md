# Pet Registry

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Programación Orientada a Objetos  
**Tiempo estimado:** 20-25 minutos

## 📦 Contexto

La clínica veterinaria *Patitas Felices* necesita un registro mínimo con clases escritas en inglés para mantener datos consistentes de las mascotas que atiende. Como desarrollador debes modelar a cada mascota con la clase `Pet` y administrar el catálogo completo con `PetRegistry`. El ejercicio refuerza constructores, métodos de instancia, validaciones *fail fast* y colecciones internas simples.

## 🎯 Objetivos de Aprendizaje

- [ ] Definir clases en inglés con constructores y métodos claros.
- [ ] Aplicar validaciones tempranas (Fail Fast) cuando los datos sean inválidos.
- [ ] Practicar colecciones internas y búsqueda *case-insensitive*.
- [ ] Usar `instanceof` para garantizar tipos correctos antes de agregar objetos.
- [ ] Mantener el código simple y expresivo (KISS + Código Expresivo).

## 📝 Enunciado Detallado

Implementa dos clases en `exercise.js` siguiendo la guía pedagógica del repositorio:

1. `Pet`
   - Propiedades requeridas: `name` (string no vacío), `type` (string no vacío), `age` (número entero ≥ 0).
   - Constructor: valida cada campo y lanza errores descriptivos con mensajes exactos:
     - `"Pet name is required"`
     - `"Pet type is required"`
     - `"Pet age must be a number greater than or equal to 0"`
   - Método `getDescription()` → retorna un string como `"Luna is a dog that is 3 years old"` (usa `"year"` cuando la edad sea `1`).
   - Método `haveBirthday()` → incrementa la edad en 1, actualiza la instancia y retorna la nueva edad.

2. `PetRegistry`
   - Propiedad interna `pets` (array).
   - Método `addPet(pet)`:
     - Solo acepta instancias de `Pet`.
     - Lanza `new Error("Pet must be an instance of Pet")` cuando reciba valores inválidos.
     - Agrega la mascota y retorna el total almacenado.
   - Método `findByName(name)`:
     - Compara ignorando mayúsculas/minúsculas.
     - Retorna la primera coincidencia o `null`.
   - Método `getDescriptions()`:
     - Devuelve un nuevo array con el resultado de `getDescription()` para cada mascota.
     - No debe mutar ni exponer directamente el arreglo interno.

> Aplica los principios KISS, Código Expresivo y Fail Fast: mantén el código simple, con nombres en inglés y valida antes de continuar.

## 💡 Ejemplos

### Ejemplo 1
```javascript
const luna = new Pet('Luna', 'dog', 3);
console.log(luna.getDescription());
// "Luna is a dog that is 3 years old"
```

### Ejemplo 2
```javascript
const registry = new PetRegistry();
const mila = new Pet('Mila', 'cat', 1);
registry.addPet(mila);
registry.addPet(new Pet('Rocky', 'dog', 5));

console.log(registry.findByName('mila') === mila); // true
console.log(registry.getDescriptions());
// ["Mila is a cat that is 1 year old", "Rocky is a dog that is 5 years old"]
```

### Ejemplo 3
```javascript
const registry = new PetRegistry();
const names = ['Luna', 'Milo', 'Kiara'];

names.forEach((name, index) => {
  registry.addPet(new Pet(name, 'cat', index));
});

console.log(registry.getDescriptions());
// [
//   "Luna is a cat that is 0 years old",
//   "Milo is a cat that is 1 year old",
//   "Kiara is a cat that is 2 years old"
// ]
```

## ⚙️ Restricciones y Reglas

- No utilices librerías externas; solo JavaScript estándar.
- Los mensajes de error anteriores son obligatorios para facilitar la retroalimentación automatizada.
- Mantén los métodos pequeños y expresivos (consulta `docs/PRINCIPLES_GUIDE.md`).
- No expongas ni retornes referencias directas al array interno del registro.
- Lanza errores inmediatamente cuando los datos no cumplan con los criterios (Fail Fast).

## 🔍 Casos de Prueba Recomendados

| Escenario | Entrada | Resultado Esperado | Categoría |
|-----------|---------|--------------------|-----------|
| Descripción básica | `new Pet('Luna','dog',3).getDescription()` | `"Luna is a dog that is 3 years old"` | Caso básico |
| Singular/plural | `new Pet('Mila','cat',1).getDescription()` | `"Mila is a cat that is 1 year old"` | Caso básico |
| Validación de nombre | `new Pet('', 'dog', 1)` | Error `"Pet name is required"` | Fail Fast |
| Validación de tipo | `new Pet('Luna', ' ', 1)` | Error `"Pet type is required"` | Fail Fast |
| Validación de edad | `new Pet('Luna', 'dog', -1)` | Error `"Pet age must be a number greater than or equal to 0"` | Fail Fast |
| Registro vacío | `registry.findByName('Luna')` sin mascotas | `null` | Edge |
| Añadir instancia inválida | `registry.addPet({})` | Error `"Pet must be an instance of Pet"` | Validación |
| Obtener descripciones | `registry.getDescriptions()` | Array con strings; mismo orden de inserción | Caso básico |
| Inmutabilidad | Modificar el array retornado por `getDescriptions()` | No afecta registros internos | Inmutabilidad |
| Escalabilidad | Registrar 100 mascotas | Tiempo razonable y conteo correcto | Rendimiento lineal |

## 🧠 Pistas (si te atoras)

<details>
<summary>💡 Pista 1 – Constructor</summary>

Valida cada argumento en el constructor antes de asignarlo. Usa `typeof value === 'string' && value.trim().length > 0` para cadenas y `Number.isInteger(age)` para la edad.

</details>

<details>
<summary>💡 Pista 2 – Búsqueda</summary>

Normaliza el nombre recibido y el almacenado con `.toLowerCase()` para comparar sin importar mayúsculas/minúsculas.

</details>

<details>
<summary>💡 Pista 3 – Inmutabilidad</summary>

`getDescriptions()` puede usar `this.pets.map(pet => pet.getDescription())`. Ese `map` genera un nuevo array cada vez.

</details>

## 🧭 Pasos Sugeridos

1. Implementa y prueba la clase `Pet` (constructor, pluralización y `haveBirthday`).
2. Crea `PetRegistry` con la lista vacía y los métodos solicitados.
3. Agrega validaciones y mensajes de error exactos.
4. Ejecuta los tests y refina hasta que todos pasen.

## ✅ Checklist antes de enviar

- [ ] Todos los mensajes de error coinciden con los solicitados.
- [ ] Los métodos no mutan datos externos ni exponen el array interno.
- [ ] Los nombres de variables y métodos están en inglés y son expresivos.
- [ ] Los tests (`npm test pet-registry` o `npm run t pet-registry`) pasan al 100%.
- [ ] El README refleja cualquier decisión adicional que tomaste.

## 🏃‍♂️ Cómo ejecutar

1. Abre `exercise.js`.
2. Implementa las clases requeridas.
3. Ejecuta los tests con `npm test pet-registry` o usando el runner corto `npm run t pet-registry`.
4. Opcional: ejecuta el CLI `npm start pet-registry` para cargar el ejercicio.

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Object-Oriented Programming in JS](https://developer.mozilla.org/es/docs/Learn/JavaScript/Objects/Object-oriented_JS)
- [Template literals](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Template_literals)

---

**💡 Tip:** Empieza implementando la clase `Pet` y prueba manualmente sus métodos antes de integrar el registro. Mantén cada método corto y con una sola responsabilidad para reforzar los principios pedagógicos del repositorio.

