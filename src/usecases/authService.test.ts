import { expect, jest, test } from '@jest/globals';

import { authService } from '@/usecases/authService';

jest.mock('@/usecases/envService', () => ({
  envService: {},
}));

jest.mock('@/repositories/envRepository', () => ({
  envRepository: {},
}));

test('isValidPassword', () => {
  expect(authService.isValidPassword('')).toStrictEqual(false);
  expect(authService.isValidPassword('qwer')).toStrictEqual(false);
  expect(authService.isValidPassword('qwer1')).toStrictEqual(false);
  expect(authService.isValidPassword('qwer11')).toStrictEqual(true);
  expect(authService.isValidPassword('우현민바보')).toStrictEqual(false);
  expect(authService.isValidPassword('asdfadfadfasldfjlisjdiflj1df')).toStrictEqual(false);
});
