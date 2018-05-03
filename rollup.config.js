import typescript from 'rollup-plugin-typescript2'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  external: ['util'],
  plugins: [
    nodeResolve(),
    typescript()
  ],
  output: {
    exports: 'named',
    sourcemap: true
  }
}
