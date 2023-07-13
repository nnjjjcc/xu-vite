const start = () => {
  let count = 0;
  setInterval(() => {
    // 给主线程传值
    postMessage(++count);
    // postMessage 是 Web Workers API 中的一个方法，用于在 Worker 线程和主线程之间进行通信。
  }, 2000);
};

start();
