import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import commonjs from "rollup-plugin-commonjs";
import resolve from 'rollup-plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import eslint from 'rollup-plugin-eslint';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/whiteboard.js',
    format: 'iife',
    name: 'bundle'
  },
  sourceMap: 'inline',
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: ['.js']
    }),
    commonjs({
      include: ['node_modules/**']
    }),
    eslint({
      include: ['src/**/*.js'] // 需要检查的部分
    }),
    babel({
      exclude: 'node_modules/**', // 排除引入的库
      runtimeHelpers: true // 配置runtime，不设置会报错
    }),
    serve({
      contentBase: './',
      historyApiFallback: true,
      host: 'localhost',
      port: 10001,
    }),
    globals()
  ]
};