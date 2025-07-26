import { config } from 'dotenv'
import esbuild from 'esbuild'
import postCssPlugin from 'esbuild-style-plugin'

config()

esbuild.buildSync({
  entryPoints: ['./src/index.tsx'],
  outdir: 'public',
  bundle: true,
  platform: 'node',
  plugins: [
    postCssPlugin({
      postcss: {
        plugins: [require('@tailwindcss/postcss'), require('autoprefixer')],
      },
    }),
  ],
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    'process.env.API_KEY': `"${process.env.API_KEY}"`,
  },
})
