/* VITE 환경변수에 직접 접근하는 external 파일이므로, import.meta.env 에 직접 접근할 수 있어야 한다. */
/* eslint-disable no-restricted-syntax */

// 환경변수를 직접 받아와서 export하는 파일

export interface EnvironmentVariables {
  APP_ENV?: string;
  GIT_SHA?: string;
  API_BASE_URL?: string;
  API_KEY?: string;
}

export const viteEnvironmentVariables: EnvironmentVariables = {
  APP_ENV: import.meta.env.VITE_APP_ENV,
  GIT_SHA: import.meta.env.VITE_GIT_SHA,
  API_BASE_URL: import.meta.env.VITE_BASE_URL,
  API_KEY: import.meta.env.VITE_API_KEY,
};
