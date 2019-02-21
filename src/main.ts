import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCoffee);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

var config = {
	apiKey: "AIzaSyCpL_flVLc4gn_A307ml_ysVverdY3UJlA",
	authDomain: "zrzuta-a6be0.firebaseapp.com",
	databaseURL: "https://zrzuta-a6be0.firebaseio.com",
	projectId: "zrzuta-a6be0",
	storageBucket: "zrzuta-a6be0.appspot.com",
	messagingSenderId: "341829487916",
};
firebase.initializeApp(config);
Vue.use(BootstrapVue);

const moment = require("moment");
require("moment/locale/pl");
Vue.use(require("vue-moment"), { moment });

new Vue({
	router,
	render: h => h(App),
}).$mount("#app");
