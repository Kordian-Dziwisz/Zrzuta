<template>
  <div class="home">
    <fundraising-list :list="list" @remove="removeFundrais"></fundraising-list>
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
      login: "",
      db: firebase.firestore().collection("Zrzuty"),
      list: [],
      guid: ""
    };
  },
  mounted() {
    this.login = localStorage.getItem("login");
    this.getFundraises();
    this.guid = this.generateGuid();
  },
  methods: {
    async getFundraises() {
      this.list = (await this.db.get()).docs.map(item => this.mapItem(item));
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


