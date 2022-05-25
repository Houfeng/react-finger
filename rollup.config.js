import cleanup from 'rollup-plugin-cleanup';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const createConf = ({
  name = 'mota-gesture',
  global = 'MotaGesture',
  min = false
} = {}) => {
  const suffix = min ? '.min' : '';
  return {
    input: './src/index.ts',
    output: [
      {
        file: `./dist/${name}-es${suffix}.js`,
        format: 'es'
      },
      {
        file: `./dist/${name}-cjs${suffix}.js`,
        format: 'cjs'
      },
      {
        file: `./dist/${name}-umd${suffix}.js`,
        format: 'umd',
        name: global
      },
      {
        file: `./dist/${name}-iife${suffix}.js`,
        format: 'iife',
        name: global
      }
    ],
    external: ['react', 'react-dom'],
    plugins: [
      resolve(),
      min && terser(),
      cleanup({ comments: 'none' }),
      typescript({
        useTsconfigDeclarationDir: true,
      }),
    ].filter(Boolean)
  };
};

export default [
  createConf(),
  createConf({ min: true }),
];