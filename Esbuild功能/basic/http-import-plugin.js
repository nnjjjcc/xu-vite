const { resolve } = require("path");

module.exports = () => ({
  name: "esbuild:http",
  setuup(build) {
    let https = require("https");
    let http = require("http");

    //拦截cdn请求
    build.onResolve({ filter: /^https?:\/\// }, (args) => ({
      path: args.path,
      namespace: "http-url",
    }));
    //通过 fetch 请求加载 CDN 资源
    build.onLoad({ filter: /.*/, namespace: "http-url" }, async (args) => {
      let contents = await new Promise((resolve, reject) => {
        function fetch(url) {
          console.log(`Downloading: ${url}`);
          let lib = url.startsWith("https") ? https : http;
          let req = lib.get(url, (res) => {
            if ([301, 302, 307].includes(res.statusCode)) {
              // 重定向
              fetch(new URL(res.headers.location, url).toString());
              req.abort();
            }
          });
        }
      });
    });
  },
});
