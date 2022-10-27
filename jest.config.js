/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  moduleFileExtensions: ["js", "json", "ts"],
  roots: ["src", "test"],
  testRegex: ".*(\\.|-)spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  verbose: true,
  // globalSetup: "./test/setup-jest.global.ts",
};
module.exports = config;
