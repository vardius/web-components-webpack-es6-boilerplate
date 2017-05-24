module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  testMatch: [
    '**/?(*.)(spec|test).js'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/(node_modules|bin|build)'
  ],
  collectCoverageFrom: [
    'src/**/*.{t,j}s',
    '!src/**/*.d.ts',
  ],
  moduleFileExtensions: ['js'],
};
