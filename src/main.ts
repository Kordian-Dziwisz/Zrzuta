import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faEdit,
  faTrashAlt,
  faUserMinus,
  faVoteYea,
  faPlusSquare,
  faMoneyBillAlt,
  faCheck,
  faSignOutAlt,
  faDoorOpen,
  faThumbsUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { dom } from "@fortawesome/fontawesome-svg-core";
import Vuelidate from "vuelidate";
import Notifications from "vue-notification";

dom.watch();

library.add(
  faCoffee,
  faCheck,
  faEdit,
  faTrashAlt,
  faUserMinus,
  faVoteYea,
  faPlusSquare,
  faMoneyBillAlt,
  faSignOutAlt,
  faDoorOpen,
  faThumbsUp
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
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
Vue.use(BootstrapVue);

Vue.use(require("vue-shortkey"));

const moment = require("moment");
require("moment/locale/pl");

Vue.use(require("vue-moment"), { moment });

Vue.use(Vuelidate);

Vue.use(Notifications);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
