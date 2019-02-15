import Vue from "vue";
import Router from "vue-router";
import Main from "@/views/Main.vue";
import SecondPage from "@/views/SecondPage.vue"

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main
    },
    {
      path: "/FoundraisingDetails",
      name: 'SecondPage',
      component: SecondPage
    }
  ]
});
