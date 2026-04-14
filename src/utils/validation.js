/**
 * FlowPass – Input Security Utilities
 * ------------------------------------
 * Sanitization and validation helpers used across all user-facing inputs.
 * Centralising logic here ensures consistent protection everywhere.
 */

/**
 * Sanitize a generic text input.
 * - Strips HTML tags to block XSS injection.
 * - Removes shell-style special characters (<, >, &, ", ', `, ;, |, \, /).
 * - Trims leading/trailing whitespace.
 *
 * Input sanitized to prevent injection attacks.
 *
 * @param {string} value - Raw user input.
 * @returns {string} Safe, cleaned string.
 */
export function sanitizeText(value) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')          // Strip HTML/script tags
    .replace(/[<>&"'`;\|\\\/]/g, '')  // Remove shell / injection chars
    .trim();
}

/**
 * Sanitize an email input.
 * Strips everything that cannot appear in a valid email address.
 *
 * Input sanitized to prevent injection attacks.
 *
 * @param {string} value - Raw email input.
 * @returns {string} Cleaned email string.
 */
export function sanitizeEmail(value) {
  if (typeof value !== 'string') return '';
  // Allow only email-safe characters: letters, digits, @, ., _, -, +
  return value.replace(/[^a-zA-Z0-9@._\-+]/g, '').trim();
}

/**
 * Validate a seat code.
 * Expected format: one letter (A-Z / a-z) followed by 1–3 digits.
 * Examples of valid codes: A1, B45, G104
 *
 * Validation added for secure input handling.
 *
 * @param {string} value - Raw seat input.
 * @returns {{ valid: boolean, message: string }}
 */
export function validateSeat(value) {
  if (!value || value.trim() === '') {
    return { valid: false, message: 'Seat code is required.' };
  }

  // Input sanitized to prevent injection attacks.
  const sanitized = value.replace(/[^a-zA-Z0-9]/g, '').trim();

  // Validation added for secure input handling.
  const SEAT_PATTERN = /^[A-Za-z]\d{1,3}$/;
  if (!SEAT_PATTERN.test(sanitized)) {
    return {
      valid: false,
      message: 'Invalid seat format. Use a letter followed by 1–3 digits (e.g. A12, B104).',
    };
  }

  return { valid: true, message: '' };
}

/**
 * Sanitize a seat code value for controlled input binding.
 * Strips everything except letters and digits; caps total length at 4 chars.
 *
 * Input sanitized to prevent injection attacks.
 *
 * @param {string} value - Raw seat input.
 * @returns {string} Cleaned seat string.
 */
export function sanitizeSeat(value) {
  if (typeof value !== 'string') return '';
  return value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 4).toUpperCase();
}
