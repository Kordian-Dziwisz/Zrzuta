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
  faMoneyBillAlt,
  faCheck,
  faSignOutAlt,
  faDoorOpen,
  faThumbsUp,
  faCogs,
  faPlus,
  faCommentDots,
  faCommentMedical
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { dom } from "@fortawesome/fontawesome-svg-core";
import Notifications from "vue-notification";
import Vuelidate from "vuelidate";

dom.watch();

library.add(
  faCoffee,
  faCheck,
  faEdit,
  faTrashAlt,
  faUserMinus,
  faVoteYea,
  faMoneyBillAlt,
  faSignOutAlt,
  faDoorOpen,
  faThumbsUp,
  faCogs,
  faPlus,
  faCommentDots,
  faCommentMedical
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

Vue.use(Notifications);

Vue.use(Vuelidate);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
