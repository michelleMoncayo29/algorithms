# Formateador de Texto Markdown Básico

**Dificultad:** BEGINNER  
**Categoría:** Strings, Transformación de Texto, Parsing  
**Tiempo estimado:** 45-60 minutos

## 📋 Descripción

Implementa una función que convierte texto plano con sintaxis Markdown básica a HTML. Este ejercicio te enseñará a trabajar con expresiones regulares, transformación de strings y parsing básico de texto.

## 🎯 Objetivos de Aprendizaje

- [ ] Aprender a usar expresiones regulares para encontrar patrones en texto
- [ ] Practicar transformación y reemplazo de strings
- [ ] Entender parsing básico de texto estructurado
- [ ] Aplicar manipulación de strings compleja

## 📝 Enunciado

Crea una función `formatMarkdown` que convierta texto con sintaxis Markdown básica a HTML.

### Formatos a soportar:

1. **Negritas**: `**texto**` o `__texto__` → `<strong>texto</strong>`
2. **Cursivas**: `*texto*` o `_texto_` → `<em>texto</em>`
3. **Listas no ordenadas**: Líneas que empiezan con `- ` o `* ` → `<ul><li>...</li></ul>`
4. **Listas ordenadas**: Líneas que empiezan con `1. `, `2. `, etc. → `<ol><li>...</li></ol>`
5. **Encabezados**: 
   - `# Título` → `<h1>Título</h1>`
   - `## Subtítulo` → `<h2>Subtítulo</h2>`
   - `### Sub-subtítulo` → `<h3>Sub-subtítulo</h3>`

### Reglas importantes:

- Las negritas y cursivas pueden estar anidadas
- Las listas deben agruparse (múltiples líneas consecutivas forman una lista)
- Los encabezados deben estar en líneas separadas
- El texto que no coincide con ningún patrón debe mantenerse igual

## 💡 Ejemplos

### Ejemplo 1
```javascript
// Input
formatMarkdown("**Hello** *world*")

// Output esperado
"<strong>Hello</strong> <em>world</em>"

// Explicación
Convierte negritas y cursivas a HTML
```

### Ejemplo 2
```javascript
// Input
formatMarkdown("# Título\n## Subtítulo\n- Item 1\n- Item 2")

// Output esperado
"<h1>Título</h1>\n<h2>Subtítulo</h2>\n<ul><li>Item 1</li><li>Item 2</li></ul>"

// Explicación
Convierte encabezados y lista no ordenada a HTML
```

### Ejemplo 3
```javascript
// Input
formatMarkdown("1. Primero\n2. Segundo\n3. Tercero")

// Output esperado
"<ol><li>Primero</li><li>Segundo</li><li>Tercero</li></ol>"

// Explicación
Convierte lista ordenada a HTML
```

## 🔍 Casos de Prueba

| Input | Output Esperado | Explicación |
|-------|----------------|-------------|
| `formatMarkdown("**bold**")` | `"<strong>bold</strong>"` | Negritas simples |
| `formatMarkdown("*italic*")` | `"<em>italic</em>"` | Cursivas simples |
| `formatMarkdown("# Title")` | `"<h1>Title</h1>"` | Encabezado nivel 1 |
| `formatMarkdown("- Item")` | `"<ul><li>Item</li></ul>"` | Lista no ordenada |

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1</summary>

Para reemplazar patrones, usa `replace()` con expresiones regulares:
```javascript
text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
```

</details>

<details>
<summary>💡 Pista 2</summary>

Para procesar líneas, divide el texto por `\n`:
```javascript
const lines = text.split('\n');
```

</details>

<details>
<summary>💡 Pista 3</summary>

Para agrupar líneas de lista consecutivas, itera sobre las líneas y agrupa las que son listas:
```javascript
let inList = false;
let listItems = [];
// ... lógica de agrupación
```

</details>

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa la función `formatMarkdown`
3. Ejecuta los tests: `npm test 52-markdown-formatter`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [MDN: String.replace()](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
- [MDN: Expresiones Regulares](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Markdown Guide](https://www.markdownguide.org/basic-syntax/)

---

**💡 Tip:** Procesa el texto en el orden correcto: primero encabezados y listas (que son por líneas), luego negritas y cursivas (que pueden estar en cualquier parte).

