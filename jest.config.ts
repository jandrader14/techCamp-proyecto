// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // Para que jest entienda componentes React
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Usa Babel para transformar TypeScript + JSX
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'], // 👈 Agregamos el setup
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
};

export default config;
