import { key } from '../references/storage.json';

export const useSessionStorage = () => {
  function get() {
    try {
      const savedData = sessionStorage.getItem(key);
      return savedData ? JSON.parse(savedData) : {};
    } catch {
      return {};
    }
  }

  function set(data: { height?: number; weight?: number; selectedDays?: string[]; goal?: string }) {
    return new Promise((resolve, reject) => {
      try {
        sessionStorage.setItem(key, JSON.stringify(data));
        resolve(undefined);
      } catch {
        reject();
      }
    });
  }

  return [get, set];
};
