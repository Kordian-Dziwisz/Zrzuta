import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from 'firebase';

Vue.config.productionTip = false;

var config = {
  apiKey: "AIzaSyCpL_flVLc4gn_A307ml_ysVverdY3UJlA",
  authDomain: "zrzuta-a6be0.firebaseapp.com",
  databaseURL: "https://zrzuta-a6be0.firebaseio.com",
  projectId: "zrzuta-a6be0",
  storageBucket: "zrzuta-a6be0.appspot.com",
  messagingSenderId: "341829487916"
};
firebase.initializeApp(config);

new Vue({
  router,
  //fb,
  render: h => h(App)
}).$mount("#app");
