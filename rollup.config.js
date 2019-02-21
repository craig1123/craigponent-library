import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';

import entries from './dist/entries.json'; // eslint-disable-line import/no-unresolved

// Paths
const rootDir = path.resolve();
const distDir = path.resolve(rootDir, './dist');

// Don't bundle dependencies
const external = [
  'prop-types',
  'react-dom',
  'react',
  'react-transition-group/Transition',
];

// Build export array
const rollup = Object.entries(entries).map(([name, input]) => ({
  input,
  output: {
    file: `${distDir}/${name}/index.js`,
    format: 'cjs', // commonjs
  },
  external,
  plugins: [
    postcss({
      modules: {},
    }),
    url({ exclude: ['**/*.svg'] }),
    svgr(),
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    commonjs(),
  ],
}));

export default rollup;
