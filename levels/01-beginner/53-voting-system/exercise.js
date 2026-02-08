/**
 * Sistema de Votación Simple
 *
 * Description: Implementa clases para gestionar votaciones, candidatos, votos y resultados.
 * Difficulty: BEGINNER
 *
 * Suggested principles:
 * - KISS and expressive naming to keep methods small
 * - Fail Fast when validating inputs
 * - Prefer immutability when returning derived data
 */

/**
 * Represents a candidate in the voting system.
 * @class
 */
class Candidate {
  /**
   * @param {string} name - Name of the candidate (non-empty).
   * @param {string} party - Political party or affiliation (optional).
   *
   * TODO:
   * - Validate that name is a non-empty string
   * - Throw error "Candidate name must be a non-empty string" if invalid
   * - Assign validated values to `this`
   */
  constructor(name, party = '') {
    // Validar que name sea un string no vacío
    if (typeof name !== 'string' || name.trim().length === 0) {
      throw new Error('Candidate name must be a non-empty string');
    }

    this.name = name.trim();
    this.party = party;
  }

  /**
   * Returns a string representation of the candidate.
   * @returns {string} Format: "Name (Party)" or "Name" if no party
   */
  toString() {
    if (this.party) {
      return `${this.name} (${this.party})`;
    }
    return this.name;
  }
}

/**
 * Manages the entire voting system.
 * @class
 */
class VotingSystem {
  /**
   * Creates an empty voting system.
   *
   * TODO:
   * - Initialize internal arrays for candidates and votes
   * - Initialize a Set or Map to track voters who have already voted
   */
  constructor() {
    this.candidates = [];
    this.votes = [];
    this.voters = new Set(); // Para rastrear votantes únicos
  }

  /**
   * Adds a candidate to the voting system.
   * @param {Candidate} candidate - Valid Candidate instance.
   * @returns {number} Total number of candidates after insertion.
   *
   * TODO:
   * - Validate using instanceof Candidate
   * - Throw error "Candidate must be an instance of Candidate" if validation fails
   * - Check if candidate name already exists (case-insensitive)
   * - Throw error "Candidate already exists" if duplicate
   * - Add candidate and return count
   */
  addCandidate(candidate) {
    // Validar que sea instancia de Candidate
    if (!(candidate instanceof Candidate)) {
      throw new Error('Candidate must be an instance of Candidate');
    }

    // Verificar si el candidato ya existe (case-insensitive)
    const normalizedName = candidate.name.toLowerCase();
    const exists = this.candidates.some(
      c => c.name.toLowerCase() === normalizedName
    );

    if (exists) {
      throw new Error('Candidate already exists');
    }

    this.candidates.push(candidate);
    return this.candidates.length;
  }

  /**
   * Records a vote for a candidate.
   * @param {string} candidateName - Name of the candidate to vote for (case-insensitive).
   * @param {string} voterId - Unique identifier for the voter.
   * @returns {boolean} true if vote was recorded, false if voter already voted or candidate not found.
   *
   * TODO:
   * - Validate that candidateName and voterId are non-empty strings
   * - Check if voter has already voted (using voterId)
   * - Check if candidate exists (case-insensitive search)
   * - Record the vote and mark voter as having voted
   * - Return true if successful, false otherwise
   */
  vote(candidateName, voterId) {
    // Validar parámetros
    if (
      typeof candidateName !== 'string' ||
      candidateName.trim().length === 0
    ) {
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
    const candidate = this.candidates.find(
      c => c.name.toLowerCase() === normalizedName
    );

    if (!candidate) {
      return false;
    }

    // Registrar el voto
    this.votes.push({
      candidateName: candidate.name,
      voterId: voterId,
    });

    // Marcar votante como que ya votó
    this.voters.add(voterId);

    return true;
  }

  /**
   * Gets the vote count for a specific candidate.
   * @param {string} candidateName - Name of the candidate (case-insensitive).
   * @returns {number} Number of votes for the candidate, or 0 if not found.
   */
  getVoteCount(candidateName) {
    if (typeof candidateName !== 'string') {
      return 0;
    }

    const normalizedName = candidateName.toLowerCase();
    return this.votes.filter(
      v => v.candidateName.toLowerCase() === normalizedName
    ).length;
  }

  /**
   * Gets the results of the voting.
   * @returns {Array<Object>} Array of objects with candidate name and vote count, sorted by votes (descending).
   * Format: [{name: "Candidate", votes: 5}, ...]
   */
  getResults() {
    // Crear objeto con conteo de votos por candidato
    const voteCounts = {};

    this.candidates.forEach(candidate => {
      voteCounts[candidate.name] = this.getVoteCount(candidate.name);
    });

    // Convertir a array y ordenar por votos (descendente)
    const results = Object.entries(voteCounts).map(([name, votes]) => ({
      name,
      votes,
    }));

    results.sort((a, b) => b.votes - a.votes);

    return results;
  }

  /**
   * Gets the total number of votes cast.
   * @returns {number} Total number of votes.
   */
  getTotalVotes() {
    return this.votes.length;
  }

  /**
   * Gets the winner(s) of the election (candidates with the most votes).
   * @returns {Array<string>} Array of candidate names with the highest vote count.
   */
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
  VotingSystem,
};
