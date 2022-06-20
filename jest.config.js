module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "@test/(.*)": "<rootDir>/test/$1",

    // '^@app/(.*)': '<rootDir>/src/app/$1',
  },
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   "src/**/*.{js,ts}",
  // ]
};