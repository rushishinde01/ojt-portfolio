// state.js — single source of truth for theme state
// Only exports: state object and setState function

export const state = {
  theme: 'light', // 'light' | 'dark'
};

/**
 * Update a key in the state object.
 * @param {string} key
 * @param {*} value
 */
export const setState = (key, value) => {
  state[key] = value;
};
