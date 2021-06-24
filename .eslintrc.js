// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    "no-use-before-define": ["error", { functions: false, classes: false }],
    "func-names": ["error", "never"],
    "no-alert": "off",
    "no-console": "off",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "wrap-iife": ["error", "inside"],
  },
};
