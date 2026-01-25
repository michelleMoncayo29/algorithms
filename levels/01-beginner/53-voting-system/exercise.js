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
        throw new Error('Candidate constructor not implemented');
    }

    /**
     * Returns a string representation of the candidate.
     * @returns {string} Format: "Name (Party)" or "Name" if no party
     */
    toString() {
        throw new Error('Method toString not implemented');
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
        throw new Error('VotingSystem constructor not implemented');
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
        throw new Error('Method addCandidate not implemented');
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
        throw new Error('Method vote not implemented');
    }

    /**
     * Gets the vote count for a specific candidate.
     * @param {string} candidateName - Name of the candidate (case-insensitive).
     * @returns {number} Number of votes for the candidate, or 0 if not found.
     */
    getVoteCount(candidateName) {
        throw new Error('Method getVoteCount not implemented');
    }

    /**
     * Gets the results of the voting.
     * @returns {Array<Object>} Array of objects with candidate name and vote count, sorted by votes (descending).
     * Format: [{name: "Candidate", votes: 5}, ...]
     */
    getResults() {
        throw new Error('Method getResults not implemented');
    }

    /**
     * Gets the total number of votes cast.
     * @returns {number} Total number of votes.
     */
    getTotalVotes() {
        throw new Error('Method getTotalVotes not implemented');
    }

    /**
     * Gets the winner(s) of the election (candidates with the most votes).
     * @returns {Array<string>} Array of candidate names with the highest vote count.
     */
    getWinner() {
        throw new Error('Method getWinner not implemented');
    }
}

module.exports = {
    Candidate,
    VotingSystem
};

