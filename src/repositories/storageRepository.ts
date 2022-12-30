import { StorageKey } from '@/entities/storage';

export interface StorageRepository {
  get(key: StorageKey, persist: boolean): string | null;
  set(key: StorageKey, value: string, persist: boolean): void;
  remove(key: StorageKey, persist: boolean): void;
}

const getStorageRepository = (): StorageRepository => {
  return {
    get: (key, persist) => (persist ? localStorage.getItem(key) : sessionStorage.getItem(key)),
    set: (key, value, persist) => (persist ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value)),
    remove: (key, persist) => (persist ? localStorage.removeItem(key) : sessionStorage.removeItem(key)),
  };
};

export const storageRepository = getStorageRepository();
