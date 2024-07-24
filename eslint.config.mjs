import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
    {
        ignores: ['**/build/**', '**/dist/**', 'coverage', 'docker'],
    },
    prettierConfig,
    eslint.configs.recommended,
    ...tseslint.configs.strict,
    ...tseslint.configs.stylistic,
    {
        files: ['**/*.spec.ts'],
        ...jestPlugin.configs['flat/recommended']
    }
);