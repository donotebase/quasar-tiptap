import path from 'path'

import alias from '@rollup/plugin-alias'
import cjs from '@rollup/plugin-commonjs'
import node from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'

import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import copy from 'rollup-plugin-copy'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import typescript from 'rollup-plugin-typescript2'

const isProduction = process.env.BUILD === 'production'
const libDir = path.resolve(__dirname, 'lib')
const srcDir = path.resolve(__dirname, 'src')

function getConfig ({
  file,
  format,
  optimize,
  esModule = false,
}) {
  return {
    input: path.resolve(srcDir, 'index.js'),
    output: {
      file,
      name: 'QuasarTiptap',
      format,
      esModule,
      globals: {
        vue: 'Vue',
        // TODO: tiptap
      },
    },
    external: [
      'vue',
      'tiptap',
      'tiptap-extensions',
      'prosemirror-utils',
      'prosemirror-state',
      'prosemirror-model',
      'prosemirror-tables',
      'vue-awesome',
      'vue-codemirror',
      'codemirror',
      'mermaid',
      'katex',
      'crypto',
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      alias({
        entries: {
          src: srcDir,
        },
      }),
      typescript({
        clear: true,
        typescript: require('typescript'),
      }),
      node({
        extensions: ['.ts', '.js', '.vue'],
      }),
      cjs({
        extensions: ['.ts', '.js'],
      }),
      postcss({
        extract: path.resolve(libDir, 'index.css'),
        minimize: true,
        plugins: [
          postcssPresetEnv()
        ]
      }),
      copy({
        targets: [
          {
            src: path.resolve(srcDir, 'css/katex/fonts/**'),
            dest: path.resolve(libDir, 'fonts')
          }
        ]
      }),
      vue({
        defaultLang: {
          style: 'stylus',
        },
        css: false,
      }),
      babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true,
        extensions: ['.js', '.ts'],
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false,
              useBuiltIns: 'usage',
              corejs: 2,
            },
          ],
        ],
        plugins: [
          [
            'component',
            {
              libraryName: 'quasar',
              style: false,
            }
          ],
        ],
      }),
      optimize && isProduction && terser(),
    ],
  }
}

export default () => [
  getConfig({
    optimize: true,
    file: path.resolve(libDir, 'quasar-tiptap.min.js'),
    format: 'umd',
    esModule: true,
  }),
  getConfig({
    optimize: true,
    file: path.resolve(libDir, 'quasar-tiptap.common.js'),
    format: 'cjs',
  }),
  getConfig({
    file: path.resolve(libDir, 'quasar-tiptap.esm.js'),
    format: 'es',
    esModule: true,
  }),
]
