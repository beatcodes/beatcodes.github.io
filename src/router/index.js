import Index from "@/views/Index";
import Mine from "@/views/Mine";
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      meta: {
        title: "home",
      },
    },
    {
      path: "/mine",
      name: "mine",
      component: Mine,
      meta: {
        title: "mine",
      },
    },
  ],
});
