export default function testHookPlugin() {
  return {
    name: " 'test-hooks-plugin'",
    config(config) {
      console.log("config");
    },
    // Vite 独有钩子
    configResolved(resolvedCofnig) {
      console.log("configResolved");
    },
    // 通用钩子
    options(opts) {
      console.log("options");
      return opts;
    },
    configureServer(server) {
      console.log("configureServer");
      setTimeout(() => {
        // 手动退出进程
        process.kill(process.pid, "SIGTERM");
      }, 3000);
    },
    // 通用钩子
    buildStart() {
      console.log("buildStart");
    },
    // 通用钩子
    buildEnd() {
      console.log("buildEnd");
    },
    // 通用钩子
    closeBundle() {
      console.log("closeBundle");
    },
  };
}
