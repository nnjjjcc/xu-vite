module.exports = {
  env: {
    browser: true,
    es2021: true //表示代码可以使用 ES2021 的语法。
  },
  extends: [
    "eslint:recommended",//使用 ESLint 推荐的规则配置。
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    // 1. 接入 prettier 的规则
    "prettier",
    "plugin:prettier/recommended" //启用与 Prettier 兼容的 ESLint 规则配置。
  ],
  parser: "@typescript-eslint/parser", //解析器
  //解析器的选项
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
    //代码的模块类型，这里设置为 “module”，表示代码使用 ECMAScript 模块。
  },
  // 2. 加入 prettier 的 eslint 插件
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    "prettier/prettier": "error",
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "react/react-in-jsx-scope": "off"
  }
};
