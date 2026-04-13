// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      '**/__tests__/**',
      '**/pacts/**',
      '**/coverage/**',
      '**/dist/**',
      '**/node_modules/**',
      'src/test/pact/**'
    ],                      // Ignora este archivo a sí mismo
  },
  eslint.configs.recommended,                            // Reglas recomendadas de ESLint
  ...tseslint.configs.recommendedTypeChecked,            // Reglas TypeScript recomendadas
  eslintPluginPrettierRecommended,                       // Reglas de Prettier integradas
  {
    languageOptions: {
      globals: {
        ...globals.node,                                 // Variables globales de Node.js (process, console, etc.)
        ...globals.jest,                                 // Variables de Jest (describe, it, expect, etc.)
      },
      sourceType: 'commonjs',                            // Tipo de módulo
      parserOptions: {
        projectService: true,                            // Usa tsconfig.json para TypeScript
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/unbound-method': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/only-throw-error': 'error'
    },
  },
  {
    files: ['src/test/pact/**'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-require-imports': 'off'
    },
  },
);