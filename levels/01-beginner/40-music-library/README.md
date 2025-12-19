# Sistema de Gestión de Biblioteca de Música

**Dificultad:** BEGINNER  
**Categoría:** Clases, Objetos, Arrays, Validación de Datos, Cálculos  
**Tiempo estimado:** 40-45 minutos

## 📋 Descripción

Crea un sistema de gestión de biblioteca de música que permita gestionar canciones, crear listas de reproducción, calcular duraciones totales, buscar por artista y género, y generar estadísticas de la biblioteca.

## 🎯 Objetivos de Aprendizaje

- [ ] Practicar definición de múltiples clases relacionadas (`Song`, `Playlist`, `MusicLibrary`)
- [ ] Implementar validaciones complejas en constructores y métodos
- [ ] Gestionar listas de reproducción con múltiples canciones
- [ ] Realizar cálculos de duración total
- [ ] Usar métodos de arrays (`find`, `filter`, `reduce`, `some`)
- [ ] Formatear datos (duración como MM:SS)
- [ ] Aplicar principios KISS, Fail Fast y Responsabilidad Única

## 📝 Enunciado

Implementa tres clases en `exercise.js`:

### Clase `Song`

Representa una canción.

#### Constructor
- `constructor(title, artist, duration, genre)` - Crea una canción con todos sus datos

#### Métodos
- `getDuration()` - Retorna duración en segundos
- `getArtist()` - Retorna el artista
- `getGenre()` - Retorna el género
- `getFormattedDuration()` - Formatea duración como "MM:SS"

### Clase `Playlist`

Representa una lista de reproducción.

#### Constructor
- `constructor(name)` - Crea una lista de reproducción con nombre

#### Métodos
- `addSong(song)` - Agrega una canción a la lista
- `removeSong(songTitle)` - Elimina una canción de la lista
- `getTotalDuration()` - Calcula duración total usando `reduce()`
- `getSongsByArtist(artist)` - Filtra canciones por artista usando `filter()`
- `getSongsByGenre(genre)` - Filtra canciones por género usando `filter()`
- `shuffle()` - Mezcla las canciones aleatoriamente
- `getSongCount()` - Retorna el número total de canciones

### Clase `MusicLibrary`

Gestiona la biblioteca de música y sus operaciones.

#### Constructor
- `constructor(name)` - Crea una biblioteca con nombre

#### Métodos
- `addSong(song)` - Agrega una canción a la biblioteca
- `findSong(title)` - Busca una canción por título usando `find()`
- `createPlaylist(playlistName)` - Crea una nueva lista de reproducción
- `getSongsByArtist(artist)` - Filtra canciones por artista usando `filter()`
- `getSongsByGenre(genre)` - Filtra canciones por género usando `filter()`
- `getTotalDuration()` - Calcula duración total usando `reduce()`
- `getMostPopularArtist()` - Retorna el artista más popular
- `getStatistics()` - Retorna estadísticas completas de la biblioteca

## 💡 Ejemplos

### Ejemplo 1: Crear Canción y Lista de Reproducción

```javascript
const library = new MusicLibrary('Mi Biblioteca');
const song = new Song('Bohemian Rhapsody', 'Queen', 355, 'Rock');
library.addSong(song);

const playlist = library.createPlaylist('Mis Favoritas');
playlist.addSong(song);
console.log(playlist.getTotalDuration()); // 355 segundos
console.log(song.getFormattedDuration()); // "05:55"
```

### Ejemplo 2: Buscar y Filtrar Canciones

```javascript
const song1 = new Song('Song 1', 'Artist A', 180, 'Pop');
const song2 = new Song('Song 2', 'Artist A', 200, 'Rock');
library.addSong(song1);
library.addSong(song2);

const artistSongs = library.getSongsByArtist('Artist A');
console.log(artistSongs.length); // 2
```

### Ejemplo 3: Obtener Estadísticas

```javascript
const stats = library.getStatistics();
console.log(stats.totalSongs); // 2
console.log(stats.artists); // 1
console.log(stats.genres); // 2
```

## 🔍 Casos de Prueba

| Operación | Parámetros | Resultado Esperado | Explicación |
|-----------|------------|-------------------|-------------|
| Song constructor | parámetros válidos | Song creada | Constructor básico |
| getFormattedDuration | 125 segundos | "02:05" | Formato correcto |
| Playlist addSong | song válida | Canción agregada | Agregado exitoso |
| Playlist addSong | canción duplicada | Error "Song already in playlist" | Validación de duplicados |
| getTotalDuration | múltiples canciones | Suma de duraciones | Cálculo correcto |
| getSongsByArtist | artista existente | Array filtrado | Filtrado correcto |
| getMostPopularArtist | múltiples artistas | Artista con más canciones | Búsqueda correcta |
| getStatistics | biblioteca con canciones | Objeto con estadísticas | Estadísticas completas |

## ⚠️ Validaciones Requeridas

### Song
- Título, artista y género no pueden estar vacíos
- Duración debe ser > 0

### Playlist
- Nombre no puede estar vacío
- Los songs deben ser instancias de Song
- No se pueden agregar canciones duplicadas

### MusicLibrary
- Nombre no puede estar vacío
- Los songs deben ser instancias de Song
- No se pueden agregar canciones duplicadas (mismo título y artista)

## 🧮 Cálculos

### Formato de Duración
```
Minutos = Math.floor(segundos / 60)
Segundos = segundos % 60
Formato = "MM:SS" (con padStart para asegurar 2 dígitos)
```

### Duración Total
```
Duración Total = Σ duración de todas las canciones
```

## 🧠 Pistas (si tienes problemas)

<details>
<summary>💡 Pista 1 – Formatear duración</summary>

Para formatear la duración:
```javascript
const minutes = Math.floor(this.duration / 60);
const seconds = this.duration % 60;
return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
```

</details>

<details>
<summary>💡 Pista 2 – Calcular duración total con reduce()</summary>

Usa `reduce()` para sumar las duraciones:
```javascript
return this.songs.reduce((total, song) => {
    return total + song.getDuration();
}, 0);
```

</details>

<details>
<summary>💡 Pista 3 – Encontrar artista más popular</summary>

Agrupa las canciones por artista usando reduce() y encuentra el máximo:
```javascript
const artistCounts = this.songs.reduce((acc, song) => {
    const artist = song.getArtist();
    acc[artist] = (acc[artist] || 0) + 1;
    return acc;
}, {});
```

</details>

<details>
<summary>💡 Pista 4 – Contar artistas y géneros únicos</summary>

Usa Set para contar valores únicos:
```javascript
const artists = new Set(this.songs.map(song => song.getArtist()));
const genres = new Set(this.songs.map(song => song.getGenre()));
```

</details>

## 🧭 Pasos Sugeridos

1. Implementa la clase `Song` con constructor y métodos básicos
2. Implementa `getFormattedDuration()` para formatear la duración
3. Implementa la clase `Playlist` con constructor y métodos de gestión
4. Implementa métodos de cálculo usando `reduce()`
5. Implementa la clase `MusicLibrary` con constructor y métodos de gestión
6. Implementa `getMostPopularArtist()` y `getStatistics()`
7. Ejecuta los tests y refina hasta que todos pasen

## ✅ Checklist antes de enviar

- [ ] La clase `Song` valida todos los parámetros correctamente
- [ ] `getFormattedDuration()` formatea correctamente como "MM:SS"
- [ ] La clase `Playlist` gestiona canciones correctamente
- [ ] `getTotalDuration()` usa `reduce()` correctamente
- [ ] La clase `MusicLibrary` gestiona canciones y listas correctamente
- [ ] `getMostPopularArtist()` encuentra el artista correcto
- [ ] `getStatistics()` retorna todas las estadísticas correctamente
- [ ] Todos los mensajes de error coinciden con los especificados
- [ ] Los tests pasan al 100%

## 🏃‍♂️ Cómo ejecutar

1. Abre el archivo `exercise.js`
2. Implementa las clases `Song`, `Playlist` y `MusicLibrary` con todos los métodos requeridos
3. Ejecuta los tests: `npm test music-library` o `npm run test -- 40-music-library`
4. Verifica que todos los tests pasen

## 📚 Recursos Adicionales

- [Classes - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Classes)
- [Array.prototype.find() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find)
- [Array.prototype.filter() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
- [Array.prototype.reduce() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)
- [String.prototype.padStart() - MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

---

**💡 Tip:** Empieza implementando la clase `Song` y prueba el método `getFormattedDuration()` antes de pasar a `Playlist`. Recuerda usar `padStart(2, '0')` para asegurar que minutos y segundos tengan siempre 2 dígitos.

