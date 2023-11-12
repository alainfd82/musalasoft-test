/** @type {import('jest').Config} */

module.exports = {
  transformIgnorePatterns: ["node_modules/(?!(sucrase)/)"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx|mjs)$": "babel-jest",
  },
  verbose: true,
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "mjs"],
  testMatch: ["**/__tests__/**/*.mjs", "**/?(*.)+(spec|test).mjs"],
};
