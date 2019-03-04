<template>
  <div class="Fundrais">
    <div class="container-fluid">
      <b-row>
        <b-col class="shadow">
          <project-info v-if="!admin" :info="fundraisInfo"/>
          <info-admin v-if="admin" :info="fundraisInfo" @info="updateFundraisInfo"/>
        </b-col>
        <b-col class="shadow">
          <list-of-participants
            :admin="admin"
            :ended="this.fundraisInfo.ended"
            :list="listOfParticipants"
            @list="updateListOfParticipants"
          />
        </b-col>
        <b-col class="shadow">
          <list-of-products :admin="admin" :list="listOfProducts" @list="updateListOfProducts"/>
        </b-col>
      </b-row>
      <b-row align-h="end">
        <b-col class="shadow">
          <p
            class="display-4"
            v-if="fundraisInfo.ended == true && fundraisInfo.accountNumber.length > 0 && !admin"
          >Wpłaty na numer konta: {{fundraisInfo.accountNumber}}</p>
        </b-col>
        <b-col cols="4">
          <list-of-propositions
            v-if="false"
            :admin="admin"
            :list="listOfPropositions"
            @list="updateListOfPropositions"
          />
        </b-col>
      </b-row>
      <!-- <b-row>
        <b-col style="background-color: green">

        </b-col>
      </b-row>-->
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
      admin: false,
      db: firebase.firestore().collection("Zrzuty"),
      //ProjectInfo elements
      fundraisInfo: {},
      //TODO ListOfParticipants should be a proper arr of obj with Name, Comment, paid, accepted
      listOfParticipants: [],
      listOfProducts: [],
      listOfPropositions: []
    };
  },
  methods: {
    updateFundraisInfo(info) {
      this.fundraisInfo = info;
      this.updateDoc();
    },
    updateListOfParticipants(list) {
      this.listOfParticipants = list;
      this.updateDoc();
    },
    updateListOfProducts(list) {
      this.listOfProducts = list;
      this.updateDoc();
    },
    updateListOfPropositions(list) {
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
      this.fundraisInfo = tmpDoc.data().fundraisInfo;
      this.fundraisInfo.creationDate = new Date(this.fundraisInfo.creationDate.seconds * 1000);
      this.fundraisInfo.endDate = new Date(this.fundraisInfo.endDate.seconds * 1000);
      this.listOfParticipants = tmpDoc.data().listOfParticipants;
      this.listOfProducts = tmpDoc.data().listOfProducts;
      this.listOfPropositions = tmpDoc.data().listOfPropositions;
      this.admin = tmpDoc.data().fundraisInfo.creator == localStorage.getItem("login");
    },
    async updateDoc() {
      if (this.fundraisInfo.endDate.getYear() > 118 && this.fundraisInfo.creationDate.getYear() > 118) {
        this.db.set({
          fundraisInfo: this.fundraisInfo,
          listOfParticipants: this.listOfParticipants,
          listOfProducts: this.listOfProducts,
          listOfPropositions: this.listOfPropositions
        });
        if (this.admin) {
          await console.log("document updated");
        }
      }
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
  padding-top: 6rem;
}
list-of-propositions {
  margin-top: 0;
}
</style>
