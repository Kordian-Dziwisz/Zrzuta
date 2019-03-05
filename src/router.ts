import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Fundrais from "@/views/Fundrais.vue";
import Login from "@/views/Login.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("login") == null || localStorage.getItem("login") == "") {
          next({ path: "/login", params: { nextURL: from.fullPath } });
        } else next();
      }
    },
    {
      path: "/zrzuta/:id",
      name: "Fundrais",
      component: Fundrais,
      beforeEnter: (to, from, next) => {
        if (localStorage.getItem("login") == null) {
          next({ path: "/login", params: { nextURL: to.fullPath } });
        } else next();
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        quest: true
      }
    }
  ]
});
