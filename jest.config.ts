import type { Config } from 'jest';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleDirectories: ['node_modules', '<rootDir>/'],

  testEnvironment: 'jest-environment-jsdom',

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/public/$1',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
};

module.exports = createJestConfig(customJestConfig);
