import { config } from 'dotenv'
import esbuild from 'esbuild'
import postCssPlugin from 'esbuild-style-plugin'

config()

const buildDev = async () => {
  const ctx = await esbuild.context({
    entryPoints: ['./src/index.tsx'],
    outdir: 'public',
    bundle: true,
    sourcemap: true,
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

  await ctx.watch()

  await ctx.serve({
    servedir: 'public',
    port: 3000,
    host: 'localhost',
  })
}

buildDev()
