/**
 * Message resource interface for API responses
 */
export interface MessageResource {
  message: string;
}

/**
 * Factory function to create MessageResource objects
 */
export const createMessageResource = (message: string): MessageResource => ({
  message
});