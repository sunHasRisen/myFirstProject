import { nextTick, type App } from "vue";

const mask = `
      <style>
          .circular {
              height: 20%;
              width: 20%;
              -webkit-animation: loading-rotate 1.5s ease-in-out infinite;
              animation: loading-rotate 1.5s ease-in-out infinite;
              position: absolute;
              top: calc(50% - 10%);
              left: calc(50% - 10%);
          }
          .path {
              stroke: #409eff;
              stroke-linecap: round;
              -webkit-animation: dash 1.5s ease-in-out infinite;
              animation: dash 1.5s ease-in-out infinite;
          }
          @-webkit-keyframes loading-rotate {
              100% {
                  -webkit-transform: rotate(360deg);
                  transform: rotate(360deg);
              }
          }
          @keyframes loading-rotate {
              100% {
                  -webkit-transform: rotate(360deg);
                  transform: rotate(360deg);
              }
          }
          @-webkit-keyframes dash {
              0% {
                  stroke-dasharray: 1, 150;
                  stroke-dashoffset: 0;
              }
              50% {
                  stroke-dasharray: 90, 150;
                  stroke-dashoffset: -35;
              }
              100% {
                  stroke-dasharray: 90, 150;
                  stroke-dashoffset: -124;
              }
          }
          @keyframes dash {
              0% {
                  stroke-dasharray: 1, 150;
                  stroke-dashoffset: 0;
              }
              50% {
                  stroke-dasharray: 90, 150;
                  stroke-dashoffset: -35;
              }
              100% {
                  stroke-dasharray: 90, 150;
                  stroke-dashoffset: -124;
              }
          }
      </style>
      <svg class="circular" viewBox="25 25 50 50">
          <circle class="path" cx="50" cy="50" r="20" fill="none" />
      </svg>
    `;

const orginCSS = {
  position: "",
  overflow: "",
};

const setload = (el: HTMLElement) => {
  if (!el.style.position) el.style.position = "relative";
  el.style.overflow = "hidden";
  let div = document.createElement("div");
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.position = "absolute";
  div.style.left = "0";
  div.style.top = "0";
  div.style.right = "0";
  div.style.bottom = "0";
  div.style.backgroundColor = " rgba(255, 255, 255, .9)";
  // 磨砂玻璃效果
  div.style.backdropFilter = "blur(1px)"
  div.innerHTML = mask;
  div.className = "dyx-my-loading-special-masks";
  el.appendChild(div);
};

const vloading = {
  mounted: (el: HTMLElement, binding: any) => {
    // 获取原始元素上的这两个CSS属性值并且储存起来
    orginCSS.position = el.style.position;
    orginCSS.overflow = el.style.overflow;
    nextTick(() => {
      if ([true, void 0, null].includes(binding.value)) {
        setload(el);
      }
    });
  },
  updated: (el: HTMLElement, binding: any) => {
    if ([true, void 0, null].includes(binding.value)) {
      setload(el);
    } else {
      console.log(orginCSS);
      if (document.querySelectorAll(".dyx-my-loading-special-masks").length) {
        el.removeChild(
          document.querySelectorAll(".dyx-my-loading-special-masks")[0]
        );
        el.style.position = orginCSS.position;
        el.style.overflow = orginCSS.overflow;
      }
    }
  },
  unmounted: (el: HTMLElement) => {
    if (document.querySelectorAll(".dyx-my-loading-special-masks").length) {
      el.removeChild(
        document.querySelectorAll(".dyx-my-loading-special-masks")[0]
      );
      el.style.position = orginCSS.position;
      el.style.overflow = orginCSS.overflow;
    }
  },
};
export function setLoading(app: App) {
  app.directive("dyxLoading", vloading);
}
