module.exports = {
  globals: {
    __TRANSFORM_HTML__: true
  },
  setupTestFrameworkScriptFile: "<rootDir>/bin/jest.js",
  mapCoverage: true,
  moduleFileExtensions: ["js", "json", "scss", "html"],
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.(js|html|scss)$": "<rootDir>/bin/preprocessor.js"
  },
  moduleNameMapper: {
    "(.*)": "<rootDir>/src/$1"
  },
  testMatch: ["<rootDir>/test/**/?(*.)(spec|test).js"],
  testPathIgnorePatterns: ["<rootDir>/(node_modules|bin|build)"]
};
