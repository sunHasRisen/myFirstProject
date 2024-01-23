import type { App } from "vue";

// 自定义指令
// 自动聚焦
const vFocus = {
  mounted: (el: HTMLElement) => {
    if (
      el.tagName === "INPUT" ||
      el.tagName === "TEXT" ||
      el.tagName === "TEXTAREA" ||
      el.tagName === "BUTTON"
    ) {
      el?.focus();
    } else {
      el.querySelector("input")?.focus();
    }
  },
};
export function setFocusFun(app: App) {
  app.directive("dyxFocus", vFocus);
}
