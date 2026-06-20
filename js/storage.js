// storage.js — localStorage helpers with JSON serialization
// Always use these helpers; never call localStorage directly elsewhere

/**
 * Retrieve a value from localStorage, parsed as JSON.
 * @param {string} key
 * @param {*} defaultValue - returned when key is absent or parse fails
 * @returns {*}
 */
export const getItem = (key, defaultValue = null) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
};

/**
 * Persist a value to localStorage, serialized as JSON.
 * @param {string} key
 * @param {*} value
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded or private-browsing restriction — fail silently
  }
};
