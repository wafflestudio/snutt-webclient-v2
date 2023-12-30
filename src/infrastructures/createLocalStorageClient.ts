import { type StorageClient } from '@/clients/storage';

export const createLocalStorageClient = (): StorageClient => ({
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
  remove: (key) => localStorage.removeItem(key),
});
