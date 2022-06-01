module.exports = {
  forceExit: true,
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"],
  testMatch: ["<rootDir>/test/*.test.js", "<rootDir>/test/*.unittest.js"],
  watchPathIgnorePatterns: [
    "<rootDir>/.git",
    "<rootDir>/node_modules",
    "<rootDir>/addon",
    "<rootDir>/generator",
    "<rootDir>/coverage",
  ],
  modulePathIgnorePatterns: ["<rootDir>/.git"],
  transformIgnorePatterns: ["<rootDir>"],
  coverageDirectory: "<rootDir>/coverage",
  coveragePathIgnorePatterns: [
    "<rootDir>/test",
    "<rootDir>/node_modules",
    "<rootDir>/addon",
    "<rootDir>/generator",
  ],
  testEnvironment: "node",
  coverageReporters: ["clover", "json", "lcov", "text"],
}