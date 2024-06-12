import { afterAll, beforeEach, expect, test } from 'vitest';
import { buildApp } from '../app.js';
import type { FastifyInstance } from 'fastify';

let app: FastifyInstance;

beforeEach(async () => {
  app = await buildApp();
});

afterAll(async () => {
  await app.close();
});

test('requests the "/ping" route', async () => {
  const response = await app.inject({ url: '/ping' });

  expect(response.body).toBe('pong');
  await app.close();
});
