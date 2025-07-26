import esbuild from 'esbuild'

esbuild.buildSync({
    entryPoints: ['./src/index.tsx'],
    outdir: 'public',
    bundle: true,
})