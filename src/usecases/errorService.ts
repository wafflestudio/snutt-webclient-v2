import type { ErrorRepository } from '@/repositories/errorRepository';

export interface ErrorService {
  getErrorMessage(errorCode: number, useDefaultMessage?: boolean): string;
}

export const getErrorService = (args: { repositories: [ErrorRepository] }): ErrorService => {
  const [errorRepo] = args.repositories;

  return {
    getErrorMessage: (errorCode: number, useDefaultMessage = true) =>
      errorRepo.getErrorMessage({ errorCode, useDefaultMessage }),
  };
};
