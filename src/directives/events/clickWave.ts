import type { App } from "vue";

var timer1, timer2;

const vClickCSSWave = {
  mounted: (el: HTMLElement, binding: any) => {
    // binding.value  点击产生的颜色
    // binding.arg 动画延续时间（s）
    // binding.modifiers 修饰符：debounce 防抖；throttle 节流。
    if (
      typeof binding.value === "undefined" ||
      binding.value === "null" ||
      binding.value === ""
    ) {
      binding.value = "#eee"; // 赋予颜色默认值
    }
    if (typeof binding.value !== "string") {
      throw new Error("请输入正确的颜色参数！");
    }

    let duration = 0.4; // 动画延续时间
    if (!(!binding.arg || Number.isNaN(Number(binding.arg)))) {
      duration = binding.arg - 0;
    }
    if (duration <= 0) {
      throw new Error("输入动画持续时间必须是正数！");
    }

    let style = document.createElement("style");
    const activeCSSStyle = `
    .v-dyx--wave---active----Effect {
        width: 100%;
        height: 100%;
        position: absolute;
        inset: 0;
        transition: all ${duration}s linear;
        background: ${binding.value};
        opacity: 0.2;
    }`;
    // 需要设置 opacity 属性，否则会挡住其他元素
    style.innerHTML = activeCSSStyle;
    document.head.append(style);
    el.addEventListener("click", (e) => {
      // 点击后，先判断自己元素上是否有 position 属性
      let positionFlag = window.getComputedStyle(el).position;
      if (positionFlag === "static" || !positionFlag) {
        el.style.position = "relative";
      }
      // 使用时，必须保证被应用元素有设置宽高
      const borderRadius = window.getComputedStyle(el).borderRadius; // 确定外边界样式

      let activeEle = document.createElement("div");
      activeEle.classList.add("v-dyx--wave---active----Effect");
      activeEle.style.borderRadius = borderRadius;

      let modifiersArr = Object.keys(binding.modifiers);
      if (
        (modifiersArr.includes("throttle") &&
          modifiersArr.includes("debounce") &&
          binding.modifiers?.throttle === true &&
          binding.modifiers?.debounce === true) ||
        (modifiersArr.includes("debounce") &&
          binding.modifiers?.debounce === true) ||
        (!modifiersArr.includes("debounce") &&
          !modifiersArr.includes("throttle"))
      ) {
        // 防抖，且默认防抖
        timer1 = null;
        timer2 = null;
        el.appendChild(activeEle);
      } else if (
        modifiersArr.includes("throttle") &&
        binding.modifiers?.throttle === true
      ) {
        // 节流的话
        let arr = [...el.children];
        let flag = arr.some((it) => {
          return it.classList.contains("v-dyx--wave---active----Effect");
        });
        !flag && el.appendChild(activeEle);
      }
      activeEle.style.cssText += `clip-path: circle(0px at ${e.offsetX}px ${e.offsetY}px)`;
      // 设置定时器，异步化
      timer1 = setTimeout(() => {
        new Promise(() => {
          const bgcolor = window.getComputedStyle(el).backgroundColor; // 确定起始色
          activeEle.style.clipPath = `circle(150% at ${e.offsetX}px ${e.offsetY}px)`;
          activeEle.style.backgroundColor = bgcolor;
          activeEle.style.borderRadius = borderRadius;
          activeEle.style.opacity = "0";
          timer2 = setTimeout(() => {
            // 动画的最后，移除加入的元素
            activeEle.remove();
            el.style.position = positionFlag;
          }, duration * 1000);
        }).then(() => {
          activeEle.style.clipPath = `circle(0px at ${e.offsetX}px ${e.offsetY}px)`;
        });
      }, 0);
    });
  },
  unmounted: (el: HTMLElement) => {
    timer1 = null;
    timer2 = null;
  },
};
export function setClickWave(app: App) {
  app.directive("dyxClickWave", vClickCSSWave);
}
