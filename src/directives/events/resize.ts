import type { App } from "vue";
// 在size发生变化的时候，触发回调函数
let map = new WeakMap();
const ob = new ResizeObserver((entries: any) => {
  // console.dir(entries);
  for (const entry of entries) {
    // 运行 entry.target 对应的回调函数
    // dom  ===>  handler(回调)
    // 获取 DOM
    let handler = map.get(entry.target);
    if (handler) {
      // console.log(entry, handler);
      // 获取对应值
      handler({
        // entry.borderBoxSize 是数组的原因：一个元素可能有多个盒子，比如为元素，比如li元素的marker
        width: entry.borderBoxSize[0].inlineSize,
        height: entry.borderBoxSize[0].blockSize,
        target: entry.target,
      });
    }
  }
});

const vResize = {
  mounted: (el: Element, binding: any) => {
    // 监听 el 元素尺寸变化
    map.set(el, binding.value);
    ob.observe(el);
  },
  unmounted: (el: Element) => {
    // 取消监听
    ob.unobserve(el);
  },
};

export function setResize(app: App) {
  app.directive("dyxResize", vResize);
}
