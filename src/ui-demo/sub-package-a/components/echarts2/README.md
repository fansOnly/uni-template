### 使用指南

由于小程序没有 dom，ZRender 作为 ECharts 的二维绘图引擎，在事件绑定上没有兼容无 dom 场景，需要修改代码向下兼容

/node_modules/zrender/lib/core/event.js

line 93

```js
export function addEventListener(el, name, handler, opt) {
  el.addEventListener && el.addEventListener(name, handler, opt);
}
export function removeEventListener(el, name, handler, opt) {
  el.removeEventListener && el.removeEventListener(name, handler, opt);
}
```
