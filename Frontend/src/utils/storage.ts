/**
 * Local storage utilities with error handling and type safety
 */

/**
 * Sets an item in localStorage
 */
export const setItem = <T>(key: string, value: T): void => {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
};

/**
 * Gets an item from localStorage
 */
export const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading from localStorage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Removes an item from localStorage
 */
export const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage key "${key}":`, error);
  }
};

/**
 * Clears all items from localStorage
 */
export const clear = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

/**
 * Checks if a key exists in localStorage
 */
export const hasItem = (key: string): boolean => {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error(`Error checking localStorage key "${key}":`, error);
    return false;
  }
};

/**
 * Gets all keys from localStorage
 */
export const getKeys = (): string[] => {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('Error getting localStorage keys:', error);
    return [];
  }
};

/**
 * Gets the size of localStorage in bytes
 */
export const getSize = (): number => {
  try {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  } catch (error) {
    console.error('Error calculating localStorage size:', error);
    return 0;
  }
};

/**
 * Session storage utilities
 */
export const session = {
  setItem: <T>(key: string, value: T): void => {
    try {
      const serialized = JSON.stringify(value);
      sessionStorage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error saving to sessionStorage key "${key}":`, error);
    }
  },

  getItem: <T>(key: string, defaultValue: T): T => {
    try {
      const item = sessionStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from sessionStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  removeItem: (key: string): void => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from sessionStorage key "${key}":`, error);
    }
  },

  clear: (): void => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
    }
  },

  hasItem: (key: string): boolean => {
    try {
      return sessionStorage.getItem(key) !== null;
    } catch (error) {
      console.error(`Error checking sessionStorage key "${key}":`, error);
      return false;
    }
  }
};

/**
 * Storage keys constants
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
  RECENT_SEARCHES: 'recent_searches',
  FAVORITES: 'favorites'
} as const;

export default {
  setItem,
  getItem,
  removeItem,
  clear,
  hasItem,
  getKeys,
  getSize,
  session,
  STORAGE_KEYS
};
