import path from "path";
import { build } from "esbuild";
import { green } from "picocolors";
import { scanPlugin } from "./scanPlguin";
import { preBundlePlugin } from "./preBundlePlugin";
import { PRE_BUNDLE_DIR } from "../constants";
//依赖预构建--第三方依赖进行打包，并在开发环境下使用这些打包过的第三方依赖。
export async function optimize(root: string) {
  // 1. 确定入口
  const entry = path.resolve(root, "src/main.tsx");
  // 2. 从入口处扫描依赖
  const deps = new Set<string>();
  //deps 是一个 Set 集合，用于存储扫描到的依赖项。
  await build({
    entryPoints: [entry],
    //指定了入口文件的路径
    bundle: true,
    //进行打包。
    write: false,
    //不将构建结果写入文件，而是将其保留在内存中
    plugins: [scanPlugin(deps)],
    //包含扫描依赖逻辑的插件数组
  });
  console.log(
    `${green("需要预构建的依赖")}:\n${[...deps]
      .map(green)
      .map((item) => `  ${item}`)
      .join("\n")}`
  );
  // 3. 预构建依赖
  await build({
    entryPoints: [...deps],
    write: true,
    bundle: true,
    format: "esm",
    splitting: true,
    outdir: path.resolve(root, PRE_BUNDLE_DIR),
    plugins: [preBundlePlugin(deps)],
  });
}
