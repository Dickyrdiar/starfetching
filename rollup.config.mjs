import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';
import pkg from './package.json' assert { type: 'json' };

export default {
  input: 'src/index.ts', // Entry file
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
    json(),
  ],
  external: ['react', 'react-dom', 'axios'], // Ensure axios is marked as external
};
