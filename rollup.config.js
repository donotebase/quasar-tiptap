import path from 'path'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import cjs from 'rollup-plugin-commonjs'
import node from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import postcssPresetEnv from 'postcss-preset-env'
import alias from '@rollup/plugin-alias'

const isProduction = process.env.BUILD === 'production'
const libDir = path.resolve(__dirname, 'dist/lib')
const srcDir = path.resolve(__dirname, 'src')

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
      'vue-awesome',
    ],
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      alias({
        entries: {
          '@': srcDir,
        },
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
              corejs: 3,
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
