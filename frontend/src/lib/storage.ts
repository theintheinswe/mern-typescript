interface Storage {
  get: <T>(key: string) => T | null;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
}

export const storage: Storage = {
  get: <T>(key: string): T | null => {
    try {
      return JSON.parse(localStorage.getItem(key) as string) as T;
    } catch (error) {
      console.log(`Error getting Key [${key}] from localStorage`, error);
      return null;
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(`Error setting Key [${key}] in localStorage`, error);
    }
  },
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },
};
