module.exports =

{
  'extends': 'airbnb-base',
  // "parser":"babel-eslint",
  "parser": "@typescript-eslint/parser",
  'extends': [
      'plugin:prettier/recommended',
  ],
  'plugins': [
      'eslint-plugin-typescript',
  ],
  'rules': {
    "prettier/prettier": ["error", {
        "singleQuote": true,
        "semi": false,
        "traillingComma": true,
    }],
  },
  'parserOptions': {
      'ecmaVersion': 6,
      'sourceType': 'module',
  },
}
