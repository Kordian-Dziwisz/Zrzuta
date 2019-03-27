<template>
  <div>
    <fundraising-list :list="list" @remove="removeFundrais" @new="addFundrais"></fundraising-list>
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
      db: firebase.firestore().collection("Zrzuty-develop"),
      list: [],
      guid: "",
      newFundrais: {
        guid: "",
        accountNumber: "",
        creator: "",
        title: "Nowa Zbiórka",
        description: "",
        creationDate: new Date(Date.now()).toJSON(),
        endDate: new Date(Date.now() + 86400000).toJSON(),
        ended: false
      }
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
    },
    async addFundrais(event) {
      this.newFundrais.title = event.title;
      this.newFundrais.description = event.description;
      this.newFundrais.creator = localStorage.getItem("login");
      this.newFundrais.guid = localStorage.getItem("guid");
      let newFundrais = await this.db.add({
        fundraisInfo: { ...this.newFundrais },
        listOfParticipants: [],
        listOfProducts: [],
        listOfPropositions: []
      });
      await this.$router.push({
        name: "Fundrais",
        params: { id: newFundrais.id }
      });
    }
  },
  components: {
    Login,
    FundraisingList
  }
};
</script>
<style scoped>
div {
  word-break: break-all;
  word-break: break-word;
}
</style>