export interface StorageRepository {
  getToken(): string | null;
  setToken(token: string, persist: boolean): void;
  clearToken(): void;
}

const tokenKey = 'snutt_token';

const getStorageRepository = (): StorageRepository => {
  return {
    getToken: () => sessionStorage.getItem(tokenKey) ?? localStorage.getItem(tokenKey),
    setToken: (token, persist) => (persist ? localStorage : sessionStorage).setItem(tokenKey, token),
    clearToken: () => {
      localStorage.removeItem(tokenKey);
      sessionStorage.removeItem(tokenKey);
    },
  };
};

export const storageRepository = getStorageRepository();
