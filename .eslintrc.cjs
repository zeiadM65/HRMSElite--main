module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: 'detect' } },
  env: { browser: true, node: true, es2022: true },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['**/*.tsx', '**/*.ts'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
  ignorePatterns: ['dist/', 'build/', 'coverage/', '*.config.*', 'node_modules/'],
};
