import js from '@eslint/js';
import globals from 'globals';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginImport from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    plugins: {
      'react': eslintPluginReact,
      '@typescript-eslint': tseslint.plugin,
      'import': eslintPluginImport,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],
      'react/jsx-key': 'warn',
      'spaced-comment': 'off',
      'react/react-in-jsx-scope': 'off',
      'camelcase': 'off',
      'no-extra-boolean-cast': 'off',
      'linebreak-style': ['error', 'unix'],
      'func-call-spacing': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'operator-linebreak': 'off',
      'no-invalid-this': 'off',
      '@typescript-eslint/dot-notation': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      'brace-style': 'off',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'block-like',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: 'multiline-const',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: 'multiline-let',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: 'multiline-var',
          next: '*',
        },
      ],
      'import/order': 'off',
      'no-underscore-dangle': 'off',
      'object-shorthand': 'off',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'require-jsdoc': 'off',
      'react/prop-types': 'off',
      'react/jsx-tag-spacing': [
        'warn',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'allow',
          afterOpening: 'never',
          beforeClosing: 'never',
        },
      ],
      'array-bracket-newline': [
        'warn',
        'consistent',
      ],
      'array-bracket-spacing': [
        'warn',
        'never',
      ],
      'array-element-newline': [
        'warn',
        'consistent',
      ],
      'max-params': [
        'warn',
        4,
      ],
      'jsx-quotes': [
        'warn',
        'prefer-double',
      ],
      'object-curly-spacing': [
        'warn',
        'always',
      ],
      'max-len': [
        'warn',
        {
          ignorePattern: '^import |^export | implements | className',
          code: 120,
          tabWidth: 2,
        },
      ],
      'arrow-spacing': 'warn',
      'block-spacing': 'warn',
      'function-call-argument-newline': [
        'warn',
        'consistent',
      ],
      'space-before-function-paren': [
        'warn',
        {
          anonymous: 'never',
          named: 'never',
          asyncArrow: 'always',
        },
      ],
      'quote-props': [
        'warn',
        'consistent',
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'warn',
        {
          accessibility: 'explicit',
        },
      ],
      'no-multiple-empty-lines': [
        'warn',
        {
          max: 1,
          maxEOF: 1,
        },
      ],
      'arrow-parens': [
        'warn',
        'always',
      ],
      'quotes': [
        'warn',
        'single',
      ],
      '@typescript-eslint/consistent-type-imports': ['warn'],
      'semi': ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'comma-spacing': ['error', { before: false, after: true }],
      'indent': ['error', 2, { SwitchCase: 1 }],
    },
  },
];
