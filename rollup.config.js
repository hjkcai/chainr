import typescript from 'rollup-plugin-typescript2'
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  plugins: [
    nodeResolve(),
    typescript()
  ],
  output: {
    sourcemap: true
  }
}
