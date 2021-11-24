import { DefineComponent } from "vue";

// 一次性导入所有组件
type Component = DefineComponent<{}, {}, any>;
export function importComponents(globStr: string) {
  const comps = import.meta.globEager(globStr);
  const UI: { [key: string]: Component } = {};
  for (const [key, value] of Object.entries(comps)) {
    const name = key.match(/[\.\/\w]*\/([\w]*).vue/)![1];
    const comp = value.default;
    UI[name] = comp;
  }
  return UI;
}
