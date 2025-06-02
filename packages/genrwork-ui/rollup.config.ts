import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import swc from '@rollup/plugin-swc'
import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import { globSync } from 'glob'

export default defineConfig({
  input: globSync([
    'src/components/*.tsx',
  ]),
  output: [
    {
      dir: 'dist',
      entryFileNames: 'cjs/[name].js',
      format: 'cjs',
    },
    {
      dir: 'dist',
      entryFileNames: 'esm/[name].js',
      format: 'esm',
    },
  ],
  plugins: [
    resolve(),
    typescript(),
    commonjs(),
    swc({ swc: { minify: true } }),
  ],
  external: ['react', 'react-dom'],
})
