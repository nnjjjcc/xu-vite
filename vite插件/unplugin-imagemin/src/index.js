import { createUnplugin } from "unplugin";
import Context from "./core/context";
export default createUnplugin((options) => {
  const ctx = new Context();
  const assignOptions = Object.assign({}, resolveDefaultOptions, options);
  return {
    name: "unplugin-image",
    apply: "build",
    enforce: "pre",

    // 解析属性
    async configResolved(config) {
      ctx.handleMergeOptionHook({ ...config, options: assignOptions });
    },

    // 自定义图片模块返回内容
    async load(id) {
      const imageModule = ctx.loadBundleHook(id);
      if (imageModule) {
        return imageModule;
      }
    },

    // 根据load 获取到的自定义asset 资源生成文件
    async generateBundle(_, bundler) {
      await ctx.generateBundleHook(bundler);
    },
  };
});
