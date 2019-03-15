<template>
  <div v-if="fundraisInfo">
    <!-- <b-alert
      variant="danger"
      class="h4"
      :show="!fundraisInfo.title.length && authenticate"
    >Proszę o uzupełnienie pola Tytuł, bez tego pola dokument nie zostanie zaktualizowany</b-alert>-->
    <!-- <b-alert
      :show="true"
      v-if="compareDates"
      variant="danger"
      class="h4"
    >Termin zbiórki minął, mamy nadzieję że wszystkie kwoty zostały wpłacone</b-alert>-->
    <!-- <b-alert
      variant="warning"
      class="h4"
      :show="fundraisInfo.ended"
      v-else
    >Zbiórka jest w fazie wpłat, proszę wpłacić daną kwotę</b-alert>-->
    <b-row class="m-3">
      <b-col>
        <project-info v-if="!isAdmin && fundraisInfo" :info="fundraisInfo"/>
        <info-admin v-if="isAdmin  && fundraisInfo" :info="fundraisInfo" @info="updateInfo"/>
      </b-col>
    </b-row>
    <b-row class="m-3">
      <b-col>
        <list-of-participants
          :isAdmin="isAdmin"
          :list="listOfParticipants"
          :ended="this.fundraisInfo.ended"
          @list="updateParticipants"
        />
      </b-col>
      <b-col>
        <!-- <list-of-products
          :isAdmin="isAdmin"
          :ended="this.fundraisInfo.ended"
          :list="listOfProducts"
          @list="updateProducts"
          v-if="authenticate && fundraisInfo.ended && false"
        />-->
        <propositions
          :numOfParticipants="listOfParticipants.length"
          :isAdmin="isAdmin"
          :ended="fundraisInfo.ended"
          :list="listOfPropositions"
          @list="updatePropositions"
          v-if="authenticate"
        />
      </b-col>
    </b-row>
  </div>
</template>
<script>
//import from firebase and save in localStorage import firebase from 'firebase'
import ProjectInfo from "@/views/Fundrais/info.vue";
import InfoAdmin from "@/views/Fundrais/info.admin.vue";
import ListOfParticipants from "@/views/Fundrais/Participants/list.vue";
import ListOfProducts from "@/views/Fundrais/Products/list.vue";
import Propositions from "@/views/Fundrais/Propositions/Table.vue";
import firebase from "firebase";

export default {
  data() {
    return {
      docID: "",
      db: firebase.firestore().collection("Zrzuty-develop"),
      fundraisInfo: undefined,
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
      //   let accept = this.acceptProposition;
      //   this.listOfPropositions.forEach(item => accept(item));
      this.updateDoc();
    },
    // acceptProposition(item) {
    //   if (item.accepted) {
    //     delete item.creator;
    //     delete item.likes;
    //     delete item.dislikes;
    //     delete item.accepted;
    //     this.listOfProducts.push(item);
    //   }
    //   this.updateDoc();
    // },
    async getDoc() {
      let tmpDoc = await this.db.get({ source: "default" });
      //converting from JSON date format to object
      this.fundraisInfo = tmpDoc.data().fundraisInfo;
      this.fundraisInfo.creationDate = new Date(this.fundraisInfo.creationDate);
      this.fundraisInfo.endDate = new Date(this.fundraisInfo.endDate);
      this.listOfParticipants = tmpDoc.data().listOfParticipants;
      this.listOfProducts = tmpDoc.data().listOfProducts;
      this.listOfPropositions = tmpDoc.data().listOfPropositions;
      if (this.fundraisInfo.endDate < new Date(Date.now())) {
        this.fundraisInfo.ended = true;
      }
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
      return (
        this.listOfParticipants.find(item => item.name == localStorage.getItem("login")) != null ||
        this.fundraisInfo.creator == localStorage.getItem("login")
      );
    },
    isAdmin() {
      return this.fundraisInfo && this.fundraisInfo.creator == localStorage.getItem("login");
    },
    compareDates() {
      return this.fundraisInfo.endDate.getTime() < Date.now();
    }
  },
  watch: {
    fundraisInfo: {
      handler() {
        if (!this.fundraisInfo) return;
        if (!this.compareDates && this.fundraisInfo.ended) {
          this.$notify({
            group: "status",
            title: "Status",
            text: "Zbiórka jest w fazie wpłat, proszę wpłacić daną kwotę",
            type: "warn"
          });
        } else if (this.compareDates) {
          this.$notify({
            group: "status",
            title: "Status",
            text: "Termin zbiórki minął, mamy nadzieję że wszystkie kwoty zostały wpłacone",
            type: "error"
          });
        } else if (!this.fundraisInfo.title.length && this.authenticate) {
          this.$notify({
            group: "status",
            title: "Status",
            text: "Proszę o uzupełnienie pola Tytuł, bez tego pola dokument nie zostanie zaktualizowany",
            type: "error"
          });
        }
      },
      deep: true
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
    Propositions
  }
};
</script>
<style scoped>
.Fundrais {
  word-break: break-all;
  word-break: break-word;
}
</style>