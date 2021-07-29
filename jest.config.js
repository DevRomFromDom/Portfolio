module.exports = {
  clearMocks: true,
  collectCoverage: false,
  moduleFileExtensions: [
    "js",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node"
  ],
  "transform": {
    ".*\\.(vue)$": "vue-jest",
    ".*\\.(js)$": "babel-jest"
  },

  testEnvironment: "jsdom",

};
