import { QueryCache } from '@tanstack/react-query';
import { afterAll, afterEach, beforeAll } from 'vitest';
import '@testing-library/jest-dom';

import { server } from '@/src/mocks/mocks';

const queryCache = new QueryCache();

beforeAll(() => server.listen());

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
  queryCache.clear();
});
