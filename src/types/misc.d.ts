/* ///  <reference types="quasar/dist/types"/>
///  <reference types="vite-plugin-pages/client"/>
///  <reference types="vite-plugin-vue-layouts/client"/> */

declare module "vue" {
  export interface GlobalComponents {
    RouterLink: typeof import("vue-router")["RouterLink"];
    RouterView: typeof import("vue-router")["RouterView"];
  }
}

type PromiseType<T> = T extends Promise<infer R> ? R : T;

export {};
