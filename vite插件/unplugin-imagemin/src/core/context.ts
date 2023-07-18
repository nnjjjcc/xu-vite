import { createFilter } from "@rollup/pluginutils";

export default class Context {
  config: ResolvedOptions;

  imageModulePath: string[] = [];

  files: string[] = [];

  assetPath: string[] = [];

  filter = createFilter(extRE, [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/]);

  handleMergeOptionHook(useConfig: any) {
    const {
      base,
      command,
      root,
      build: { assetsDir, outDir },
      options,
    } = useConfig;
    const cwd = process.cwd();
    const isBuild = command === "build";
    const cacheDir = join(
      root,
      "node_modules",
      options.cacheDir,
      "unplugin-imagemin"
    );
    const isTurn = isTurnImageType(options.conversion);
    const outputPath = resolve(root, outDir);
    const chooseConfig = {
      base,
      command,
      root,
      cwd,
      outDir,
      assetsDir,
      options,
      isBuild,
      cacheDir,
      outputPath,
      isTurn,
    };
    // squoosh & sharp merge config options
    this.mergeConfig = resolveOptions(defaultOptions, chooseConfig);
    this.config = chooseConfig;
  }

  loadBundleHook() {}

  generateBundleHook() {}
}
