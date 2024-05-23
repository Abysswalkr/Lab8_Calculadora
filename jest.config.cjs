// jest.config.js
module.exports = {
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/src/test/_mocks_/fileMocks.js'
    },
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.jsx?$': 'babel-jest'
    }
  };
  