/**
 * SOLUCIÓN: Sistema de Votación Simple
 * 
 * Esta es la solución de referencia para el ejercicio.
 * Los estudiantes pueden consultarla después de intentar resolver el problema.
 */

class Candidate {
    constructor(name, party = '') {
        // Validar que name sea un string no vacío
        if (typeof name !== 'string' || name.trim().length === 0) {
            throw new Error('Candidate name must be a non-empty string');
        }

        this.name = name.trim();
        this.party = party;
    }

    toString() {
        if (this.party) {
            return `${this.name} (${this.party})`;
        }
        return this.name;
    }
}

class VotingSystem {
    constructor() {
        this.candidates = [];
        this.votes = [];
        this.voters = new Set(); // Para rastrear votantes únicos
    }

    addCandidate(candidate) {
        // Validar que sea instancia de Candidate
        if (!(candidate instanceof Candidate)) {
            throw new Error('Candidate must be an instance of Candidate');
        }

        // Verificar si el candidato ya existe (case-insensitive)
        const normalizedName = candidate.name.toLowerCase();
        const exists = this.candidates.some(c => c.name.toLowerCase() === normalizedName);
        
        if (exists) {
            throw new Error('Candidate already exists');
        }

        this.candidates.push(candidate);
        return this.candidates.length;
    }

    vote(candidateName, voterId) {
        // Validar parámetros
        if (typeof candidateName !== 'string' || candidateName.trim().length === 0) {
            return false;
        }
        if (typeof voterId !== 'string' || voterId.trim().length === 0) {
            return false;
        }

        // Verificar si el votante ya votó
        if (this.voters.has(voterId)) {
            return false;
        }

        // Buscar candidato (case-insensitive)
        const normalizedName = candidateName.trim().toLowerCase();
        const candidate = this.candidates.find(c => c.name.toLowerCase() === normalizedName);

        if (!candidate) {
            return false;
        }

        // Registrar el voto
        this.votes.push({
            candidateName: candidate.name,
            voterId: voterId
        });

        // Marcar votante como que ya votó
        this.voters.add(voterId);

        return true;
    }

    getVoteCount(candidateName) {
        if (typeof candidateName !== 'string') {
            return 0;
        }

        const normalizedName = candidateName.toLowerCase();
        return this.votes.filter(v => v.candidateName.toLowerCase() === normalizedName).length;
    }

    getResults() {
        // Crear objeto con conteo de votos por candidato
        const voteCounts = {};
        
        this.candidates.forEach(candidate => {
            voteCounts[candidate.name] = this.getVoteCount(candidate.name);
        });

        // Convertir a array y ordenar por votos (descendente)
        const results = Object.entries(voteCounts).map(([name, votes]) => ({
            name,
            votes
        }));

        results.sort((a, b) => b.votes - a.votes);

        return results;
    }

    getTotalVotes() {
        return this.votes.length;
    }

    getWinner() {
        const results = this.getResults();
        
        if (results.length === 0) {
            return [];
        }

        const maxVotes = results[0].votes;
        
        // Retornar todos los candidatos con el máximo de votos (puede haber empate)
        return results.filter(r => r.votes === maxVotes).map(r => r.name);
    }
}

module.exports = {
    Candidate,
    VotingSystem
};

