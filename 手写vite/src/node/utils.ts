import os from "os";
import path from "path";
export function slash(p: string): string {
  return p.replace(/\\/g, "/");
  //将给定路径中的反斜杠 \ 替换为斜杠 /，实现路径的标准化。
}

export const isWindows = os.platform() === "win32";
//判断当前操作系统是否为 Windows
export function normalizePath(id: string): string {
  //path.posix.normalize() 方法对路径进行规范化处理
  return path.posix.normalize(isWindows ? slash(id) : id);
}
