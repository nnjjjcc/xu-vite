import "./style.css";

export const render = () => {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  if (import.meta.hot) {
    import.meta.hot.accept((mod) => mod.render());
  }
  app.innerHTML = `
    <h1>Hello Vite!</h1>
    <p target="_blank">This is hmr test.123</p>
    <p target="_blank">This is hmr test.123 这是增加的文本111</p>
  `;
};
