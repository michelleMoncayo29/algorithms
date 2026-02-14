/**
 * Sistema de Cola de Mensajes Simple
 *
 * Description: Implementa una clase para gestionar cola FIFO de mensajes con prioridades básicas.
 * Difficulty: BEGINNER
 *
 * Suggested principles:
 * - KISS and expressive naming
 * - Fail Fast when validating inputs
 * - FIFO (First In, First Out) queue structure
 */

/**
 * Manages a FIFO message queue with basic priority support.
 * @class
 */
class MessageQueue {
    /**
     * Creates an empty message queue.
     *
     * TODO:
     * - Initialize internal array for messages
     */
    constructor() {
        this.messages = [];
    }

    /**
     * Adds a message to the queue.
     * @param {string} message - Message content (non-empty string).
     * @param {number} priority - Priority level (0=normal, 1=high, 2=urgent). Default 0.
     * @returns {number} Total number of messages in queue after insertion.
     *
     * TODO:
     * - Validate that message is a non-empty string
     * - Validate that priority is 0, 1, or 2
     * - Add message to queue with priority
     * - Return queue size
     */
    enqueue(message, priority = 0) {
        if (typeof message !== 'string' || message.trim().length === 0) {
            throw new Error('Message must be a non-empty string');
        }

        if (isNaN(priority) || priority < 0 || priority > 2) {
            throw new Error('Priority must be 0 (normal), 1 (high), or 2 (urgent)');
        }

        this.messages.push({ message, priority });
        return this.messages.length;
    }

    /**
     * Removes and returns the next message from the queue (FIFO, but priority first).
     * Priority order: urgent (2) > high (1) > normal (0)
     * Within same priority, FIFO order.
     * @returns {Object|null} Message object {message: string, priority: number} or null if empty.
     *
     * TODO:
     * - If queue is empty, return null
     * - Find message with highest priority (if multiple, take first one added)
     * - Remove and return that message
     */
    dequeue() {
        if (this.messages.length === 0) {
            return null;
        }
    }

    /**
     * Returns the next message without removing it.
     * @returns {Object|null} Message object or null if empty.
     */
    peek() {
        throw new Error('Method peek not implemented');
    }

    /**
     * Returns the number of messages in the queue.
     * @returns {number} Queue size.
     */
    size() {
        return this.messages.length;
    }

    /**
     * Checks if the queue is empty.
     * @returns {boolean} true if empty, false otherwise.
     */
    isEmpty() {
        return this.messages.length === 0;
    }

    /**
     * Removes all messages from the queue.
     * @returns {MessageQueue} Returns this for method chaining.
     */
    clear() {
        this.messages = [];
        return this;
    }

    /**
     * Gets all messages as an array (immutable copy).
     * @returns {Array<Object>} Array of message objects.
     */
    getAll() {
        return [...this.messages];
    }
}

module.exports = MessageQueue;

