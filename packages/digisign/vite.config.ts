import { resolve } from 'path'
import react from '@vitejs/plugin-react-swc'
import { NodePackageImporter } from 'sass-embedded'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(env => ({
  css: {
    modules: {
      // biome-ignore lint/suspicious/noDoubleEquals: type of `env.command` should be a string type
      generateScopedName: env.command == 'build' ? '[hash:base64:5]' : '',
      localsConvention: 'camelCase',
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/vars" as *;\r\n',
        importers: [new NodePackageImporter()],
      },
    },
  },
  resolve: { alias: { '@': resolve(__dirname, './src') } },
  build: {
    rollupOptions: {
      input: [
        '@a4smanjorg5/invoida-components/App',
        '@a4smanjorg5/invoida-components/Loading',
      ],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.match(/node_modules\/([^\/])/)?.[1]
          }
        },
      },
    },
  },
  plugins: [react()],
}))
