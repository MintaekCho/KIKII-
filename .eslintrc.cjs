module.exports = {
  root: true,
  "rules": {
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": ["error", {"endOfLine": "auto"}]	
  },
  env: { browser: true, es2020: true, jest: true},
  extends: [
    "./node_modules/gts/", "next/core-web-vitals"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
