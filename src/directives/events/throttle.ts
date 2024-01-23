import type { App } from "vue";

// 节流
function Throttle(fn: any, delay: number = 500) {
  // 设置一个触发开关
  let canUse = true;
  return function () {
    //如果为true，就触发技能，否则就不能触发
    if (canUse) {
      fn();
      //触发技能后，关闭开关
      canUse = false;
      //在n秒后打开开关
      setTimeout(() => (canUse = true), delay);
    }
  };
}
const throttle = {
  mounted: (el: HTMLElement, binding: any) => {
    console.log(binding);
    if (binding && binding.modifiers.immediate) {
      // 是否需要立即执行
      binding.value();
    }
    if (Number(binding.arg)) {
      el.addEventListener(
        "click",
        Throttle(binding.value, Number(binding.arg))
      );
    } else {
      el.addEventListener("click", Throttle(binding.value));
    }
  },
};

export function setThrottleFn(app: App) {
  app.directive("dyxThrottle", throttle);
}
