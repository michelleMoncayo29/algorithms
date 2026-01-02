/**
 * Sistema de Gestión de Biblioteca de Música (Music Library Management System)
 *
 * Descripción: Implementa tres clases básicas (`Song`, `Playlist` y `MusicLibrary`) para practicar
 * constructores, métodos de instancia, validaciones complejas, gestión de listas de reproducción,
 * cálculos de duración y búsqueda avanzada de canciones.
 * Dificultad: BEGINNER
 *
 * Principios sugeridos:
 * - KISS: mantener el código simple y expresivo
 * - Validaciones Fail Fast: validar antes de continuar
 * - Responsabilidad Única: cada clase tiene un propósito claro
 * - Uso de métodos de arrays: find, filter, reduce, some
 */

/**
 * Representa una canción.
 * Traducción: Canción
 * @class
 */
class Song {
    /**
     * Constructor de la clase Song
     * Traducción: Constructor de Canción
     *
     * Crea una nueva canción con título, artista, duración y género.
     * Valida que todos los parámetros sean válidos antes de asignarlos.
     *
     * @param {string} title - Título de la canción (no puede estar vacío)
     * @param {string} artist - Artista de la canción (no puede estar vacío)
     * @param {number} duration - Duración en segundos (debe ser mayor que 0)
     * @param {string} genre - Género musical (no puede estar vacío)
     *
     * TODO:
     * - Valida que title sea un string no vacío (después de trim)
     * - Lanza error "Song title is required" si el título es inválido
     * - Valida que artist sea un string no vacío (después de trim)
     * - Lanza error "Song artist is required" si el artista es inválido
     * - Valida que duration sea un número mayor que 0
     * - Lanza error "Song duration must be greater than 0" si la duración es inválida
     * - Valida que genre sea un string no vacío (después de trim)
     * - Lanza error "Song genre is required" si el género es inválido
     * - Asigna los valores validados a las propiedades correspondientes
     */
    constructor(title, artist, duration, genre) {
        if (typeof title !== 'string' || title.trim().length === 0) {
            throw new Error('Song title is required');
        }
        if (typeof artist !== 'string' || artist.trim().length === 0) {
            throw new Error('Song artist is required');
        }
        if (typeof duration !== 'number' || duration <= 0 || isNaN(duration)) {
            throw new Error('Song duration must be greater than 0');
        }
        if (typeof genre !== 'string' || genre.trim().length === 0) {
            throw new Error('Song genre is required');
        }

        this.title = title;
        this.artist = artist;
        this.duration = duration;
        this.genre = genre;
    }

    /**
     * Obtiene la duración en segundos.
     * Traducción: Obtener Duración
     *
     * @returns {number} Duración en segundos
     *
     * TODO:
     * - Retorna this.duration
     */
    getDuration() {
        return this.duration;
    }

    /**
     * Obtiene el artista de la canción.
     * Traducción: Obtener Artista
     *
     * @returns {string} Nombre del artista
     *
     * TODO:
     * - Retorna this.artist
     */
    getArtist() {
        return this.artist;
    }

    /**
     * Obtiene el género de la canción.
     * Traducción: Obtener Género
     *
     * @returns {string} Género musical
     *
     * TODO:
     * - Retorna this.genre
     */
    getGenre() {
        return this.genre;
    }

    /**
     * Formatea la duración como "MM:SS".
     * Traducción: Formatear Duración
     *
     * Este método convierte la duración en segundos a formato "MM:SS".
     *
     * @returns {string} Duración formateada como "MM:SS"
     *
     * TODO:
     * - Calcula minutos: Math.floor(this.duration / 60)
     * - Calcula segundos: this.duration % 60
     * - Formatea minutos y segundos con padStart(2, '0') para asegurar 2 dígitos
     * - Retorna el string formateado como "MM:SS"
     */
    getFormattedDuration() {
        const minutes = Math.floor(this.duration / 60);
        const seconds = this.duration % 60;

        const mm = String(minutes).padStart(2, '0');
        const ss = String(seconds).padStart(2, '0');

        return `${mm}:${ss}`;
    }
}

/**
 * Representa una lista de reproducción.
 * Traducción: Lista de Reproducción
 * @class
 */
class Playlist {
    /**
     * Constructor de la clase Playlist
     * Traducción: Constructor de Lista de Reproducción
     *
     * Crea una nueva lista de reproducción con nombre.
     * Inicializa arrays vacíos para canciones.
     *
     * @param {string} name - Nombre de la lista (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Playlist name is required" si el nombre es inválido
     * - Inicializa this.songs como un array vacío []
     * - Asigna el nombre validado a this.name
     */
    constructor(name) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Playlist name is required');
        }

        this.name = name;
        this.songs = [];
    }

    /**
     * Agrega una canción a la lista de reproducción.
     * Traducción: Agregar Canción
     *
     * Este método agrega una canción a la lista. Debe validar que sea una instancia de Song
     * y que no esté ya en la lista.
     *
     * @param {Song} song - Instancia de Song a agregar
     * @returns {Song} La canción agregada
     *
     * TODO:
     * - Valida que song sea una instancia de Song
     * - Lanza error "Song must be an instance of Song" si es inválido
     * - Verifica si la canción ya está en la lista usando some()
     * - Si ya existe, lanza un error: "Song already in playlist"
     * - Agrega la canción al array this.songs usando push()
     * - Retorna la canción agregada
     */
    addSong(song) {
        if (!(song instanceof Song)) {
            throw new Error('Song must be an instance of Song');
        }

        const ExistMusic = this.songs.some(music => music === song);

        if (ExistMusic) {
            throw new Error('Song already in playlist');
        }

        this.songs.push(song);
        return song;
    }

    /**
     * Elimina una canción de la lista de reproducción.
     * Traducción: Eliminar Canción
     *
     * Este método elimina una canción de la lista buscándola por título.
     *
     * @param {string} songTitle - Título de la canción a eliminar
     * @returns {boolean} true si se eliminó correctamente
     *
     * TODO:
     * - Encuentra el índice de la canción usando findIndex()
     * - Compara song.title con songTitle
     * - Si no se encuentra, retorna false
     * - Elimina la canción del array usando splice()
     * - Retorna true si se eliminó correctamente
     */
    removeSong(songTitle) {
        const songIndex = this.songs.findIndex(song => song.title === songTitle);

        if (songIndex === -1) {
            return false;
        }

        this.songs.splice(songIndex, 1);

        return true;
    }

    /**
     * Calcula la duración total de la lista usando reduce().
     * Traducción: Obtener Duración Total
     *
     * Este método calcula la duración total sumando la duración de todas las canciones.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} Duración total en segundos
     *
     * TODO:
     * - Usa this.songs.reduce() para calcular la duración total
     * - Para cada canción, suma song.getDuration() al acumulador
     * - Retorna la duración total
     * - Si la lista está vacía, retorna 0
     */
    getTotalDuration() {
        if (this.songs.length === 0) {
            return 0;
        }

        return this.songs.reduce((total, song) => {
            return total + song.getDuration();
        }, 0);
    }

    /**
     * Obtiene todas las canciones de un artista específico usando filter().
     * Traducción: Obtener Canciones por Artista
     *
     * Este método retorna un nuevo array con todas las canciones del artista especificado.
     * Debe usar el método filter() del array.
     *
     * @param {string} artist - Nombre del artista
     * @returns {Song[]} Array con las canciones de ese artista
     *
     * TODO:
     * - Usa this.songs.filter() para filtrar canciones
     * - Filtra canciones donde song.getArtist() === artist
     * - Retorna el nuevo array filtrado
     */
    getSongsByArtist(artist) {
        return this.songs.filter(song => song.getArtist() === artist);
    }

    /**
     * Obtiene todas las canciones de un género específico usando filter().
     * Traducción: Obtener Canciones por Género
     *
     * Este método retorna un nuevo array con todas las canciones del género especificado.
     * Debe usar el método filter() del array.
     *
     * @param {string} genre - Género musical
     * @returns {Song[]} Array con las canciones de ese género
     *
     * TODO:
     * - Usa this.songs.filter() para filtrar canciones
     * - Filtra canciones donde song.getGenre() === genre
     * - Retorna el nuevo array filtrado
     */
    getSongsByGenre(genre) {
        return this.songs.filter(song => song.getGenre() === genre);
    }

    /**
     * Mezcla las canciones de la lista aleatoriamente.
     * Traducción: Mezclar Canciones
     *
     * Este método reorganiza las canciones en orden aleatorio.
     *
     * @returns {boolean} true si se mezcló correctamente
     *
     * TODO:
     * - Crea una copia del array this.songs
     * - Usa el algoritmo Fisher-Yates para mezclar aleatoriamente
     * - O usa sort() con Math.random() - 0.5
     * - Asigna el array mezclado a this.songs
     * - Retorna true
     */
    shuffle() {
        const copie = [...this.songs];
        // Para ordenar aleatoriamente
        copie.sort(() => Math.random() - 0.5);
        return true;
    }

    /**
     * Obtiene el número total de canciones.
     * Traducción: Obtener Total de Canciones
     *
     * @returns {number} Número total de canciones en la lista
     *
     * TODO:
     * - Retorna this.songs.length
     */
    getSongCount() {
        return this.songs.length;
    }
}

/**
 * Gestiona la biblioteca de música y sus operaciones.
 * Traducción: Biblioteca de Música
 * @class
 */
class MusicLibrary {
    /**
     * Constructor de la clase MusicLibrary
     * Traducción: Constructor de Biblioteca de Música
     *
     * Crea una nueva biblioteca de música con nombre.
     * Inicializa arrays vacíos para canciones y listas de reproducción.
     *
     * @param {string} name - Nombre de la biblioteca (no puede estar vacío)
     *
     * TODO:
     * - Valida que name sea un string no vacío (después de trim)
     * - Lanza error "Library name is required" si el nombre es inválido
     * - Inicializa this.songs como un array vacío []
     * - Inicializa this.playlists como un array vacío []
     * - Asigna el nombre validado a this.name
     */
    constructor(name) {
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Library name is required');
        }

        this.songs = [];
        this.playlists = [];
        this.name = name;
    }

    /**
     * Agrega una canción a la biblioteca.
     * Traducción: Agregar Canción
     *
     * Este método agrega una canción a la biblioteca. Debe validar que sea una instancia de Song
     * y que no exista ya una canción con el mismo título y artista.
     *
     * @param {Song} song - Instancia de Song a agregar
     * @returns {Song} La canción agregada
     *
     * TODO:
     * - Valida que song sea una instancia de Song
     * - Lanza error "Song must be an instance of Song" si es inválido
     * - Verifica si ya existe una canción con el mismo título y artista usando some()
     * - Si existe, lanza un error: "Song already exists in library"
     * - Agrega la canción al array this.songs usando push()
     * - Retorna la canción agregada
     */
    addSong(song) {
        if (!(song instanceof Song)) {
            throw new Error('Song must be an instance of Song');
        }

        const alreadyExists = this.songs.some(s => 
            s.title === song.title && s.artist === song.artist
        );

        if (alreadyExists) {
            throw new Error('Song already exists in library');
        }

        this.songs.push(song);

        return song;
    }

    /**
     * Busca una canción por título usando find().
     * Traducción: Buscar Canción
     *
     * Este método busca una canción cuyo título coincida exactamente con el parámetro recibido.
     *
     * @param {string} title - Título de la canción a buscar
     * @returns {Song|null} La canción encontrada o null si no existe
     *
     * TODO:
     * - Usa this.songs.find() para buscar una canción cuyo title coincida exactamente
     * - Retorna la canción encontrada o null si no se encuentra
     */
    findSong(title) {
        const existMusic = this.songs.find(song => song.title === title);
        return existMusic || null;

    }

    /**
     * Crea una nueva lista de reproducción.
     * Traducción: Crear Lista de Reproducción
     *
     * Este método crea una nueva lista de reproducción y la agrega a la biblioteca.
     *
     * @param {string} playlistName - Nombre de la lista de reproducción
     * @returns {Playlist} La lista de reproducción creada
     *
     * TODO:
     * - Crea una nueva instancia de Playlist con el nombre recibido
     * - Agrega la lista al array this.playlists usando push()
     * - Retorna la lista creada
     */
    createPlaylist(playlistName) {
        const newList = new Playlist(playlistName);
        this.playlists.push(newList);
        return newList;
    }

    /**
     * Obtiene todas las canciones de un artista específico usando filter().
     * Traducción: Obtener Canciones por Artista
     *
     * Este método retorna un nuevo array con todas las canciones del artista especificado.
     * Debe usar el método filter() del array.
     *
     * @param {string} artist - Nombre del artista
     * @returns {Song[]} Array con las canciones de ese artista
     *
     * TODO:
     * - Usa this.songs.filter() para filtrar canciones
     * - Filtra canciones donde song.getArtist() === artist
     * - Retorna el nuevo array filtrado
     */
    getSongsByArtist(artist) {
        return this.songs.filter(song => song.getArtist() === artist);
    }

    /**
     * Obtiene todas las canciones de un género específico usando filter().
     * Traducción: Obtener Canciones por Género
     *
     * Este método retorna un nuevo array con todas las canciones del género especificado.
     * Debe usar el método filter() del array.
     *
     * @param {string} genre - Género musical
     * @returns {Song[]} Array con las canciones de ese género
     *
     * TODO:
     * - Usa this.songs.filter() para filtrar canciones
     * - Filtra canciones donde song.getGenre() === genre
     * - Retorna el nuevo array filtrado
     */
    getSongsByGenre(genre) {
        return this.songs.filter(song => song.getGenre() === genre);
    }

    /**
     * Calcula la duración total de todas las canciones usando reduce().
     * Traducción: Obtener Duración Total
     *
     * Este método calcula la duración total sumando la duración de todas las canciones en la biblioteca.
     * Debe usar el método reduce() del array.
     *
     * @returns {number} Duración total en segundos
     *
     * TODO:
     * - Usa this.songs.reduce() para calcular la duración total
     * - Para cada canción, suma song.getDuration() al acumulador
     * - Retorna la duración total
     * - Si no hay canciones, retorna 0
     */
    getTotalDuration() {
        return this.songs.reduce((acc, song) => {
            return acc + song.getDuration();
        }, 0);
    }

    /**
     * Obtiene el artista más popular (con más canciones).
     * Traducción: Obtener Artista Más Popular
     *
     * Este método encuentra el artista que tiene más canciones en la biblioteca.
     *
     * @returns {string|null} Nombre del artista más popular o null si no hay canciones
     *
     * TODO:
     * - Si no hay canciones, retorna null
     * - Agrupa las canciones por artista y cuenta cuántas canciones tiene cada uno
     * - Encuentra el artista con más canciones
     * - Retorna el nombre del artista más popular
     * - Si hay empate, retorna el primero encontrado
     */
    getMostPopularArtist() {
        if (this.songs.length === 0) {
            return null;
        }

        // Agrupa las canciones por artista y cuenta cuántas canciones tiene cada uno
        const artistCounts = this.songs.reduce((acc, song) => {
            const artist = song.getArtist();
            acc[artist] = (acc[artist] || 0) + 1;
            return acc;
        }, {});

        // Encuentra el artista con más canciones
        let mostPopular = null;
        let maxCount = 0;

        Object.keys(artistCounts).forEach(artist => {
            if (artistCounts[artist] > maxCount) {
                maxCount = artistCounts[artist];
                mostPopular = artist;
            }
        });

        // Retorna el nombre del artista más popular
        return mostPopular;
    }

    /**
     * Obtiene estadísticas de la biblioteca.
     * Traducción: Obtener Estadísticas
     *
     * Este método retorna un objeto con estadísticas de la biblioteca:
     * - totalSongs: número total de canciones
     * - totalPlaylists: número total de listas de reproducción
     * - totalDuration: duración total en segundos
     * - artists: número de artistas únicos
     * - genres: número de géneros únicos
     *
     * @returns {Object} Objeto con las estadísticas de la biblioteca
     *
     * TODO:
     * - Crea un objeto con las estadísticas solicitadas
     * - totalSongs: this.songs.length
     * - totalPlaylists: this.playlists.length
     * - totalDuration: usa getTotalDuration()
     * - artists: cuenta artistas únicos usando Set
     * - genres: cuenta géneros únicos usando Set
     * - Retorna el objeto con todas las estadísticas
     */
    getStatistics() {
        // Calcula estadísticas básicas
        const totalSongs = this.songs.length;
        const totalPlaylists = this.playlists.length;
        const totalDuration = this.getTotalDuration();

        // Cuenta artistas únicos usando Set
        const artists = new Set(this.songs.map(song => song.getArtist()));

        // Cuenta géneros únicos usando Set
        const genres = new Set(this.songs.map(song => song.getGenre()));

        // Retorna objeto con todas las estadísticas
        return {
            totalSongs,
            totalPlaylists,
            totalDuration,
            artists: artists.size,
            genres: genres.size
        };
    }
}

module.exports = {
    Song,
    Playlist,
    MusicLibrary
};

