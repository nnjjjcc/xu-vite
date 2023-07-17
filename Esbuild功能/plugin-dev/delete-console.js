const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const core = require("@babel/core");
const esbuild = require("esbuild");
const fs = require("fs");

module.exports = (options) => {
  return {
    name: "auto-delete-console",
    setup(build) {
      build.onLoad({ filter: /\.js$/ }, async (args) => {
        const source = await fs.promises.readFile(args.path, "utf8");
        const ast = parser.parse(source);

        traverse(ast, {
          CallExpression(path) {
            const memberExpression = path.node.callee;
            if (
              memberExpression.object &&
              memberExpression.object.name === "console"
            ) {
              path.remove();
            }
          },
        });

        const { code } = core.transformFromAst(ast);
        return {
          contents: code,
          loader: "js",
        };
      });
    },
  };
};
