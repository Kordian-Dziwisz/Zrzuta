<template>
  <div class="main">
    <login @login="changeLogin" v-if="!logged"/>
    <fundraising-list v-if="logged" :list="list" @add="addFundrais" @remove="removeFundrais"></fundraising-list>
    {{guid}}
  </div>
</template>

<script>
import Vue from "vue";
import Login from "@/components/Login.vue";
import FundraisingList from "@/views/Home/list.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      logged: false,
      login: "",
      db: firebase.firestore().collection("Zrzuty"),
      list: [],
      guid: ""
    };
  },
  mounted() {
    this.login = localStorage.getItem("login");
    this.getFundrais();
    this.guid = this.generateGuid();
  },
  methods: {
    changeLogin(login) {
      if (login != "") {
        this.logged = true;
      }
      localStorage.setItem("login", login);
    },
    async getFundrais() {
      this.list = (await this.db.get()).docs.map(item => this.mapItem(item));
    },
    async addFundrais(event) {
      let newItem = await this.db.add({
        fundraisInfo: { ...event },
        listOfParticipants: [],
        listOfProducts: [],
        listOfPropositions: []
      });
      this.list.push(this.mapItem(await newItem.get()));
    },
    async removeFundrais(docID) {
      await this.db.doc(docID).delete();
    },
    mapItem(item) {
      return { ...item.data().fundraisInfo, id: item.id };
    },
    generateGuid() {
      var nav = window.navigator;
      var screen = window.screen;
      var guid = nav.mimeTypes.length;
      guid += nav.userAgent.replace(/\D+/g, "");
      guid += nav.plugins.length;
      guid += screen.height || "";
      guid += screen.width || "";
      guid += screen.pixelDepth || "";

      return guid;
    }
  },
  components: {
    Login,
    FundraisingList
  }
};
</script>
<style scoped>
.main {
  padding-top: 80px;
}
</style>


