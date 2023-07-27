import cac from "cac";
import { startDevServer } from "./server";
//1.cli 功能和服务启动的逻辑目前就已经成功搭建
// vite 首先通过 cac 作为简单的参数解析器
// cac是一个用于构建 CLI 应用程序的 JavaScript 库。
const cli = cac();
cli
  .command("[root]", "Run the development server")
  .alias("serve")
  .alias("dev")
  .action(async () => {
    console.log("测试 cli~");
    await startDevServer();
  });

cli.help();

cli.parse();
