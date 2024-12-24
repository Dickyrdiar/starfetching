export default {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testEnvironment: "jsdom",
};
