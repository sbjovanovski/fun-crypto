import esbuild from 'esbuild'

const buildDev = async () => {
    const ctx = await esbuild.context({
        entryPoints: ['./src/index.tsx'],
        outdir: 'public',
        bundle: true,
        sourcemap: true,
    })

    await ctx.watch()

    await ctx.serve({
        servedir: 'public',
        port: 3000,
        host: 'localhost'
    })
}

buildDev();