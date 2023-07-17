const { build } = require("esbuild");

const console = require("./delete-console");
async function runBuild() {
  build({
    absWorkingDir: process.cwd(),
    entryPoints: ["./src/index.js"],
    entryNames: "[dir]/[name]-[hash]",
    outdir: "dist",
    bundle: true,
    format: "esm",
    splitting: true,
    sourcemap: true,
    metafile: true,
    chunkNames: "[name]-[hash]",
    assetNames: "assets/[name]-[hash]",
    plugins: [console()],
  }).then(() => {});
}

runBuild();
