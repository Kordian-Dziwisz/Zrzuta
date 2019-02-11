import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";

Vue.config.productionTip = false;

let config = {
  apiKey: "AIzaSyAoGlETmRGt1ajorbwUsg5wKhVlVtMjqgs",
  authDomain: "cashier-4a4ac.firebaseapp.com",
  databaseURL: "https://cashier-4a4ac.firebaseio.com",
  projectId: "cashier-4a4ac",
  storageBucket: "cashier-4a4ac.appspot.com",
  messagingSenderId: "107990507581"
};

firebase.initializeApp(config);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
