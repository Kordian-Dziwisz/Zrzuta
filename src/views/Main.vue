<template>
  <div class="main">
    <login class="loginVisibility" @login="changeLogin" v-if="!logged"/>
    <fundraising-list v-if="logged" :list="list"></fundraising-list>
  </div>
</template>

<script>
import Vue from "vue";
import Login from "@/components/mainpage/Login.vue";
import FundraisingList from "@/components/mainpage/Fundraising.list.vue";
import firebase from "firebase";
// import List from '@/components/List.vue'

export default {
  data() {
    return {
      logged: false,
      login: "",
      db: firebase.firestore().collection("Zrzuty"),
      list: [
        {
          docID: "uRLJNTchecAfASfPUKT5",
          creator: "Kordian",
          title: "title",
          description: "Poor project",
          creationDate: new Date("December 17, 1995 03:24:00"),
          endDate: new Date("December 17, 1995 03:24:00"),
          ended: false
        }
      ]
    };
  },
  mounted() {
    this.login = localStorage.getItem("login");
    this.getList();
  },
  methods: {
    changeLogin(login) {
      if (login != "") {
        this.logged = true;
      }
      localStorage.setItem("login", login);
    },
    async getList() {
      (await this.db.get()).docs.map(item => {
        this.mapItem(item);
      });
    },
    mapItem(item) {
      console.log(item.data().fundraisInfo);
      console.log(item.id);
      return { ...item.data().fundraisInfo, ...{ id: item.id } };
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


