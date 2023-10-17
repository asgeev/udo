import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@assets',
                replacement: path.resolve(__dirname, '/src/assets/'),
            },

            {
                find: '@helpers',
                replacement: path.resolve(__dirname, '/src/helpers/'),
            },
            {
                find: '@providers',
                replacement: path.resolve(__dirname, '/src/providers/'),
            },
            {
                find: '@services',
                replacement: path.resolve(__dirname, '/src/services/'),
            },
            {
                find: '@hooks',
                replacement: path.resolve(__dirname, '/src/hooks/'),
            },
            {
                find: '@atoms',
                replacement: '/src/components/atoms/',
            },
            {
                find: '@molecules',
                replacement: path.resolve(
                    __dirname,
                    '/src/components/molecules/'
                ),
            },
            {
                find: '@organisms',
                replacement: path.resolve(
                    __dirname,
                    '/src/components/organisms/'
                ),
            },
            {
                find: '@pages',
                replacement: path.resolve(__dirname, '/src/components/pages/'),
            },
            {
                find: '@templates',
                replacement: path.resolve(
                    __dirname,
                    '/src/components/templates/'
                ),
            },
        ],
    },
    server: {
        host: true,
    },
    assetsInclude: ['**/*.gltf'],
})
