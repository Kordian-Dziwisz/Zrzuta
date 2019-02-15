import Vue from "vue";
import Router from "vue-router";
import MainPage from "@/views/MainPage.vue";
import SecondPage from "@/views/SecondPage.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: MainPage
    },
    {
      path: "/SecondPage",
      name: 'SecondPage',
      component: SecondPage
    }
  ]
});
