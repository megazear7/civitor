import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: './src/index.ts',
    plugins: [
      nodeResolve(),
      typescript(),
    ],
    output: {
      file: './client/js/index.js',
      format: 'es',
    },
  },
];
