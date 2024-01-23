import { setFocusFun } from "@/directives/events/focus";
import { setResize } from "@/directives/events/resize";
import { setCopyFn } from "@/directives/events/copy";
import { setLongpressFn } from "@/directives/events/longpress";
import { setThrottleFn } from "@/directives/events/throttle";
import { setLoading } from "@/directives/events/loading";
import { setClickOutside } from "@/directives/events/clickOutside";
import { setClickWave } from "@/directives/events/clickWave";

import type { App } from "vue";
export function directive(app: App) {
  // 注册
  setFocusFun(app);
  setResize(app);
  setCopyFn(app);
  setLongpressFn(app);
  setThrottleFn(app);
  setLoading(app);
  setClickOutside(app);
  setClickWave(app);
}
