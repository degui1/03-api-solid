import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import importPlugin from 'eslint-plugin-import'
import pluginPromise from 'eslint-plugin-promise'

/** @type {import('eslint').Linter.Config[]} */

export default tseslint.config([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
  },
  {
    languageOptions: { globals: globals.node },
  },
  pluginJs.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
      quotes: ['error', 'single'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-irregular-whitespace': 'error',
      'no-multi-spaces': 'error',
      'prettier/prettier': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.ts'],
        },
        typescript: {
          project: './tsconfig.json',
        },
      },
    },
    ignores: ['node_modules', 'build'],
  },
  eslintPluginPrettierRecommended,
  pluginPromise.configs['flat/recommended'],
])
