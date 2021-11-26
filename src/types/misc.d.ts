///  <reference types="vite-plugin-pages/client"/>
///  <reference types="vite-plugin-vue-layouts/client"/>

type PromiseType<T> = T extends Promise<infer R> ? R : T;

export {};
