module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    requireConfigFile: false,
    sourceType: "module",
    babelOption: {
      presets: ["@babel/preset-react"],
    },
  },
  plugins: ["react", "prettier", "react-hooks"],
  rules: {
    "prettier/prettier": "error",
    "import/prefer-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error", // Verifica as regras dos Hooks
    "react-hooks/exhaustive-deps": "warn", // Verifica as dependências de effects
  },
};
