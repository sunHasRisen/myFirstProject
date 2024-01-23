import type { App } from "vue";

// 一键复制
const copyfun = (el: any, value: string) => {
  const clipboardObj = navigator.clipboard;
  if (clipboardObj) {
    clipboardObj.writeText(value);
  } else {
    // 兼容IE浏览器
    el.select();
    document.execCommand("Copy");
  }
};

const vCopy = {
  mounted: (el: HTMLElement, binding: any) => {
    // console.log(el, binding);
    el.addEventListener("click", () => {
      if (binding.value) {
        // 如果有回调值，那么就复制回调值
        copyfun(el, binding.value);
      } else {
        // 如果没有回调值，那么就默认复制该元素内所有值
        copyfun(el, el.innerHTML);
      }
    });
  },
};

export function setCopyFn(app: App) {
  app.directive("dyxCopy", vCopy);
}
