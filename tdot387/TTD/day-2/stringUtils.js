/**
 * String Utilities for Text Formatting
 *
 * These functions are commonly used in web applications,
 * e.g., for formatting user input, URLs, etc.
 */

/**
 * Removes whitespace from the beginning and end of a string
 * @param {string} str - The string to trim
 * @returns {string} String without leading/trailing whitespace
 */
function trim(str) {
  if (typeof str !== 'string') {
    return '';
  }

  return str.trim();
}

/**
 * Capitalizes the first letter, lowercases the rest
 * @param {string} str - The string to format
 * @returns {string} String with capitalized first letter
 */
function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string to a URL-friendly slug
 * Spaces become dashes, everything lowercase
 * @param {string} str - The string to convert
 * @returns {string} URL-friendly slug
 */
function slugify(str) {
  if (typeof str !== 'string') {
    return '';
  }

  return str
    .toLowerCase()
    .replace(/\s+/g, '-');
}

module.exports = {
  trim,
  capitalize,
  slugify
};
