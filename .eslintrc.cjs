module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: {
        react: { version: '18.2' },
        'import/resolver': {
            node: {
                extensions: ['.js', 'jsx', '.vue', '.ts', '.d.ts'],
            },
            alias: {
                extensions: ['.vue', 'jsx', '.js', '.ts', '.scss', '.d.ts'],
                map: [
                    ['@assets', './src/assets'],
                    ['@atoms', './src/componets/atoms'],
                    ['@molecules', './src/components/molecules'],
                    ['@organisms', './src/components/organisms'],
                    ['@pages', './src/components/pages'],
                    ['@templates', './src/components/templates'],
                    ['@helpers', './src/helpers'],
                    ['@providers', './src/providers'],
                    ['@services', './src/services'],
                    ['@hooks', './src/hooks'],
                ],
            },
        },
    },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'no-useless-escape': 'off',
    },
}
