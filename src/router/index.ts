import { createRouter, createWebHashHistory } from "vue-router";

// import { importComponents } from "~/utils";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    /* {
      path: "/",
      components: { default: UI.UIWelcome },
    },
    {
      path: "/:match(.*)*",
      components: { default: UI.UINotFound },
      // meta: { keepPrev: true },
    }, */
  ],
});

router.beforeEach((to, from) => {
  if (to.meta.keepPrev) {
    if (from.matched.length > 0 && "default" in from.matched[0].components) {
      to.matched[0].components.default = from.matched[0].components.default;
    }
  }
  return true;
});

export default router;
