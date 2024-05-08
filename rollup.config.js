import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import { terser } from  'rollup-plugin-terser';

const overrides = {
  exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'setupTests.ts'],
};

const config = {
  input: 'src/index.tsx',
  output: {
    file: 'dist/index.js',
    format: 'es',
    sourcemap: true,
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    typescript({ tsconfigOverride: overrides }),
    scss({
      fileName: 'index.css',
    }),
    terser(),
  ],
  external: ['react', 'react-dom'],
};

export default config;
