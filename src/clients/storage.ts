import { type StorageKey } from '@/entities/storage';

export interface StorageClient {
  get(key: StorageKey): string | null;
  set(key: StorageKey, value: string): void;
  remove(key: StorageKey): void;
}

export const getStorageClient = (persist: boolean): StorageClient => ({
  get: (key) => (persist ? localStorage.getItem(key) : sessionStorage.getItem(key)),
  set: (key, value) => (persist ? localStorage.setItem(key, value) : sessionStorage.setItem(key, value)),
  remove: (key) => (persist ? localStorage.removeItem(key) : sessionStorage.removeItem(key)),
});
