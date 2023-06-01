import '@testing-library/jest-dom/extend-expect';
import '@/src/mocks/nextRouter';

import { server } from '@/src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
