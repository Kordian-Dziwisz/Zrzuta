<template>
  <div class="Fundrais">
    <b-alert
      variant="danger"
      class="h4 pl-4"
      :show="!fundraisInfo.title.length && authenticate"
    >Proszę o uzupełnienie pola Tytuł, bez tego pola dokument nie zostanie zaktualizowany</b-alert>
    <div class="container-fluid">
      <b-row>
        <b-col class="shadow pr-0">
          <project-info v-if="!authenticate" :info="fundraisInfo"/>
          <info-admin v-if="authenticate" :info="fundraisInfo" @info="updateInfo"/>
        </b-col>
        <b-col class="shadow px-0">
          <list-of-participants
            :admin="authenticate"
            :ended="this.fundraisInfo.ended"
            :list="listOfParticipants"
            @list="updateParticipants"
          />
        </b-col>
        <b-col class="shadow pl-1">
          <list-of-products
            :admin="authenticate"
            :ended="this.fundraisInfo.ended"
            :numOfParticipants="listOfParticipants.length"
            :list="listOfProducts"
            @list="updateProducts"
          />
        </b-col>
      </b-row>
      <b-row align-h="end">
        <b-col class="shadow">
          <p
            class="display-4"
            v-if="fundraisInfo.ended == true && fundraisInfo.accountNumber.length > 0 && !authenticate"
          >Wpłaty na numer konta: {{fundraisInfo.accountNumber}}</p>
        </b-col>
        <b-col cols="4" class="pl-0">
          <list-of-propositions
            :admin="authenticate"
            :ended="this.fundraisInfo.ended"
            :list="listOfPropositions"
            @list="updatePropositions"
          />
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
//import from firebase and save in localStorage import firebase from 'firebase'
import ProjectInfo from "@/views/Fundrais/info.vue";
import InfoAdmin from "@/views/Fundrais/info.admin.vue";
import ListOfParticipants from "@/views/Fundrais/Participants/list.vue";
import ListOfProducts from "@/views/Fundrais/Products/list.vue";
import ListOfPropositions from "@/views/Fundrais/Propositions/list.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      docID: "",
      db: firebase.firestore().collection("Zrzuty-develop"),
      fundraisInfo: {},
      listOfParticipants: [],
      listOfProducts: [],
      listOfPropositions: []
    };
  },
  methods: {
    updateInfo(info) {
      this.fundraisInfo = info;
      this.updateDoc();
    },
    updateParticipants(list) {
      this.listOfParticipants = list;
      this.updateDoc();
    },
    updateProducts(list) {
      this.listOfProducts = list;
      this.updateDoc();
    },
    updatePropositions(list) {
      this.listOfPropositions = list;
      let accept = this.acceptProposition;
      this.listOfPropositions.forEach(item => accept(item));
      this.updateDoc();
    },
    acceptProposition(item) {
      if (item.accepted) {
        delete item.creator;
        delete item.likes;
        delete item.dislikes;
        delete item.accepted;
        this.listOfProducts.push(item);
      }
      this.updateDoc();
    },
    async getDoc() {
      let tmpDoc = await this.db.get({ source: "default" });
      //converting from JSON date format to object
      this.fundraisInfo = tmpDoc.data().fundraisInfo;
      this.fundraisInfo.creationDate = new Date(this.fundraisInfo.creationDate);
      this.fundraisInfo.endDate = new Date(this.fundraisInfo.endDate);
      this.listOfParticipants = tmpDoc.data().listOfParticipants;
      this.listOfProducts = tmpDoc.data().listOfProducts;
      this.listOfPropositions = tmpDoc.data().listOfPropositions;
    },
    async updateDoc() {
      if (
        this.fundraisInfo.endDate.getYear() > 118 &&
        this.fundraisInfo.creationDate.getYear() > 118 &&
        this.fundraisInfo.title.length > 0
      ) {
        //date must be converted to JSON when sending to server
        let tmpInfo = { ...this.fundraisInfo };
        tmpInfo.creationDate = tmpInfo.creationDate.toJSON();
        tmpInfo.endDate = tmpInfo.endDate.toJSON();
        this.db.set({
          fundraisInfo: tmpInfo,
          listOfParticipants: this.listOfParticipants,
          listOfProducts: this.listOfProducts,
          listOfPropositions: this.listOfPropositions
        });
        //usefull log for admin
        if (this.authenticate) {
          await console.log("document updated");
        }
      }
    }
  },
  computed: {
    authenticate() {
      return this.fundraisInfo.creator == localStorage.getItem("login") ? true : false;
    }
  },
  mounted() {
    this.docID = this.$route.params.id;
    this.db = this.db.doc(this.docID);
    this.getDoc();
  },
  components: {
    ProjectInfo,
    InfoAdmin,
    ListOfParticipants,
    ListOfProducts,
    ListOfPropositions
  }
};
</script>
<style scoped>
.Fundrais {
  word-break: break-all;
  word-break: break-word;
}
</style>