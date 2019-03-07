<template>
  <div>
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
    this.guid = localStorage.getItem("guid");
  },
  methods: {
    async getFundraises() {
      this.list = (await this.db.get()).docs.map(item => this.mapItem(item)).filter(x => x != null);
    },
    mapItem(item) {
      if (
        this.shared(
          Object.values(item.data().listOfParticipants)
            .map(x => x.name)
            .concat(item.data().fundraisInfo.creator)
        )
      ) {
        return { ...item.data().fundraisInfo, id: item.id };
      } else return null;
    },
    shared(list) {
      return list.includes(localStorage.getItem("login"));
    },
    async removeFundrais(docID) {
      await this.db.doc(docID).delete();
    }
  },
  components: {
    Login,
    FundraisingList
  }
};
</script>
<style scoped>
</style>