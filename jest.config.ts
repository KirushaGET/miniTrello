// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

export default {
  verbose: true,
  testEnvironment: "jsdom",
  rootDir: "src",
  moduleNameMapper: {
    ".+\\.(css|scss)$": "identity-obj-proxy",
  },
};
