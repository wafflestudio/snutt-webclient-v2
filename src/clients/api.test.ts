import { afterEach, expect, jest, test } from '@jest/globals';

import { getApiClient } from './api';

afterEach(() => {
  if (jest.isMockFunction(global.fetch)) (global.fetch as jest.Mock).mockClear();
});

const successFetch = (() =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(3) })) as unknown as typeof global.fetch;

const errorFetch = (() =>
  Promise.resolve({ ok: false, json: () => Promise.resolve({ errcode: 8093 }) })) as unknown as typeof global.fetch;

const emptyFetch = (() =>
  Promise.resolve({ ok: false, json: () => Promise.reject() })) as unknown as typeof global.fetch;

test('GET (success case)', async () => {
  global.fetch = jest.fn(successFetch);
  const client = getApiClient({ baseURL: 'https://test-get', headers: { 'test-get-header': 'hello' } });
  const promise = client.get('/test1');

  expect(promise).resolves.toStrictEqual({ data: 3 });
  expect(global.fetch).toBeCalledWith('https://test-get/test1', {
    headers: { 'test-get-header': 'hello' },
    method: 'GET',
  });
});

test('GET (error case)', async () => {
  global.fetch = jest.fn(errorFetch);
  const client = getApiClient({ baseURL: 'https://test-get', headers: { 'test-get-header': 'hello' } });
  const params = new URLSearchParams();
  params.set('test', 'zxcv');
  const promise = client.get('/test1', { headers: { 'test-get-header': 'bye' }, params });

  expect(promise).rejects.toEqual({ errcode: 8093 });
  expect(global.fetch).toBeCalledWith('https://test-get/test1?test=zxcv', {
    headers: { 'test-get-header': 'bye' },
    method: 'GET',
  });
});

test('POST (success case)', async () => {
  global.fetch = jest.fn(successFetch);
  const client = getApiClient();
  const promise = client.post('/test1', { name: 'asdf' });

  expect(promise).resolves.toStrictEqual({ data: 3 });
  expect(global.fetch).toBeCalledWith('/test1', {
    headers: { 'content-type': 'application/json;charset=UTF-8' },
    method: 'POST',
    body: JSON.stringify({ name: 'asdf' }),
  });
});

test('POST (error case)', async () => {
  global.fetch = jest.fn(emptyFetch);
  const client = getApiClient({ headers: { 'content-type': 'ignored' } });
  const promise = client.post('/test1', undefined, { headers: { 'content-type': 'testct' } });

  expect(promise).rejects.toStrictEqual(null);
  expect(global.fetch).toBeCalledWith('/test1', {
    headers: { 'content-type': 'testct' },
    method: 'POST',
  });
});

test('PUT (success case)', async () => {
  global.fetch = jest.fn(successFetch);
  const client = getApiClient();
  const promise = client.put('/test1', { name: 'asdf' });

  expect(promise).resolves.toStrictEqual({ data: 3 });
  expect(global.fetch).toBeCalledWith('/test1', {
    headers: { 'content-type': 'application/json;charset=UTF-8' },
    method: 'PUT',
    body: JSON.stringify({ name: 'asdf' }),
  });
});

test('PUT (error case)', async () => {
  global.fetch = jest.fn(emptyFetch);
  const client = getApiClient({ headers: { 'content-type': 'ignored' } });
  const promise = client.put('/test1', undefined, { headers: { 'content-type': 'testct' } });

  expect(promise).rejects.toStrictEqual(null);
  expect(global.fetch).toBeCalledWith('/test1', {
    headers: { 'content-type': 'testct' },
    method: 'PUT',
  });
});

test('DELETE (success case)', async () => {
  global.fetch = jest.fn(successFetch);
  const client = getApiClient({ baseURL: 'https://test-get', headers: { 'test-get-header': 'hello' } });
  const promise = client.delete('/test1');

  expect(promise).resolves.toStrictEqual({ data: 3 });
  expect(global.fetch).toBeCalledWith('https://test-get/test1', {
    headers: { 'test-get-header': 'hello' },
    method: 'DELETE',
  });
});

test('DELETE (error case)', async () => {
  global.fetch = jest.fn(errorFetch);
  const client = getApiClient({ baseURL: 'https://test-get', headers: { 'test-get-header': 'hello' } });
  const params = new URLSearchParams();
  params.set('test', 'zxcv');
  const promise = client.delete('/test1', { headers: { 'test-get-header': 'bye' }, params });

  expect(promise).rejects.toEqual({ errcode: 8093 });
  expect(global.fetch).toBeCalledWith('https://test-get/test1?test=zxcv', {
    headers: { 'test-get-header': 'bye' },
    method: 'DELETE',
  });
});
