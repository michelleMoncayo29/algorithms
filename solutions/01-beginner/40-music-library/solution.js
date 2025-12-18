/**
 * Solución: Sistema de Gestión de Biblioteca de Música
 * 
 * Esta implementación muestra cómo crear clases Song, Playlist y MusicLibrary que gestionan
 * canciones, listas de reproducción y operaciones de biblioteca musical.
 */

class Song {
    constructor(title, artist, duration, genre) {
        // Valida que el título sea un string no vacío
        if (typeof title !== 'string' || title.trim().length === 0) {
            throw new Error('Song title is required');
        }

        // Valida que el artista sea un string no vacío
        if (typeof artist !== 'string' || artist.trim().length === 0) {
            throw new Error('Song artist is required');
        }

        // Valida que la duración sea un número mayor que 0
        if (typeof duration !== 'number' || duration <= 0) {
            throw new Error('Song duration must be greater than 0');
        }

        // Valida que el género sea un string no vacío
        if (typeof genre !== 'string' || genre.trim().length === 0) {
            throw new Error('Song genre is required');
        }

        // Asigna los valores validados
        this.title = title.trim();
        this.artist = artist.trim();
        this.duration = duration;
        this.genre = genre.trim();
    }

    getDuration() {
        return this.duration;
    }

    getArtist() {
        return this.artist;
    }

    getGenre() {
        return this.genre;
    }

    getFormattedDuration() {
        // Calcula minutos
        const minutes = Math.floor(this.duration / 60);
        
        // Calcula segundos
        const seconds = this.duration % 60;

        // Formatea con padStart para asegurar 2 dígitos
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        // Retorna el string formateado
        return `${formattedMinutes}:${formattedSeconds}`;
    }
}

class Playlist {
    constructor(name) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Playlist name is required');
        }

        // Asigna el nombre validado
        this.name = name.trim();
        // Inicializa el array de canciones vacío
        this.songs = [];
    }

    addSong(song) {
        // Valida que song sea una instancia de Song
        if (!(song instanceof Song)) {
            throw new Error('Song must be an instance of Song');
        }

        // Verifica si la canción ya está en la lista usando some()
        const alreadyExists = this.songs.some(s => s === song);

        if (alreadyExists) {
            throw new Error('Song already in playlist');
        }

        // Agrega la canción al array
        this.songs.push(song);

        // Retorna la canción agregada
        return song;
    }

    removeSong(songTitle) {
        // Encuentra el índice de la canción
        const songIndex = this.songs.findIndex(song => song.title === songTitle);

        // Si no se encuentra, retorna false
        if (songIndex === -1) {
            return false;
        }

        // Elimina la canción del array
        this.songs.splice(songIndex, 1);

        // Retorna true si se eliminó correctamente
        return true;
    }

    getTotalDuration() {
        // Si la lista está vacía, retorna 0
        if (this.songs.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular la duración total
        return this.songs.reduce((total, song) => {
            return total + song.getDuration();
        }, 0);
    }

    getSongsByArtist(artist) {
        // Usa filter() para obtener canciones del artista especificado
        return this.songs.filter(song => song.getArtist() === artist);
    }

    getSongsByGenre(genre) {
        // Usa filter() para obtener canciones del género especificado
        return this.songs.filter(song => song.getGenre() === genre);
    }

    shuffle() {
        // Crea una copia del array para mezclar
        const shuffled = [...this.songs];

        // Usa el algoritmo Fisher-Yates para mezclar aleatoriamente
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        // Asigna el array mezclado
        this.songs = shuffled;

        // Retorna true
        return true;
    }

    getSongCount() {
        // Retorna el número total de canciones
        return this.songs.length;
    }
}

class MusicLibrary {
    constructor(name) {
        // Valida que el nombre sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Library name is required');
        }

        // Asigna el nombre validado
        this.name = name.trim();
        // Inicializa el array de canciones vacío
        this.songs = [];
        // Inicializa el array de listas de reproducción vacío
        this.playlists = [];
    }

    addSong(song) {
        // Valida que song sea una instancia de Song
        if (!(song instanceof Song)) {
            throw new Error('Song must be an instance of Song');
        }

        // Verifica si ya existe una canción con el mismo título y artista usando some()
        const alreadyExists = this.songs.some(s => 
            s.title === song.title && s.artist === song.artist
        );

        if (alreadyExists) {
            throw new Error('Song already exists in library');
        }

        // Agrega la canción al array
        this.songs.push(song);

        // Retorna la canción agregada
        return song;
    }

    findSong(title) {
        // Usa find() para buscar una canción cuyo título coincida exactamente
        const song = this.songs.find(song => song.title === title);
        return song || null;
    }

    createPlaylist(playlistName) {
        // Crea una nueva instancia de Playlist
        const playlist = new Playlist(playlistName);

        // Agrega la lista al array
        this.playlists.push(playlist);

        // Retorna la lista creada
        return playlist;
    }

    getSongsByArtist(artist) {
        // Usa filter() para obtener canciones del artista especificado
        return this.songs.filter(song => song.getArtist() === artist);
    }

    getSongsByGenre(genre) {
        // Usa filter() para obtener canciones del género especificado
        return this.songs.filter(song => song.getGenre() === genre);
    }

    getTotalDuration() {
        // Si no hay canciones, retorna 0
        if (this.songs.length === 0) {
            return 0;
        }

        // Usa reduce() para calcular la duración total
        return this.songs.reduce((total, song) => {
            return total + song.getDuration();
        }, 0);
    }

    getMostPopularArtist() {
        // Si no hay canciones, retorna null
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

