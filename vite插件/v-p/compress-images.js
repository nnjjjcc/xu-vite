import imagemin from "imagemin";
import imageminGifsicle from "imagemin-gifsicle";
import imageminOptipng from "imagemin-optipng";
import imageminSvgo from "imagemin-svgo";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import { globby } from "globby";
import fs from "fs";
import path from "path";

export default function CompressImages() {
  return {
    name: "compress-images",
    async transform(code, id) {
      if (id.endsWith(".js")) {
        const getAbsPath = (relativePath) => {
          const cwd = process.cwd();
          const absPath = path.resolve(cwd, relativePath);
          return absPath;
        };

        const compressSingleFile = async (singleAbsFilePath) => {
          return new Promise(async (resolve) => {
            let buffer = fs.readFileSync(singleAbsFilePath);
            let content = await imagemin.buffer(buffer, {
              plugins: [
                imageminGifsicle(),
                imageminOptipng(),
                imageminSvgo(),
                imageminMozjpeg(),
                imageminPngquant(),
              ],
            });
            resolve(content);
          });
        };

        const compressFiles = async (compressFilePaths) => {
          let resolvedFileMap = [];
          for (let i = 0; i < compressFilePaths.length; i++) {
            let filePath = compressFilePaths[i];
            let content = await compressSingleFile(filePath);
            resolvedFileMap.push({ filePath, content });
          }
          return resolvedFileMap;
        };

        const writeFiles = async (resolvedFileMap) => {
          if (resolvedFileMap.length) {
            resolvedFileMap.map(async (item) => {
              const { filePath, content } = item;
              if (content) {
                fs.writeFileSync(filePath, content);

                // 获取压缩前的文件大小
                const originalSize = fs.statSync(filePath).size;

                // 获取压缩后的文件大小
                const compressedSize = content.length;

                // 显示前后大小对比
                console.log(
                  `File ${filePath}: Original Size: ${originalSize} bytes, Compressed Size: ${compressedSize} bytes`
                );
              }
            });
          }
        };

        const dir = "src/assets/**/*.+(png|jpeg|jpg|gif|svg)"; // 完整的 globby 模式，例如：src/assets/**/*.png
        // 正确获取匹配指定模式的文件路径列表
        const filePaths = await globby(dir);

        // 转换文件路径为绝对路径
        const compressFilePaths = filePaths.map(getAbsPath);

        // 压缩文件
        const resolvedFileMap = await compressFiles(compressFilePaths);
        // 写入压缩后的文件
        await writeFiles(resolvedFileMap);
      }
      return null;
    },
  };
}
