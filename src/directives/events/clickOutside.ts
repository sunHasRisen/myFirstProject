import type { App } from "vue";

function doFn() {
  if (_fn.param.binding.value) {
    if (typeof _fn.param.binding.value === "function") {
      _fn.param.binding.value();
    } else {
      throw new Error("需要回调执行的是函数类型！");
    }
  }
}

const outFn = (ev: Event) => {
  if (_fn.param?.el) {
    if (_fn.param.binding.modifiers.strickly) {
      // 严格意义上相等，点击本身元素不触发，子元素不算在内
      if (_fn.param.el !== ev.target) {
        doFn();
      }
    } else {
      // 点击本身元素或者其子元素都不触发
      if (
        _fn.param.el !== ev.target &&
        ![..._fn.param.el.children].includes(ev.target)
      ) {
        doFn();
      }
    }
  }
};

let _fn: any = {
  param: {},
  fn: outFn,
};

const vClickOutside = {
  mounted: (el: HTMLElement, binding: any) => {
    _fn.param = {
      el,
      binding,
    };
    window.addEventListener("click", _fn.fn);
  },
  unmounted: () => {
    window.removeEventListener("click", _fn.fn);
  },
};

export function setClickOutside(app: App) {
  app.directive("dyxOutsideClick", vClickOutside);
}
