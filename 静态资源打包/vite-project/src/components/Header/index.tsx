import React, { useEffect } from "react";
import SvgIcon from "../SvgIcon";
import { devDependencies } from "../../../package.json";
import { ReactComponent as ReactLogo } from "@assets/icons/logo.svg";
import styles from "./index.module.scss";
// 1. 导入图片
import logoSrc from "@assets/imgs/vite.png";
import Worker from "./example.js?worker";
const icons = import.meta.glob("../../assets/icons/logo-*.svg", {
  eager: true,
});
const iconUrls = Object.keys(icons).map((item) => {
  const fileName = icons[item].default.split("/").pop();
  const [svgName] = fileName.split(".");
  return svgName;
});
console.log(icons);
console.log(iconUrls);
// 1. 初始化 Worker 实例
const worker = new Worker();
// 2. 主线程监听 worker 的信息
worker.addEventListener("message", (e) => {
  console.log(e);
});
//主线程通过调用 worker.postMessage 向 Worker 线程发送了一条消息。在 Worker 线程中，通过监听 message 事件来接收消息，并将其打印到控制台

// 方式一
export function Header() {
  return (
    <div className={`p-20px text-center ${styles.header}`}>
      <h1 className="font-bold text-2xl mb-4">
        {" "}
        vite version: {devDependencies.vite}
      </h1>
      <ReactLogo />
      {/* <img className="m-auto mb-4" src={logoSrc} alt="" /> */}
      {iconUrls.map((item) => (
        <SvgIcon name={item} key={item} width="50" height="50" />
      ))}
    </div>
  );
}
