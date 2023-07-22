import express from "express";
async function createServer(): Promise<void> {
  const app = express();
  app.listen(3000, () => {
    console.log("Node 服务器已启动~");
    console.log("http://localhost:3000");
  });
}
void createServer();
