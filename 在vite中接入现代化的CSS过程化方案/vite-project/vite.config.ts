import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import windi from "vite-plugin-windicss";
import autoprefixer from 'autoprefixer';
//自动添加浏览器前缀。
import { normalizePath } from 'vite';
//调用normalizePath函数并传递路径作为参数：
import path from 'path';
// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'))
//通过 path.resolve('./src/variable.scss') 解析了一个相对路径，然后使用 normalizePath 处理路径，将其转换为规范化的路径。该路径指向了一个名为 ‘variable.scss’ 的文件。



// https://vitejs.dev/config/
export default defineConfig({
  //css in js
  plugins: [windi(), react({
    babel: {
      plugins: [
        // 适配 styled-component
        "babel-plugin-styled-components",
        // 适配 emotion
        "@emotion/babel-plugin"
      ]
    },
    // 注意: 对于 emotion，需要单独加上这个配置
    // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
    jsxImportSource: "@emotion/react"
  })],
  // css 相关的配置
  css: {
    //指定预处理器的相关配置
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    },
    modules: {
      //通过generateScopedName 属性对生成的类名进行自定义
      //name表示当前文件名，local表示类名
      generateScopedName: "[name]__[local]__[hash:base64:5]"
      //[hash:base64:5] 表示对类名进行哈希编码后的 5 位长度的 base64 字符串。这种命名方式确保了在不同文件和组件之间生成的类名是唯一的，避免了类名冲突的问题。
    },
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
          // 兼容 Chrome 版本大于 40、Firefox 版本大于 31 和 IE 11。
        })
      ]
    },
    //Tailwind CSS 和 Windi CSS
  }

})
//自动引入配置方案