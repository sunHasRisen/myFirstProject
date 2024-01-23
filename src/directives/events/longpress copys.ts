import type { App } from "vue";

// 长按触发回调函数
// 传入对象形式：
// { time: 2000, fn: callback }
// 默认 500ms

let pressTime: number = 500; // 需要触发的延迟时间
let timer: any = null;
let clickTime: number = 0; // 鼠标点击按下时间
let upTime: number = 0; // 鼠标松手时间

const longpress = {
  mounted: (el: HTMLElement, binding: any) => {
    // console.log("长按触发回调函数", el, binding);
    if (binding.value.time) pressTime = binding.value.time || 500;
    el.addEventListener("mousedown", () => {
      clickTime = new Date().getTime();
      timer = setTimeout(() => {
        binding.value.fn();
      }, pressTime);
    });
    window.addEventListener("mouseup", () => {
      upTime = new Date().getTime();
      if (upTime - clickTime > pressTime) {
        // 执行回调函数
        // 准备触发的时候检查执行类型
        if (typeof binding.value.fn !== "function") {
          throw new Error("callback must be a function");
        }
      } else {
        // 提前松手了，啥也没触发
        // console.log("提前松手了，啥也没触发");
        clearTimeout(timer);
        timer = null;
      }
    });
  },
  unmounted: () => {
    clearTimeout(timer); // 防止按下的时候组件突然消失，消失的时候不应该再触发回调
    timer = null;
    clickTime = 0;
    upTime = 0;
  },
};

export function setLongpressFn(app: App) {
  app.directive("dyxLongPress", longpress);
}
