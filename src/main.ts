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
  faCommentMedical,
  faListOl,
  faDollarSign,
  faLock
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
  faCommentMedical,
  faListOl,
  faDollarSign,
  faLock
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

var config = {
  apiKey: "AIzaSyAoGlETmRGt1ajorbwUsg5wKhVlVtMjqgs",
  authDomain: "cashier-4a4ac.firebaseapp.com",
  databaseURL: "https://cashier-4a4ac.firebaseio.com",
  projectId: "cashier-4a4ac",
  storageBucket: "cashier-4a4ac.appspot.com",
  messagingSenderId: "107990507581"
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
