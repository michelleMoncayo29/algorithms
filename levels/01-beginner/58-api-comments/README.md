# Análisis de Comentarios con API

Este ejercicio avanza en el consumo de APIs hacia la **transformación y análisis de datos**. Aprenderás a encadenar peticiones (obtener un post, luego sus comentarios) y a procesar la información recibida para extraer estadísticas.

## 🎯 Objetivos

- **Encadenar peticiones** asíncronas dependientes.
- **Mapear datos** (`.map()`) para extraer campos específicos.
- **Reducir datos** (`.reduce()` o bucles) para generar estadísticas.
- **Combinar datos** de múltiples fuentes en una estructura compleja.

## 📝 Descripción

Trabajarás con la API de **JSONPlaceholder** (endpoints `/posts` y `/comments`). Tu misión es analizar la interacción en las publicaciones, extrayendo información sobre quién comenta y qué dominios de correo electrónico son más frecuentes.

### Endpoints Disponibles

Consulta la documentación detallada:
[📄 Ver Documentación de Endpoints (`endpoint-doc.md`)](./endpoint-doc.md)

### Requerimientos

Implementa las siguientes funciones en `exercise.js`:

1.  **`fetchCommentsByPost(postId)`**:
    - Obtiene todos los comentarios de un post (`/comments?postId={id}`).

2.  **`getCommentersEmails(postId)`**:
    - Retorna un array **simple** con solo los emails de los usuarios que comentaron.
    - **Pista:** Usa `fetchCommentsByPost` y luego `.map()`.

3.  **`countCommentsByDomain(postId)`**:
    - Analiza los emails y cuenta cuántos pertenecen a cada dominio de nivel superior (`.com`, `.net`, `.biz`, etc.).
    - Retorna un objeto como: `{ "com": 5, "net": 2 }`.
    - **Pista:** Extrae la parte después del último punto del email.

4.  **`getPostWithComments(postId)`**:
    - Obtiene el post (`/posts/{id}`) y sus comentarios por separado.
    - Retorna un objeto combinado:
      ```javascript
      {
        id: 1,
        title: "...",
        body: "...",
        comments: [ ... ], // Array completo de comentarios
        totalComments: 5   // Número total de comentarios
      }
      ```

5.  **`searchComments(query)`**:
    - Busca comentarios que contengan el texto `query` usando el parámetro `?q=` de la API.
    - Retorna el array de comentarios encontrados.

### Pistas y Consejos

#### Extracción de Dominios

Para obtener "com" de "usuario@ejemplo.com":

```javascript
const email = "usuario@ejemplo.com";
const domain = email.split('.').pop(); // "com"
```

#### Uso de Reduce para Contar

Puedes usar `reduce` para crear un histograma de frecuencias:

```javascript
const counts = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});
```

### 🧪 Ejecutar Tests

```bash
npm test 58-api-comments
```

¡Vamos a analizar esos comentarios! 💬
