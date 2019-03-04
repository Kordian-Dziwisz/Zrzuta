<template>
  <div>
    <b-navbar
      class="fixed-top shadow"
      toggleable="md"
      v-shortkey="['alt', 'n']"
      @shortkey="addNewFundrais"
    >
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#" id="paddingCenter">
        <img src="@/assets/Logo.jpg" width="50">
      </b-navbar-brand>
      <!--https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvfuNsZHffYNmIn1UcFABUb6-GnknWFFrXIniz1R-Ocer4BMCMug -->
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Home'}">Home</b-nav-item>
          <b-nav-item @click="addNewFundrais">Nowa zbiórka</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-brand right>
            <p id="marginCenter">Oddajcie mi pieniondze</p>
          </b-navbar-brand>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import firebase from "firebase";

export default {
  data() {
    return {
      db: firebase.firestore().collection("Zrzuty"),
      clicked: false,
      newFundrais: {
        accountNumber: "",
        creator: "",
        title: "",
        description: "",
        creationDate: new Date("December 12, 2012 12:12:12"),
        endDate: new Date("December 12, 2012 12:12:12"),
        ended: false
      }
    };
  },
  methods: {
    async addNewFundrais() {
      if ((this.newFundrais.creator = localStorage.getItem("login")) && this.clicked == false) {
        this.clicked = true;
        this.newFundrais.creationDate = new Date(Date.now());
        this.newFundrais.endDate = new Date(Date.now());
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
    }
  }
};
</script>

<style scoped>
.shadow {
  box-shadow: 0.5vw 0.5vw 1vh rgba(00, 00, 00, 50%);
  border-radius: 0.25rem;
}
#paddingCenter {
  padding-top: 0;
}

#marginCenter {
  margin: 0;
}
</style>
