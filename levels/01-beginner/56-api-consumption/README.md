# Consumo de API REST con Fetch

Este ejercicio te enseñará cómo interactuar con **servicios web externos (APIs)** utilizando `fetch` y `async/await` en JavaScript. Aprenderás a realizar peticiones HTTP (GET), procesar respuestas en formato JSON y combinar datos de múltiples endpoints.

## 🎯 Objetivos

- **Entender el funcionamiento básico de una API REST.**
- **Realizar peticiones asíncronas** con `async/await` y `fetch`.
- **Manejar respuestas JSON.**
- **Gestionar errores** de red y de la API (como 404 Not Found).
- **Consultar múltiples endpoints** para construir una vista de datos completa.

## 📝 Descripción

Trabajarás con la API pública de **JSONPlaceholder** (simulada en los tests). Tu tarea consiste en implementar funciones para:

1.  **Obtener un usuario**: Dado un ID, recuperar sus datos personales.
2.  **Obtener los posts de un usuario**: Recuperar todo lo que ha publicado ese usuario.
3.  **Crear un perfil formateado**: Combinar la información del usuario y sus posts en un objeto resumido.

### Endpoints Disponibles

Consulta el archivo de documentación de endpoints:
[📄 Ver Documentación de Endpoints (`endpoint-doc.md`)](./endpoint-doc.md)

### Requerimientos

Implementarás las siguientes funciones en `exercise.js`:

1.  `fetchUser(userId)`:
    - Retorna el objeto usuario completo desde `/users/{userId}`.
    - Debe lanzar un error si el usuario no existe (o la petición falla).

2.  `fetchUserPosts(userId)`:
    - Retorna el array de posts del usuario desde `/posts?userId={userId}`.
    - Debe retornar un array vacío si no hay posts.

3.  `getFormattedUserProfile(userId)`:
    - Usa las dos funciones anteriores.
    - Retorna un objeto con la siguiente estructura:
      ```javascript
      {
        id: 1,
        fullName: "Leanne Graham", // Nombre completo del usuario (campo 'name')
        email: "Sincere@april.biz", // Email del usuario
        addressSummary: "Street Name, City Name", // 'name' de la calle y 'name' de la ciudad (ej. "Kulas Light, Gwenborough")
        totalPosts: 10 // Cantidad total de posts
      }
      ```

### Pistas y Consejos

#### Uso de Fetch y Async/Await

`fetch` retorna una Promesa que se resuelve con la respuesta HTTP.

```javascript
/* Ejemplo Básico */
async function getData(url) {
  try {
    const response = await fetch(url);

    // Verificar si la respuesta fue exitosa (código 200-299)
    if (!response.ok) {
        // !response.ok significa que hubo un error HTTP (ej. 404, 500)
        throw new Error(`Error HTTP: ${response.status}`);
    }

    // Convertir el cuerpo de la respuesta a JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falló la petición:", error);
    // Propagar el error para manejarlo más arriba si es necesario
    throw error;
  }
}
```

#### Manejo de Errores 404

Si pides un usuario que no existe (ej. ID 9999), la API retornará un código 404. Tu código debe detectar esto (`!response.ok`) y lanzar un error apropiado.

#### Combinación de Datos

En `getFormattedUserProfile`, necesitarás llamar a ambas funciones (`fetchUser` y `fetchUserPosts`).

### 🧪 Ejecutar Tests

Para verificar tu solución, ejecuta:

```bash
npm test 56-api-consumption
```

¡Buena suerte consumiendo tu primera API! 🚀
